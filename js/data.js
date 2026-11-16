/* ==========================================================
   data.js  —  EDIT THIS FILE to add universities, photos, FAQs.
   The home page builds its cards, gallery and finder from here.
   All fees below are SAMPLE placeholders in RM (used only by the cost estimator): replace with real numbers.
   ========================================================== */

window.SITE = {
  brand: "Bangladesh to Malaysia Study Guide",
  tagline: "Digital Agency",
  hotline: "+60 16-552 8482",         // Public contact number
  whatsappNumber: "60165528482",      // Country code + number, digits only (Malaysia: 60 + number without leading 0)
  email: ""                            // Add your business email
};

window.UNIVERSITIES = [
  {
    id: "nottingham",
    city: "kl",
    photos: [],   // add more campus photos here, e.g. { src: "images/x.jpg", cap: "Library" }
    name: "University of Nottingham Malaysia",
    short: "Nottingham",
    img: "images/nottingham.webp",
    location: "Semenyih, Selangor",
    tag: "UK-heritage degree",
    badge: "Branch campus",
    fields: ["engineering", "business", "science"],
    levels: ["bachelor", "master", "phd"],
    blurb: "A UK university campus set in green surroundings, offering British-style degrees with a strong research culture.",
    highlights: ["British curriculum", "Research-led teaching", "Large green campus"],
    // sample annual tuition range in USD [min, max] per level
    fees: { foundation: [0, 0], bachelor: [36000, 48000], master: [44000, 60000], phd: [32000, 48000] }
  },
  {
    id: "xiamen",
    city: "kl",
    photos: [],   // add more campus photos here, e.g. { src: "images/x.jpg", cap: "Library" }
    name: "Xiamen University Malaysia",
    short: "Xiamen",
    img: "images/xiamen.jpg",
    location: "Sepang, Selangor",
    tag: "China–Malaysia flagship",
    badge: "Branch campus",
    fields: ["engineering", "business", "it", "science"],
    levels: ["foundation", "bachelor", "master", "phd"],
    blurb: "An overseas campus of a leading Chinese university with a striking modern campus and a growing international community.",
    highlights: ["Modern campus", "Chinese & Malaysian culture", "Wide range of programmes"],
    fees: { foundation: [12000, 18000], bachelor: [20000, 30000], master: [26000, 36000], phd: [24000, 36000] }
  },
  {
    id: "city",
    city: "kl",
    photos: [],   // add more campus photos here, e.g. { src: "images/x.jpg", cap: "Library" }
    name: "City University Malaysia",
    short: "City University",
    img: "images/city.webp",
    location: "Selangor",
    tag: "Focus on employability",
    badge: "Private university",
    fields: ["business", "it", "arts", "health"],
    levels: ["foundation", "bachelor", "master", "phd"],
    blurb: "A career-focused private university with practical programmes and a student-friendly environment.",
    highlights: ["Career-focused courses", "Flexible intakes", "Affordable pathways"],
    fees: { foundation: [10000, 14000], bachelor: [14000, 24000], master: [18000, 28000], phd: [20000, 32000] }
  },
  {
    id: "iium",
    city: "kl",
    photos: [],   // add more campus photos here, e.g. { src: "images/x.jpg", cap: "Library" }
    name: "International Islamic University Malaysia",
    short: "IIUM",
    img: "images/iium.webp",
    location: "Gombak, Selangor",
    tag: "Global Islamic university",
    badge: "Public university",
    fields: ["arts", "business", "health", "engineering", "it"],
    levels: ["bachelor", "master", "phd"],
    blurb: "A public university with an international student body and a campus nestled against forested hills.",
    highlights: ["International community", "Scenic hillside campus", "Broad subject range"],
    fees: { foundation: [0, 0], bachelor: [14000, 26000], master: [18000, 30000], phd: [20000, 32000] }
  },
  {
    id: "taylors",
    city: "kl",
    photos: [],   // add more campus photos here, e.g. { src: "images/x.jpg", cap: "Library" }
    name: "Taylor's University",
    short: "Taylor's",
    img: "images/taylors.webp",
    location: "Subang Jaya, Selangor",
    tag: "Lakeside campus",
    badge: "Private university",
    fields: ["business", "arts", "health", "engineering", "it"],
    levels: ["foundation", "bachelor", "master", "phd"],
    blurb: "A well-known private university with a lakeside campus, strong industry links and a vibrant student life.",
    highlights: ["Lakeside campus", "Industry links", "Vibrant student life"],
    fees: { foundation: [16000, 24000], bachelor: [28000, 44000], master: [32000, 48000], phd: [32000, 48000] }
  },
  {
    id: "lsbf",
    city: "kl",
    photos: [],   // add more campus photos here, e.g. { src: "images/x.jpg", cap: "Library" }
    name: "LSBF College Malaysia",
    short: "LSBF",
    img: "images/lsbf.webp",
    imgPos: "50% 85%",
    location: "Jalan Hang Lekiu, Kuala Lumpur",
    tag: "City-centre college",
    badge: "Private college",
    fields: ["business", "it", "arts", "engineering", "health"],
    levels: ["foundation", "bachelor"],
    blurb: "A private college in the centre of Kuala Lumpur, part of the Global University Systems network, with foundation, diploma and degree pathways.",
    highlights: ["Central Kuala Lumpur location", "Part of the Global University Systems network", "Foundation, diploma and degree pathways"],
    fees: { foundation: [10000, 16000], bachelor: [20000, 32000], master: [0, 0], phd: [0, 0] }
  },
  {
    id: "ucsi",
    city: "kl",
    photos: [],   // add more campus photos here, e.g. { src: "images/x.jpg", cap: "Library" }
    name: "UCSI University",
    short: "UCSI",
    img: "images/ucsi.webp",
    location: "Cheras, Kuala Lumpur",
    tag: "Flagship Cheras campus",
    badge: "Private university",
    fields: ["business", "engineering", "it", "health", "arts", "science"],
    levels: ["foundation", "bachelor", "master", "phd"],
    blurb: "A private university that began as Sedaya College in 1986, with its flagship campus in Cheras, Kuala Lumpur and a large international student community.",
    highlights: ["Students from over 100 countries", "Foundation to PhD programmes", "Also campuses in Kuching and Seremban"],
    fees: { foundation: [14000, 22000], bachelor: [28000, 45000], master: [24000, 36000], phd: [20000, 32000] }
  },
  {
    id: "segi",
    city: "kl",
    photos: [],   // add more campus photos here, e.g. { src: "images/x.jpg", cap: "Library" }
    name: "SEGi University",
    short: "SEGi",
    img: "images/segi.webp",
    location: "Kota Damansara, Selangor",
    tag: "Large private university",
    badge: "Private university",
    fields: ["business", "engineering", "it", "health", "arts", "science"],
    levels: ["foundation", "bachelor", "master", "phd"],
    blurb: "One of Malaysia's larger private universities, with its flagship campus in Kota Damansara and faculties ranging from business to medicine.",
    highlights: ["Established in 1977", "Students from over 90 countries", "Faculties from business to medicine"],
    fees: { foundation: [10000, 18000], bachelor: [24000, 40000], master: [22000, 34000], phd: [20000, 32000] }
  }
];

