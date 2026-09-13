// lib/harvest-stream.ts
// Seeded harvest events — simulates live web content reads

export interface HarvestEvent {
  id: string;
  timestamp: string;
  url: string;
  siteName: string;
  langCode: string;
  countryCode: string;
  lang: string;
  country: string;
  phrasesFound: number;
  topPhrase: string;
  topPhraseTranslation: string;
  quality: number;
  type: "marketplace" | "review" | "social" | "support" | "tld";
  status: "reading" | "extracting" | "done" | "error";
  bytes: number;
}

function msAgo(ms: number): string {
  return new Date(Date.now() - ms).toISOString();
}

export const HARVEST_FEED: HarvestEvent[] = [
  {
    id: "h-001", timestamp: msAgo(2000),
    url: "https://www.tokopedia.com/kategori/handphone", siteName: "Tokopedia",
    langCode: "id", countryCode: "ID", lang: "Bahasa Indonesia", country: "Indonesia",
    phrasesFound: 47, topPhrase: "Gratis Ongkir", topPhraseTranslation: "Free Shipping",
    quality: 94, type: "marketplace", status: "done", bytes: 312480
  },
  {
    id: "h-002", timestamp: msAgo(5000),
    url: "https://shopee.co.th/kategori/fashion", siteName: "Shopee TH",
    langCode: "th", countryCode: "TH", lang: "ภาษาไทย", country: "Thailand",
    phrasesFound: 38, topPhrase: "ลดกระหน่ำ", topPhraseTranslation: "Massive Discount",
    quality: 91, type: "marketplace", status: "done", bytes: 289340
  },
  {
    id: "h-003", timestamp: msAgo(8000),
    url: "https://www.lazada.sg/promotions/flash-sale", siteName: "Lazada SG",
    langCode: "en-SG", countryCode: "SG", lang: "Singapore English", country: "Singapore",
    phrasesFound: 29, topPhrase: "Shiok deals lah!", topPhraseTranslation: "Great deals!",
    quality: 97, type: "marketplace", status: "done", bytes: 198200
  },
  {
    id: "h-004", timestamp: msAgo(12000),
    url: "https://kaskus.co.id/forum/jual-beli", siteName: "Kaskus Forum",
    langCode: "id", countryCode: "ID", lang: "Bahasa Indonesia", country: "Indonesia",
    phrasesFound: 63, topPhrase: "WTS/WTB gan!", topPhraseTranslation: "Selling/Buying!",
    quality: 88, type: "social", status: "done", bytes: 422100
  },
  {
    id: "h-005", timestamp: msAgo(16000),
    url: "https://voz.vn/f/thuong-mai-dien-tu.78", siteName: "VOZ Forum",
    langCode: "vi", countryCode: "VN", lang: "Tiếng Việt", country: "Vietnam",
    phrasesFound: 31, topPhrase: "Deal ngon quá!", topPhraseTranslation: "Really good deal!",
    quality: 86, type: "social", status: "done", bytes: 267800
  },
  {
    id: "h-006", timestamp: msAgo(21000),
    url: "https://detail.kakaku.com/review/K0001234567", siteName: "Kakaku JP",
    langCode: "ja", countryCode: "JP", lang: "日本語", country: "Japan",
    phrasesFound: 52, topPhrase: "超おすすめ！コスパ最高", topPhraseTranslation: "Highly recommend! Best value",
    quality: 96, type: "review", status: "done", bytes: 381200
  },
  {
    id: "h-007", timestamp: msAgo(26000),
    url: "https://www.coupang.com/vp/products/flash", siteName: "Coupang",
    langCode: "ko", countryCode: "KR", lang: "한국어", country: "South Korea",
    phrasesFound: 44, topPhrase: "오늘만 이가격!", topPhraseTranslation: "Today's price only!",
    quality: 95, type: "marketplace", status: "done", bytes: 298400
  },
  {
    id: "h-008", timestamp: msAgo(31000),
    url: "https://pantip.com/forum/shopping", siteName: "Pantip TH",
    langCode: "th", countryCode: "TH", lang: "ภาษาไทย", country: "Thailand",
    phrasesFound: 28, topPhrase: "ราคาดีมากจ้า", topPhraseTranslation: "Very good price na",
    quality: 89, type: "social", status: "done", bytes: 201700
  },
  {
    id: "h-009", timestamp: msAgo(37000),
    url: "https://www.flipkart.com/new-arrivals", siteName: "Flipkart",
    langCode: "hi", countryCode: "IN", lang: "हिन्दी", country: "India",
    phrasesFound: 41, topPhrase: "अभी खरीदें", topPhraseTranslation: "Buy Now",
    quality: 92, type: "marketplace", status: "done", bytes: 334600
  },
  {
    id: "h-010", timestamp: msAgo(43000),
    url: "https://www.noon.com/saudi-ar/flash-sale", siteName: "Noon SA",
    langCode: "ar", countryCode: "SA", lang: "العربية", country: "Saudi Arabia",
    phrasesFound: 35, topPhrase: "تسوق الآن واوفر", topPhraseTranslation: "Shop now and save",
    quality: 90, type: "marketplace", status: "done", bytes: 278100
  },
  {
    id: "h-011", timestamp: msAgo(50000),
    url: "https://mercadolibre.com.mx/meses-sin-intereses", siteName: "MercadoLibre MX",
    langCode: "es-MX", countryCode: "MX", lang: "Español (MX)", country: "Mexico",
    phrasesFound: 39, topPhrase: "Sin comisiones ahorita", topPhraseTranslation: "No fees right now",
    quality: 93, type: "marketplace", status: "done", bytes: 305800
  },
  {
    id: "h-012", timestamp: msAgo(56000),
    url: "https://www.mercadolivre.com.br/pix-desconto", siteName: "MercadoLivre BR",
    langCode: "pt-BR", countryCode: "BR", lang: "Português (BR)", country: "Brazil",
    phrasesFound: 48, topPhrase: "Pix na hora e sem taxa", topPhraseTranslation: "Instant Pix, no fee",
    quality: 96, type: "marketplace", status: "done", bytes: 389200
  },
  {
    id: "h-013", timestamp: msAgo(62000),
    url: "https://www.amazon.de/Angebote", siteName: "Amazon DE",
    langCode: "de", countryCode: "DE", lang: "Deutsch", country: "Germany",
    phrasesFound: 55, topPhrase: "Jetzt kaufen", topPhraseTranslation: "Buy now",
    quality: 98, type: "marketplace", status: "done", bytes: 412000
  },
  {
    id: "h-014", timestamp: msAgo(68000),
    url: "https://www.lazada.com.ph/vouchers", siteName: "Lazada PH",
    langCode: "fil", countryCode: "PH", lang: "Filipino", country: "Philippines",
    phrasesFound: 36, topPhrase: "Bili Na Wag Palampasin!", topPhraseTranslation: "Buy Now Don't Miss!",
    quality: 91, type: "marketplace", status: "done", bytes: 248900
  },
  {
    id: "h-015", timestamp: msAgo(74000),
    url: "https://support.aisingapore.org/programs", siteName: "AI Singapore",
    langCode: "en-SG", countryCode: "SG", lang: "Singapore English", country: "Singapore",
    phrasesFound: 22, topPhrase: "Got pilot, can join or not?", topPhraseTranslation: "Is there a pilot to join?",
    quality: 95, type: "support", status: "done", bytes: 156300
  },
  // In-progress events (to simulate live reading)
  {
    id: "h-016", timestamp: msAgo(500),
    url: "https://www.bukalapak.com/blog/promo", siteName: "Bukalapak",
    langCode: "id", countryCode: "ID", lang: "Bahasa Indonesia", country: "Indonesia",
    phrasesFound: 0, topPhrase: "", topPhraseTranslation: "",
    quality: 0, type: "marketplace", status: "reading", bytes: 0
  },
  {
    id: "h-017", timestamp: msAgo(1200),
    url: "https://shopee.com.my/promotions/big-sale", siteName: "Shopee MY",
    langCode: "ms", countryCode: "MY", lang: "Bahasa Melayu", country: "Malaysia",
    phrasesFound: 0, topPhrase: "", topPhraseTranslation: "",
    quality: 0, type: "marketplace", status: "extracting", bytes: 312000
  },
];
