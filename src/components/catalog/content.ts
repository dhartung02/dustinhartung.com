// src/components/catalog/content.ts

export type FactBadge = { label: string; value: string };

export const heroFacts: FactBadge[] = [
  { label: "Product", value: "0→1 retail intelligence" },
  { label: "Impact", value: "Cited sales differentiator" },
  { label: "Stack", value: "React + TypeScript + GraphQL" },
  { label: "Outcome", value: "Competitive differentiator" },
];

export const disclaimerLabel = "Representative Product Demonstration";
export const disclaimerBody =
  "This page recreates the product experience using original HTML/CSS components and synthetic data. It illustrates the product concepts, UX, and technical implementation while avoiding reproduction of proprietary interfaces.";

export const caseStudyOverview = [
  {
    eyebrow: "The Insight",
    title: "Merchandisers couldn't see which products were actually working",
    description:
      "Revenue, views, and cart activity for every product and category lived in separate reports. There was no fast way to see which products were converting interest into sales — and which weren't — without exporting spreadsheets.",
  },
  {
    eyebrow: "The Product Thesis",
    title: "One browsable, drillable view of the whole catalog",
    description:
      "Instead of another static report, the catalog itself became the interface: browse by category, see performance at a glance, and drill into any product or category for the underlying signal — interest vs. conversion, not just a final number.",
  },
  {
    eyebrow: "The Outcome",
    title: "From internal tool to sales differentiator",
    description:
      "What started as an internal merchandising view became a capability prospects asked about directly — cited as a differentiator across enterprise sales opportunities and $1.1M+ in influenced ARR.",
  },
];

export const roleLeadership = [
  "Identified the gap between raw catalog data and merchandiser decision-making",
  "Defined the category-drilldown and analytics-panel interaction model",
  "Prioritized MVP scope: browse, filter, and drill into any product or category",
  "Positioned the capability as a competitive differentiator in enterprise sales conversations",
];

export const roleTechnical = [
  "React + TypeScript front end",
  "GraphQL API integration for category and product performance data",
  "Cursor-based pagination for large product catalogs",
  "Component architecture for a multi-panel, drillable interface",
];

export const outcomeStatements = [
  "Gave merchandisers a single browsable view of category and product performance instead of static exports.",
  "Made product-level interest vs. conversion visible at a glance, not just a final revenue number.",
  "Became a cited differentiator across enterprise sales opportunities.",
  "Directly influenced $1.1M+ in ARR.",
  "Established a reusable drill-down interaction pattern (category tree → listing panel → analytics panel) later referenced in other internal tools.",
];

export const nextUp = [
  "Expanded Create Segment options — the criteria shown here, plus inverse segments (didn't purchase, didn't view, didn't abandon)",
  "More analytics within the side panel, with more call-to-action options",
  "Simple campaign creation directly from the catalog, via a campaign modal or slide-over",
  "AI insights — product clusters, recommended segments, and product recommendations",
  "A channel-sourced lens for the unified listing panel, toggled alongside the behavioral-signal view",
];

export const closingStatement =
  "Merchandisers don't need another export — they need to see, in one place, which products are actually working. This is what that looks like when product thinking and hands-on engineering come from the same person.";

// ── Category tree ────────────────────────────────────────────────────────────

export type CategoryNode = {
  id: string;
  name: string;
  productCount: number;
  children?: CategoryNode[];
};

export const categoryTree: CategoryNode[] = [
  {
    id: "electronics",
    name: "Electronics",
    productCount: 154,
    children: [
      { id: "electronics-audio", name: "Audio", productCount: 96 },
      { id: "electronics-wearables", name: "Wearables", productCount: 58 },
    ],
  },
  {
    id: "apparel",
    name: "Apparel",
    productCount: 232,
    children: [
      { id: "apparel-mens", name: "Men's", productCount: 108 },
      { id: "apparel-womens", name: "Women's", productCount: 124 },
    ],
  },
  { id: "home-garden", name: "Home & Garden", productCount: 167 },
  { id: "beauty", name: "Beauty", productCount: 143 },
  { id: "grocery", name: "Grocery", productCount: 98 },
];