/* Daily photo drop: add new images here, they appear in the gallery. */
window.GALLERY = [
  { src: "images/kuala-lumpur.webp", w: 1000, h: 1000, cap: "Petronas Twin Towers at sunset", cat: "city" },
  { src: "images/kl-skyline.webp", w: 698, h: 465, cap: "Kuala Lumpur skyline at golden hour", cat: "city" },
  { src: "images/kl-merdeka118.jpg", w: 356, h: 490, cap: "Merdeka 118, Kuala Lumpur", cat: "city" },
  { src: "images/kl-wilayah-mosque.jpg", w: 387, h: 516, cap: "Wilayah Persekutuan Mosque, Kuala Lumpur", cat: "city" },
  { src: "images/kl-bukit-bintang.jpg", w: 612, h: 408, cap: "KL Monorail above a busy city street", cat: "city" },
  { src: "images/putrajaya-putra-mosque.jpg", w: 500, h: 400, cap: "Putra Mosque and Putrajaya Lake", cat: "city" },
  { src: "images/penang-kek-lok-si.webp", w: 800, h: 533, cap: "Kek Lok Si Temple, Penang", cat: "city" },
  { src: "images/nottingham.webp", w: 1400, h: 932, cap: "University of Nottingham Malaysia", cat: "campus" },
  { src: "images/xiamen.jpg", w: 1400, h: 934, cap: "Xiamen University Malaysia at dusk", cat: "campus" },
  { src: "images/city.webp", w: 900, h: 506, cap: "City University Malaysia", cat: "campus" },
  { src: "images/iium.webp", w: 1200, h: 674, cap: "IIUM campus & hills", cat: "campus" },
  { src: "images/taylors.webp", w: 740, h: 492, cap: "Taylor's University lakeside", cat: "campus" },
  { src: "images/lsbf.webp", w: 493, h: 621, cap: "LSBF College, Kuala Lumpur", cat: "campus" },
  { src: "images/ucsi.webp", w: 580, h: 510, cap: "UCSI University, Cheras", cat: "campus" },
  { src: "images/segi.webp", w: 720, h: 394, cap: "SEGi University, Kota Damansara", cat: "campus" }
];

