# Deshi Bazar (দেশি বাজার) — Online Shop

- **Name:** Kamruzzaman Amit
- **Registration number:** <your-reg-no>
- **Live link:** <https://your-live-link>

## How to run
No build step. Keep `index.html`, `style.css` and `app.js` in the same folder and open `index.html` in Chrome, or visit the live link. All data is saved in the browser's `localStorage` (no backend, no database).

## Main features
- Home page with banner, products grouped by category, and a "Popular products" section (ranked by units sold)
- Product list: search by name (English or Bangla), filter by category and price range, sort by price
- Product details: image, description, price, stock, quantity picker, Add to cart
- Cart: change quantity, remove items, subtotal, delivery charge (৳60 inside Dhaka / ৳120 outside), total; cannot exceed stock
- Checkout: name, Bangladeshi 11-digit phone validation (accepts Bangla digits and +880), address, area, payment (Cash on Delivery / bKash / Nagad, wallet payments need a transaction ID); confirmation page with order number; stock is reduced
- Admin panel (`#admin`): add / edit / delete products; all orders; change order status (Pending, Confirmed, Shipped, Delivered, Cancelled); dashboard with total sales, total orders and sales-by-category chart; Export orders CSV (Excel-friendly, Bangla-safe)
- 5 sample orders (different statuses and categories) are added on first open so the dashboard has data; they are marked "Sample" and never change stock
- Full Bangla / English switch (including screen-reader labels), prices in ৳, responsive on mobile
- Built-in SVG illustrations for all 8 sample products, drawn in the app's colours; they work offline

## Design
- Responsive at 360px, 768px, 1024px and 1440px with no sideways page scroll; touch-sized buttons
- Header with live search suggestions; shrinks and gains a shadow on scroll; category bar on desktop
- Mobile: slide-in menu and fixed bottom navigation (Home, Shop, Cart, Wishlist, Admin)
- Home: 3-slide auto carousel (arrows, dots, swipe; pauses on hover/focus; no auto-play with reduced motion), trust badges, category cards, swipeable product rows on mobile
- Product cards with hover lift, discount / New / low-stock badges; mini cart drawer opens on add to cart
- Shop page: filter sidebar on desktop, bottom-sheet filters on mobile, removable filter chips
- Admin: sidebar on desktop, tabs on mobile; coloured dashboard cards; tables become cards on mobile
- Built-in category illustration for products added without an image; optional regular price for discounts

## Bonus features
- Wishlist
- Coupon `DESHI10` for 10% off
- Printable invoice
- Track order status by phone number

## Known problems
- Data lives in one browser only (localStorage); admin panel has no login
- Admin-added products need an image URL from the internet; if it fails or is left blank, a placeholder is shown

## AI tools used
<list the tools you used>

## Most useful prompt
<paste your best prompt>

## License
MIT