function flattenCategories(nodes: CategoryNode[]): CategoryNode[] {
  return nodes.flatMap((node) => [node, ...(node.children ? flattenCategories(node.children) : [])]);
}

export const allCategories: CategoryNode[] = flattenCategories(categoryTree);

// ── KPIs, scoped by category (or "all") ──────────────────────────────────────

export type KpiValue = { value: number; deltaPct: number };
export type CategoryKpis = {
  interestScore: number;
  revenue: KpiValue;
  purchases: KpiValue;
  views: KpiValue;
  cartAbandons: KpiValue;
};

export const kpisByScope: Record<string, CategoryKpis> = {
  all: {
    interestScore: 73,
    revenue: { value: 1_284_500, deltaPct: 8 },
    purchases: { value: 18_420, deltaPct: 5 },
    views: { value: 412_800, deltaPct: 12 },
    cartAbandons: { value: 9_840, deltaPct: -6 },
  },
  electronics: {
    interestScore: 80,
    revenue: { value: 412_300, deltaPct: 11 },
    purchases: { value: 5_210, deltaPct: 7 },
    views: { value: 128_400, deltaPct: 9 },
    cartAbandons: { value: 2_980, deltaPct: -3 },
  },
  "electronics-audio": {
    interestScore: 82,
    revenue: { value: 268_400, deltaPct: 14 },
    purchases: { value: 3_120, deltaPct: 9 },
    views: { value: 78_200, deltaPct: 11 },
    cartAbandons: { value: 1_640, deltaPct: -5 },
  },
  "electronics-wearables": {
    interestScore: 76,
    revenue: { value: 143_900, deltaPct: 6 },
    purchases: { value: 2_090, deltaPct: 4 },
    views: { value: 50_200, deltaPct: 6 },
    cartAbandons: { value: 1_340, deltaPct: 2 },
  },
  apparel: {
    interestScore: 70,
    revenue: { value: 356_800, deltaPct: 5 },
    purchases: { value: 6_840, deltaPct: 3 },
    views: { value: 142_600, deltaPct: 8 },
    cartAbandons: { value: 3_210, deltaPct: 4 },
  },
  "apparel-mens": {
    interestScore: 67,
    revenue: { value: 168_200, deltaPct: 4 },
    purchases: { value: 3_210, deltaPct: 2 },
    views: { value: 68_400, deltaPct: 6 },
    cartAbandons: { value: 1_520, deltaPct: 3 },
  },
  "apparel-womens": {
    interestScore: 73,
    revenue: { value: 188_600, deltaPct: 6 },
    purchases: { value: 3_630, deltaPct: 4 },
    views: { value: 74_200, deltaPct: 9 },
    cartAbandons: { value: 1_690, deltaPct: 5 },
  },
  "home-garden": {
    interestScore: 71,
    revenue: { value: 221_400, deltaPct: 9 },
    purchases: { value: 2_980, deltaPct: 6 },
    views: { value: 65_800, deltaPct: 7 },
    cartAbandons: { value: 1_480, deltaPct: -8 },
  },
  beauty: {
    interestScore: 84,
    revenue: { value: 186_300, deltaPct: 13 },
    purchases: { value: 2_640, deltaPct: 10 },
    views: { value: 58_900, deltaPct: 15 },
    cartAbandons: { value: 1_210, deltaPct: -11 },
  },
  grocery: {
    interestScore: 59,
    revenue: { value: 107_700, deltaPct: 3 },
    purchases: { value: 750, deltaPct: 1 },
    views: { value: 17_300, deltaPct: 2 },
    cartAbandons: { value: 460, deltaPct: 1 },
  },
};

// ── Create Segment toast copy, by KPI card and scope ─────────────────────────

