/* Deshi Bazar — frontend-only ecommerce app (all data in localStorage) */
'use strict';

/* ========== DATA ========== */
const SAMPLE = [
 {"id":1,"name_en":"Jamdani Saree","name_bn":"জামদানি শাড়ি","category":"Clothing","price":4500,"stock":5,"image":"https://picsum.photos/seed/saree/400/400"},
 {"id":2,"name_en":"Cotton Panjabi","name_bn":"সুতি পাঞ্জাবি","category":"Clothing","price":1200,"stock":12,"image":"https://picsum.photos/seed/panjabi/400/400"},
 {"id":3,"name_en":"Nakshi Kantha","name_bn":"নকশী কাঁথা","category":"Handicraft","price":3200,"stock":3,"image":"https://picsum.photos/seed/kantha/400/400"},
 {"id":4,"name_en":"Clay Pot Set","name_bn":"মাটির হাঁড়ি সেট","category":"Handicraft","price":850,"stock":20,"image":"https://picsum.photos/seed/pot/400/400"},
 {"id":5,"name_en":"Jute Bag","name_bn":"পাটের ব্যাগ","category":"Accessories","price":450,"stock":30,"image":"https://picsum.photos/seed/jute/400/400"},
 {"id":6,"name_en":"Bamboo Lamp","name_bn":"বাঁশের ল্যাম্প","category":"Handicraft","price":1500,"stock":0,"image":"https://picsum.photos/seed/lamp/400/400"},
 {"id":7,"name_en":"Leather Wallet","name_bn":"চামড়ার মানিব্যাগ","category":"Accessories","price":950,"stock":15,"image":"https://picsum.photos/seed/wallet/400/400"},
 {"id":8,"name_en":"Gamcha Set","name_bn":"গামছা সেট","category":"Clothing","price":350,"stock":40,"image":"https://picsum.photos/seed/gamcha/400/400"}
];
const CATS = ['Clothing','Handicraft','Accessories'];
const CAT_COLORS = {Clothing:'#24356F', Handicraft:'#C8372D', Accessories:'#E8A317'};
const CAT_ICONS = {Clothing:'shirt', Handicraft:'vase', Accessories:'bag'};
const STATUSES = ['Pending','Confirmed','Shipped','Delivered','Cancelled'];
const DELIVERY = {inside:60, outside:120};
const COUPONS = {DESHI10:10};
const PAYMENTS = ['cod','bkash','nagad'];
const PH = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#EEF0F4"/><path d="M60 200h280M200 60v280" stroke="#C8372D" stroke-width="4" stroke-dasharray="14 10"/><circle cx="200" cy="200" r="70" fill="none" stroke="#24356F" stroke-width="4" stroke-dasharray="14 10"/></svg>');

