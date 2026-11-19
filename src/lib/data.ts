export const PHONE = "+91 90921 14630";
export const PHONE_TEL = "tel:+919092114630";
export const WHATSAPP = "https://wa.me/919092114630";

export const NAV: { id: string; label: string; route?: string }[] = [
  { id: "home", label: "Home" },
  { id: "elements", label: "Five elements" },
  { id: "generations", label: "Generations" },
  { id: "shop", label: "Shop", route: "/shop" },
  { id: "pongal", label: "Pongal combo" },
  { id: "sellers", label: "Sellers" },
  { id: "contact", label: "Contact" },
];

/* Section links work on the home page as anchors and from every other page as /#id. */
export const navHref = (n: { id: string; route?: string }, onHome: boolean) =>
  n.route ?? (onHome ? `#${n.id}` : `/#${n.id}`);

export const DELIVERY_FEE = 50;

export type Element = {
  ta: string;
  en: string;
  line: string;
  img: string;
  pos?: string;
};

export const ELEMENTS: Element[] = [
  { ta: "நிலம்", en: "Earth", line: "Red soil that grows native paddy and millets.", img: "/images/photos/el-nilam.webp", pos: "50% 60%" },
  { ta: "நீர்", en: "Water", line: "River and rain water, never chemical run-off.", img: "/images/photos/el-neer.webp", pos: "50% 62%" },
  { ta: "நெருப்பு", en: "Fire", line: "The Pongal fire, slow-melted ghee and sun-set karupatti.", img: "/images/photos/el-neruppu.webp", pos: "50% 45%" },
  { ta: "காற்று", en: "Air", line: "Grain dried and winnowed in open wind.", img: "/images/photos/el-kaatru.webp", pos: "50% 40%" },
  { ta: "ஆகாயம்", en: "Sky", line: "Rain-fed fields under an open sky.", img: "/images/photos/el-aakaayam.webp", pos: "50% 50%" },
];

export type Generation = {
  ta: string;
  en: string;
  line: string;
  imgs: { src: string; alt: string; pos?: string }[];
  filter: string;
};

/* Colour fades to sepia as we go further back in time. */
export const GENERATIONS: Generation[] = [
  {
    ta: "தாய் தந்தை",
    en: "Mother & father",
    line: "What parents cook today decides the health of the next seven generations.",
    imgs: [{ src: "/images/photos/hero-family.webp", alt: "Tamil parents in veshti and silk saree with their child at a family pooja", pos: "50% 40%" }],
    filter: "none",
  },
  {
    ta: "தாத்தா பாட்டி",
    en: "Grandfather & grandmother",
    line: "Paati's kitchen: karupatti, nallennai and rice cooked slow.",
    imgs: [{ src: "/images/photos/gen2-paati-grandchild.webp", alt: "Grandmother in an orange saree holding her laughing grandchild", pos: "50% 30%" }],
    filter: "none",
  },
  {
    ta: "பாட்டன் பாட்டி",
    en: "Great-grandparents",
    line: "Their hands sowed native paddy, never chemicals.",
    imgs: [
      { src: "/images/photos/gen3-thatha.webp", alt: "Village grandfather with an orange thundu over his shoulders", pos: "55% 35%" },
      { src: "/images/photos/gen3-paati.webp", alt: "Grandmother smiling in front of green paddy fields", pos: "50% 35%" },
    ],
    filter: "saturate(0.8) sepia(0.15)",
  },
  {
    ta: "பூட்டன் பூட்டி",
    en: "Great-great-grandparents",
    line: "Millets, greens and cold-pressed oil kept them strong into old age.",
    imgs: [
      { src: "/images/photos/gen4-thatha.webp", alt: "Elderly man with a checked towel over his shoulders", pos: "50% 25%" },
      { src: "/images/photos/gen4-paati.webp", alt: "Elderly Tamil woman with a pottu and blue saree", pos: "50% 30%" },
    ],
    filter: "sepia(0.5) saturate(0.75)",
  },
  {
    ta: "ஓட்டன் ஓட்டி",
    en: "Five generations back",
    line: "Food was medicine. Every spice in the box had a purpose.",
    imgs: [
      { src: "/images/photos/gen5-thatha.webp", alt: "Portrait of a very old village man", pos: "50% 30%" },
      { src: "/images/photos/gen5-paati.webp", alt: "Old grandmother laughing outside her house", pos: "45% 40%" },
    ],
    filter: "grayscale(1) sepia(0.55)",
  },
  {
    ta: "சேயோன் சேயோள்",
    en: "Six generations back",
    line: "They saved the seeds and passed them on, hand to hand.",
    imgs: [{ src: "/images/photos/gen6-hands.webp", alt: "Old hands sifting rice in a steel sieve", pos: "50% 50%" }],
    filter: "grayscale(1) sepia(0.7) contrast(0.95)",
  },
  {
    ta: "பரன் பரை",
    en: "Our first forebears",
    line: "Where it began: the land, the sun and the palmyra.",
    imgs: [{ src: "/images/photos/gen7-palmyra-sun.webp", alt: "Palmyra palms silhouetted against the rising sun", pos: "50% 50%" }],
    filter: "sepia(0.35)",
  },
];

