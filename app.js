(() => {
  "use strict";

  const SAMPLE = {
    building: "Sample Academic Building",
    nodes: [
      { id: "R1", label: "Room 1", type: "room", x: 100, y: 100 },
      { id: "C1", label: "Junction 1", type: "junction", x: 250, y: 100 },
      { id: "C2", label: "Junction 2", type: "junction", x: 400, y: 100 },
      { id: "E1", label: "Exit 1", type: "exit", x: 550, y: 100 },
      { id: "R2", label: "Room 2", type: "room", x: 100, y: 250 },
      { id: "C3", label: "Junction 3", type: "junction", x: 250, y: 250 },
      { id: "C4", label: "Junction 4", type: "junction", x: 400, y: 250 },
      { id: "E2", label: "Exit 2", type: "exit", x: 550, y: 250 }
    ],
    edges: [
      { id: "e1", from: "R1", to: "C1", cost: 2 },
      { id: "e2", from: "C1", to: "C2", cost: 2 },
      { id: "e3", from: "C2", to: "E1", cost: 3 },
      { id: "e4", from: "R1", to: "R2", cost: 5 },
      { id: "e5", from: "C1", to: "C3", cost: 3 },
      { id: "e6", from: "C2", to: "C4", cost: 4 },
      { id: "e7", from: "R2", to: "C3", cost: 1 },
      { id: "e8", from: "C3", to: "C4", cost: 3 },
      { id: "e9", from: "C4", to: "E2", cost: 3 }
    ],
    initial_state: { blocked_nodes: [], blocked_edges: [], closed_exits: [] }
  };

  const SVGNS = "http://www.w3.org/2000/svg";
  const VIEW_W = 1000, VIEW_H = 640, MARGIN = 70;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const S = {
    data: null, init: null,
    nodeMap: new Map(), edgeMap: new Map(), adj: new Map(), pairEdge: new Map(),
    blockedNodes: new Set(), blockedEdges: new Set(), closedExits: new Set(),
    start: null, mode: "start", lang: "en", errors: null,
    pos: new Map(), sizes: null, layers: null, nodeEls: new Map(), edgeEls: new Map(),
    lastRouteKey: null, lastStatusHtml: "", lastHazardHtml: ""
  };

  const $ = (id) => document.getElementById(id);

  // ---------- i18n ----------
  function t(key, params = {}) {
    const dict = I18N[S.lang] || I18N.en;
    const s = dict[key] ?? I18N.en[key] ?? key;
    return s.replace(/\{(\w+)\}/g, (m, k) => (k in params ? String(params[k]) : m));
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function applyI18n() {
    document.documentElement.lang = S.lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $("langBtn").textContent = t("langBtn");
    $("map").setAttribute("aria-label", t("mapLabel"));
    if (S.data) {
      $("buildingStats").textContent = t("statsLine", { n: S.data.nodes.length, e: S.data.edges.length });
      updateAria();
    }
    renderErrors();
    renderHint();
    update();
  }

  // ---------- Validation ----------
  function validate(d) {
    const E = [];
    const err = (k, p) => E.push([k, p || {}]);
    if (!d || typeof d !== "object" || Array.isArray(d)) { err("errRoot"); return E; }
    if (typeof d.building !== "string" || !d.building.trim()) err("errBuilding");

    const nodeTypes = new Map();
    if (!Array.isArray(d.nodes)) err("errNodesArr");
    else {
      if (d.nodes.length < 2 || d.nodes.length > 60) err("errNodesCount", { n: d.nodes.length });
      let hasRJ = false, hasExit = false;
      d.nodes.forEach((n, i) => {
        if (!n || typeof n !== "object" || Array.isArray(n)) { err("errNodeObj", { i: i + 1 }); return; }
        if (typeof n.id !== "string" || !n.id.trim()) { err("errNodeId", { i: i + 1 }); return; }
        if (nodeTypes.has(n.id)) err("errNodeDup", { id: n.id });
        else nodeTypes.set(n.id, n.type);
        if (typeof n.label !== "string" || !n.label.trim()) err("errNodeLabel", { id: n.id });
        if (!["room", "junction", "exit"].includes(n.type)) err("errNodeType", { id: n.id });
        else if (n.type === "exit") hasExit = true;
        else hasRJ = true;
        if (typeof n.x !== "number" || !Number.isFinite(n.x) || typeof n.y !== "number" || !Number.isFinite(n.y)) {
          err("errNodeXY", { id: n.id });
        }
      });
      if (!hasRJ) err("errNeedRoom");
      if (!hasExit) err("errNeedExit");
    }

    const edgeIds = new Set(), pairs = new Set();
    if (!Array.isArray(d.edges)) err("errEdgesArr");
    else {
      if (d.edges.length < 1 || d.edges.length > 150) err("errEdgesCount", { n: d.edges.length });
      d.edges.forEach((e, i) => {
        if (!e || typeof e !== "object" || Array.isArray(e)) { err("errEdgeObj", { i: i + 1 }); return; }
        if (typeof e.id !== "string" || !e.id.trim()) { err("errEdgeId", { i: i + 1 }); return; }
        if (edgeIds.has(e.id)) err("errEdgeDup", { id: e.id });
        else edgeIds.add(e.id);
        if (typeof e.from !== "string" || typeof e.to !== "string" || !nodeTypes.has(e.from) || !nodeTypes.has(e.to)) {
          err("errEdgeEnds", { id: e.id });
        } else if (e.from === e.to) {
          err("errEdgeSelf", { id: e.id });
        } else {
          const key = pairKey(e.from, e.to);
          if (pairs.has(key)) err("errEdgePair", { id: e.id, a: e.from, b: e.to });
          else pairs.add(key);
        }
        if (!Number.isInteger(e.cost) || e.cost <= 0) err("errEdgeCost", { id: e.id });
      });
    }

    const st = d.initial_state;
    if (!st || typeof st !== "object" || Array.isArray(st)) err("errState");
    else {
      ["blocked_nodes", "blocked_edges", "closed_exits"].forEach((k) => {
        if (!Array.isArray(st[k])) { err("errStateArr", { k }); return; }
        st[k].forEach((id) => {
          const okStr = typeof id === "string";
          if (k === "blocked_nodes") {
            const ty = okStr ? nodeTypes.get(id) : undefined;
            if (ty !== "room" && ty !== "junction") err("errStBN", { id: String(id) });
          } else if (k === "blocked_edges") {
            if (!okStr || !edgeIds.has(id)) err("errStBE", { id: String(id) });
          } else if (!okStr || nodeTypes.get(id) !== "exit") {
            err("errStCE", { id: String(id) });
          }
        });
      });
    }
    return E;
  }

  function pairKey(a, b) { return a < b ? a + "\u0000" + b : b + "\u0000" + a; }

  // ---------- Loading ----------
  function loadData(d) {
    const errors = validate(d);
    if (errors.length) { S.errors = errors; renderErrors(); return false; }
    S.errors = null;
    renderErrors();

    S.data = d;
    S.init = JSON.parse(JSON.stringify(d.initial_state));
    S.nodeMap = new Map(d.nodes.map((n) => [n.id, n]));
    S.edgeMap = new Map(d.edges.map((e) => [e.id, e]));
    S.adj = new Map(d.nodes.map((n) => [n.id, []]));
    S.pairEdge = new Map();
    d.edges.forEach((e) => {
      S.adj.get(e.from).push({ to: e.to, edge: e });
      S.adj.get(e.to).push({ to: e.from, edge: e });
      S.pairEdge.set(pairKey(e.from, e.to), e.id);
    });
    S.start = null;
    S.lastRouteKey = null;
    applyState(S.init);

    $("emptyState").hidden = true;
    $("map").hidden = false;
    $("mapHead").hidden = false;
    $("resetBtn").disabled = false;
    $("buildingName").textContent = d.building;
    $("buildingStats").textContent = t("statsLine", { n: d.nodes.length, e: d.edges.length });

    buildMap();
    update();
    toast(t("toastLoaded", { name: d.building }));
    return true;
  }

  function applyState(st) {
    S.blockedNodes = new Set(st.blocked_nodes);
    S.blockedEdges = new Set(st.blocked_edges);
    S.closedExits = new Set(st.closed_exits);
  }

  async function onFile(file) {
    let text;
    try { text = await file.text(); }
    catch { S.errors = [["errRead", {}]]; renderErrors(); return; }
    let d;
    try { d = JSON.parse(text); }
    catch { S.errors = [["errJson", {}]]; renderErrors(); return; }
    loadData(d);
  }

  // ---------- Routing ----------
  // Dijkstra over (cost, node-ID path). Ties on cost are broken by the
  // lexicographically smaller node-ID sequence; exits are never expanded.
  function cmpPath(a, b) {
    const n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) {
      if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
    }
    return a.length - b.length;
  }
  function better(cost, path, cur) {
    return !cur || cost < cur.cost || (cost === cur.cost && cmpPath(path, cur.path) < 0);
  }

  function computeRoute() {
    const start = S.start;
    if (!start) return { status: "none" };
    if (S.blockedNodes.has(start)) return { status: "startBlocked" };

    const usable = (id) => {
      const n = S.nodeMap.get(id);
      return n.type === "exit" ? !S.closedExits.has(id) : !S.blockedNodes.has(id);
    };

    const best = new Map([[start, { cost: 0, path: [start] }]]);
    const done = new Set();
    for (;;) {
      let u = null, bu = null;
      for (const [id, v] of best) {
        if (done.has(id)) continue;
        if (better(v.cost, v.path, bu)) { u = id; bu = v; }
      }
      if (u === null) break;
      done.add(u);
      if (S.nodeMap.get(u).type === "exit") continue;
      for (const { to, edge } of S.adj.get(u)) {
        if (done.has(to) || S.blockedEdges.has(edge.id) || !usable(to)) continue;
        const cost = bu.cost + edge.cost;
        const path = bu.path.concat(to);
        if (better(cost, path, best.get(to))) best.set(to, { cost, path });
      }
    }

    let pick = null, pickId = null;
    for (const [id, v] of best) {
      if (S.nodeMap.get(id).type !== "exit") continue;
      if (!pick || v.cost < pick.cost || (v.cost === pick.cost && id < pickId)) { pick = v; pickId = id; }
    }
    if (!pick) return { status: "noRoute" };

    const edges = [];
    for (let i = 0; i < pick.path.length - 1; i++) edges.push(S.pairEdge.get(pairKey(pick.path[i], pick.path[i + 1])));
    return { status: "ok", path: pick.path, exit: pickId, cost: pick.cost, edges };
  }

  // ---------- Map rendering ----------
  function svgEl(tag, attrs = {}, text) {
    const n = document.createElementNS(SVGNS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }

  function buildMap() {
    const svg = $("map");
    svg.innerHTML = "";
    S.nodeEls.clear();
    S.edgeEls.clear();

    const nodes = S.data.nodes;
    const xs = nodes.map((n) => n.x), ys = nodes.map((n) => n.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const spanX = maxX - minX || 1, spanY = maxY - minY || 1;
    const sc = Math.min((VIEW_W - 2 * MARGIN) / spanX, (VIEW_H - 2 * MARGIN) / spanY);
    const offX = (VIEW_W - (maxX - minX) * sc) / 2;
    const offY = (VIEW_H - (maxY - minY) * sc) / 2;
    S.pos = new Map(nodes.map((n) => [n.id, { x: offX + (n.x - minX) * sc, y: offY + (n.y - minY) * sc }]));

    // Size nodes from the closest pair so dense maps stay readable
    let minDist = Infinity;
    const P = [...S.pos.values()];
    for (let i = 0; i < P.length; i++) {
      for (let j = i + 1; j < P.length; j++) {
        const d = Math.hypot(P[i].x - P[j].x, P[i].y - P[j].y);
        if (d > 0 && d < minDist) minDist = d;
      }
    }
    if (!Number.isFinite(minDist)) minDist = 200;
    const r = Math.max(11, Math.min(26, minDist * 0.3));
    const fs = Math.max(11, Math.min(15, r * 0.6));
    S.sizes = { r, fs, routeW: Math.max(5, r * 0.32) };

    const layers = {
      edges: svgEl("g"), route: svgEl("g"), costs: svgEl("g"), nodes: svgEl("g")
    };
    svg.append(layers.edges, layers.route, layers.costs, layers.nodes);
    S.layers = layers;

    S.data.edges.forEach((e) => {
      const a = S.pos.get(e.from), b = S.pos.get(e.to);
      const line = svgEl("g", { class: "edge", "data-edge": e.id });
      line.append(
        svgEl("line", { class: "hit", x1: a.x, y1: a.y, x2: b.x, y2: b.y }),
        svgEl("line", { class: "vis", x1: a.x, y1: a.y, x2: b.x, y2: b.y })
      );
      layers.edges.append(line);

      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const label = String(e.cost);
      const w = Math.max(fs * 1.7, fs * 0.65 * label.length + fs);
      const h = fs * 1.5;
      const cost = svgEl("g", { class: "edge", "data-edge": e.id, tabindex: "0", role: "button" });
      cost.append(
        svgEl("rect", { class: "cost-bg", x: mx - w / 2, y: my - h / 2, width: w, height: h, rx: 4 }),
        svgEl("text", { class: "cost-tx", x: mx, y: my, "font-size": fs }, label)
      );
      layers.costs.append(cost);
      S.edgeEls.set(e.id, [line, cost]);
    });

    nodes.forEach((n) => {
      const p = S.pos.get(n.id);
      const g = svgEl("g", { class: "node " + n.type, "data-node": n.id, tabindex: "0", role: "button" });
      const body = svgEl("g", { class: "body" });
      let shape;
      if (n.type === "room") {
        shape = svgEl("rect", { class: "shape", x: p.x - r, y: p.y - r, width: 2 * r, height: 2 * r, rx: r * 0.25 });
      } else if (n.type === "junction") {
        shape = svgEl("circle", { class: "shape", cx: p.x, cy: p.y, r: r * 0.92 });
      } else {
        shape = svgEl("rect", { class: "shape", x: p.x - r * 1.25, y: p.y - r * 0.85, width: r * 2.5, height: r * 1.7, rx: 4 });
      }
      const maxW = n.type === "exit" ? r * 2.3 : r * 1.8;
      const idFs = Math.min(fs * 1.05, maxW / Math.max(1, n.id.length * 0.62));
      body.append(shape, svgEl("text", { class: "nid", x: p.x, y: p.y, "font-size": idFs }, n.id));
      const ring = svgEl("circle", { class: "start-ring", cx: p.x, cy: p.y, r: r * 1.5 });
      g.append(ring, body);
      if (n.label !== n.id) {
        const lbl = n.label.length > 22 ? n.label.slice(0, 21) + "…" : n.label;
        const ly = p.y + (n.type === "exit" ? r * 0.85 : r) + fs * 1.15;
        g.append(svgEl("text", { class: "nlabel", x: p.x, y: ly, "font-size": fs * 0.92 }, lbl));
      }
      const title = svgEl("title", {}, n.label);
      g.append(title);
      layers.nodes.append(g);
      S.nodeEls.set(n.id, g);
    });

    updateAria();
  }

  function updateAria() {
    if (!S.data) return;
    const typeName = { room: t("typeRoom"), junction: t("typeJunction"), exit: t("typeExit") };
    S.nodeEls.forEach((g, id) => {
      const n = S.nodeMap.get(id);
      g.setAttribute("aria-label", t("nodeAria", { id, label: n.label, type: typeName[n.type] }));
    });
    S.edgeEls.forEach(([, cost], id) => {
      const e = S.edgeMap.get(id);
      cost.setAttribute("aria-label", t("edgeAria", { id, a: e.from, b: e.to, cost: e.cost }));
    });
  }

  function drawRoute(r) {
    const key = r.status === "ok" ? r.path.join("\u0000") : "";
    if (key === S.lastRouteKey) return;
    S.lastRouteKey = key;
    const layer = S.layers.route;
    layer.innerHTML = "";
    if (!key) return;
    const d = r.path.map((id, i) => {
      const p = S.pos.get(id);
      return (i ? "L" : "M") + p.x.toFixed(1) + " " + p.y.toFixed(1);
    }).join(" ");
    const halo = svgEl("path", { d, class: "route-halo", "stroke-width": S.sizes.routeW * 2.6 });
    const line = svgEl("path", { d, class: "route-line", "stroke-width": S.sizes.routeW });
    layer.append(halo, line);
    if (reducedMotion) return;
    const len = line.getTotalLength();
    if (!len) return;
    line.style.strokeDasharray = len;
    line.style.strokeDashoffset = len;
    line.getBoundingClientRect();
    line.style.transition = "stroke-dashoffset 450ms ease-out";
    requestAnimationFrame(() => { line.style.strokeDashoffset = "0"; });
  }

  // ---------- Update cycle ----------
  function update() {
    if (!S.data) { $("statusBox").innerHTML = ""; $("hazardList").innerHTML = ""; return; }
    const r = computeRoute();
    const onNodes = new Set(r.status === "ok" ? r.path : []);
    const onEdges = new Set(r.status === "ok" ? r.edges : []);

    S.nodeEls.forEach((g, id) => {
      g.classList.toggle("blocked", S.blockedNodes.has(id));
      g.classList.toggle("closed", S.closedExits.has(id));
      g.classList.toggle("start", S.start === id);
      g.classList.toggle("on-route", onNodes.has(id));
    });
    S.edgeEls.forEach((els, id) => {
      els.forEach((el) => {
        el.classList.toggle("blocked", S.blockedEdges.has(id));
        el.classList.toggle("on-route", onEdges.has(id));
      });
    });

    drawRoute(r);
    renderStatus(r);
    renderHazards();
  }

  function nodeName(id) {
    const n = S.nodeMap.get(id);
    return n && n.label !== id ? `${id} (${n.label})` : id;
  }

  function renderStatus(r) {
    let html;
    if (r.status === "none") {
      html = `<div class="status"><p>${esc(t("stSelectStart"))}</p></div>`;
    } else if (r.status === "startBlocked") {
      html = `<div class="status bad"><p class="status-title">${esc(t("stStartBlocked"))}</p><p>${esc(t("stStartBlockedDesc", { start: S.start }))}</p></div>`;
    } else if (r.status === "noRoute") {
      html = `<div class="status bad"><p class="status-title">${esc(t("stNoRoute"))}</p><p>${esc(t("stNoRouteDesc", { start: S.start }))}</p></div>`;
    } else {
      const chips = r.path.map((id, i) => {
        const cls = i === 0 ? "chip start" : i === r.path.length - 1 ? "chip exit" : "chip";
        return (i ? '<span class="arrow" aria-hidden="true">→</span>' : "") + `<span class="${cls}">${esc(id)}</span>`;
      }).join("");
      html = `<div class="status ok">
        <p class="status-title">${esc(t("stRouteFound"))}</p>
        <div class="path">${chips}</div>
        <dl class="facts">
          <dt>${esc(t("lblStart"))}</dt><dd>${esc(nodeName(r.path[0]))}</dd>
          <dt>${esc(t("lblExit"))}</dt><dd>${esc(nodeName(r.exit))}</dd>
          <dt>${esc(t("lblSteps"))}</dt><dd>${r.edges.length}</dd>
        </dl>
        <div class="cost"><span>${esc(t("lblCost"))}</span><strong>${r.cost}</strong></div>
      </div>`;
    }
    if (html !== S.lastStatusHtml) {
      S.lastStatusHtml = html;
      $("statusBox").innerHTML = html;
    }
  }

  function renderHazards() {
    const items = [];
    [...S.blockedNodes].sort().forEach((id) => items.push(["node", id, t("hzBlockedNode"), nodeName(id)]));
    [...S.closedExits].sort().forEach((id) => items.push(["exit", id, t("hzClosedExit"), nodeName(id)]));
    [...S.blockedEdges].sort().forEach((id) => {
      const e = S.edgeMap.get(id);
      items.push(["edge", id, t("hzBlockedEdge"), `${id}: ${e.from}–${e.to}`]);
    });
    const html = items.length
      ? `<ul class="hz-list">${items.map(([kind, id, tag, name]) =>
          `<li class="hz"><span><span class="hz-tag">${esc(tag)}</span>${esc(name)}</span>
           <button type="button" class="btn small" data-clear="${kind}" data-id="${esc(id)}">${esc(t("clearBtn"))}</button></li>`
        ).join("")}</ul>`
      : `<p class="muted">${esc(t("noHazards"))}</p>`;
    if (html !== S.lastHazardHtml) {
      S.lastHazardHtml = html;
      $("hazardList").innerHTML = html;
    }
  }

  function renderErrors() {
    const box = $("errorBox");
    if (!S.errors) { box.hidden = true; box.innerHTML = ""; return; }
    const shown = S.errors.slice(0, 8);
    const more = S.errors.length - shown.length;
    box.innerHTML = `<strong>${esc(t("errTitle"))}</strong><ul>${shown.map(([k, p]) => `<li>${esc(t(k, p))}</li>`).join("")}${more > 0 ? `<li>${esc(t("errMore", { n: more }))}</li>` : ""}</ul>`;
    box.hidden = false;
  }

  function renderHint() {
    $("modeHint").textContent = t(S.mode === "start" ? "hintStart" : "hintHazard");
    document.querySelectorAll(".seg").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === S.mode)));
  }

  // ---------- Interaction ----------
  function toggle(set, id) { set.has(id) ? set.delete(id) : set.add(id); }

  function pop(id) {
    const g = S.nodeEls.get(id);
    if (!g) return;
    g.classList.remove("pop");
    g.getBoundingClientRect();
    g.classList.add("pop");
  }

  function onNode(id) {
    const n = S.nodeMap.get(id);
    if (S.mode === "start") {
      if (n.type === "exit") { toast(t("toastExitNotStart")); return; }
      if (S.blockedNodes.has(id)) { toast(t("toastBlockedStart", { id })); return; }
      S.start = id;
    } else if (n.type === "exit") {
      toggle(S.closedExits, id);
    } else {
      toggle(S.blockedNodes, id);
    }
    pop(id);
    update();
  }

  function onEdge(id) {
    toggle(S.blockedEdges, id);
    update();
  }

  let toastTimer;
  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function bind() {
    const openFile = () => $("fileInput").click();
    $("importBtn").addEventListener("click", openFile);
    $("importBtn2").addEventListener("click", openFile);
    $("sampleBtn").addEventListener("click", () => loadData(JSON.parse(JSON.stringify(SAMPLE))));
    $("sampleBtn2").addEventListener("click", () => loadData(JSON.parse(JSON.stringify(SAMPLE))));
    $("fileInput").addEventListener("change", (e) => {
      const f = e.target.files[0];
      e.target.value = "";
      if (f) onFile(f);
    });

    $("langBtn").addEventListener("click", () => {
      S.lang = S.lang === "en" ? "bn" : "en";
      try { localStorage.setItem("smart-escape-lang", S.lang); } catch { /* storage unavailable */ }
      S.lastStatusHtml = "";
      S.lastHazardHtml = "";
      applyI18n();
    });

    document.querySelectorAll(".seg").forEach((b) => b.addEventListener("click", () => {
      S.mode = b.dataset.mode;
      renderHint();
    }));

    $("resetBtn").addEventListener("click", () => {
      if (!S.data) return;
      applyState(S.init);
      update();
      toast(t("toastReset"));
    });

    const map = $("map");
    const act = (target) => {
      const node = target.closest("[data-node]");
      if (node) { onNode(node.dataset.node); return true; }
      const edge = target.closest("[data-edge]");
      if (edge) { onEdge(edge.dataset.edge); return true; }
      return false;
    };
    map.addEventListener("click", (e) => act(e.target));
    map.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (act(e.target)) e.preventDefault();
      }
    });
    // Hovering a cost badge also highlights its corridor line
    map.addEventListener("mouseover", (e) => {
      const edge = e.target.closest("[data-edge]");
      S.edgeEls.forEach((els, id) => els[0].classList.toggle("hover", !!edge && id === edge.dataset.edge));
    });

    $("hazardList").addEventListener("click", (e) => {
      const b = e.target.closest("[data-clear]");
      if (!b) return;
      const id = b.dataset.id;
      if (b.dataset.clear === "node") S.blockedNodes.delete(id);
      else if (b.dataset.clear === "exit") S.closedExits.delete(id);
      else S.blockedEdges.delete(id);
      update();
    });
  }

  // ---------- Init ----------
  try {
    const saved = localStorage.getItem("smart-escape-lang");
    if (saved === "en" || saved === "bn") S.lang = saved;
  } catch { /* storage unavailable */ }
  bind();
  applyI18n();

  // Exposed for quick checks in the browser console
  window.SmartEscape = { computeRoute, validate, loadData, state: S };
})();