export type SegmentToastCopy = { all: string; category: (categoryName: string) => string };

export const segmentToastCopy: Record<string, SegmentToastCopy> = {
  "Total Revenue": {
    all: "Segment of individuals who made a purchase in the last 30 days created.",
    category: (name) => `Segment of individuals who made a purchase from ${name} in the last 30 days created.`,
  },
  "Total Purchases": {
    all: "Segment of individuals who made multiple purchases in the last 30 days created.",
    category: (name) => `Segment of individuals who made multiple purchases from ${name} in the last 30 days created.`,
  },
  "Total Views": {
    all: "Segment of individuals who viewed a product in the last 30 days created.",
    category: (name) => `Segment of individuals who viewed a product in ${name} in the last 30 days created.`,
  },
  "Cart Abandons": {
    all: "Segment of individuals who abandoned a product in cart in the last 30 days created.",
    category: (name) => `Segment of individuals who abandoned a product in cart in ${name} in the last 30 days created.`,
  },
};

// ── Products ──────────────────────────────────────────────────────────────

export type ProductAttribute = { name: string; value: string };
export type ProductVariant = { name: string; attributes: ProductAttribute[] };

export type Product = {
  id: string;
  name: string;
  swatchColor: string;
  interestScore: number;
  revenue: number;
  sales: number;
  views: number;
  cartAbandons: number;
  attributes: ProductAttribute[];
  variants: ProductVariant[];
};