/* Student cities. */
window.CITIES = [
  {
    id: "kl", name: "Kuala Lumpur", tag: "The vibrant capital", badge: "Klang Valley",
    about: "Malaysia's capital and largest city: a modern, multicultural metropolis of towers, malls, parks and street food.",
    photos: [
      { src: "images/kl-skyline.webp", w: 698, h: 465, cap: "Kuala Lumpur skyline at golden hour" },
      { src: "images/kl-merdeka118.jpg", w: 356, h: 490, cap: "Merdeka 118, one of the world's tallest buildings" },
      { src: "images/kl-wilayah-mosque.jpg", w: 387, h: 516, cap: "Wilayah Persekutuan Mosque" },
      { src: "images/kl-bukit-bintang.jpg", w: 612, h: 408, cap: "KL Monorail above a busy city street" }
    ],
    facts: [["🚝", "Easy to get around", "Monorail, LRT and MRT trains link much of the city"], ["🏙️", "Famous skyline", "Petronas Twin Towers, KL Tower and Merdeka 118"], ["🕌", "Mixed cultures", "Mosques, temples and heritage streets side by side"]],
    unis: ["nottingham", "xiamen", "city", "iium", "taylors", "lsbf", "ucsi", "segi"],
    note: "Our featured campuses are in Kuala Lumpur and Selangor, the state around it."
  },
  {
    id: "putrajaya", name: "Putrajaya", tag: "The planned garden city", badge: "Federal capital",
    about: "Malaysia's planned administrative capital, built around a lake with wide boulevards, bridges and gardens, about 25 km south of Kuala Lumpur.",
    photos: [{ src: "images/putrajaya-putra-mosque.jpg", w: 500, h: 400, cap: "Putra Mosque and Putrajaya Lake" }],
    facts: [["🌳", "Green and calm", "Parks, lakeside paths and open space"], ["🕌", "Landmark mosque", "The pink-domed Putra Mosque on the lake"], ["💻", "Next to Cyberjaya", "A neighbouring technology hub"]],
    unis: [],
    note: "Ask a counsellor about courses and campuses near Putrajaya and current living costs."
  },
  {
    id: "penang", name: "Penang", tag: "Heritage, food and hills", badge: "Northern island state",
    about: "An island state in the north-west, known for the heritage of George Town and some of Malaysia's best-loved street food.",
    photos: [{ src: "images/penang-kek-lok-si.webp", w: 800, h: 533, cap: "Kek Lok Si Temple, Penang" }],
    facts: [["🏛️", "UNESCO heritage", "George Town is a World Heritage site"], ["🍜", "Food capital", "Famous for hawker food"], ["🛕", "Kek Lok Si", "One of Malaysia's largest Buddhist temples"]],
    unis: [],
    note: "None of our featured campuses are in Penang yet. Ask us about Penang options."
  }
];

/* Typical monthly spending by category (RM per month). */
window.COSTCATS = [
  { icon: "🏠", name: "Accommodation", rm: 150 },
  { icon: "🍛", name: "Food & groceries", rm: 150 },
  { icon: "🚆", name: "Transport", rm: 25 },
  { icon: "📶", name: "Utilities & internet", rm: 25 },
  { icon: "🛍️", name: "Personal", rm: 100 }
];

window.FIELDS = {
  engineering: "Engineering & Technology",
  business: "Business & Management",
  it: "IT & Computer Science",
  health: "Health & Medicine",
  arts: "Arts, Law & Social Sciences",
  science: "Science & Research"
};

window.FAQS = [
  { q: "Do I have to pay your agency for counselling?", a: "We explain our support and any applicable service charges before you decide to proceed. University tuition, application charges, visa processing, medical checks and other third-party costs are separate and should be confirmed for your chosen course." },
  { q: "How long does admission take?", a: "Timelines depend on the university, programme, intake and whether your documents are complete. Ask a counsellor to check the current processing estimate for your preferred university." },
  { q: "Can I study without IELTS?", a: "Some Malaysian universities and programmes may accept alternative English-language evidence or an exemption, while others require a recognised test. The rule depends on your previous education and chosen programme, so confirm it before applying." },
  { q: "Can international students work part-time?", a: "Only in limited cases. EMGS states that students may work up to 20 hours a week during semester breaks or holidays longer than 7 days, in certain sectors such as restaurants, petrol kiosks, mini markets and hotels, with prior approval from the Immigration Department arranged through the institution. Rules can change, so confirm the latest position before planning around it, and do not rely on part-time work to pay tuition." },
  { q: "What are the living costs in Malaysia?", a: "A simple starting budget is about RM 450 a month: accommodation RM 150, food RM 150, transport RM 25, utilities and internet RM 25 and personal spending RM 100. Your own costs depend on the city, housing and lifestyle, so ask a counsellor for a budget based on the campus you are considering." }
];
