// ============================================================
// lib/locale-data.ts
// Seeded locale corpus — authentic in-market phrasing database
// ============================================================

export interface LocaleEntry {
  id: string;
  lang: string;
  langCode: string;
  country: string;
  countryCode: string;
  region: "SEA" | "EA" | "SA" | "EU" | "MENA" | "AF" | "LATAM" | "NA" | "OCE";
  coverage: number; // 0-100
  phrases: PhraseEntry[];
  sources: SourceEntry[];
  harvested: number;
  quality: number;
}

export interface PhraseEntry {
  id: string;
  domain: "ecommerce" | "support" | "ui" | "review" | "social";
  key: string;
  authentic: string;
  translated: string;
  source: string;
  sourceType: "marketplace" | "review" | "social" | "support" | "tld";
  authenticityScore: number; // 0-100, how "real" vs translationese
  harvestedAt: string;
}

export interface SourceEntry {
  url: string;
  name: string;
  type: "marketplace" | "review" | "social" | "support" | "tld";
  status: "active" | "pending" | "error";
  lastFetched?: string;
  phrasesFound: number;
}

export const LOCALE_CORPUS: LocaleEntry[] = [
  // ── SOUTHEAST ASIA ──────────────────────────────────────
  {
    id: "id-ID",
    lang: "Bahasa Indonesia",
    langCode: "id",
    country: "Indonesia",
    countryCode: "ID",
    region: "SEA",
    coverage: 87,
    harvested: 14820,
    quality: 91,
    sources: [
      { url: "https://www.tokopedia.com", name: "Tokopedia", type: "marketplace", status: "active", phrasesFound: 4200 },
      { url: "https://www.bukalapak.com", name: "Bukalapak", type: "marketplace", status: "active", phrasesFound: 3100 },
      { url: "https://www.shopee.co.id", name: "Shopee ID", type: "marketplace", status: "active", phrasesFound: 3800 },
      { url: "https://kaskus.co.id", name: "Kaskus Forum", type: "social", status: "active", phrasesFound: 1920 },
      { url: "https://support.gojek.com/id", name: "Gojek Support", type: "support", status: "active", phrasesFound: 1800 },
    ],
    phrases: [
      {
        id: "id-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "Masukkan ke Keranjang", translated: "Tambah ke Keranjang",
        source: "tokopedia.com", sourceType: "marketplace", authenticityScore: 96, harvestedAt: "2026-09-12T08:00:00Z"
      },
      {
        id: "id-ec-2", domain: "ecommerce", key: "checkout",
        authentic: "Beli Sekarang", translated: "Periksa",
        source: "shopee.co.id", sourceType: "marketplace", authenticityScore: 94, harvestedAt: "2026-09-12T08:05:00Z"
      },
      {
        id: "id-ec-3", domain: "ecommerce", key: "free_shipping",
        authentic: "Gratis Ongkir", translated: "Pengiriman Gratis",
        source: "tokopedia.com", sourceType: "marketplace", authenticityScore: 99, harvestedAt: "2026-09-12T08:10:00Z"
      },
      {
        id: "id-rv-1", domain: "review", key: "highly_recommended",
        authentic: "Recommended banget!", translated: "Sangat direkomendasikan",
        source: "kaskus.co.id", sourceType: "review", authenticityScore: 92, harvestedAt: "2026-09-12T08:15:00Z"
      },
      {
        id: "id-ui-1", domain: "ui", key: "confirm_payment",
        authentic: "Bayar Sekarang", translated: "Konfirmasi Pembayaran",
        source: "gojek.com", sourceType: "support", authenticityScore: 89, harvestedAt: "2026-09-12T08:20:00Z"
      },
    ]
  },
  {
    id: "ms-MY",
    lang: "Bahasa Melayu",
    langCode: "ms",
    country: "Malaysia",
    countryCode: "MY",
    region: "SEA",
    coverage: 79,
    harvested: 9340,
    quality: 88,
    sources: [
      { url: "https://www.lazada.com.my", name: "Lazada MY", type: "marketplace", status: "active", phrasesFound: 3100 },
      { url: "https://www.shopee.com.my", name: "Shopee MY", type: "marketplace", status: "active", phrasesFound: 2800 },
      { url: "https://lowyat.net", name: "Lowyat Forum", type: "social", status: "active", phrasesFound: 1440 },
      { url: "https://www.mudah.my", name: "Mudah MY", type: "marketplace", status: "active", phrasesFound: 2000 },
    ],
    phrases: [
      {
        id: "ms-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "Tambah ke Troli", translated: "Masukkan ke Keranjang",
        source: "lazada.com.my", sourceType: "marketplace", authenticityScore: 97, harvestedAt: "2026-09-12T09:00:00Z"
      },
      {
        id: "ms-ec-2", domain: "ecommerce", key: "free_shipping",
        authentic: "Penghantaran Percuma", translated: "Pengiriman Gratis",
        source: "shopee.com.my", sourceType: "marketplace", authenticityScore: 95, harvestedAt: "2026-09-12T09:05:00Z"
      },
      {
        id: "ms-ec-3", domain: "ecommerce", key: "cashback",
        authentic: "Duit Balik", translated: "Pulangan Tunai",
        source: "lazada.com.my", sourceType: "marketplace", authenticityScore: 98, harvestedAt: "2026-09-12T09:10:00Z"
      },
    ]
  },
  {
    id: "th-TH",
    lang: "ภาษาไทย",
    langCode: "th",
    country: "Thailand",
    countryCode: "TH",
    region: "SEA",
    coverage: 72,
    harvested: 8120,
    quality: 85,
    sources: [
      { url: "https://www.lazada.co.th", name: "Lazada TH", type: "marketplace", status: "active", phrasesFound: 2900 },
      { url: "https://shopee.co.th", name: "Shopee TH", type: "marketplace", status: "active", phrasesFound: 2600 },
      { url: "https://pantip.com", name: "Pantip Forum", type: "social", status: "active", phrasesFound: 2620 },
    ],
    phrases: [
      {
        id: "th-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "ใส่ตะกร้า", translated: "เพิ่มลงในตะกร้าสินค้า",
        source: "lazada.co.th", sourceType: "marketplace", authenticityScore: 95, harvestedAt: "2026-09-12T10:00:00Z"
      },
      {
        id: "th-ec-2", domain: "ecommerce", key: "flash_sale",
        authentic: "ลดกระหน่ำ", translated: "การขายแบบแฟลช",
        source: "shopee.co.th", sourceType: "marketplace", authenticityScore: 98, harvestedAt: "2026-09-12T10:05:00Z"
      },
    ]
  },
  {
    id: "vi-VN",
    lang: "Tiếng Việt",
    langCode: "vi",
    country: "Vietnam",
    countryCode: "VN",
    region: "SEA",
    coverage: 68,
    harvested: 7450,
    quality: 83,
    sources: [
      { url: "https://shopee.vn", name: "Shopee VN", type: "marketplace", status: "active", phrasesFound: 2700 },
      { url: "https://www.tiki.vn", name: "Tiki", type: "marketplace", status: "active", phrasesFound: 2100 },
      { url: "https://www.vatgia.com", name: "Vatgia", type: "marketplace", status: "active", phrasesFound: 1650 },
      { url: "https://voz.vn", name: "VOZ Forum", type: "social", status: "active", phrasesFound: 1000 },
    ],
    phrases: [
      {
        id: "vi-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "Thêm vào giỏ", translated: "Thêm vào giỏ hàng",
        source: "tiki.vn", sourceType: "marketplace", authenticityScore: 92, harvestedAt: "2026-09-12T11:00:00Z"
      },
      {
        id: "vi-ec-2", domain: "ecommerce", key: "deal",
        authentic: "Siêu sale", translated: "Khuyến mãi lớn",
        source: "shopee.vn", sourceType: "marketplace", authenticityScore: 97, harvestedAt: "2026-09-12T11:05:00Z"
      },
    ]
  },
  {
    id: "fil-PH",
    lang: "Filipino",
    langCode: "fil",
    country: "Philippines",
    countryCode: "PH",
    region: "SEA",
    coverage: 74,
    harvested: 8900,
    quality: 86,
    sources: [
      { url: "https://www.lazada.com.ph", name: "Lazada PH", type: "marketplace", status: "active", phrasesFound: 3200 },
      { url: "https://shopee.ph", name: "Shopee PH", type: "marketplace", status: "active", phrasesFound: 2900 },
      { url: "https://www.sulit.com.ph", name: "Sulit", type: "marketplace", status: "active", phrasesFound: 1400 },
      { url: "https://www.rappler.com", name: "Rappler", type: "tld", status: "active", phrasesFound: 1400 },
    ],
    phrases: [
      {
        id: "fil-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "Idagdag sa Cart", translated: "Idagdag sa Basket",
        source: "lazada.com.ph", sourceType: "marketplace", authenticityScore: 94, harvestedAt: "2026-09-12T12:00:00Z"
      },
      {
        id: "fil-ec-2", domain: "ecommerce", key: "checkout_now",
        authentic: "Bili Na!", translated: "I-checkout Na",
        source: "shopee.ph", sourceType: "marketplace", authenticityScore: 99, harvestedAt: "2026-09-12T12:05:00Z"
      },
    ]
  },
  {
    id: "en-SG",
    lang: "Singapore English",
    langCode: "en-SG",
    country: "Singapore",
    countryCode: "SG",
    region: "SEA",
    coverage: 91,
    harvested: 11200,
    quality: 94,
    sources: [
      { url: "https://www.lazada.sg", name: "Lazada SG", type: "marketplace", status: "active", phrasesFound: 3800 },
      { url: "https://shopee.sg", name: "Shopee SG", type: "marketplace", status: "active", phrasesFound: 3500 },
      { url: "https://www.hardware-zone.com", name: "HWZ Forum", type: "social", status: "active", phrasesFound: 1900 },
      { url: "https://support.aisingapore.org", name: "AI Singapore", type: "support", status: "active", phrasesFound: 2000 },
    ],
    phrases: [
      {
        id: "sg-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "Add to Cart lah", translated: "Add to Shopping Cart",
        source: "lazada.sg", sourceType: "marketplace", authenticityScore: 97, harvestedAt: "2026-09-12T13:00:00Z"
      },
      {
        id: "sg-ec-2", domain: "ecommerce", key: "voucher",
        authentic: "Claim voucher first!", translated: "Apply discount code",
        source: "shopee.sg", sourceType: "marketplace", authenticityScore: 99, harvestedAt: "2026-09-12T13:05:00Z"
      },
      {
        id: "sg-ui-1", domain: "ui", key: "loading",
        authentic: "Loading... wait ah", translated: "Please wait",
        source: "hardware-zone.com", sourceType: "social", authenticityScore: 88, harvestedAt: "2026-09-12T13:10:00Z"
      },
    ]
  },
  // ── EAST ASIA ────────────────────────────────────────────
  {
    id: "ja-JP",
    lang: "日本語",
    langCode: "ja",
    country: "Japan",
    countryCode: "JP",
    region: "EA",
    coverage: 93,
    harvested: 18400,
    quality: 96,
    sources: [
      { url: "https://www.amazon.co.jp", name: "Amazon JP", type: "marketplace", status: "active", phrasesFound: 6200 },
      { url: "https://item.rakuten.co.jp", name: "Rakuten", type: "marketplace", status: "active", phrasesFound: 5500 },
      { url: "https://detail.chiebukuro.yahoo.co.jp", name: "Yahoo Chiebukuro", type: "social", status: "active", phrasesFound: 4200 },
      { url: "https://review.kakaku.com", name: "Kakaku Reviews", type: "review", status: "active", phrasesFound: 2500 },
    ],
    phrases: [
      {
        id: "ja-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "カートに入れる", translated: "ショッピングカートに追加する",
        source: "amazon.co.jp", sourceType: "marketplace", authenticityScore: 98, harvestedAt: "2026-09-12T14:00:00Z"
      },
      {
        id: "ja-ec-2", domain: "ecommerce", key: "buy_now",
        authentic: "今すぐ買う", translated: "すぐに購入する",
        source: "amazon.co.jp", sourceType: "marketplace", authenticityScore: 97, harvestedAt: "2026-09-12T14:05:00Z"
      },
      {
        id: "ja-rv-1", domain: "review", key: "highly_recommended",
        authentic: "超おすすめ！", translated: "非常に推薦します",
        source: "kakaku.com", sourceType: "review", authenticityScore: 95, harvestedAt: "2026-09-12T14:10:00Z"
      },
    ]
  },
  {
    id: "ko-KR",
    lang: "한국어",
    langCode: "ko",
    country: "South Korea",
    countryCode: "KR",
    region: "EA",
    coverage: 89,
    harvested: 15600,
    quality: 93,
    sources: [
      { url: "https://www.coupang.com", name: "Coupang", type: "marketplace", status: "active", phrasesFound: 5800 },
      { url: "https://www.gmarket.co.kr", name: "Gmarket", type: "marketplace", status: "active", phrasesFound: 4200 },
      { url: "https://cafe.naver.com", name: "Naver Café", type: "social", status: "active", phrasesFound: 3600 },
    ],
    phrases: [
      {
        id: "ko-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "장바구니 담기", translated: "쇼핑 카트에 추가",
        source: "coupang.com", sourceType: "marketplace", authenticityScore: 97, harvestedAt: "2026-09-12T15:00:00Z"
      },
      {
        id: "ko-ec-2", domain: "ecommerce", key: "flash_sale",
        authentic: "타임딜", translated: "플래시 세일",
        source: "gmarket.co.kr", sourceType: "marketplace", authenticityScore: 99, harvestedAt: "2026-09-12T15:05:00Z"
      },
    ]
  },
  {
    id: "zh-CN",
    lang: "中文 (简体)",
    langCode: "zh-CN",
    country: "China",
    countryCode: "CN",
    region: "EA",
    coverage: 95,
    harvested: 24100,
    quality: 97,
    sources: [
      { url: "https://detail.tmall.com", name: "Tmall", type: "marketplace", status: "active", phrasesFound: 8400 },
      { url: "https://item.jd.com", name: "JD.com", type: "marketplace", status: "active", phrasesFound: 7200 },
      { url: "https://weibo.com", name: "Weibo Social", type: "social", status: "active", phrasesFound: 4800 },
      { url: "https://zhidao.baidu.com", name: "Baidu Zhidao", type: "social", status: "active", phrasesFound: 3700 },
    ],
    phrases: [
      {
        id: "zh-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "加入购物车", translated: "添加到购物车",
        source: "tmall.com", sourceType: "marketplace", authenticityScore: 98, harvestedAt: "2026-09-12T16:00:00Z"
      },
      {
        id: "zh-ec-2", domain: "ecommerce", key: "flash_sale",
        authentic: "限时抢购", translated: "快速销售",
        source: "jd.com", sourceType: "marketplace", authenticityScore: 99, harvestedAt: "2026-09-12T16:05:00Z"
      },
    ]
  },
  // ── SOUTH ASIA ───────────────────────────────────────────
  {
    id: "hi-IN",
    lang: "हिन्दी",
    langCode: "hi",
    country: "India",
    countryCode: "IN",
    region: "SA",
    coverage: 82,
    harvested: 13200,
    quality: 89,
    sources: [
      { url: "https://www.flipkart.com", name: "Flipkart", type: "marketplace", status: "active", phrasesFound: 5200 },
      { url: "https://www.meesho.com", name: "Meesho", type: "marketplace", status: "active", phrasesFound: 3800 },
      { url: "https://hindi.awazthevoice.in", name: "Awaz Hindi", type: "tld", status: "active", phrasesFound: 2100 },
      { url: "https://ndtv.in", name: "NDTV Hindi", type: "tld", status: "active", phrasesFound: 2100 },
    ],
    phrases: [
      {
        id: "hi-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "कार्ट में डालें", translated: "शॉपिंग कार्ट में जोड़ें",
        source: "flipkart.com", sourceType: "marketplace", authenticityScore: 94, harvestedAt: "2026-09-12T17:00:00Z"
      },
      {
        id: "hi-ec-2", domain: "ecommerce", key: "cash_on_delivery",
        authentic: "Cash on Delivery", translated: "नकद भुगतान डिलीवरी पर",
        source: "flipkart.com", sourceType: "marketplace", authenticityScore: 99, harvestedAt: "2026-09-12T17:05:00Z"
      },
    ]
  },
  {
    id: "bn-BD",
    lang: "বাংলা",
    langCode: "bn",
    country: "Bangladesh",
    countryCode: "BD",
    region: "SA",
    coverage: 54,
    harvested: 4200,
    quality: 78,
    sources: [
      { url: "https://www.daraz.com.bd", name: "Daraz BD", type: "marketplace", status: "active", phrasesFound: 2100 },
      { url: "https://www.shajgoj.com", name: "Shajgoj", type: "marketplace", status: "active", phrasesFound: 1200 },
      { url: "https://www.prothomalo.com", name: "Prothom Alo", type: "tld", status: "active", phrasesFound: 900 },
    ],
    phrases: [
      {
        id: "bn-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "কার্টে যোগ করুন", translated: "শপিং কার্টে যোগ করুন",
        source: "daraz.com.bd", sourceType: "marketplace", authenticityScore: 88, harvestedAt: "2026-09-12T18:00:00Z"
      },
    ]
  },
  // ── EUROPE ───────────────────────────────────────────────
  {
    id: "de-DE",
    lang: "Deutsch",
    langCode: "de",
    country: "Germany",
    countryCode: "DE",
    region: "EU",
    coverage: 92,
    harvested: 16800,
    quality: 95,
    sources: [
      { url: "https://www.amazon.de", name: "Amazon DE", type: "marketplace", status: "active", phrasesFound: 6500 },
      { url: "https://www.otto.de", name: "OTTO", type: "marketplace", status: "active", phrasesFound: 4800 },
      { url: "https://www.idealo.de", name: "Idealo", type: "review", status: "active", phrasesFound: 3100 },
      { url: "https://www.gutefrage.net", name: "Gutefrage Forum", type: "social", status: "active", phrasesFound: 2400 },
    ],
    phrases: [
      {
        id: "de-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "In den Warenkorb", translated: "In den Einkaufswagen hinzufügen",
        source: "amazon.de", sourceType: "marketplace", authenticityScore: 98, harvestedAt: "2026-09-12T19:00:00Z"
      },
      {
        id: "de-ec-2", domain: "ecommerce", key: "buy_now",
        authentic: "Jetzt kaufen", translated: "Sofort kaufen",
        source: "amazon.de", sourceType: "marketplace", authenticityScore: 97, harvestedAt: "2026-09-12T19:05:00Z"
      },
    ]
  },
  {
    id: "fr-FR",
    lang: "Français",
    langCode: "fr",
    country: "France",
    countryCode: "FR",
    region: "EU",
    coverage: 90,
    harvested: 15300,
    quality: 94,
    sources: [
      { url: "https://www.amazon.fr", name: "Amazon FR", type: "marketplace", status: "active", phrasesFound: 5800 },
      { url: "https://www.leboncoin.fr", name: "Leboncoin", type: "marketplace", status: "active", phrasesFound: 4500 },
      { url: "https://forum.hardware.fr", name: "Hardware FR", type: "social", status: "active", phrasesFound: 3100 },
    ],
    phrases: [
      {
        id: "fr-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "Ajouter au panier", translated: "Mettre dans le panier",
        source: "amazon.fr", sourceType: "marketplace", authenticityScore: 97, harvestedAt: "2026-09-12T20:00:00Z"
      },
    ]
  },
  // ── MENA ─────────────────────────────────────────────────
  {
    id: "ar-SA",
    lang: "العربية",
    langCode: "ar",
    country: "Saudi Arabia",
    countryCode: "SA",
    region: "MENA",
    coverage: 78,
    harvested: 10200,
    quality: 87,
    sources: [
      { url: "https://www.amazon.sa", name: "Amazon SA", type: "marketplace", status: "active", phrasesFound: 3800 },
      { url: "https://www.souq.com", name: "Souq/Amazon", type: "marketplace", status: "active", phrasesFound: 3100 },
      { url: "https://www.noon.com/saudi-ar", name: "Noon", type: "marketplace", status: "active", phrasesFound: 3300 },
    ],
    phrases: [
      {
        id: "ar-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "أضف إلى السلة", translated: "أضف إلى عربة التسوق",
        source: "amazon.sa", sourceType: "marketplace", authenticityScore: 95, harvestedAt: "2026-09-12T21:00:00Z"
      },
      {
        id: "ar-ec-2", domain: "ecommerce", key: "free_delivery",
        authentic: "شحن مجاني", translated: "توصيل مجاني",
        source: "noon.com", sourceType: "marketplace", authenticityScore: 97, harvestedAt: "2026-09-12T21:05:00Z"
      },
    ]
  },
  // ── LATAM ────────────────────────────────────────────────
  {
    id: "es-MX",
    lang: "Español (México)",
    langCode: "es-MX",
    country: "Mexico",
    countryCode: "MX",
    region: "LATAM",
    coverage: 85,
    harvested: 11800,
    quality: 91,
    sources: [
      { url: "https://www.amazon.com.mx", name: "Amazon MX", type: "marketplace", status: "active", phrasesFound: 4200 },
      { url: "https://www.mercadolibre.com.mx", name: "MercadoLibre", type: "marketplace", status: "active", phrasesFound: 4900 },
      { url: "https://www.linio.com.mx", name: "Linio", type: "marketplace", status: "active", phrasesFound: 2700 },
    ],
    phrases: [
      {
        id: "es-mx-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "Agregar al carrito", translated: "Añadir al carrito de compras",
        source: "amazon.com.mx", sourceType: "marketplace", authenticityScore: 96, harvestedAt: "2026-09-12T22:00:00Z"
      },
      {
        id: "es-mx-ec-2", domain: "ecommerce", key: "installments",
        authentic: "Meses sin intereses", translated: "Cuotas sin interés",
        source: "mercadolibre.com.mx", sourceType: "marketplace", authenticityScore: 99, harvestedAt: "2026-09-12T22:05:00Z"
      },
    ]
  },
  {
    id: "pt-BR",
    lang: "Português (Brasil)",
    langCode: "pt-BR",
    country: "Brazil",
    countryCode: "BR",
    region: "LATAM",
    coverage: 88,
    harvested: 14100,
    quality: 92,
    sources: [
      { url: "https://www.amazon.com.br", name: "Amazon BR", type: "marketplace", status: "active", phrasesFound: 5200 },
      { url: "https://www.mercadolivre.com.br", name: "MercadoLivre", type: "marketplace", status: "active", phrasesFound: 5700 },
      { url: "https://www.shopee.com.br", name: "Shopee BR", type: "marketplace", status: "active", phrasesFound: 3200 },
    ],
    phrases: [
      {
        id: "pt-br-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "Adicionar ao carrinho", translated: "Colocar no carrinho",
        source: "amazon.com.br", sourceType: "marketplace", authenticityScore: 96, harvestedAt: "2026-09-12T23:00:00Z"
      },
      {
        id: "pt-br-ec-2", domain: "ecommerce", key: "pix",
        authentic: "Pagar com Pix", translated: "Pagamento instantâneo",
        source: "mercadolivre.com.br", sourceType: "marketplace", authenticityScore: 100, harvestedAt: "2026-09-12T23:05:00Z"
      },
    ]
  },
  // ── AFRICA ───────────────────────────────────────────────
  {
    id: "sw-KE",
    lang: "Kiswahili",
    langCode: "sw",
    country: "Kenya",
    countryCode: "KE",
    region: "AF",
    coverage: 41,
    harvested: 2900,
    quality: 72,
    sources: [
      { url: "https://www.jumia.co.ke", name: "Jumia KE", type: "marketplace", status: "active", phrasesFound: 1400 },
      { url: "https://jiji.co.ke", name: "Jiji KE", type: "marketplace", status: "active", phrasesFound: 900 },
      { url: "https://www.nation.co.ke/swahili", name: "Nation Swahili", type: "tld", status: "pending", phrasesFound: 600 },
    ],
    phrases: [
      {
        id: "sw-ec-1", domain: "ecommerce", key: "add_to_cart",
        authentic: "Ongeza kwenye kikapu", translated: "Weka kwenye gari la ununuzi",
        source: "jumia.co.ke", sourceType: "marketplace", authenticityScore: 82, harvestedAt: "2026-09-12T07:00:00Z"
      },
    ]
  },
];

export const SEA_LOCALES = LOCALE_CORPUS.filter(l => l.region === "SEA");

export const REGION_STATS = {
  SEA: { locales: 6, coverage: 79, harvested: 59830, languages: 6 },
  EA:  { locales: 3, coverage: 92, harvested: 58100, languages: 3 },
  SA:  { locales: 2, coverage: 68, harvested: 17400, languages: 2 },
  EU:  { locales: 2, coverage: 91, harvested: 32100, languages: 2 },
  MENA:{ locales: 1, coverage: 78, harvested: 10200, languages: 1 },
  LATAM:{ locales: 2, coverage: 87, harvested: 25900, languages: 2 },
  AF:  { locales: 1, coverage: 41, harvested: 2900,  languages: 1 },
};

export const TOTAL_STATS = {
  languages: 242,
  seeded: 17,
  totalPhrases: LOCALE_CORPUS.reduce((sum, l) => sum + l.harvested, 0),
  avgQuality: Math.round(LOCALE_CORPUS.reduce((sum, l) => sum + l.quality, 0) / LOCALE_CORPUS.length),
  avgCoverage: Math.round(LOCALE_CORPUS.reduce((sum, l) => sum + l.coverage, 0) / LOCALE_CORPUS.length),
};