export const productsByCategory: Record<string, Product[]> = {
  "electronics-audio": [
    {
      id: "p-audio-1",
      name: "Wireless Earbuds Pro",
      swatchColor: "#22d3ee",
      interestScore: 88,
      revenue: 42_300,
      sales: 612,
      views: 18_400,
      cartAbandons: 940,
      attributes: [
        { name: "Brand", value: "Acme Audio" },
        { name: "Battery Life", value: "24 hrs" },
        { name: "Connectivity", value: "Bluetooth 5.3" },
      ],
      variants: [
        { name: "Midnight Black", attributes: [{ name: "Color", value: "Black" }, { name: "SKU", value: "WEP-BLK" }] },
        { name: "Arctic White", attributes: [{ name: "Color", value: "White" }, { name: "SKU", value: "WEP-WHT" }] },
      ],
    },
    {
      id: "p-audio-2",
      name: "Over-Ear Studio Headphones",
      swatchColor: "#60a5fa",
      interestScore: 74,
      revenue: 38_900,
      sales: 402,
      views: 15_200,
      cartAbandons: 810,
      attributes: [
        { name: "Brand", value: "Acme Audio" },
        { name: "Driver Size", value: "40mm" },
        { name: "Connectivity", value: "Wired + Bluetooth" },
      ],
      variants: [
        { name: "Charcoal", attributes: [{ name: "Color", value: "Charcoal" }, { name: "SKU", value: "OSH-CHR" }] },
        { name: "Cream", attributes: [{ name: "Color", value: "Cream" }, { name: "SKU", value: "OSH-CRM" }] },
      ],
    },
  ],
  "electronics-wearables": [
    {
      id: "p-wear-1",
      name: "Fitness Tracker Band",
      swatchColor: "#34d399",
      interestScore: 81,
      revenue: 29_800,
      sales: 540,
      views: 14_100,
      cartAbandons: 690,
      attributes: [
        { name: "Brand", value: "Acme Fit" },
        { name: "Water Resistance", value: "5 ATM" },
        { name: "Battery Life", value: "7 days" },
      ],
      variants: [
        { name: "Small / Medium", attributes: [{ name: "Size", value: "S/M" }, { name: "SKU", value: "FTB-SM" }] },
        { name: "Large", attributes: [{ name: "Size", value: "L" }, { name: "SKU", value: "FTB-LG" }] },
      ],
    },
    {
      id: "p-wear-2",
      name: "Smart Watch Series 3",
      swatchColor: "#a3e635",
      interestScore: 69,
      revenue: 51_200,
      sales: 298,
      views: 16_800,
      cartAbandons: 980,
      attributes: [
        { name: "Brand", value: "Acme Fit" },
        { name: "Display", value: "AMOLED 1.4in" },
        { name: "Battery Life", value: "2 days" },
      ],
      variants: [
        {
          name: "41mm Graphite",
          attributes: [{ name: "Size", value: "41mm" }, { name: "Color", value: "Graphite" }, { name: "SKU", value: "SW3-41GR" }],
        },
        {
          name: "45mm Silver",
          attributes: [{ name: "Size", value: "45mm" }, { name: "Color", value: "Silver" }, { name: "SKU", value: "SW3-45SL" }],
        },
      ],
    },
  ],
  "apparel-mens": [
    {
      id: "p-mens-1",
      name: "Classic Fit Oxford Shirt",
      swatchColor: "#f59e0b",
      interestScore: 62,
      revenue: 18_400,
      sales: 820,
      views: 22_100,
      cartAbandons: 1_240,
      attributes: [
        { name: "Fabric", value: "100% Cotton" },
        { name: "Fit", value: "Classic" },
        { name: "Care", value: "Machine Wash" },
      ],
      variants: [
        { name: "Medium / Blue", attributes: [{ name: "Size", value: "M" }, { name: "Color", value: "Blue" }, { name: "SKU", value: "CFO-M-BLU" }] },
        { name: "Large / White", attributes: [{ name: "Size", value: "L" }, { name: "Color", value: "White" }, { name: "SKU", value: "CFO-L-WHT" }] },
      ],
    },
    {
      id: "p-mens-2",
      name: "Performance Running Jacket",
      swatchColor: "#fb923c",
      interestScore: 71,
      revenue: 24_700,
      sales: 511,
      views: 19_800,
      cartAbandons: 1_080,
      attributes: [
        { name: "Fabric", value: "Ripstop Nylon" },
        { name: "Weather Resistance", value: "Water Repellent" },
        { name: "Fit", value: "Athletic" },
      ],
      variants: [
        { name: "Medium / Black", attributes: [{ name: "Size", value: "M" }, { name: "Color", value: "Black" }, { name: "SKU", value: "PRJ-M-BLK" }] },
        { name: "Large / Navy", attributes: [{ name: "Size", value: "L" }, { name: "Color", value: "Navy" }, { name: "SKU", value: "PRJ-L-NVY" }] },
      ],
    },
  ],
  "apparel-womens": [
    {
      id: "p-womens-1",
      name: "High-Rise Stretch Jeans",
      swatchColor: "#ec4899",
      interestScore: 78,
      revenue: 31_200,
      sales: 690,
      views: 24_600,
      cartAbandons: 1_390,
      attributes: [
        { name: "Fabric", value: "98% Cotton / 2% Elastane" },
        { name: "Rise", value: "High" },
        { name: "Care", value: "Machine Wash Cold" },
      ],
      variants: [
        { name: "Size 6 / Indigo", attributes: [{ name: "Size", value: "6" }, { name: "Color", value: "Indigo" }, { name: "SKU", value: "HRJ-6-IND" }] },
        { name: "Size 10 / Black", attributes: [{ name: "Size", value: "10" }, { name: "Color", value: "Black" }, { name: "SKU", value: "HRJ-10-BLK" }] },
      ],
    },
    {
      id: "p-womens-2",
      name: "Wrap Midi Dress",
      swatchColor: "#f472b6",
      interestScore: 66,
      revenue: 22_900,
      sales: 458,
      views: 20_100,
      cartAbandons: 1_150,
      attributes: [
        { name: "Fabric", value: "Crepe" },
        { name: "Length", value: "Midi" },
        { name: "Care", value: "Dry Clean" },
      ],
      variants: [
        { name: "Small / Emerald", attributes: [{ name: "Size", value: "S" }, { name: "Color", value: "Emerald" }, { name: "SKU", value: "WMD-S-EMR" }] },
        { name: "Medium / Burgundy", attributes: [{ name: "Size", value: "M" }, { name: "Color", value: "Burgundy" }, { name: "SKU", value: "WMD-M-BUR" }] },
      ],
    },
  ],
  "home-garden": [
    {
      id: "p-home-1",
      name: "Ceramic Planter Set",
      swatchColor: "#10b981",
      interestScore: 58,
      revenue: 12_400,
      sales: 390,
      views: 14_200,
      cartAbandons: 610,
      attributes: [
        { name: "Material", value: "Ceramic" },
        { name: "Set Size", value: "3-Piece" },
        { name: "Drainage", value: "Yes" },
      ],
      variants: [
        { name: "Terracotta", attributes: [{ name: "Color", value: "Terracotta" }, { name: "SKU", value: "CPS-TER" }] },
        { name: "Matte White", attributes: [{ name: "Color", value: "White" }, { name: "SKU", value: "CPS-WHT" }] },
      ],
    },
    {
      id: "p-home-2",
      name: "Cordless Stick Vacuum",
      swatchColor: "#14b8a6",
      interestScore: 84,
      revenue: 46_800,
      sales: 312,
      views: 16_900,
      cartAbandons: 720,
      attributes: [
        { name: "Battery Life", value: "45 min" },
        { name: "Weight", value: "4.2 lbs" },
        { name: "Filtration", value: "HEPA" },
      ],
      variants: [
        { name: "Standard", attributes: [{ name: "Kit", value: "Standard" }, { name: "SKU", value: "CSV-STD" }] },
        { name: "Pro Kit", attributes: [{ name: "Kit", value: "Pro" }, { name: "SKU", value: "CSV-PRO" }] },
      ],
    },
  ],
  beauty: [
    {
      id: "p-beauty-1",
      name: "Vitamin C Serum",
      swatchColor: "#fbbf24",
      interestScore: 91,
      revenue: 34_200,
      sales: 980,
      views: 26_400,
      cartAbandons: 1_080,
      attributes: [
        { name: "Volume", value: "30ml" },
        { name: "Key Ingredient", value: "Vitamin C 15%" },
        { name: "Skin Type", value: "All Types" },
      ],
      variants: [
        { name: "30ml", attributes: [{ name: "Size", value: "30ml" }, { name: "SKU", value: "VCS-30" }] },
        { name: "60ml", attributes: [{ name: "Size", value: "60ml" }, { name: "SKU", value: "VCS-60" }] },
      ],
    },
    {
      id: "p-beauty-2",
      name: "Matte Lip Stain Duo",
      swatchColor: "#f43f5e",
      interestScore: 76,
      revenue: 15_600,
      sales: 720,
      views: 19_200,
      cartAbandons: 890,
      attributes: [
        { name: "Finish", value: "Matte" },
        { name: "Wear Time", value: "8 hrs" },
        { name: "Shade Count", value: "2" },
      ],
      variants: [
        { name: "Berry + Rose", attributes: [{ name: "Shades", value: "Berry, Rose" }, { name: "SKU", value: "MLS-BR" }] },
        { name: "Coral + Nude", attributes: [{ name: "Shades", value: "Coral, Nude" }, { name: "SKU", value: "MLS-CN" }] },
      ],
    },
  ],
  grocery: [
    {
      id: "p-grocery-1",
      name: "Organic Trail Mix, 12oz",
      swatchColor: "#84cc16",
      interestScore: 54,
      revenue: 8_200,
      sales: 610,
      views: 9_800,
      cartAbandons: 280,
      attributes: [
        { name: "Weight", value: "12oz" },
        { name: "Certification", value: "USDA Organic" },
        { name: "Allergens", value: "Tree Nuts" },
      ],
      variants: [
        { name: "Original", attributes: [{ name: "Flavor", value: "Original" }, { name: "SKU", value: "OTM-ORIG" }] },
        { name: "Dark Chocolate", attributes: [{ name: "Flavor", value: "Dark Chocolate" }, { name: "SKU", value: "OTM-DKCH" }] },
      ],
    },
    {
      id: "p-grocery-2",
      name: "Cold Brew Coffee Concentrate",
      swatchColor: "#78350f",
      interestScore: 63,
      revenue: 9_500,
      sales: 480,
      views: 7_500,
      cartAbandons: 180,
      attributes: [
        { name: "Volume", value: "32oz" },
        { name: "Roast", value: "Medium-Dark" },
        { name: "Caffeine", value: "Concentrate (dilute 1:3)" },
      ],
      variants: [
        { name: "Original", attributes: [{ name: "Flavor", value: "Original" }, { name: "SKU", value: "CBC-ORIG" }] },
        { name: "Vanilla", attributes: [{ name: "Flavor", value: "Vanilla" }, { name: "SKU", value: "CBC-VAN" }] },
      ],
    },
  ],
};