/* ========== TRANSLATIONS ========== */
const T = {
 en:{
  brand:'Deshi Bazar', tagline:'Handmade in Bangladesh', skip:'Skip to content',
  home:'Home', products:'Shop', allProducts:'All products', cart:'Cart', wishlist:'Wishlist', wishShort:'Wishlist', track:'Track order', admin:'Admin',
  menu:'Menu', openMenu:'Open menu', close:'Close', searchPh:'Search sarees, kantha, jute bags…', searchBtn:'Search',
  searchAll:q=>`See all results for “${q}”`, noMatch:'No matching products',
  offers:'Offers', prev:'Previous slide', next:'Next slide', goSlide:n=>`Go to slide ${n}`,
  s1tag:'Eid offer', s1t:'10% off everything this Eid', s1d:'Use coupon DESHI10 at checkout.', s1c:'Shop the offer',
  s2tag:'New collection', s2t:'Fresh handwoven kantha and jamdani', s2d:'New pieces from artisans in Dhaka, Rajshahi and Sylhet.', s2c:'See the collection',
  s3tag:'Delivery', s3t:'Home delivery all over Bangladesh', s3d:'৳60 inside Dhaka, ৳120 outside. Pay when it arrives.', s3c:'Start shopping',
  t1:'Cash on delivery', t1d:'Pay when your order arrives', t2:'7-day returns', t2d:'Easy return if something is wrong',
  t3:'100% handmade', t3d:'Made by local artisans', t4:'Nationwide delivery', t4d:'Inside Dhaka ৳60, outside ৳120',
  shopByCat:'Shop by category', itemsN:n=>`${num(n)} items`,
  popular:'Popular products', seeAll:'See all',
  search:'Search by name', allCats:'All categories', minPrice:'Min price (৳)', maxPrice:'Max price (৳)', min:'Min', max:'Max', priceRange:'Price range (৳)',
  sortBy:'Sort', sortDefault:'Recommended', sortLow:'Price: low to high', sortHigh:'Price: high to low',
  filters:'Filters', clear:'Clear filters', showResults:n=>`Show ${num(n)} products`,
  found:n=>`${num(n)} products found`, noResults:'No products match. Try a different name or widen the price range.',
  inStock:n=>`${num(n)} in stock`, lowStock:n=>`Only ${num(n)} left`, outOfStock:'Out of stock', add:'Add', addToCart:'Add to cart',
  added:'Added to cart', stockLimit:n=>`Only ${num(n)} available — you can't add more.`, inCart:n=>`${num(n)} already in your cart`,
  newBadge:'New', off:n=>`${num(n)}% off`,
  qty:'Quantity', description:'Description', back:'Back to shop', category:'Category', viewCart:'View cart', related:'You may also like',
  deliveryInfo:'Delivery ৳60 inside Dhaka, ৳120 outside', codInfo:'Cash on delivery available',
  cartEmpty:'Your cart is empty. Add something you like from the shop.', remove:'Remove', each:'each', miniCartTitle:'Your cart',
  subtotal:'Subtotal', delivery:'Delivery charge', discount:'Discount', total:'Total',
  area:'Delivery area', inside:'Inside Dhaka (৳60)', outside:'Outside Dhaka (৳120)', insideShort:'Inside Dhaka', outsideShort:'Outside Dhaka',
  coupon:'Coupon code', apply:'Apply', couponOk:c=>`Coupon ${c} applied — 10% off`, couponBad:'This coupon code is not valid.', removeCoupon:'Remove coupon',
  checkout:'Checkout', toCheckout:'Proceed to checkout', yourInfo:'Your details', addressStep:'Delivery address', orderSummary:'Order summary',
  name:'Full name', phone:'Phone number', phoneHint:'11 digits, e.g. 01712345678', address:'Full address', payment:'Payment method',
  cod:'Cash on Delivery', bkash:'bKash', nagad:'Nagad', codSub:'Pay the rider in cash', walletSub:'Pay now from your wallet',
  trx:'Transaction ID', trxHint:'Send the total to 01700-000000 (merchant), then enter the transaction ID from the SMS.',
  placeOrder:'Place order', errName:'Enter your name (at least 3 letters).', errPhone:'Enter a valid 11-digit Bangladeshi number starting with 013–019.',
  errAddress:'Enter your full address (at least 10 characters).', errTrx:'Enter the 8–10 character transaction ID.',
  stockChanged:'Some items changed in stock. Please review your cart.',
  thanks:'Thank you! Your order has been placed.', orderNo:'Order number', keepNo:'Keep this number to track your order.',
  printInvoice:'Print invoice', continueShopping:'Continue shopping', invoice:'Invoice', date:'Date', customer:'Customer',
  item:'Item', unit:'Unit price', lineTotal:'Total', status:'Status', paymentLabel:'Payment',
  st_Pending:'Pending', st_Confirmed:'Confirmed', st_Shipped:'Shipped', st_Delivered:'Delivered', st_Cancelled:'Cancelled',
  trackTitle:'Track your order', trackText:'Enter the phone number you used at checkout.', find:'Find orders',
  noOrders:'No orders found for this number.', orderNotFound:'Order not found.', items:'Items',
  wishEmpty:'Your wishlist is empty. Tap the heart on any product to save it here.', wishAdded:'Saved to wishlist', wishRemoved:'Removed from wishlist',
  dashboard:'Dashboard', manageProducts:'Products', orders:'Orders', totalSales:'Total sales', totalOrders:'Total orders',
  pendingOrders:'Pending orders', productsCount:'Products', salesByCat:'Sales by category', salesNote:'Cancelled orders are not counted.',
  lowStockTitle:'Low stock (3 or fewer)', recentOrders:'Recent orders', none:'Nothing here yet.', addProduct:'Add product', editProduct:'Edit product',
  edit:'Edit', delete:'Delete', save:'Save product', cancel:'Cancel', confirmDelete:n=>`Delete "${n}"? This cannot be undone.`,
  nameEn:'Name (English)', nameBn:'Name (Bangla)', price:'Price (৳)', oldPrice:'Regular price (৳, optional)', stock:'Stock', image:'Image URL',
  descEn:'Description (English)', descBn:'Description (Bangla)', imageHint:'Leave blank to keep the built-in illustration.',
  errRequired:'This field is required.', errPrice:'Enter a price greater than 0.', errStock:'Enter a stock of 0 or more.', errOldPrice:'Regular price must be higher than the price.',
  productSaved:'Product saved', productDeleted:'Product deleted', statusUpdated:'Order status updated',
  reopenFail:'Not enough stock to reopen this cancelled order.', noOrdersYet:'No orders yet. Orders placed by customers will appear here.',
  view:'View', actions:'Actions', adminBack:'Back to shop',
  aboutTitle:'About Deshi Bazar', aboutText:'A small Dhaka shop selling handmade clothing and crafts from local artisans, delivered across Bangladesh.',
  linksTitle:'Quick links', contactTitle:'Contact', payTitle:'Payment methods', addressLine:'Dhaka, Bangladesh', rights:'© 2026 Deshi Bazar',
  cat_Clothing:'Clothing', cat_Handicraft:'Handicraft', cat_Accessories:'Accessories',
  desc_Clothing:'Woven by local artisans in Bangladesh. Comfortable, durable and suited to everyday and festive wear.',
  desc_Handicraft:'Made by hand using traditional techniques passed down through generations of Bangladeshi craftspeople.',
  desc_Accessories:'A practical everyday accessory made from natural materials by local makers.',
  langBtn:'বাংলা', langShort:'বাং', notFound:'Page not found.', goHome:'Go to home',
  trxShort:'TrxID', decrease:'Decrease quantity', increase:'Increase quantity', sample:'Sample',
  exportCsv:'Export orders CSV', csvDone:'Orders CSV downloaded',
  csvHead:['Order ID','Date','Customer','Phone','Address','Area','Payment','TrxID','Items','Subtotal','Discount','Coupon','Delivery','Total','Status']
 },
 bn:{
  brand:'দেশি বাজার', tagline:'বাংলাদেশে হাতে তৈরি', skip:'মূল অংশে যান',
  home:'হোম', products:'সব পণ্য', allProducts:'সব পণ্য', cart:'কার্ট', wishlist:'পছন্দের তালিকা', wishShort:'পছন্দ', track:'অর্ডার খুঁজুন', admin:'অ্যাডমিন',
  menu:'মেনু', openMenu:'মেনু খুলুন', close:'বন্ধ করুন', searchPh:'শাড়ি, কাঁথা, পাটের ব্যাগ খুঁজুন…', searchBtn:'খুঁজুন',
  searchAll:q=>`“${q}”-এর সব ফলাফল দেখুন`, noMatch:'কোনো পণ্য মেলেনি',
  offers:'অফার', prev:'আগের স্লাইড', next:'পরের স্লাইড', goSlide:n=>`${num(n)} নম্বর স্লাইডে যান`,
  s1tag:'ঈদ অফার', s1t:'ঈদে সব পণ্যে ১০% ছাড়', s1d:'চেকআউটে DESHI10 কুপন ব্যবহার করুন।', s1c:'অফারে কিনুন',
  s2tag:'নতুন কালেকশন', s2t:'হাতে বোনা নতুন নকশী কাঁথা ও জামদানি', s2d:'ঢাকা, রাজশাহী আর সিলেটের কারিগরদের নতুন কাজ।', s2c:'কালেকশন দেখুন',
  s3tag:'ডেলিভারি', s3t:'সারা বাংলাদেশে হোম ডেলিভারি', s3d:'ঢাকায় ৳৬০, ঢাকার বাইরে ৳১২০। পণ্য হাতে পেয়ে টাকা দিন।', s3c:'কেনাকাটা শুরু করুন',
  t1:'ক্যাশ অন ডেলিভারি', t1d:'পণ্য হাতে পেয়ে টাকা দিন', t2:'৭ দিনে ফেরত', t2d:'সমস্যা হলে সহজে ফেরত',
  t3:'১০০% হাতে তৈরি', t3d:'স্থানীয় কারিগরদের হাতে বানানো', t4:'সারা দেশে ডেলিভারি', t4d:'ঢাকায় ৳৬০, বাইরে ৳১২০',
  shopByCat:'ক্যাটাগরি অনুযায়ী কিনুন', itemsN:n=>`${num(n)}টি পণ্য`,
  popular:'জনপ্রিয় পণ্য', seeAll:'সব দেখুন',
  search:'নাম দিয়ে খুঁজুন', allCats:'সব ক্যাটাগরি', minPrice:'সর্বনিম্ন দাম (৳)', maxPrice:'সর্বোচ্চ দাম (৳)', min:'সর্বনিম্ন', max:'সর্বোচ্চ', priceRange:'দামের সীমা (৳)',
  sortBy:'সাজান', sortDefault:'স্বাভাবিক', sortLow:'দাম: কম থেকে বেশি', sortHigh:'দাম: বেশি থেকে কম',
  filters:'ফিল্টার', clear:'ফিল্টার মুছুন', showResults:n=>`${num(n)}টি পণ্য দেখুন`,
  found:n=>`${num(n)}টি পণ্য পাওয়া গেছে`, noResults:'কোনো পণ্য মেলেনি। অন্য নাম লিখুন বা দামের সীমা বাড়ান।',
  inStock:n=>`স্টকে আছে ${num(n)}টি`, lowStock:n=>`মাত্র ${num(n)}টি বাকি`, outOfStock:'স্টকে নেই', add:'যোগ করুন', addToCart:'কার্টে যোগ করুন',
  added:'কার্টে যোগ হয়েছে', stockLimit:n=>`মাত্র ${num(n)}টি আছে — এর বেশি যোগ করা যাবে না।`, inCart:n=>`আপনার কার্টে আগে থেকেই ${num(n)}টি আছে`,
  newBadge:'নতুন', off:n=>`${num(n)}% ছাড়`,
  qty:'পরিমাণ', description:'বিবরণ', back:'দোকানে ফিরুন', category:'ক্যাটাগরি', viewCart:'কার্ট দেখুন', related:'আরও দেখুন',
  deliveryInfo:'ডেলিভারি চার্জ ঢাকায় ৳৬০, ঢাকার বাইরে ৳১২০', codInfo:'ক্যাশ অন ডেলিভারি সুবিধা আছে',
  cartEmpty:'আপনার কার্ট খালি। দোকান থেকে পছন্দের পণ্য যোগ করুন।', remove:'সরান', each:'প্রতিটি', miniCartTitle:'আপনার কার্ট',
  subtotal:'সাবটোটাল', delivery:'ডেলিভারি চার্জ', discount:'ছাড়', total:'মোট',
  area:'ডেলিভারি এলাকা', inside:'ঢাকার ভেতরে (৳৬০)', outside:'ঢাকার বাইরে (৳১২০)', insideShort:'ঢাকার ভেতরে', outsideShort:'ঢাকার বাইরে',
  coupon:'কুপন কোড', apply:'প্রয়োগ করুন', couponOk:c=>`কুপন ${c} প্রয়োগ হয়েছে — ১০% ছাড়`, couponBad:'এই কুপন কোডটি সঠিক নয়।', removeCoupon:'কুপন সরান',
  checkout:'চেকআউট', toCheckout:'চেকআউটে যান', yourInfo:'আপনার তথ্য', addressStep:'ডেলিভারির ঠিকানা', orderSummary:'অর্ডারের সারাংশ',
  name:'পুরো নাম', phone:'ফোন নম্বর', phoneHint:'১১ সংখ্যা, যেমন 01712345678', address:'পূর্ণ ঠিকানা', payment:'পেমেন্ট পদ্ধতি',
  cod:'ক্যাশ অন ডেলিভারি', bkash:'বিকাশ', nagad:'নগদ', codSub:'ডেলিভারির সময় নগদে দিন', walletSub:'এখনই ওয়ালেট থেকে দিন',
  trx:'ট্রানজেকশন আইডি', trxHint:'মোট টাকা 01700-000000 (মার্চেন্ট) নম্বরে পাঠিয়ে SMS-এর ট্রানজেকশন আইডি লিখুন।',
  placeOrder:'অর্ডার করুন', errName:'আপনার নাম লিখুন (কমপক্ষে ৩ অক্ষর)।', errPhone:'০১৩–০১৯ দিয়ে শুরু হওয়া সঠিক ১১ সংখ্যার নম্বর দিন।',
  errAddress:'পূর্ণ ঠিকানা লিখুন (কমপক্ষে ১০ অক্ষর)।', errTrx:'৮–১০ অক্ষরের ট্রানজেকশন আইডি দিন।',
  stockChanged:'কিছু পণ্যের স্টক বদলে গেছে। কার্টটি আবার দেখুন।',
  thanks:'ধন্যবাদ! আপনার অর্ডার নেওয়া হয়েছে।', orderNo:'অর্ডার নম্বর', keepNo:'অর্ডার খুঁজতে এই নম্বরটি রেখে দিন।',
  printInvoice:'ইনভয়েস প্রিন্ট করুন', continueShopping:'কেনাকাটা চালিয়ে যান', invoice:'ইনভয়েস', date:'তারিখ', customer:'ক্রেতা',
  item:'পণ্য', unit:'একক দাম', lineTotal:'মোট', status:'অবস্থা', paymentLabel:'পেমেন্ট',
  st_Pending:'অপেক্ষমাণ', st_Confirmed:'নিশ্চিত', st_Shipped:'পাঠানো হয়েছে', st_Delivered:'পৌঁছে গেছে', st_Cancelled:'বাতিল',
  trackTitle:'আপনার অর্ডার খুঁজুন', trackText:'চেকআউটে যে ফোন নম্বর দিয়েছিলেন সেটি লিখুন।', find:'অর্ডার খুঁজুন',
  noOrders:'এই নম্বরে কোনো অর্ডার পাওয়া যায়নি।', orderNotFound:'অর্ডারটি পাওয়া যায়নি।', items:'পণ্য',
  wishEmpty:'পছন্দের তালিকা খালি। যেকোনো পণ্যের হার্ট চাপলে এখানে জমা হবে।', wishAdded:'পছন্দের তালিকায় যোগ হয়েছে', wishRemoved:'পছন্দের তালিকা থেকে সরানো হয়েছে',
  dashboard:'ড্যাশবোর্ড', manageProducts:'পণ্য', orders:'অর্ডার', totalSales:'মোট বিক্রি', totalOrders:'মোট অর্ডার',
  pendingOrders:'অপেক্ষমাণ অর্ডার', productsCount:'পণ্য', salesByCat:'ক্যাটাগরি অনুযায়ী বিক্রি', salesNote:'বাতিল অর্ডার হিসাবে ধরা হয়নি।',
  lowStockTitle:'স্টক কম (৩টি বা তার কম)', recentOrders:'সাম্প্রতিক অর্ডার', none:'এখনো কিছু নেই।', addProduct:'পণ্য যোগ করুন', editProduct:'পণ্য এডিট করুন',
  edit:'এডিট', delete:'মুছুন', save:'পণ্য সেভ করুন', cancel:'বাতিল', confirmDelete:n=>`"${n}" মুছে ফেলবেন? এটি আর ফেরত আনা যাবে না।`,
  nameEn:'নাম (ইংরেজি)', nameBn:'নাম (বাংলা)', price:'দাম (৳)', oldPrice:'আগের দাম (৳, ঐচ্ছিক)', stock:'স্টক', image:'ছবির URL',
  descEn:'বিবরণ (ইংরেজি)', descBn:'বিবরণ (বাংলা)', imageHint:'খালি রাখলে নিজস্ব illustration-টাই থাকবে।',
  errRequired:'এই ঘরটি পূরণ করুন।', errPrice:'০-এর বেশি দাম দিন।', errStock:'০ বা তার বেশি স্টক দিন।', errOldPrice:'আগের দাম বর্তমান দামের চেয়ে বেশি হতে হবে।',
  productSaved:'পণ্য সেভ হয়েছে', productDeleted:'পণ্য মুছে ফেলা হয়েছে', statusUpdated:'অর্ডারের অবস্থা আপডেট হয়েছে',
  reopenFail:'বাতিল অর্ডারটি আবার চালু করার মতো স্টক নেই।', noOrdersYet:'এখনো কোনো অর্ডার নেই। ক্রেতারা অর্ডার দিলে এখানে দেখা যাবে।',
  view:'দেখুন', actions:'কাজ', adminBack:'দোকানে ফিরুন',
  aboutTitle:'দেশি বাজার সম্পর্কে', aboutText:'স্থানীয় কারিগরদের হাতে তৈরি পোশাক ও হস্তশিল্পের ঢাকার একটি ছোট দোকান। সারা বাংলাদেশে ডেলিভারি দেওয়া হয়।',
  linksTitle:'দরকারি লিংক', contactTitle:'যোগাযোগ', payTitle:'পেমেন্ট পদ্ধতি', addressLine:'ঢাকা, বাংলাদেশ', rights:'© ২০২৬ দেশি বাজার',
  cat_Clothing:'পোশাক', cat_Handicraft:'হস্তশিল্প', cat_Accessories:'অ্যাকসেসরিজ',
  desc_Clothing:'বাংলাদেশের স্থানীয় কারিগরদের হাতে বোনা। আরামদায়ক, টেকসই এবং প্রতিদিন ও উৎসবে পরার উপযোগী।',
  desc_Handicraft:'প্রজন্ম ধরে চলে আসা ঐতিহ্যবাহী পদ্ধতিতে বাংলাদেশের কারিগরদের হাতে তৈরি।',
  desc_Accessories:'স্থানীয় কারিগরদের হাতে প্রাকৃতিক উপাদানে তৈরি, প্রতিদিনের ব্যবহারের উপযোগী।',
  langBtn:'English', langShort:'EN', notFound:'পাতাটি পাওয়া যায়নি।', goHome:'হোমে যান',
  trxShort:'ট্রানজেকশন আইডি', decrease:'পরিমাণ কমান', increase:'পরিমাণ বাড়ান', sample:'নমুনা',
  exportCsv:'অর্ডার CSV এক্সপোর্ট করুন', csvDone:'অর্ডারের CSV ডাউনলোড হয়েছে',
  csvHead:['অর্ডার নম্বর','তারিখ','ক্রেতা','ফোন','ঠিকানা','এলাকা','পেমেন্ট','ট্রানজেকশন আইডি','পণ্য','সাবটোটাল','ছাড়','কুপন','ডেলিভারি','মোট','অবস্থা']
 }
};
/* ========== BUILT-IN PRODUCT ILLUSTRATIONS (work offline) ========== */
// Each product gets a hand-drawn style SVG in the app's palette, framed by a kantha running-stitch border.
const C = {paper:'#FFFCF7', ink:'#1D2340', indigo:'#2B3A7A', indigoDk:'#1F2B5E', madder:'#A8322B', jute:'#C08A2E', juteDk:'#8A611A', green:'#2F7A4B', line:'#E6DDCF'};
function svgArt(bg, stitch, body){
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="${bg}"/>` +
    `<rect x="16" y="16" width="368" height="368" rx="8" fill="none" stroke="${stitch}" stroke-width="3" stroke-dasharray="12 9" opacity=".45"/>` +
    body + `</svg>`);
}
const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="11" fill="${C.ink}" opacity=".12"/>`;
const ART = {
  // Jamdani saree: folded, white with woven diamond motifs, red border and draped pallu
  saree: (()=>{
    let motifs = '';
    for(let r=0; r<3; r++) for(let x=106 + (r%2)*16; x<=300; x+=32) motifs += `<path d="M${x} ${183+r*28}l7 7-7 7-7-7z" fill="${C.indigo}" opacity=".75"/>`;
    let zig = ''; for(let x=84, k=0; x<=316; x+=12, k++) zig += `${x},${k%2?296:284} `;
    return svgArt('#F3EEE4', C.madder, shadow(200,322,140) +
      `<rect x="92" y="136" width="216" height="24" rx="8" fill="#F1DCD7"/>` +
      `<rect x="78" y="150" width="244" height="164" rx="10" fill="#FFFFFF" stroke="${C.line}" stroke-width="2"/>` + motifs +
      `<path d="M78 270h244v34a10 10 0 0 1-10 10H88a10 10 0 0 1-10-10z" fill="${C.madder}"/>` +
      `<polyline points="${zig}" fill="none" stroke="${C.jute}" stroke-width="3"/>` +
      `<path d="M206 150h106a10 10 0 0 1 10 10v100z" fill="${C.madder}"/>` +
      `<path d="M222 157 L316 248" stroke="${C.jute}" stroke-width="3" stroke-dasharray="8 6"/>` +
      `<path d="M250 158 l6 6-6 6-6-6z M290 166 l6 6-6 6-6-6z M300 196 l6 6-6 6-6-6z" fill="${C.paper}" opacity=".8"/>`);
  })(),
  // Cotton panjabi: indigo kurta with placket, buttons and embroidered hem
  panjabi: svgArt('#F5EAD3', C.indigo, shadow(200,336,112) +
    `<path d="M168 86 Q200 106 232 86 L272 100 Q302 122 330 222 L304 232 L272 162 L272 328 L128 328 L128 162 L96 232 L70 222 Q98 122 128 100 Z" fill="${C.indigo}"/>` +
    `<path d="M75 206 L100 216 M325 206 L300 216" stroke="${C.jute}" stroke-width="3" stroke-dasharray="7 5"/>` +
    `<rect x="193" y="96" width="14" height="96" rx="3" fill="${C.indigoDk}"/>` +
    `<path d="M168 86 Q200 106 232 86 L228 78 Q200 96 172 78 Z" fill="${C.indigoDk}"/>` +
    `<circle cx="200" cy="116" r="4" fill="${C.jute}"/><circle cx="200" cy="140" r="4" fill="${C.jute}"/><circle cx="200" cy="164" r="4" fill="${C.jute}"/>` +
    `<path d="M136 314 H264" stroke="${C.jute}" stroke-width="3" stroke-dasharray="10 7"/>` +
    `<path d="M150 120 Q146 200 150 290" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" fill="none" opacity=".12"/>`),
  // Nakshi kantha: quilt with running-stitch frames, lotus centre and corner motifs
  kantha: (()=>{
    let petals = ''; for(let k=0; k<8; k++) petals += `<ellipse cx="200" cy="170" rx="10" ry="22" fill="${C.madder}" opacity=".85" transform="rotate(${k*45} 200 200)"/>`;
    const corners = [[132,132],[268,132],[132,268],[268,268]].map(([x,y])=>
      `<circle cx="${x}" cy="${y}" r="11" fill="none" stroke="${C.madder}" stroke-width="2.5" stroke-dasharray="5 4"/><circle cx="${x}" cy="${y}" r="3.5" fill="${C.indigo}"/>`).join('');
    return svgArt('#E4E8F5', C.indigo, shadow(200,338,130) +
      `<g transform="rotate(-5 200 200)">` +
      `<rect x="76" y="76" width="248" height="248" rx="6" fill="${C.paper}" stroke="${C.madder}" stroke-width="10"/>` +
      `<rect x="98" y="98" width="204" height="204" fill="none" stroke="${C.indigo}" stroke-width="2.5" stroke-dasharray="7 6"/>` +
      `<rect x="112" y="112" width="176" height="176" fill="none" stroke="${C.jute}" stroke-width="2.5" stroke-dasharray="7 6"/>` +
      `<circle cx="200" cy="200" r="50" fill="none" stroke="${C.indigo}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
      petals + `<circle cx="200" cy="200" r="13" fill="${C.jute}"/>` + corners + `</g>`);
  })(),
  // Clay pot set: big hari with painted bands, small pot and bowl
  pot: svgArt('#F6E3DF', C.madder, shadow(205,324,160) +
    `<path d="M152 196 Q118 248 140 292 Q160 324 200 324 Q240 324 260 292 Q282 248 248 196 Z" fill="#B4553A"/>` +
    `<path d="M160 168 h80 l8 30 h-96z" fill="#9C4430"/>` +
    `<ellipse cx="200" cy="168" rx="46" ry="11" fill="#8A3A28"/><ellipse cx="200" cy="166" rx="35" ry="6" fill="#5E2618"/>` +
    `<path d="M134 240 Q200 258 266 240" stroke="${C.paper}" stroke-width="3" fill="none" stroke-dasharray="9 6"/>` +
    `<path d="M138 266 Q200 282 262 266" stroke="${C.jute}" stroke-width="4" fill="none"/>` +
    `<path d="M162 212 Q150 250 162 284" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" fill="none" opacity=".2"/>` +
    `<path d="M68 262 Q56 302 96 324 Q136 302 124 262 Z" fill="#C2674A"/><ellipse cx="96" cy="262" rx="29" ry="7" fill="#8A3A28"/>` +
    `<path d="M80 292 Q96 300 112 292" stroke="${C.paper}" stroke-width="2.5" fill="none" stroke-dasharray="5 4"/>` +
    `<path d="M282 290 Q290 324 318 324 Q346 324 354 290 Z" fill="#9C4430"/><ellipse cx="318" cy="290" rx="36" ry="8" fill="#B4553A"/><ellipse cx="318" cy="290" rx="27" ry="4.5" fill="#5E2618"/>`),
  // Jute bag: woven tote with handles and stitched patch
  jute: (()=>{
    let weave = ''; for(let y=192; y<=312; y+=11) weave += `<path d="M80 ${y}H320"/>`; for(let x=96; x<=310; x+=11) weave += `<path d="M${x} 170V320"/>`;
    return svgArt('#E2EEE6', C.green, shadow(200,328,124) +
      `<path d="M150 178 Q150 96 200 96 Q250 96 250 178" fill="none" stroke="${C.juteDk}" stroke-width="12" stroke-linecap="round"/>` +
      `<clipPath id="bag"><path d="M104 170 H296 L310 318 H90 Z"/></clipPath>` +
      `<path d="M104 170 H296 L310 318 H90 Z" fill="${C.jute}"/>` +
      `<g clip-path="url(#bag)" stroke="#A3741F" stroke-width="2" opacity=".55">${weave}</g>` +
      `<path d="M104 170 H296 L298 188 H102 Z" fill="#A3741F"/>` +
      `<rect x="160" y="222" width="80" height="64" rx="4" fill="${C.paper}"/>` +
      `<rect x="167" y="229" width="66" height="50" rx="2" fill="none" stroke="${C.madder}" stroke-width="2" stroke-dasharray="5 4"/>` +
      `<circle cx="200" cy="254" r="12" fill="${C.madder}"/><circle cx="200" cy="254" r="5" fill="${C.jute}"/>`);
  })(),
  // Bamboo lamp: glowing slatted shade on a bamboo pole
  lamp: (()=>{
    let slats = ''; for(let i=0; i<=8; i++) slats += `<path d="M${146+i*13.5} 106 L${110+i*22.5} 224"/>`;
    return svgArt(C.indigo, C.paper,
      `<circle cx="200" cy="175" r="130" fill="#F2D27B" opacity=".12"/><circle cx="200" cy="175" r="88" fill="#F2D27B" opacity=".18"/>` +
      `<ellipse cx="200" cy="330" rx="90" ry="10" fill="#000" opacity=".25"/>` +
      `<path d="M146 104 H254 L290 226 H110 Z" fill="#E7C877"/>` +
      `<g stroke="#B08A35" stroke-width="3">${slats}</g>` +
      `<rect x="140" y="98" width="120" height="10" rx="5" fill="#9C7A2E"/><rect x="104" y="222" width="192" height="10" rx="5" fill="#9C7A2E"/>` +
      `<ellipse cx="200" cy="240" rx="64" ry="8" fill="#FFF3C4" opacity=".35"/>` +
      `<rect x="192" y="232" width="16" height="86" fill="#C9A24E"/>` +
      `<rect x="188" y="262" width="24" height="5" rx="2" fill="#9C7A2E"/><rect x="188" y="292" width="24" height="5" rx="2" fill="#9C7A2E"/>` +
      `<ellipse cx="200" cy="320" rx="60" ry="12" fill="#9C7A2E"/>`);
  })(),
  // Leather wallet: bifold with stitched edge, strap and snap, card peeking out
  wallet: svgArt('#F5EAD3', C.madder, shadow(205,300,128) +
    `<g transform="rotate(-6 188 155)"><rect x="126" y="116" width="124" height="74" rx="6" fill="${C.indigo}"/><rect x="126" y="132" width="124" height="10" fill="${C.jute}"/></g>` +
    `<rect x="96" y="140" width="208" height="140" rx="16" fill="#7B3F26"/>` +
    `<rect x="108" y="152" width="184" height="116" rx="10" fill="none" stroke="${C.jute}" stroke-width="2.5" stroke-dasharray="8 6"/>` +
    `<path d="M200 146 V274" stroke="#5E2E1B" stroke-width="3"/>` +
    `<path d="M250 184 h66 a10 10 0 0 1 10 10 v32 a10 10 0 0 1 -10 10 h-66 z" fill="#5E2E1B"/>` +
    `<circle cx="306" cy="210" r="9" fill="${C.jute}"/><circle cx="306" cy="210" r="4" fill="${C.juteDk}"/>` +
    `<path d="M114 166 q40 -8 76 0" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" fill="none" opacity=".15"/>`),
  // Gamcha set: three folded checked towels in red, green and indigo
  gamcha: (()=>{
    const pat = (id, base, stripe) => `<pattern id="${id}" width="28" height="28" patternUnits="userSpaceOnUse"><rect width="28" height="28" fill="${base}"/><rect y="11" width="28" height="6" fill="${stripe}" opacity=".6"/><rect x="11" width="6" height="28" fill="${stripe}" opacity=".6"/><rect y="3" width="28" height="2" fill="${stripe}" opacity=".4"/></pattern>`;
    const layer = (x, y, w, fill, fringe) => {
      let f = ''; for(let yy=y+6; yy<y+46; yy+=6) f += `<path d="M${x} ${yy}h-10"/>`;
      return `<g stroke="${fringe}" stroke-width="2">${f}</g><rect x="${x}" y="${y}" width="${w}" height="50" rx="8" fill="url(#${fill})"/>` +
             `<rect x="${x+w-34}" y="${y}" width="34" height="50" rx="8" fill="#000" opacity=".08"/>`;
    };
    return svgArt('#F3EEE4', C.madder, `<defs>${pat('r',C.madder,C.paper)}${pat('g',C.green,C.paper)}${pat('b',C.indigo,C.jute)}</defs>` +
      shadow(200,322,140) + layer(92,262,220,'g',C.green) + layer(100,214,206,'r',C.madder) + layer(108,166,192,'b',C.indigo));
  })()
};
// Organizer sample data points to picsum.photos; swap those for the built-in illustration with the same name.
function toArt(img){ const m = /picsum\.photos\/seed\/([a-z]+)\//.exec(img || ''); return m && ART[m[1]] ? 'art:' + m[1] : img; }

/* Default illustration per category, used for products added without an image (or when an image fails) */
const CAT_ART = {
  // Clothing: hanger with a folded stitched cloth
  Clothing: svgArt('#E4E8F5', C.indigo, shadow(200,326,130) +
    `<path d="M200 118 a18 18 0 1 1 18 -18" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M200 118 L318 196 a8 8 0 0 1 -4 14 H86 a8 8 0 0 1 -4 -14 Z" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>` +
    `<path d="M104 210 H296 L284 312 H116 Z" fill="${C.indigo}"/>` +
    `<path d="M120 296 H280" stroke="${C.jute}" stroke-width="3" stroke-dasharray="9 6"/>` +
    `<path d="M150 224 V300 M250 224 V300" stroke="${C.paper}" stroke-width="3" opacity=".25"/>`),
  // Handicraft: woven basket
  Handicraft: (()=>{
    let weave = ''; for(let y=214; y<=300; y+=14) weave += `<path d="M90 ${y}H310"/>`;
    for(let x=110; x<=300; x+=18) weave += `<path d="M${x} 196V320"/>`;
    return svgArt('#F6E3DF', C.madder, shadow(200,326,126) +
      `<path d="M150 196 Q150 120 200 120 Q250 120 250 196" fill="none" stroke="#9C7A2E" stroke-width="9" stroke-linecap="round"/>` +
      `<clipPath id="bk"><path d="M92 196 H308 L284 318 H116 Z"/></clipPath>` +
      `<path d="M92 196 H308 L284 318 H116 Z" fill="#C9A24E"/>` +
      `<g clip-path="url(#bk)" stroke="#9C7A2E" stroke-width="3" opacity=".7">${weave}</g>` +
      `<rect x="84" y="186" width="232" height="18" rx="9" fill="#9C7A2E"/>` +
      `<path d="M128 258 H272" stroke="${C.madder}" stroke-width="6"/>`);
  })(),
  // Accessories: three bangles
  Accessories: svgArt('#F5EAD3', C.jute, shadow(200,312,120) +
    `<circle cx="160" cy="210" r="62" fill="none" stroke="${C.madder}" stroke-width="18"/>` +
    `<circle cx="240" cy="210" r="62" fill="none" stroke="${C.indigo}" stroke-width="18"/>` +
    `<circle cx="200" cy="250" r="62" fill="none" stroke="${C.jute}" stroke-width="18"/>` +
    `<circle cx="200" cy="250" r="62" fill="none" stroke="${C.paper}" stroke-width="3" stroke-dasharray="6 8" opacity=".8"/>`)
};
function catArt(p){ return CAT_ART[p && p.category] || PH; }
function imgSrc(p){
  const v = (p && p.image) || '';
  if(v.startsWith('art:')) return ART[v.slice(4)] || catArt(p);
  return v || catArt(p);
}

/* ========== ICONS (inline SVG, stroke style) ========== */
const ICONS = {
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h2.6l2.4 11.6a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21.5 7.5H6"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  close:'<path d="M18 6 6 18M6 6l12 12"/>',
  home:'<path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z"/>',
  grid:'<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
  shield:'<path d="M12 3 4.5 6v5.5c0 4.7 3.2 8 7.5 9.5 4.3-1.5 7.5-4.8 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  truck:'<path d="M1.5 5h12v10h-12zM13.5 8.5h4l3.5 3.5v3h-7.5"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
  refresh:'<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5"/><path d="M3.5 3.5v5h5"/>',
  award:'<circle cx="12" cy="9" r="6"/><path d="m9 14.5-1.5 7 4.5-2.5 4.5 2.5-1.5-7"/><path d="m9.5 9 1.8 1.8L14.5 7.5"/>',
  cash:'<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.8"/><path d="M6 10v4M18 10v4"/>',
  wallet:'<path d="M3.5 7.5h15a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/><path d="M3.5 7.5 15 4l1.5 3.5"/><circle cx="16" cy="14" r="1.3"/>',
  chevL:'<path d="m15 18-6-6 6-6"/>', chevR:'<path d="m9 18 6-6-6-6"/>',
  filter:'<path d="M3.5 5h17l-6.5 7.5V19l-4 2v-8.5z"/>',
  trash:'<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
  box:'<path d="M20.5 7.5 12 3 3.5 7.5v9L12 21l8.5-4.5z"/><path d="m3.5 7.5 8.5 4.5 8.5-4.5M12 12v9"/>',
  chart:'<path d="M4 20V11M10 20V5M16 20v-7M21.5 20h-19"/>',
  tag:'<path d="M20.5 13.5 13.5 20.5a2 2 0 0 1-2.8 0L3.5 13.3V3.5h9.8l7.2 7.2a2 2 0 0 1 0 2.8z"/><circle cx="8" cy="8" r="1.4"/>',
  phone:'<path d="M21.5 16.6v3a2 2 0 0 1-2.2 2 19.6 19.6 0 0 1-8.5-3 19.3 19.3 0 0 1-6-6 19.6 19.6 0 0 1-3-8.6A2 2 0 0 1 3.8 1.8h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.8 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail:'<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m21.5 6.5-9.5 7-9.5-7"/>',
  pin:'<path d="M12 21.5s7-6 7-11.5a7 7 0 0 0-14 0c0 5.5 7 11.5 7 11.5z"/><circle cx="12" cy="10" r="2.5"/>',
  download:'<path d="M12 3.5v11m0 0-4-4m4 4 4-4M4 16.5v3h16v-3"/>',
  print:'<path d="M6.5 9V3.5h11V9M6.5 17.5h-2a2 2 0 0 1-2-2v-4.5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2h-2"/><rect x="6.5" y="14" width="11" height="7"/>',
  edit:'<path d="M12 20h8.5M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>',
  shirt:'<path d="M8.5 3.5 3.5 6.5l2 5 2.5-1v10h8v-10l2.5 1 2-5-5-3a3.5 3.5 0 0 1-7 0z"/>',
  vase:'<path d="M9 3.5h6M10 3.5V6c-3 2-4.5 4.8-4.5 8.5a6.5 6.5 0 0 0 6.5 6.5 6.5 6.5 0 0 0 6.5-6.5c0-3.7-1.5-6.5-4.5-8.5V3.5"/><path d="M6 13h12"/>',
  bag:'<path d="M5 8h14l-1 12.5H6zM9 8V6.5a3 3 0 0 1 6 0V8"/>',
  arrowL:'<path d="M19 12H5m0 0 6-6m-6 6 6 6"/>'
};
function icon(name, size=22, filled=false){
  return `<svg class="ic" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${filled?'currentColor':'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]||''}</svg>`;
}

/* ========== STORAGE & STATE ========== */
const store = {
  get(k,d){ try{ const v = localStorage.getItem('deshi_'+k); return v===null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem('deshi_'+k, JSON.stringify(v)); }catch(e){} }
};
const state = {
  lang: store.get('lang','bn'),
  products: store.get('products', null),
  cart: store.get('cart', []),
  wish: store.get('wish', []),
  orders: store.get('orders', []),
  coupon: store.get('coupon', ''),
  area: store.get('area', 'inside')
};
if(!Array.isArray(state.products)){ state.products = SAMPLE.map(p=>({...p, desc_en:'', desc_bn:''})); save('products'); }
// Use built-in illustrations instead of random picsum photos (also upgrades data saved by older versions)
if(state.products.some(p=>toArt(p.image)!==p.image)){ state.products.forEach(p=>{ p.image = toArt(p.image); }); store.set('products', state.products); }
function save(k){ store.set(k, state[k]); }

/* Sample orders: added once on first open so the dashboard has data from the start.
   They do NOT reduce stock, and are flagged sample:true so status changes never touch stock either. */
function seedOrders(){
  if(store.get('seeded', false) || state.orders.length) return;
  const DAY = 864e5, now = Date.now();
  const mk = (n, daysAgo, name, phone, address, area, payment, trx, lines, status, coupon='') => {
    const items = lines.map(([id,qty])=>{ const p = SAMPLE.find(x=>x.id===id);
      return {id:p.id, name_en:p.name_en, name_bn:p.name_bn, category:p.category, price:p.price, qty}; });
    const subtotal = items.reduce((s,i)=>s + i.price*i.qty, 0);
    const discount = coupon ? Math.round(subtotal*COUPONS[coupon]/100) : 0;
    const delivery = DELIVERY[area];
    return {id:'DB-'+(1000+n), date:new Date(now - daysAgo*DAY).toISOString(), name, phone, address, area, payment, trx,
            items, subtotal, discount, coupon, delivery, total: subtotal - discount + delivery, status, sample:true};
  };
  state.orders = [
    mk(1, 6, 'Sample Customer A', '01700000001', 'House 1, Road 1, Dhanmondi, Dhaka', 'inside',  'cod',   '',         [[1,1],[5,2]], 'Delivered'),
    mk(2, 4, 'Sample Customer B', '01800000002', 'Ward 3, Sadar, Rajshahi',          'outside', 'bkash', 'SMPL0002', [[3,1],[4,1]], 'Shipped', 'DESHI10'),
    mk(3, 3, 'Sample Customer C', '01900000003', 'Block C, Mirpur 10, Dhaka',        'inside',  'cod',   '',         [[2,2],[8,3]], 'Confirmed'),
    mk(4, 2, 'Sample Customer E', '01600000005', 'Sector 7, Uttara, Dhaka',          'inside',  'cod',   '',         [[4,2]],       'Cancelled'),
    mk(5, 1, 'Sample Customer D', '01500000004', 'College Road, Zindabazar, Sylhet', 'outside', 'bkash', 'SMPL0004', [[7,1],[5,1]], 'Pending')
  ];
  save('orders'); store.set('seeded', true);
}
seedOrders();

/* ========== HELPERS ========== */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const app = $('#app');
function t(k,...a){ const v = (T[state.lang][k] ?? T.en[k] ?? k); return typeof v==='function' ? v(...a) : v; }
function num(n){ return Number(n).toLocaleString(state.lang==='bn'?'bn-BD':'en-US'); }
function money(n){ return '৳' + num(n); }
function esc(s){ return String(s ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function prod(id){ return state.products.find(p=>p.id===Number(id)); }
function pn(p){ return state.lang==='bn' ? (p.name_bn||p.name_en) : (p.name_en||p.name_bn); }
function itemName(i){ return state.lang==='bn' ? i.name_bn : i.name_en; }
function pdesc(p){ return (state.lang==='bn'?p.desc_bn:p.desc_en) || t('desc_'+p.category); }
function catName(c){ return t('cat_'+c); }
function stName(s){ return t('st_'+s); }
function img(p, cls='', lazy=true){ return `<img src="${esc(imgSrc(p))}" alt="${esc(pn(p))}" class="${cls}" ${lazy?'loading="lazy"':''} data-cat="${esc(p.category)}" onerror="imgFail(this)">`; }
function imgFail(el){ el.onerror = null; el.src = CAT_ART[el.dataset.cat] || PH; }
function fmtDate(d){ return new Date(d).toLocaleString(state.lang==='bn'?'bn-BD':'en-GB',{dateStyle:'medium',timeStyle:'short'}); }
function toEnDigits(s){ return String(s).replace(/[০-৯]/g, d=>String(d.charCodeAt(0)-2534)); }
function normPhone(s){ let p = toEnDigits(s).replace(/[\s\-()]/g,''); if(p.startsWith('+880')) p = p.slice(3); else if(p.startsWith('880')) p = p.slice(2); return p; }
const PHONE_RE = /^01[3-9]\d{8}$/;
function toast(msg, type=''){ const el = document.createElement('div'); el.className = 'toast '+type; el.setAttribute('role', type==='err'?'alert':'status'); el.textContent = msg; $('#toast').appendChild(el); setTimeout(()=>el.remove(), 2800); }
function soldCount(id){ return state.orders.filter(o=>o.status!=='Cancelled').reduce((s,o)=>s+o.items.filter(i=>i.id===id).reduce((a,i)=>a+i.qty,0),0); }
function discountPct(p){ return Number(p.old_price) > p.price ? Math.round((1 - p.price/Number(p.old_price))*100) : 0; }
function isNew(p){ return p.added && (Date.now() - p.added) < 30*864e5; }
function countCat(c){ return c==='all' ? state.products.length : state.products.filter(p=>p.category===c).length; }
function page(){ return (location.hash.slice(1)||'home').split('/')[0]; }
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ========== SHELL: header, side menu, bottom nav, footer ========== */
function renderShell(){
  document.documentElement.lang = state.lang;
  document.title = t('brand') + ' | ' + t('tagline');
  const pg = page(), arg = (location.hash.slice(1)||'').split('/')[1];
  $('#skipLink').textContent = t('skip');
  $('#catbar').setAttribute('aria-label', t('category'));
  $('#bottomNav').setAttribute('aria-label', t('menu'));
  $('#sideMenu').setAttribute('aria-label', t('menu'));
  $('#miniCart').setAttribute('aria-label', t('miniCartTitle'));
  $('.logo').setAttribute('aria-label', t('brand') + ', ' + t('home'));
  $('#logoText').textContent = t('brand');
  $('#logoSub').textContent = t('tagline');
  $('#q').placeholder = t('searchPh');
  $('#q').setAttribute('aria-label', t('search'));
  $('#searchSubmit').setAttribute('aria-label', t('searchBtn'));
  $('#menuBtn').setAttribute('aria-label', t('openMenu'));
  $('#langBtn').innerHTML = `${icon('globe',18)}<span class="lang-long">${t('langBtn')}</span><span class="lang-short">${t('langShort')}</span>`;
  $('#langBtn').setAttribute('aria-label', t('langBtn'));
  const catLinks = [['#products', t('allProducts'), pg==='products' && !arg], ...CATS.map(c=>[`#products/${c}`, catName(c), pg==='products' && arg===c])];
  $('#catbar').innerHTML = `<div class="wrap catbar-in"><div class="catbar-links">${catLinks.map(([h,l,a])=>`<a href="${h}" class="${a?'active':''}">${l}</a>`).join('')}</div>
    <div class="catbar-links"><a href="#track" class="${pg==='track'?'active':''}">${icon('truck',18)} ${t('track')}</a><a href="#admin" class="${pg==='admin'?'active':''}">${icon('shield',18)} ${t('admin')}</a></div></div>`;
  $('#sideMenu').innerHTML = `<div class="drawer-head"><strong>${t('menu')}</strong><button class="icon-btn" onclick="closePanels()" aria-label="${t('close')}">${icon('close')}</button></div>
    <nav class="side-links">
      <a href="#home">${icon('home')} ${t('home')}</a>
      <a href="#products">${icon('grid')} ${t('allProducts')}</a>
      ${CATS.map(c=>`<a href="#products/${c}" class="sub">${icon(CAT_ICONS[c],20)} ${catName(c)}</a>`).join('')}
      <a href="#wishlist">${icon('heart')} ${t('wishlist')}</a>
      <a href="#cart">${icon('cart')} ${t('cart')}</a>
      <a href="#track">${icon('truck')} ${t('track')}</a>
      <a href="#admin">${icon('shield')} ${t('admin')}</a>
    </nav>
    <div class="drawer-foot"><button class="btn btn-outline btn-block" onclick="toggleLang()">${icon('globe',18)} ${t('langBtn')}</button></div>`;
  const bn = [['home','#home','home'],['products','#products','grid'],['cart','#cart','cart'],['wishlist','#wishlist','heart'],['admin','#admin','shield']];
  $('#bottomNav').innerHTML = bn.map(([k,h,ic])=>`<a href="${h}" class="${pg===k?'active':''}" ${pg===k?'aria-current="page"':''}>
    <span class="bn-ic">${icon(ic)}${k==='cart'?'<span class="badge" data-badge="cart" hidden></span>':''}${k==='wishlist'?'<span class="badge" data-badge="wish" hidden></span>':''}</span>
    <span>${k==='wishlist'?t('wishShort'):k==='products'?t('products'):t(k)}</span></a>`).join('');
  $('#footer').innerHTML = `<div class="wrap foot-grid">
    <div><div class="logo foot-logo">${$('#logoMark').outerHTML.replace('id="logoMark"','')}<span>${t('brand')}</span></div><p>${t('aboutText')}</p></div>
    <div><h3>${t('linksTitle')}</h3><ul><li><a href="#products">${t('allProducts')}</a></li>${CATS.map(c=>`<li><a href="#products/${c}">${catName(c)}</a></li>`).join('')}<li><a href="#track">${t('track')}</a></li><li><a href="#admin">${t('admin')}</a></li></ul></div>
    <div><h3>${t('contactTitle')}</h3><ul class="contact"><li>${icon('pin',18)} ${t('addressLine')}</li><li>${icon('phone',18)} 01700-000000</li><li>${icon('mail',18)} hello@deshibazar.example</li></ul></div>
    <div><h3>${t('payTitle')}</h3><div class="pay-pills"><span class="pay bkash">${t('bkash')}</span><span class="pay nagad">${t('nagad')}</span><span class="pay cod">${t('cod')}</span></div></div>
  </div><div class="wrap foot-bottom">${t('rights')} · ${t('tagline')}</div>`;
  updateBadges();
}
function updateBadges(){
  const c = state.cart.reduce((s,i)=>s+i.qty,0), w = state.wish.length;
  $$('[data-badge="cart"]').forEach(b=>{ b.textContent = num(c); b.hidden = !c; });
  $$('[data-badge="wish"]').forEach(b=>{ b.textContent = num(w); b.hidden = !w; });
  $('#cartLink').setAttribute('aria-label', `${t('cart')} (${num(c)})`);
  $('#wishLink').setAttribute('aria-label', `${t('wishlist')} (${num(w)})`);
}
function toggleLang(){ state.lang = state.lang==='bn' ? 'en' : 'bn'; save('lang'); route(); }

/* Panels: side menu, mini cart, mobile filter sheet */
const PANELS = ['sideMenu','miniCart','filterPanel'];
function openPanel(id){
  closePanels();
  const el = $('#'+id); if(!el) return;
  if(id==='miniCart') renderMiniCart();
  el.classList.add('open'); el.setAttribute('aria-hidden','false');
  $('#scrim').classList.add('show'); document.body.classList.add('lock');
  const f = el.querySelector('button, a[href], input, select'); if(f) setTimeout(()=>f.focus({preventScroll:true}), 60);
}
function closePanels(){
  PANELS.forEach(id=>{ const el = $('#'+id); if(el && el.classList.contains('open')){ el.classList.remove('open'); if(id!=='filterPanel') el.setAttribute('aria-hidden','true'); } });
  $('#scrim').classList.remove('show'); document.body.classList.remove('lock');
}

/* Header search with suggestions */
let suggIdx = -1;
function matchProducts(q){ q = q.toLowerCase(); return state.products.filter(p=>p.name_en.toLowerCase().includes(q) || p.name_bn.includes(q) || catName(p.category).toLowerCase().includes(q)); }
function onSearchInput(){ const q = $('#q').value.trim(); if(!q) return closeSugg(); renderSugg(q); }
function renderSugg(q){
  const list = matchProducts(q).slice(0,6); suggIdx = -1;
  const box = $('#sugg');
  box.innerHTML = (list.length ? list.map((p,i)=>`<a href="#product/${p.id}" class="sugg-item" role="option" id="sg${i}">${img(p,'sugg-img')}
      <span class="sugg-name">${esc(pn(p))}<small>${catName(p.category)}</small></span><strong>${money(p.price)}</strong></a>`).join('')
    : `<div class="sugg-empty">${t('noMatch')}</div>`) + `<button type="button" class="sugg-all" onclick="submitSearch()">${icon('search',18)} ${t('searchAll', esc(q))}</button>`;
  box.hidden = false; $('#q').setAttribute('aria-expanded','true');
}
function closeSugg(){ const b = $('#sugg'); if(!b) return; b.hidden = true; b.innerHTML = ''; $('#q').setAttribute('aria-expanded','false'); $('#q').removeAttribute('aria-activedescendant'); }
function onSearchKey(e){
  const items = $$('#sugg .sugg-item');
  if(e.key==='ArrowDown' || e.key==='ArrowUp'){
    if(!items.length) return; e.preventDefault();
    suggIdx = (suggIdx + (e.key==='ArrowDown'?1:-1) + items.length) % items.length;
    items.forEach((el,i)=>el.classList.toggle('active', i===suggIdx));
    $('#q').setAttribute('aria-activedescendant', 'sg'+suggIdx);
  } else if(e.key==='Escape'){ closeSugg(); }
}
function submitSearch(e){
  if(e) e.preventDefault();
  const items = $$('#sugg .sugg-item');
  if(suggIdx>=0 && items[suggIdx]){ location.hash = items[suggIdx].getAttribute('href'); closeSugg(); return; }
  F.q = $('#q').value.trim(); F.cat = 'all'; closeSugg(); $('#q').blur();
  if(location.hash==='#products') route(); else location.hash = '#products';
}

/* ========== ROUTER ========== */
function route(){
  closeModal(); closePanels(); closeSugg(); stopHero();
  renderShell();
  const [pg, arg] = (location.hash.slice(1)||'home').split('/');
  const map = {home:renderHome, products:renderProducts, product:renderDetail, cart:renderCart, checkout:renderCheckout,
               order:renderOrder, wishlist:renderWishlist, track:renderTrack, admin:renderAdmin};
  (map[pg]||renderNotFound)(arg ? decodeURIComponent(arg) : undefined);
}
function renderNotFound(){ app.innerHTML = `<div class="empty card">${t('notFound')}<a href="#home" class="btn btn-primary">${t('goHome')}</a></div>`; }

/* ========== PRODUCT CARD ========== */
function badgesHTML(p){
  const b = [];
  const d = discountPct(p); if(d) b.push(`<span class="pill sale">${t('off', d)}</span>`);
  if(isNew(p)) b.push(`<span class="pill new">${t('newBadge')}</span>`);
  if(p.stock<=0) b.push(`<span class="pill out">${t('outOfStock')}</span>`);
  else if(p.stock<=3) b.push(`<span class="pill low">${t('lowStock', p.stock)}</span>`);
  return b.length ? `<div class="pills">${b.join('')}</div>` : '';
}
function priceHTML(p){ return `<span class="price">${money(p.price)}</span>${discountPct(p)?`<s class="old-price">${money(p.old_price)}</s>`:''}`; }
function wishBtn(p, cls='wish-btn'){
  const w = state.wish.includes(p.id);
  return `<button class="${cls} ${w?'on':''}" data-wish="${p.id}" onclick="toggleWish(${p.id})" aria-pressed="${w}" aria-label="${t('wishlist')}: ${esc(pn(p))}">${icon('heart',20,w)}</button>`;
}
function card(p){
  return `<article class="pcard">
    <a href="#product/${p.id}" class="pcard-img" tabindex="-1" aria-hidden="true">${img(p)}</a>
    ${badgesHTML(p)}${wishBtn(p)}
    <div class="pcard-body">
      <span class="pcat">${catName(p.category)}</span>
      <h3 class="pname"><a href="#product/${p.id}">${esc(pn(p))}</a></h3>
      <div class="pprice">${priceHTML(p)}</div>
      <button class="btn btn-primary btn-block add-btn" ${p.stock<=0?'disabled':''} onclick="addToCart(${p.id},1,true)">
        ${icon('cart',18)}<span class="lbl-long">${p.stock<=0?t('outOfStock'):t('addToCart')}</span><span class="lbl-short">${p.stock<=0?t('outOfStock'):t('add')}</span></button>
    </div></article>`;
}
function emptyBox(msg, href, label){ return `<div class="empty card"><p>${msg}</p>${href?`<a href="${href}" class="btn btn-primary">${label}</a>`:''}</div>`; }

/* ========== HOME ========== */
const SLIDES = [
  {k:'s1', art:'saree',  href:'#products',            theme:'indigo', chip:'DESHI10'},
  {k:'s2', art:'kantha', href:'#products/Handicraft', theme:'sand'},
  {k:'s3', art:'jute',   href:'#products',            theme:'green'}
];
let heroIdx = 0, heroTimer = null, heroPaused = false;
function renderHome(){
  const popular = [...state.products].filter(p=>p.stock>0).sort((a,b)=> soldCount(b.id)-soldCount(a.id) || b.price-a.price).slice(0,4);
  const trust = [['cash','t1'],['refresh','t2'],['award','t3'],['truck','t4']];
  app.innerHTML = `
  <section class="hero" id="hero" aria-roledescription="carousel" aria-label="${t('offers')}">
    <div class="hero-track" id="heroTrack">${SLIDES.map((s,i)=>`
      <div class="slide theme-${s.theme}" role="group" aria-roledescription="slide" aria-label="${num(i+1)} / ${num(SLIDES.length)}">
        <div class="slide-text">
          <span class="slide-tag">${t(s.k+'tag')}</span>
          <h2>${t(s.k+'t')}</h2>
          <p>${t(s.k+'d')}${s.chip?` <span class="coupon-chip">${s.chip}</span>`:''}</p>
          <a href="${s.href}" class="btn ${s.theme==='sand'?'btn-primary':'btn-accent'} btn-lg">${t(s.k+'c')}</a>
        </div>
        <div class="slide-art"><img src="${ART[s.art]}" alt=""></div>
      </div>`).join('')}</div>
    <button class="hero-arrow prev" onclick="heroGo(heroIdx-1)" aria-label="${t('prev')}">${icon('chevL')}</button>
    <button class="hero-arrow next" onclick="heroGo(heroIdx+1)" aria-label="${t('next')}">${icon('chevR')}</button>
    <div class="hero-dots">${SLIDES.map((s,i)=>`<button class="dot" onclick="heroGo(${i})" aria-label="${t('goSlide', i+1)}"></button>`).join('')}</div>
  </section>

  <section class="trust" aria-label="${t('t1')}">${trust.map(([ic,k])=>`<div class="trust-item"><span class="trust-ic">${icon(ic)}</span><div><strong>${t(k)}</strong><span>${t(k+'d')}</span></div></div>`).join('')}</section>

  <section class="section"><div class="sec-head"><h2>${t('shopByCat')}</h2></div>
    <div class="cat-cards">${CATS.map(c=>{ const first = state.products.find(p=>p.category===c);
      return `<a href="#products/${c}" class="cat-card" style="--cat:${CAT_COLORS[c]}">
        <span class="cat-ic">${icon(CAT_ICONS[c],24)}</span>
        <span class="cat-txt"><strong>${catName(c)}</strong><small>${t('itemsN', countCat(c))}</small></span>
        ${first?`<span class="cat-art">${img(first)}</span>`:''}</a>`; }).join('')}</div></section>

  <section class="section"><div class="sec-head"><h2>${t('popular')}</h2><a href="#products" class="see-all">${t('seeAll')} ${icon('chevR',18)}</a></div>
    ${popular.length ? `<div class="rail">${popular.map(card).join('')}</div>` : emptyBox(t('none'))}</section>

  ${CATS.map(c=>{ const list = state.products.filter(p=>p.category===c); if(!list.length) return '';
    return `<section class="section"><div class="sec-head"><h2>${catName(c)}</h2><a href="#products/${c}" class="see-all">${t('seeAll')} (${num(list.length)}) ${icon('chevR',18)}</a></div>
    <div class="rail">${list.slice(0,4).map(card).join('')}</div></section>`; }).join('')}`;
  heroIdx = 0; heroGo(0); startHero();
  const hero = $('#hero');
  hero.addEventListener('mouseenter', ()=>heroPaused=true); hero.addEventListener('mouseleave', ()=>heroPaused=false);
  hero.addEventListener('focusin', ()=>heroPaused=true); hero.addEventListener('focusout', ()=>heroPaused=false);
  let x0 = null;
  hero.addEventListener('touchstart', e=>{ x0 = e.touches[0].clientX; }, {passive:true});
  hero.addEventListener('touchend', e=>{ if(x0===null) return; const dx = e.changedTouches[0].clientX - x0; if(Math.abs(dx)>40) heroGo(heroIdx + (dx<0?1:-1)); x0 = null; }, {passive:true});
}
function heroGo(i){
  const track = $('#heroTrack'); if(!track) return;
  heroIdx = (i + SLIDES.length) % SLIDES.length;
  track.style.transform = `translateX(-${heroIdx*100}%)`;
  $$('.hero .dot').forEach((d,k)=>{ d.classList.toggle('active', k===heroIdx); d.setAttribute('aria-current', k===heroIdx?'true':'false'); });
  $$('.hero .slide').forEach((s,k)=>{ s.setAttribute('aria-hidden', k!==heroIdx); s.querySelectorAll('a').forEach(a=>a.tabIndex = k===heroIdx?0:-1); });
}
function startHero(){ stopHero(); if(reduceMotion) return; heroTimer = setInterval(()=>{ if(!heroPaused && !document.hidden) heroGo(heroIdx+1); }, 5000); }
function stopHero(){ if(heroTimer){ clearInterval(heroTimer); heroTimer = null; } heroPaused = false; }

/* ========== PRODUCT LIST ========== */
let F = {q:'',cat:'all',min:'',max:'',sort:'default'};
function resetFilters(){ F = {q:'',cat:'all',min:'',max:'',sort:'default'}; $('#q').value=''; if(location.hash==='#products') renderProducts(); else location.hash = '#products'; }
function renderProducts(cat){
  if(cat && CATS.includes(cat)) F.cat = cat;
  app.innerHTML = `
  <nav class="crumbs" aria-label="breadcrumb"><a href="#home">${t('home')}</a>${icon('chevR',16)}<span id="crumbCat">${t('allProducts')}</span></nav>
  <div class="shop">
    <aside class="filter-panel" id="filterPanel" aria-label="${t('filters')}">
      <div class="fp-head"><h2>${icon('filter',20)} ${t('filters')}</h2><button class="icon-btn sheet-only" onclick="closePanels()" aria-label="${t('close')}">${icon('close')}</button></div>
      <div class="fp-body">
        <div class="fgroup"><label for="fq">${t('search')}</label>
          <div class="input-icon">${icon('search',18)}<input type="search" id="fq" value="${esc(F.q)}" oninput="F.q=this.value;drawGrid()"></div></div>
        <fieldset class="fgroup"><legend>${t('category')}</legend>
          ${['all',...CATS].map(c=>`<label class="radio-row"><input type="radio" name="fcat" value="${c}" ${F.cat===c?'checked':''} onchange="setCat('${c}')">
            <span>${c==='all'?t('allCats'):catName(c)}</span><small>${num(countCat(c))}</small></label>`).join('')}</fieldset>
        <fieldset class="fgroup"><legend>${t('priceRange')}</legend>
          <div class="price-inputs"><input type="number" id="fmin" min="0" inputmode="numeric" placeholder="${t('min')}" aria-label="${t('minPrice')}" value="${esc(F.min)}" oninput="F.min=this.value;drawGrid()">
          <span aria-hidden="true">–</span><input type="number" id="fmax" min="0" inputmode="numeric" placeholder="${t('max')}" aria-label="${t('maxPrice')}" value="${esc(F.max)}" oninput="F.max=this.value;drawGrid()"></div></fieldset>
      </div>
      <div class="fp-foot"><button class="btn btn-ghost" onclick="resetFilters()">${t('clear')}</button><button class="btn btn-primary sheet-only" id="showBtn" onclick="closePanels()"></button></div>
    </aside>
    <section class="shop-main">
      <div class="shop-bar">
        <div><h1 id="shopTitle"></h1><p class="muted" id="count" aria-live="polite"></p></div>
        <div class="shop-tools">
          <button class="btn btn-outline sheet-only" onclick="openPanel('filterPanel')">${icon('filter',18)} ${t('filters')} <span class="badge inline" id="fcount" hidden></span></button>
          <label class="sort-wrap"><span class="sr-only">${t('sortBy')}</span><select id="fs" onchange="F.sort=this.value;drawGrid()">
            ${[['default','sortDefault'],['low','sortLow'],['high','sortHigh']].map(([v,k])=>`<option value="${v}" ${F.sort===v?'selected':''}>${t(k)}</option>`).join('')}</select></label>
        </div>
      </div>
      <div class="chips" id="chips"></div>
      <div class="pgrid" id="grid"></div>
    </section>
  </div>`;
  drawGrid();
}
function setCat(c){
  F.cat = c;
  history.replaceState(null, '', '#products' + (c==='all' ? '' : '/' + c)); // keep URL in sync so re-renders keep the choice
  $$('input[name=fcat]').forEach(r=>r.checked = r.value===c);
  renderShell();
  drawGrid();
}
function clearChip(k){ if(k==='cat') return setCat('all'); F[k] = ''; const el = $({q:'#fq',min:'#fmin',max:'#fmax'}[k]); if(el) el.value=''; if(k==='q') $('#q').value=''; drawGrid(); }
// Any link to plain "#products" (menu, banner, empty states) means "all products": reset the category filter.
document.addEventListener('click', e=>{
  const a = e.target.closest('a[href="#products"]'); if(!a) return;
  e.preventDefault();
  F.cat = 'all';
  if(location.hash !== '#products') history.pushState(null, '', '#products');
  route(); window.scrollTo(0,0);
});
function drawGrid(){
  const q = F.q.trim().toLowerCase();
  const min = F.min==='' ? null : Number(toEnDigits(F.min)), max = F.max==='' ? null : Number(toEnDigits(F.max));
  let list = state.products.filter(p=>
    (!q || p.name_en.toLowerCase().includes(q) || p.name_bn.includes(q)) &&
    (F.cat==='all' || p.category===F.cat) &&
    (min===null || p.price>=min) && (max===null || p.price<=max));
  if(F.sort==='low') list.sort((a,b)=>a.price-b.price);
  if(F.sort==='high') list.sort((a,b)=>b.price-a.price);
  const title = F.cat==='all' ? t('allProducts') : catName(F.cat);
  $('#shopTitle').textContent = title; $('#crumbCat').textContent = title;
  $('#count').textContent = t('found', list.length);
  $('#showBtn').textContent = t('showResults', list.length);
  const chips = [];
  if(F.q.trim()) chips.push(['q', `“${esc(F.q.trim())}”`]);
  if(F.cat!=='all') chips.push(['cat', catName(F.cat)]);
  if(min!==null) chips.push(['min', `${t('min')} ${money(min)}`]);
  if(max!==null) chips.push(['max', `${t('max')} ${money(max)}`]);
  $('#chips').innerHTML = chips.map(([k,l])=>`<button class="chip" onclick="clearChip('${k}')" aria-label="${t('remove')}: ${l}">${l} ${icon('close',14)}</button>`).join('');
  const fc = $('#fcount'); fc.textContent = num(chips.length); fc.hidden = !chips.length;
  $('#grid').innerHTML = list.length ? list.map(card).join('')
    : `<div class="empty card span-all"><p>${t('noResults')}</p><button class="btn btn-outline" onclick="resetFilters()">${t('clear')}</button></div>`;
}

/* ========== DETAIL ========== */
function renderDetail(id){
  const p = prod(id); if(!p) return renderNotFound();
  const inCart = (state.cart.find(i=>i.id===p.id)||{}).qty || 0;
  const avail = Math.max(0, p.stock - inCart);
  const w = state.wish.includes(p.id);
  const stockCls = p.stock<=0 ? 'out' : (p.stock<=3 ? 'low' : 'ok');
  const stockTxt = p.stock<=0 ? t('outOfStock') : (p.stock<=3 ? t('lowStock',p.stock) : t('inStock',p.stock));
  const related = state.products.filter(x=>x.category===p.category && x.id!==p.id).slice(0,4);
  const d = discountPct(p);
  app.innerHTML = `
  <nav class="crumbs" aria-label="breadcrumb"><a href="#home">${t('home')}</a>${icon('chevR',16)}<a href="#products/${p.category}">${catName(p.category)}</a>${icon('chevR',16)}<span>${esc(pn(p))}</span></nav>
  <div class="pdp">
    <div class="pdp-media card">${img(p,'',false)}${badgesHTML(p)}</div>
    <div class="pdp-info">
      <a href="#products/${p.category}" class="cat-chip">${icon(CAT_ICONS[p.category]||'tag',16)} ${catName(p.category)}</a>
      <h1>${esc(pn(p))}</h1>
      <div class="pdp-price">${priceHTML(p)}${d?`<span class="pill sale">${t('off',d)}</span>`:''}</div>
      <p class="stockline ${stockCls}"><span class="dot-ic"></span>${stockTxt}</p>
      <div class="qty-row"><label for="dq">${t('qty')}</label>
        <div class="stepper"><button type="button" onclick="stepQty(-1)" aria-label="${t('decrease')}" ${avail<=0?'disabled':''}>${icon('minus',18)}</button>
        <input id="dq" type="number" inputmode="numeric" value="${avail>0?1:0}" min="1" max="${avail}" ${avail<=0?'disabled':''} onchange="stepQty(0)">
        <button type="button" onclick="stepQty(1)" aria-label="${t('increase')}" ${avail<=0?'disabled':''}>${icon('plus',18)}</button></div></div>
      ${inCart?`<p class="note">${t('inCart',inCart)} · <a href="#cart">${t('viewCart')}</a></p>`:''}
      <div class="pdp-actions">
        <button class="btn btn-primary btn-lg grow" ${avail<=0?'disabled':''} onclick="addToCart(${p.id}, $('#dq').value, true); renderDetail(${p.id})">${icon('cart',20)} ${p.stock<=0?t('outOfStock'):t('addToCart')}</button>
        <button class="btn btn-outline btn-lg wish-lg ${w?'on':''}" data-wish="${p.id}" onclick="toggleWish(${p.id})" aria-pressed="${w}" aria-label="${t('wishlist')}">${icon('heart',20,w)}<span class="hide-xs">${t('wishlist')}</span></button>
      </div>
      <ul class="perks">
        <li>${icon('truck',20)} ${t('deliveryInfo')}</li>
        <li>${icon('cash',20)} ${t('codInfo')}</li>
        <li>${icon('refresh',20)} ${t('t2')}: ${t('t2d')}</li>
      </ul>
      <div class="pdp-desc"><h2>${t('description')}</h2><p>${esc(pdesc(p))}</p></div>
    </div>
  </div>
  ${related.length?`<section class="section"><div class="sec-head"><h2>${t('related')}</h2><a href="#products/${p.category}" class="see-all">${t('seeAll')} ${icon('chevR',18)}</a></div><div class="rail">${related.map(card).join('')}</div></section>`:''}`;
}
function stepQty(d){
  const el = $('#dq'); const max = Number(el.max)||0;
  let v = (parseInt(toEnDigits(el.value))||1) + d;
  if(v > max){ v = max; toast(t('stockLimit', max), 'err'); }
  el.value = Math.max(1, v);
}

/* ========== CART LOGIC ========== */
function addToCart(id, qty, openDrawer=false){
  const p = prod(id); if(!p || p.stock<=0) return toast(t('outOfStock'),'err');
  qty = Math.max(1, parseInt(toEnDigits(qty))||1);
  const it = state.cart.find(i=>i.id===p.id); const cur = it ? it.qty : 0;
  if(cur + qty > p.stock){ toast(t('stockLimit', p.stock), 'err'); if(cur >= p.stock) return; qty = p.stock - cur; }
  if(it) it.qty += qty; else state.cart.push({id:p.id, qty});
  save('cart'); updateBadges();
  if(openDrawer && page()!=='cart') openPanel('miniCart'); // the drawer itself confirms the add
  else toast(t('added'));
}
function refreshCartViews(){
  updateBadges();
  if($('#miniCart').classList.contains('open')) renderMiniCart();
  if(page()==='cart') renderCart();
}
function changeQty(id, d){
  const it = state.cart.find(i=>i.id===id); const p = prod(id); if(!it||!p) return;
  const nq = it.qty + d;
  if(nq < 1) return;
  if(nq > p.stock) return toast(t('stockLimit', p.stock), 'err');
  it.qty = nq; save('cart'); refreshCartViews();
}
function removeItem(id){ state.cart = state.cart.filter(i=>i.id!==id); save('cart'); refreshCartViews(); }
function cleanCart(){
  let changed = false;
  state.cart = state.cart.filter(i=>{ const p = prod(i.id); if(!p || p.stock<=0){ changed = true; return false; }
    if(i.qty > p.stock){ i.qty = p.stock; changed = true; } return true; });
  if(changed){ save('cart'); updateBadges(); }
  return changed;
}
function totals(){
  const sub = state.cart.reduce((s,i)=>s + prod(i.id).price*i.qty, 0);
  const disc = state.coupon && COUPONS[state.coupon] ? Math.round(sub*COUPONS[state.coupon]/100) : 0;
  const del = state.cart.length ? DELIVERY[state.area] : 0;
  return {sub, disc, del, total: sub - disc + del};
}
function setArea(a){ state.area = a; save('area'); $$('.sum-box').forEach(s=>s.innerHTML = summaryHTML()); }
function applyCoupon(){
  const code = $('#cc').value.trim().toUpperCase();
  if(COUPONS[code]){ state.coupon = code; save('coupon'); toast(t('couponOk', code)); }
  else { toast(t('couponBad'), 'err'); }
  renderCart();
}
function removeCoupon(){ state.coupon = ''; save('coupon'); renderCart(); }
function summaryHTML(){
  const x = totals();
  return `<div class="sumrow"><span>${t('subtotal')}</span><span>${money(x.sub)}</span></div>
  ${x.disc?`<div class="sumrow disc"><span>${t('discount')} (${esc(state.coupon)})</span><span>−${money(x.disc)}</span></div>`:''}
  <div class="sumrow"><span>${t('delivery')} · ${state.area==='inside'?t('insideShort'):t('outsideShort')}</span><span>${money(x.del)}</span></div>
  <div class="sumrow total"><span>${t('total')}</span><span>${money(x.total)}</span></div>`;
}
function areaRadios(){
  return `<div class="opt-grid two">${['inside','outside'].map(a=>`<label class="opt"><input type="radio" name="area" value="${a}" ${state.area===a?'checked':''} onchange="setArea('${a}')"><span>${t(a)}</span></label>`).join('')}</div>`;
}
function stepper(p, qty){
  return `<div class="stepper sm"><button onclick="changeQty(${p.id},-1)" ${qty<=1?'disabled':''} aria-label="${t('decrease')}">${icon('minus',16)}</button><span aria-live="polite">${num(qty)}</span>
    <button onclick="changeQty(${p.id},1)" ${qty>=p.stock?'disabled':''} aria-label="${t('increase')}">${icon('plus',16)}</button></div>`;
}

/* ========== MINI CART DRAWER ========== */
function renderMiniCart(){
  cleanCart();
  const el = $('#miniCart');
  const head = `<div class="drawer-head"><strong>${icon('cart',20)} ${t('miniCartTitle')}</strong><button class="icon-btn" onclick="closePanels()" aria-label="${t('close')}">${icon('close')}</button></div>`;
  if(!state.cart.length){ el.innerHTML = head + `<div class="drawer-body"><div class="empty"><p>${t('cartEmpty')}</p><a href="#products" class="btn btn-primary">${t('allProducts')}</a></div></div>`; return; }
  el.innerHTML = head + `<div class="drawer-body">${state.cart.map(i=>{ const p = prod(i.id); return `<div class="mini-item">
      <a href="#product/${p.id}">${img(p,'mini-img')}</a>
      <div class="mini-info"><a href="#product/${p.id}" class="mini-name">${esc(pn(p))}</a><span class="muted">${money(p.price)}</span>
        <div class="mini-row">${stepper(p, i.qty)}<button class="icon-btn danger" onclick="removeItem(${p.id})" aria-label="${t('remove')}: ${esc(pn(p))}">${icon('trash',18)}</button></div></div>
    </div>`; }).join('')}</div>
    <div class="drawer-foot"><div class="sumrow total"><span>${t('subtotal')}</span><span>${money(totals().sub)}</span></div>
      <div class="drawer-btns"><a href="#cart" class="btn btn-outline">${t('viewCart')}</a><a href="#checkout" class="btn btn-primary">${t('checkout')}</a></div></div>`;
}

/* ========== CART PAGE ========== */
function renderCart(){
  if(cleanCart()) toast(t('stockChanged'), 'err');
  if(!state.cart.length){ app.innerHTML = `<h1 class="page-title">${t('cart')}</h1>` + emptyBox(t('cartEmpty'), '#products', t('allProducts')); updateBadges(); return; }
  app.innerHTML = `<h1 class="page-title">${t('cart')}</h1>
  <div class="layout-2">
    <div class="card list-card">${state.cart.map(i=>{ const p = prod(i.id); return `<div class="citem">
      <a href="#product/${p.id}" class="citem-img">${img(p)}</a>
      <div class="citem-info">
        <div class="citem-top"><div><a href="#product/${p.id}" class="citem-name">${esc(pn(p))}</a>
          <div class="muted small">${catName(p.category)} · ${money(p.price)} ${t('each')}</div></div>
          <button class="icon-btn danger" onclick="removeItem(${p.id})" aria-label="${t('remove')}: ${esc(pn(p))}">${icon('trash',20)}</button></div>
        <div class="citem-bottom">${stepper(p, i.qty)}<strong class="line-total">${money(p.price*i.qty)}</strong></div>
        <div class="muted small">${t('inStock',p.stock)}</div>
      </div></div>`; }).join('')}</div>
    <aside class="card summary sticky">
      <h2>${t('orderSummary')}</h2>
      <div class="fgroup"><span class="label">${t('area')}</span>${areaRadios()}</div>
      ${state.coupon
        ? `<div class="coupon-ok">${icon('check',18)} ${t('couponOk', esc(state.coupon))} <button class="link-btn" onclick="removeCoupon()">${t('removeCoupon')}</button></div>`
        : `<label for="cc" class="label">${t('coupon')}</label><div class="coupon-row"><input id="cc" placeholder="DESHI10" autocomplete="off" onkeydown="if(event.key==='Enter')applyCoupon()"><button class="btn btn-outline" onclick="applyCoupon()">${t('apply')}</button></div>`}
      <div class="sum-box">${summaryHTML()}</div>
      <a href="#checkout" class="btn btn-primary btn-lg btn-block">${t('toCheckout')}</a>
    </aside>
  </div>`;
  updateBadges();
}

/* ========== CHECKOUT ========== */
function renderCheckout(){
  cleanCart();
  if(!state.cart.length){ location.hash = '#cart'; return; }
  const payIcon = {cod:'cash', bkash:'wallet', nagad:'wallet'};
  app.innerHTML = `<h1 class="page-title">${t('checkout')}</h1>
  <div class="layout-2">
    <form class="card form-card" id="cf" novalidate onsubmit="placeOrder(event)">
      <section class="form-sec"><h2><span class="step-no">${num(1)}</span>${t('yourInfo')}</h2>
        <div class="field-grid">
          <div class="field" id="f-name"><label for="cname">${t('name')}</label><input id="cname" autocomplete="name"><div class="err"></div></div>
          <div class="field" id="f-phone"><label for="cphone">${t('phone')}</label><input id="cphone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="01XXXXXXXXX" aria-describedby="phoneHint"><div class="hint" id="phoneHint">${t('phoneHint')}</div><div class="err"></div></div>
        </div></section>
      <section class="form-sec"><h2><span class="step-no">${num(2)}</span>${t('addressStep')}</h2>
        <div class="field" id="f-address"><label for="caddr">${t('address')}</label><textarea id="caddr" rows="3" autocomplete="street-address"></textarea><div class="err"></div></div>
        <div class="fgroup"><span class="label">${t('area')}</span>${areaRadios()}</div></section>
      <section class="form-sec"><h2><span class="step-no">${num(3)}</span>${t('payment')}</h2>
        <div class="opt-grid three">${PAYMENTS.map((m,k)=>`<label class="opt pay-opt pay-${m}"><input type="radio" name="pay" value="${m}" ${k===0?'checked':''} onchange="toggleTrx()">
          <span class="opt-ic">${icon(payIcon[m])}</span><span><strong>${t(m)}</strong><small>${m==='cod'?t('codSub'):t('walletSub')}</small></span></label>`).join('')}</div>
        <div class="field" id="f-trx" hidden><label for="ctrx">${t('trx')}</label><input id="ctrx" maxlength="10" autocomplete="off" aria-describedby="trxHint"><div class="hint" id="trxHint">${t('trxHint')}</div><div class="err"></div></div>
      </section>
      <button class="btn btn-primary btn-lg btn-block" type="submit">${t('placeOrder')}</button>
    </form>
    <aside class="card summary sticky"><h2>${t('orderSummary')}</h2>
      <div class="sum-items">${state.cart.map(i=>{ const p = prod(i.id); return `<div class="sum-item">${img(p)}<span>${esc(pn(p))}<small>× ${num(i.qty)}</small></span><strong>${money(p.price*i.qty)}</strong></div>`; }).join('')}</div>
      <div class="sum-box">${summaryHTML()}</div>
    </aside>
  </div>`;
}
function toggleTrx(){ $('#f-trx').hidden = document.querySelector('input[name=pay]:checked').value==='cod'; }
function setErr(id, msg){ const f = $('#f-'+id); f.classList.toggle('bad', !!msg); f.querySelector('.err').textContent = msg||''; const inp = f.querySelector('input,textarea'); if(inp) inp.setAttribute('aria-invalid', msg?'true':'false'); }
function placeOrder(e){
  e.preventDefault();
  const name = $('#cname').value.trim(), phone = normPhone($('#cphone').value), address = $('#caddr').value.trim();
  const pay = document.querySelector('input[name=pay]:checked').value, trx = $('#ctrx').value.trim().toUpperCase();
  let ok = true;
  const chk = (id, bad, msg)=>{ setErr(id, bad?msg:''); if(bad) ok = false; };
  chk('name', name.length<3, t('errName'));
  chk('phone', !PHONE_RE.test(phone), t('errPhone'));
  chk('address', address.length<10, t('errAddress'));
  chk('trx', pay!=='cod' && !/^[A-Z0-9]{8,10}$/.test(trx), t('errTrx'));
  if(!ok){ const first = document.querySelector('.field.bad input, .field.bad textarea'); if(first) first.focus(); return; }
  if(cleanCart()){ toast(t('stockChanged'),'err'); location.hash = '#cart'; return; }
  const x = totals();
  const order = {
    id: 'DB-' + (Math.max(1000, ...state.orders.map(o=>parseInt(o.id.slice(3))||0)) + 1), date: new Date().toISOString(),
    name, phone, address, area: state.area, payment: pay, trx: pay!=='cod' ? trx : '',
    items: state.cart.map(i=>{ const p = prod(i.id); return {id:p.id, name_en:p.name_en, name_bn:p.name_bn, category:p.category, price:p.price, qty:i.qty}; }),
    subtotal: x.sub, discount: x.disc, coupon: x.disc ? state.coupon : '', delivery: x.del, total: x.total, status: 'Pending'
  };
  order.items.forEach(i=>{ prod(i.id).stock -= i.qty; });
  state.orders.push(order); state.cart = []; state.coupon = '';
  ['orders','cart','coupon','products'].forEach(save);
  location.hash = '#order/' + order.id;
}

/* ========== ORDER CONFIRMATION + INVOICE ========== */
function invoiceHTML(o){
  return `<div class="invoice card">
    <div class="inv-head"><div><div class="logo inv-logo">${$('#logoMark').outerHTML.replace('id="logoMark"','')}<span>${t('brand')}</span></div><div class="muted">${t('invoice')} · ${esc(o.id)}</div></div>
      <div class="inv-meta"><div>${t('date')}: ${fmtDate(o.date)}</div><span class="status s-${o.status}">${stName(o.status)}</span></div></div>
    <div class="inv-cust"><strong>${t('customer')}</strong><br>${esc(o.name)} · ${esc(o.phone)}<br>${esc(o.address)} (${o.area==='inside'?t('insideShort'):t('outsideShort')})<br>
      <strong>${t('paymentLabel')}:</strong> ${t(o.payment)}${o.trx?` · ${t('trxShort')}: ${esc(o.trx)}`:''}</div>
    <div class="table-scroll"><table class="inv-table"><thead><tr><th>${t('item')}</th><th class="num">${t('unit')}</th><th class="num">${t('qty')}</th><th class="num">${t('lineTotal')}</th></tr></thead>
    <tbody>${o.items.map(i=>`<tr><td>${esc(itemName(i))}</td><td class="num">${money(i.price)}</td><td class="num">${num(i.qty)}</td><td class="num">${money(i.price*i.qty)}</td></tr>`).join('')}</tbody></table></div>
    <div class="inv-sum">
      <div class="sumrow"><span>${t('subtotal')}</span><span>${money(o.subtotal)}</span></div>
      ${o.discount?`<div class="sumrow disc"><span>${t('discount')} (${esc(o.coupon)})</span><span>−${money(o.discount)}</span></div>`:''}
      <div class="sumrow"><span>${t('delivery')}</span><span>${money(o.delivery)}</span></div>
      <div class="sumrow total"><span>${t('total')}</span><span>${money(o.total)}</span></div></div>
  </div>`;
}
function renderOrder(id){
  const o = state.orders.find(x=>x.id===id);
  if(!o){ app.innerHTML = emptyBox(t('orderNotFound'), '#track', t('track')); return; }
  app.innerHTML = `<div class="confirm card no-print"><span class="ok-ic">${icon('check',36)}</span><h1>${t('thanks')}</h1>
      <div class="muted">${t('orderNo')}</div><div class="ono">${esc(o.id)}</div><p class="muted">${t('keepNo')}</p>
      <div class="confirm-btns"><button class="btn btn-primary" onclick="window.print()">${icon('print',18)} ${t('printInvoice')}</button>
      <a href="#products" class="btn btn-outline">${t('continueShopping')}</a></div></div>
    ${invoiceHTML(o)}`;
}

/* ========== WISHLIST ========== */
function toggleWish(id){
  const on = !state.wish.includes(id);
  state.wish = on ? [...state.wish, id] : state.wish.filter(x=>x!==id);
  save('wish'); toast(t(on?'wishAdded':'wishRemoved')); updateBadges();
  if(page()==='wishlist') return renderWishlist();
  $$(`[data-wish="${id}"]`).forEach(b=>{
    b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
    const svg = b.querySelector('svg'); if(svg) svg.setAttribute('fill', on?'currentColor':'none');
  });
}
function renderWishlist(){
  state.wish = state.wish.filter(id=>prod(id)); save('wish');
  const list = state.wish.map(prod);
  app.innerHTML = `<h1 class="page-title">${t('wishlist')}</h1>` + (list.length ? `<div class="pgrid wide">${list.map(card).join('')}</div>`
    : emptyBox(t('wishEmpty'), '#products', t('allProducts')));
}

/* ========== TRACK ========== */
let lastTrack = '';
function renderTrack(){
  app.innerHTML = `<div class="narrow"><h1 class="page-title">${t('trackTitle')}</h1>
  <div class="card pad"><p class="muted">${t('trackText')}</p>
  <form class="coupon-row" onsubmit="event.preventDefault();trackSearch()"><input id="tp" type="tel" inputmode="numeric" placeholder="01XXXXXXXXX" aria-label="${t('phone')}" value="${esc(lastTrack)}">
  <button class="btn btn-primary" type="submit">${icon('search',18)} ${t('find')}</button></form></div><div id="tr" aria-live="polite"></div></div>`;
  if(lastTrack) trackSearch();
}
function trackSearch(){
  const ph = normPhone($('#tp').value); lastTrack = $('#tp').value;
  if(!PHONE_RE.test(ph)){ $('#tr').innerHTML = `<p class="err pad-top">${t('errPhone')}</p>`; return; }
  const list = state.orders.filter(o=>o.phone===ph).reverse();
  if(!list.length){ $('#tr').innerHTML = emptyBox(t('noOrders')); return; }
  const flow = STATUSES.slice(0,4);
  $('#tr').innerHTML = list.map(o=>{ const idx = flow.indexOf(o.status);
    return `<div class="card pad track-card">
      <div class="row-between"><strong>${esc(o.id)}</strong><span class="status s-${o.status}">${stName(o.status)}</span></div>
      <div class="muted small">${fmtDate(o.date)} · ${o.items.map(i=>esc(itemName(i))+' × '+num(i.qty)).join(', ')}</div>
      ${o.status==='Cancelled' ? '' : `<ol class="timeline">${flow.map((s,k)=>`<li class="${k<=idx?'done':''}"><span class="tl-dot">${k<=idx?icon('check',14):''}</span><span>${stName(s)}</span></li>`).join('')}</ol>`}
      <div class="row-between"><strong>${t('total')}: ${money(o.total)}</strong><a href="#order/${encodeURIComponent(o.id)}" class="btn btn-ghost btn-sm">${t('invoice')}</a></div>
    </div>`; }).join('');
}

/* ========== ADMIN ========== */
function renderAdmin(tab='dashboard'){
  const tabs = [['dashboard','chart',t('dashboard')],['products','tag',t('manageProducts')],['orders','box',t('orders')]];
  if(!tabs.some(x=>x[0]===tab)) tab = 'dashboard';
  app.innerHTML = `<div class="admin">
    <aside class="admin-side"><div class="admin-title">${icon('shield',20)} ${t('admin')}</div>
      <nav class="admin-nav">${tabs.map(([k,ic,l])=>`<a href="#admin/${k}" class="${tab===k?'active':''}" ${tab===k?'aria-current="page"':''}>${icon(ic,20)} ${l}</a>`).join('')}</nav>
      <a href="#home" class="admin-back">${icon('arrowL',18)} ${t('adminBack')}</a></aside>
    <section class="admin-main" id="adm"></section></div>`;
  ({dashboard:adminDashboard, products:adminProducts, orders:adminOrders})[tab]();
}
function adminDashboard(){
  const valid = state.orders.filter(o=>o.status!=='Cancelled');
  const sales = valid.reduce((s,o)=>s+o.total, 0);
  const pending = state.orders.filter(o=>o.status==='Pending').length;
  const catSales = CATS.map(c=>({c, v: valid.reduce((s,o)=>s+o.items.filter(i=>i.category===c).reduce((a,i)=>a+i.price*i.qty,0),0)}));
  const maxV = Math.max(1, ...catSales.map(x=>x.v));
  const low = state.products.filter(p=>p.stock<=3);
  const recent = [...state.orders].reverse().slice(0,5);
  const stats = [['cash','green',money(sales),t('totalSales')],['box','indigo',num(state.orders.length),t('totalOrders')],
                 ['clock','amber',num(pending),t('pendingOrders')],['tag','red',num(state.products.length),t('productsCount')]];
  $('#adm').innerHTML = `<h1 class="page-title">${t('dashboard')}</h1>
  <div class="stats">${stats.map(([ic,c,v,l])=>`<div class="stat card"><span class="stat-ic ${c}">${icon(ic)}</span><div><strong>${v}</strong><span>${l}</span></div></div>`).join('')}</div>
  <div class="dash-grid">
    <div class="card pad"><h2>${t('salesByCat')}</h2>
      <div class="bars" role="img" aria-label="${t('salesByCat')}: ${catSales.map(x=>catName(x.c)+' '+money(x.v)).join(', ')}">${catSales.map(x=>`<div class="bar-row">
        <span class="bar-label">${catName(x.c)}</span><div class="bar-track"><div class="bar-fill" style="width:${(x.v/maxV*100).toFixed(1)}%;background:${CAT_COLORS[x.c]}"></div></div>
        <strong class="bar-val">${money(x.v)}</strong></div>`).join('')}</div>
      <p class="muted small">${t('salesNote')}</p></div>
    <div class="card pad"><h2>${t('lowStockTitle')}</h2>
      ${low.length ? `<ul class="plain-list">${low.map(p=>`<li>${img(p,'thumb')}<span>${esc(pn(p))}</span><span class="pill ${p.stock?'low':'out'}">${num(p.stock)}</span></li>`).join('')}</ul>` : `<p class="muted">${t('none')}</p>`}</div>
    <div class="card pad span-2"><div class="row-between"><h2>${t('recentOrders')}</h2><a href="#admin/orders" class="see-all">${t('seeAll')} ${icon('chevR',18)}</a></div>
      <ul class="plain-list">${recent.map(o=>`<li><strong>${esc(o.id)}</strong><span class="muted grow">${esc(o.name)}</span><span>${money(o.total)}</span><span class="status s-${o.status}">${stName(o.status)}</span></li>`).join('')}</ul></div>
  </div>`;
}
function adminProducts(){
  $('#adm').innerHTML = `<div class="row-between page-head"><h1 class="page-title">${t('manageProducts')} <span class="muted">(${num(state.products.length)})</span></h1>
    <button class="btn btn-primary" onclick="openProductForm()">${icon('plus',18)} ${t('addProduct')}</button></div>
  <div class="card table-card"><table class="rtable"><thead><tr><th>${t('item')}</th><th>${t('category')}</th><th class="num">${t('price')}</th><th class="num">${t('stock')}</th><th>${t('actions')}</th></tr></thead>
  <tbody>${state.products.map(p=>`<tr>
    <td data-label="${t('item')}" class="cell-main"><div class="prod-cell">${img(p,'thumb')}<div><strong>${esc(p.name_bn)}</strong><br><span class="muted small">${esc(p.name_en)}</span></div></div></td>
    <td data-label="${t('category')}">${catName(p.category)}</td>
    <td data-label="${t('price')}" class="num"><div>${money(p.price)}${discountPct(p)?`<br><s class="muted small">${money(p.old_price)}</s>`:''}</div></td>
    <td data-label="${t('stock')}" class="num"><span class="${p.stock<=0?'txt-red':p.stock<=3?'txt-amber':''}">${num(p.stock)}</span></td>
    <td data-label="${t('actions')}"><div class="btn-row"><button class="btn btn-outline btn-sm" onclick="openProductForm(${p.id})">${icon('edit',16)} ${t('edit')}</button>
      <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">${icon('trash',16)} ${t('delete')}</button></div></td></tr>`).join('')}</tbody></table></div>`;
}
function openProductForm(id){
  const p = id ? prod(id) : {name_en:'',name_bn:'',category:'Clothing',price:'',old_price:'',stock:'',image:'',desc_en:'',desc_bn:''};
  const isArt = String(p.image||'').startsWith('art:');
  const f = (key,label,type='text',extra='')=>`<div class="field" id="f-${key}"><label for="p-${key}">${label}</label><input id="p-${key}" type="${type}" value="${esc(p[key] ?? '')}" ${extra}><div class="err"></div></div>`;
  $('#modalRoot').innerHTML = `<div class="modal-overlay" onclick="if(event.target===this)closeModal()"><form class="modal" novalidate onsubmit="saveProduct(event, ${id||0})" role="dialog" aria-modal="true" aria-labelledby="mTitle">
    <div class="modal-head"><h2 id="mTitle">${id?t('editProduct'):t('addProduct')}</h2><button type="button" class="icon-btn" onclick="closeModal()" aria-label="${t('close')}">${icon('close')}</button></div>
    <div class="modal-body">
      <div class="field-grid">${f('name_en',t('nameEn'))}${f('name_bn',t('nameBn'))}</div>
      <div class="field-grid"><div class="field"><label for="p-category">${t('category')}</label><select id="p-category">${CATS.map(c=>`<option value="${c}" ${p.category===c?'selected':''}>${catName(c)}</option>`).join('')}</select></div>
        ${f('stock',t('stock'),'number','min="0" inputmode="numeric"')}</div>
      <div class="field-grid">${f('price',t('price'),'number','min="1" inputmode="numeric"')}${f('old_price',t('oldPrice'),'number','min="1" inputmode="numeric"')}</div>
      <div class="field" id="f-image"><label for="p-image">${t('image')}</label>
        <input id="p-image" type="url" value="${isArt||String(p.image||'').startsWith('data:')?'':esc(p.image)}" placeholder="https://">
        ${isArt?`<div class="hint">${t('imageHint')}</div>`:''}<div class="err"></div></div>
      <div class="field"><label for="p-desc_en">${t('descEn')}</label><textarea id="p-desc_en" rows="2">${esc(p.desc_en)}</textarea></div>
      <div class="field"><label for="p-desc_bn">${t('descBn')}</label><textarea id="p-desc_bn" rows="2">${esc(p.desc_bn)}</textarea></div>
    </div>
    <div class="modal-foot"><button type="button" class="btn btn-outline" onclick="closeModal()">${t('cancel')}</button><button class="btn btn-primary" type="submit">${t('save')}</button></div>
  </form></div>`;
  document.body.classList.add('lock');
  $('#p-name_en').focus();
}
function closeModal(){ const m = $('#modalRoot'); if(m && m.innerHTML){ m.innerHTML = ''; if(!$('#scrim').classList.contains('show')) document.body.classList.remove('lock'); } }
function saveProduct(e, id){
  e.preventDefault();
  const v = k => $('#p-'+k).value.trim();
  const data = {name_en:v('name_en'), name_bn:v('name_bn'), category:v('category'), image:v('image'),
    price:Number(toEnDigits(v('price'))), stock:Number(toEnDigits(v('stock'))), desc_en:v('desc_en'), desc_bn:v('desc_bn')};
  const op = v('old_price')==='' ? '' : Number(toEnDigits(v('old_price')));
  let ok = true; const chk = (k,bad,msg)=>{ setErr(k, bad?msg:''); if(bad) ok = false; };
  chk('name_en', !data.name_en, t('errRequired'));
  chk('name_bn', !data.name_bn, t('errRequired'));
  chk('price', !(data.price>0), t('errPrice'));
  chk('stock', v('stock')==='' || !(Number.isInteger(data.stock) && data.stock>=0), t('errStock'));
  chk('old_price', op!=='' && !(op > data.price), t('errOldPrice'));
  if(!ok) return;
  data.old_price = op;
  if(!data.image) data.image = (id && (prod(id).image||'').startsWith('art:')) ? prod(id).image : ''; // blank keeps the built-in illustration; otherwise the category illustration is shown
  if(id){ Object.assign(prod(id), data); }
  else { data.id = Math.max(0, ...state.products.map(p=>p.id)) + 1; data.added = Date.now(); state.products.push(data); }
  save('products'); closeModal(); toast(t('productSaved')); adminProducts();
}
function deleteProduct(id){
  const p = prod(id); if(!confirm(t('confirmDelete', pn(p)))) return;
  state.products = state.products.filter(x=>x.id!==id);
  state.cart = state.cart.filter(i=>i.id!==id); state.wish = state.wish.filter(x=>x!==id);
  ['products','cart','wish'].forEach(save); updateBadges(); toast(t('productDeleted')); adminProducts();
}
function adminOrders(){
  if(!state.orders.length){ $('#adm').innerHTML = `<h1 class="page-title">${t('orders')}</h1>` + emptyBox(t('noOrdersYet')); return; }
  $('#adm').innerHTML = `<div class="row-between page-head"><h1 class="page-title">${t('orders')} <span class="muted">(${num(state.orders.length)})</span></h1>
    <button class="btn btn-outline" onclick="exportCSV()">${icon('download',18)} ${t('exportCsv')}</button></div>
  <div class="card table-card"><table class="rtable"><thead><tr><th>${t('orderNo')}</th><th>${t('date')}</th><th>${t('customer')}</th><th>${t('items')}</th><th class="num">${t('total')}</th><th>${t('paymentLabel')}</th><th>${t('status')}</th><th><span class="sr-only">${t('view')}</span></th></tr></thead>
  <tbody>${[...state.orders].reverse().map(o=>`<tr>
    <td data-label="${t('orderNo')}" class="cell-main"><div><strong>${esc(o.id)}</strong>${o.sample?` <span class="pill sample">${t('sample')}</span>`:''}</div></td>
    <td data-label="${t('date')}" class="nowrap">${fmtDate(o.date)}</td>
    <td data-label="${t('customer')}"><div>${esc(o.name)}<br><span class="muted small">${esc(o.phone)} · ${o.area==='inside'?t('insideShort'):t('outsideShort')}</span></div></td>
    <td data-label="${t('items')}"><div>${o.items.map(i=>esc(itemName(i))+' × '+num(i.qty)).join('<br>')}</div></td>
    <td data-label="${t('total')}" class="num"><strong>${money(o.total)}</strong></td>
    <td data-label="${t('paymentLabel')}"><div>${t(o.payment)}${o.trx?`<br><span class="muted small">${t('trxShort')}: ${esc(o.trx)}</span>`:''}</div></td>
    <td data-label="${t('status')}"><select class="status-select s-${o.status}" onchange="setStatus('${o.id}', this.value, this)" aria-label="${t('status')} ${esc(o.id)}">${STATUSES.map(s=>`<option value="${s}" ${o.status===s?'selected':''}>${stName(s)}</option>`).join('')}</select></td>
    <td data-label="${t('invoice')}"><a href="#order/${encodeURIComponent(o.id)}" class="btn btn-ghost btn-sm">${t('view')}</a></td></tr>`).join('')}</tbody></table></div>`;
}
function exportCSV(){
  // Free-text cells: quote, and neutralise leading = + - @ so a spreadsheet never runs them as formulas
  const cell = v => { if(v && v.raw) return v.raw; let s = String(v ?? ''); if(/^[=+\-@\t\r]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g,'""') + '"'; };
  const pad = n => String(n).padStart(2,'0');
  const stamp = iso => { const d = new Date(iso); return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const rows = [t('csvHead'), ...state.orders.map(o=>[
    o.id, stamp(o.date), o.name,
    {raw: ['"=', o.phone, '"'].join('""')}, // phone is validated digits only; ="017..." keeps the leading 0 in Excel
    o.address, o.area==='inside'?t('insideShort'):t('outsideShort'), t(o.payment), o.trx,
    o.items.map(i=>`${itemName(i)} x ${i.qty}`).join('; '),
    o.subtotal, o.discount, o.coupon, o.delivery, o.total, stName(o.status)
  ])];
  const csv = '\uFEFF' + rows.map(r=>r.map(cell).join(',')).join('\r\n'); // BOM so Excel shows Bangla correctly
  const url = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8'}));
  const a = document.createElement('a'); a.href = url;
  a.download = `deshi-bazar-orders-${stamp(new Date().toISOString()).slice(0,10)}.csv`;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url), 1000);
  toast(t('csvDone'));
}
function setStatus(id, ns, sel){
  const o = state.orders.find(x=>x.id===id); const old = o.status; if(old===ns) return;
  if(!o.sample){ // sample orders never reduced stock, so they never restore or re-deduct it
    if(ns==='Cancelled'){ o.items.forEach(i=>{ const p = prod(i.id); if(p) p.stock += i.qty; }); }
    else if(old==='Cancelled'){
      if(o.items.some(i=>{ const p = prod(i.id); return !p || p.stock < i.qty; })){ toast(t('reopenFail'),'err'); sel.value = old; return; }
      o.items.forEach(i=>{ prod(i.id).stock -= i.qty; });
    }
  }
  o.status = ns; save('orders'); save('products'); toast(t('statusUpdated'));
  if(sel && sel.classList){ sel.className = 'status-select s-'+ns; }
}

/* ========== GLOBAL EVENTS & START ========== */
window.addEventListener('hashchange', ()=>{ route(); window.scrollTo(0,0); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ closeModal(); closePanels(); closeSugg(); } });
document.addEventListener('click', e=>{ if(!e.target.closest('.search')) closeSugg(); });
function onScroll(){ const h = $('#hdr'); h.classList.toggle('scrolled', window.scrollY > 8); document.documentElement.style.setProperty('--hdr-h', h.offsetHeight + 'px'); }
window.addEventListener('scroll', onScroll, {passive:true});
window.addEventListener('resize', ()=>{ onScroll(); if(window.innerWidth >= 1024 && $('#filterPanel') && $('#filterPanel').classList.contains('open')) closePanels(); });
route(); onScroll();