export type Category = {
  cat: string;
  en: string;
  ta: string;
  img: string;
  meta: string;
};

export const CATEGORIES: Category[] = [
  { cat: "rice", en: "Traditional rice", ta: "பாரம்பரிய அரிசி", img: "/images/site/Parambariya-Arisi-Vagaigal.webp", meta: "From ₹165 · 17 items" },
  { cat: "pulses", en: "Lentils & pulses", ta: "பருப்பு வகைகள்", img: "/images/products/Kadalai-Paruppu.webp", meta: "12 items" },
  { cat: "health-mixes", en: "Health mixes", ta: "ஆரோக்கிய மாவுகள்", img: "/images/products/Kali-Kanji-Maavu.webp", meta: "9 items" },
  { cat: "millets", en: "Millets", ta: "சிறுதானியங்கள்", img: "/images/products/Samai-Arisi.webp", meta: "7 items" },
  { cat: "sweeteners", en: "Natural sweeteners", ta: "இயற்கை இனிப்புகள்", img: "/images/site/Karuppatti.webp", meta: "From ₹98 · 5 items" },
  { cat: "masala", en: "Masala & powders", ta: "மசாலா பொடிகள்", img: "/images/products/Sambar-Podi.webp", meta: "Spices from ₹40" },
  { cat: "ghee-oil", en: "Ghee & oil", ta: "நெய் & எண்ணெய்", img: "/images/products/Mallamaattu-Nei.webp", meta: "From ₹275 · 5 items" },
  { cat: "everyday-rice", en: "Everyday rice", ta: "மற்ற அரிசி வகைகள்", img: "/images/products/Ponni-Arisi.webp", meta: "Ponni, idli & more" },
  { cat: "personal-care", en: "Personal care", ta: "உடல் பராமரிப்பு", img: "/images/products/Kuliyal-Podi.webp", meta: "Herbal bath powders" },
  { cat: "honey", en: "Honey", ta: "தேன்", img: "/images/site/20-product-raw-honey.webp", meta: "Pure raw honey" },
];

export const NEW_AVAL = [
  { en: "Kalanamak aval", ta: "காலா நமக் அவல்", price: "₹195" },
  { en: "Iluppai poo samba aval", ta: "இலுப்பைப் பூ சம்பா அவல்", price: "₹175" },
  { en: "Kallundai samba aval", ta: "கல்லுண்டை சம்பா அவல்", price: "₹165" },
  { en: "Aathur kichadi samba aval", ta: "ஆத்தூர் கிச்சடி சம்பா அவல்", price: "₹160" },
  { en: "Karudan samba aval", ta: "கருடன் சம்பா அவல்", price: "₹155" },
];

export const COMBOS = [
  {
    price: "₹999",
    items: "10 items",
    note: "Raw rice, moong dal, urundai vellam, ghee, cashew, raisins, cardamom, sathu maavu and an SS pongal pot.",
    poster: "/images/site/thai-pongal-combo-999.webp",
    w: 1055,
    h: 1491,
    alt: "Thai Pongal combo ₹999 poster with the list of 10 items, dates and payment QR",
  },
  {
    price: "₹1,999",
    items: "17 items",
    note: "Everything in the ₹999 box plus nattu sakkarai, honey, three podis, a poonam saree and a white veshti.",
    poster: "/images/site/thai-pongal-combo-1999.webp",
    w: 906,
    h: 1280,
    alt: "Thai Pongal combo ₹1999 poster with the list of 17 items, dates and payment QR",
  },
];