export const allProducts: Product[] = Object.values(productsByCategory).flat();

// ── Insight trends (Interest vs. Conversion), by window ──────────────────────

export type InsightWindow = "7d" | "30d" | "90d";
type Trend = { interest: number[]; conversion: number[] };

function buildTrend(baseInterest: number, baseConversion: number, momentum: number): Record<InsightWindow, Trend> {
  const points = 8;
  const build = (base: number, spread: number, mom: number) =>
    Array.from({ length: points }, (_, i) =>
      Math.max(1, Math.round(base + mom * i - spread + Math.round(Math.sin(i + base) * spread)))
    );
  return {
    "7d": { interest: build(baseInterest, 4, momentum * 0.4), conversion: build(baseConversion, 2, momentum * 0.2) },
    "30d": {
      interest: build(baseInterest - momentum * 2, 6, momentum * 0.6),
      conversion: build(baseConversion - momentum, 3, momentum * 0.3),
    },
    "90d": {
      interest: build(baseInterest - momentum * 5, 8, momentum),
      conversion: build(baseConversion - momentum * 2, 4, momentum * 0.5),
    },
  };
}

export const insightTrendByProduct: Record<string, Record<InsightWindow, Trend>> = {
  "p-audio-1": buildTrend(88, 34, 3),
  "p-audio-2": buildTrend(74, 28, 1),
  "p-wear-1": buildTrend(81, 31, 2),
  "p-wear-2": buildTrend(69, 24, -1),
  "p-mens-1": buildTrend(62, 19, 1),
  "p-mens-2": buildTrend(71, 26, 2),
  "p-womens-1": buildTrend(78, 30, 3),
  "p-womens-2": buildTrend(66, 22, 1),
  "p-home-1": buildTrend(58, 17, -1),
  "p-home-2": buildTrend(84, 33, 4),
  "p-beauty-1": buildTrend(91, 37, 5),
  "p-beauty-2": buildTrend(76, 27, 2),
  "p-grocery-1": buildTrend(54, 15, 0),
  "p-grocery-2": buildTrend(63, 20, 1),
};

export const insightTrendByCategory: Record<string, Record<InsightWindow, Trend>> = {
  electronics: buildTrend(80, 30, 3),
  "electronics-audio": buildTrend(82, 31, 3),
  "electronics-wearables": buildTrend(76, 28, 1),
  apparel: buildTrend(70, 25, 2),
  "apparel-mens": buildTrend(67, 23, 1),
  "apparel-womens": buildTrend(73, 27, 2),
  "home-garden": buildTrend(71, 25, 1),
  beauty: buildTrend(84, 33, 4),
  grocery: buildTrend(59, 18, 0),
};

// ── Filter panel (static/visual only) ────────────────────────────────────────

export const filterOptions = {
  priceRanges: ["Under $25", "$25–$50", "$50–$100", "$100+"],
  attributes: ["In Stock", "On Sale", "New Arrival"],
};
