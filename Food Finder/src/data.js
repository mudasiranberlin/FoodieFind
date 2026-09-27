export const areas = [
  ["Phnom Penh", 11.5564, 104.9282],
  ["Siem Reap", 13.3633, 103.8564],
  ["Battambang", 13.0957, 103.2022],
  ["Kampot", 10.6104, 104.1815],
  ["Sihanoukville", 10.6253, 103.5234],
  ["Kep", 10.4829, 104.3167],
  ["Kampong Cham", 11.9934, 105.4635],
  ["Kampong Chhnang", 12.25, 104.6667],
  ["Pursat", 12.5388, 103.9192],
  ["Kampong Thom", 12.7111, 104.8887],
  ["Kratie", 12.4881, 106.0188],
  ["Mondulkiri / Sen Monorom", 12.4558, 107.1881],
  ["Ratanakiri / Banlung", 13.7394, 106.9873],
  ["Takeo", 10.9908, 104.784],
  ["Svay Rieng", 11.0879, 105.7993],
  ["Poipet", 13.6561, 102.5625],
  ["Koh Kong", 11.6153, 102.9838],
  ["Kampong Speu", 11.4533, 104.5209],
];

export const dishes = [
  "Khmer Beef Lok Lak", "Fish Amok", "Beef Kuy Teav", "Nom Banh Chok", "Bai Sach Chrouk",
  "Prahok Ktis", "Kampot Pepper Crab", "Khmer Red Curry", "Chicken Char Kroeung", "Num Pang Sandwich",
  "Fried Spring Rolls", "Lort Cha", "Banh Chhev", "Samlor Korkor", "Kuy Teav Phnom Penh",
  "Grilled Pork Skewers", "Green Mango Salad", "Fried Rice", "Chicken Wings", "Beef Skewers",
  "Coconut Pancakes", "Num Ansom", "Num Krok", "Tuk Kreung", "Iced Khmer Coffee",
  "Sugarcane Juice", "Mango Sticky Rice", "Grilled River Fish", "Fried Banana", "BBQ Seafood",
  "Chicken Rice", "Pork Noodle Soup", "Papaya Salad", "Beef Soup", "Crispy Duck",
  "Pandan Waffles", "Coconut Ice Cream", "Durian Dessert", "Fresh Fruit Shake", "Roasted Chicken",
];

export const categories = ["All", "Khmer", "Noodles", "Street food", "Seafood", "Café & drinks", "Desserts"];

export const categoryEmoji = {
  "Khmer": "🍛",
  "Noodles": "🍜",
  "Street food": "🍢",
  "Seafood": "🦀",
  "Café & drinks": "☕",
  "Desserts": "🍧",
};

function hueFromString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

export function placeholderImg(name, category) {
  const hue = hueFromString(name || category || "food");
  const emoji = categoryEmoji[category] || "🍽️";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},58%,90%)"/><stop offset="1" stop-color="hsl(${(hue + 45) % 360},52%,74%)"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><text x="50%" y="54%" font-size="112" text-anchor="middle" dominant-baseline="middle">${emoji}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

export function buildDemo() {
  const demo = [];
  for (let i = 0; i < 40; i++) {
    const a = areas[i % areas.length];
    const name = dishes[i];
    const low = name.toLowerCase();
    let category;
    if (low.includes("coffee") || low.includes("juice")) category = "Café & drinks";
    else if (low.includes("dessert") || low.includes("ice cream") || low.includes("banana") || low.includes("pancake") || low.includes("waffle") || low.includes("sticky rice")) category = "Desserts";
    else if (low.includes("crab") || low.includes("fish") || low.includes("seafood")) category = "Seafood";
    else if (low.includes("kuy teav") || low.includes("noodle") || low.includes("lort cha")) category = "Noodles";
    else if (low.includes("skewer") || low.includes("num pang")) category = "Street food";
    else category = "Khmer";
    demo.push({
      id: "demo" + i,
      name,
      place: ["Central Market area", "Riverside", "Old Market", "Night Market", "Local food street", "City centre", "Market food stalls", "Riverside food lane"][i % 8],
      city: a[0],
      lat: a[1] + ((i % 5) - 2) * 0.001,
      lng: a[2] + ((i % 5) - 2) * 0.001,
      category,
      image: placeholderImg(name, category),
      images: [],
      approved: true,
      demo: true,
      description: `Illustrative discovery listing in ${a[0]}. This is not a verified vendor or exact storefront. Confirm the place before traveling.`,
    });
  }
  return demo;
}

export function dist(f, loc) {
  if (!loc || !Number.isFinite(+f.lat) || !Number.isFinite(+f.lng)) return null;
  const rad = (x) => (x * Math.PI) / 180;
  const d1 = +f.lat - loc.lat;
  const d2 = +f.lng - loc.lng;
  const a = Math.sin(rad(d1) / 2) ** 2 + Math.cos(rad(loc.lat)) * Math.cos(rad(+f.lat)) * Math.sin(rad(d2) / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function mapsUrl(f) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(f.lat + "," + f.lng)}`;
}

export function load(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    if (v === null || v === undefined) return fallback;
    if (Array.isArray(fallback) !== Array.isArray(v)) return fallback;
    return v;
  } catch {
    return fallback;
  }
}
