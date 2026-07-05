# Product Catalog Case Study — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new portfolio case study page at `/work/product-catalog` — a narrative-scroll product page centered on one fully interactive desktop-web-app mockup (category tree, KPI header, Finder-style listing panel, filter panel, analytics panel), using only original HTML/CSS/React components and synthetic demo data — then link it from the homepage.

**Architecture:** A typed `content.ts` config feeds presentational components under `src/components/catalog/`. The interactive mockup is a single root client component (`ProductCatalogApp`) holding all cross-component state, composing purpose-built children (`CategoryTree`, `KpiHeader`, `ListingPanel`, `FilterPanel`, `AnalyticsPanel`). Chart primitives and motion helpers are reused directly from `src/components/pulse/` rather than duplicated. The page (`src/app/work/product-catalog/page.tsx`) is a Server Component composing client section components under `src/components/catalog/sections/`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react — all already dependencies (added previously for the Pulse case study, no new installs needed).

**Verification approach:** No test framework in this repo (`package.json` has no test script). Per-task verification is `npx tsc --noEmit` + `npm run lint`. There is a dedicated full QA task (Task 19) with a live browser click-through, and a pre-merge deliverables task (Task 20).

**Source of truth:** `docs/superpowers/specs/2026-07-05-product-catalog-design.md`.

---

### Task 1: Content config

**Files:**
- Create: `src/components/catalog/content.ts`

- [ ] **Step 1: Create the content file**

```ts
// src/components/catalog/content.ts

export type FactBadge = { label: string; value: string };

export const heroFacts: FactBadge[] = [
  { label: "Product", value: "0→1 retail intelligence" },
  { label: "Impact", value: "$1.1M+ influenced ARR" },
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
  "Real-time filtering and saved filter views",
  "Bulk actions across selected products or categories",
  "AI-generated category-level narrative summaries",
  "Deeper segment-builder integration from the analytics panel",
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
  revenue: KpiValue;
  purchases: KpiValue;
  views: KpiValue;
  cartAbandons: KpiValue;
};

export const kpisByScope: Record<string, CategoryKpis> = {
  all: {
    revenue: { value: 1_284_500, deltaPct: 8 },
    purchases: { value: 18_420, deltaPct: 5 },
    views: { value: 412_800, deltaPct: 12 },
    cartAbandons: { value: 9_840, deltaPct: -6 },
  },
  electronics: {
    revenue: { value: 412_300, deltaPct: 11 },
    purchases: { value: 5_210, deltaPct: 7 },
    views: { value: 128_400, deltaPct: 9 },
    cartAbandons: { value: 2_980, deltaPct: -3 },
  },
  "electronics-audio": {
    revenue: { value: 268_400, deltaPct: 14 },
    purchases: { value: 3_120, deltaPct: 9 },
    views: { value: 78_200, deltaPct: 11 },
    cartAbandons: { value: 1_640, deltaPct: -5 },
  },
  "electronics-wearables": {
    revenue: { value: 143_900, deltaPct: 6 },
    purchases: { value: 2_090, deltaPct: 4 },
    views: { value: 50_200, deltaPct: 6 },
    cartAbandons: { value: 1_340, deltaPct: 2 },
  },
  apparel: {
    revenue: { value: 356_800, deltaPct: 5 },
    purchases: { value: 6_840, deltaPct: 3 },
    views: { value: 142_600, deltaPct: 8 },
    cartAbandons: { value: 3_210, deltaPct: 4 },
  },
  "apparel-mens": {
    revenue: { value: 168_200, deltaPct: 4 },
    purchases: { value: 3_210, deltaPct: 2 },
    views: { value: 68_400, deltaPct: 6 },
    cartAbandons: { value: 1_520, deltaPct: 3 },
  },
  "apparel-womens": {
    revenue: { value: 188_600, deltaPct: 6 },
    purchases: { value: 3_630, deltaPct: 4 },
    views: { value: 74_200, deltaPct: 9 },
    cartAbandons: { value: 1_690, deltaPct: 5 },
  },
  "home-garden": {
    revenue: { value: 221_400, deltaPct: 9 },
    purchases: { value: 2_980, deltaPct: 6 },
    views: { value: 65_800, deltaPct: 7 },
    cartAbandons: { value: 1_480, deltaPct: -8 },
  },
  beauty: {
    revenue: { value: 186_300, deltaPct: 13 },
    purchases: { value: 2_640, deltaPct: 10 },
    views: { value: 58_900, deltaPct: 15 },
    cartAbandons: { value: 1_210, deltaPct: -11 },
  },
  grocery: {
    revenue: { value: 107_700, deltaPct: 3 },
    purchases: { value: 750, deltaPct: 1 },
    views: { value: 17_300, deltaPct: 2 },
    cartAbandons: { value: 460, deltaPct: 1 },
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
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors (this file has no imports from other new files yet).

- [ ] **Step 3: Commit**

```bash
git add src/components/catalog/content.ts
git commit -m "Add content config for Product Catalog case study"
```

---

### Task 2: BrowserFrame component

**Files:**
- Create: `src/components/catalog/BrowserFrame.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/catalog/BrowserFrame.tsx
import type { ReactNode } from "react";

type BrowserFrameProps = {
  children: ReactNode;
  className?: string;
};

export default function BrowserFrame({ children, className = "" }: BrowserFrameProps) {
  return (
    <div
      className={`mx-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl shadow-black/50 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-950/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#f43f5e]" />
        <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
        <span className="h-3 w-3 rounded-full bg-[#10b981]" />
        <div className="ml-4 flex-1 rounded-md bg-white/5 px-3 py-1 text-center text-[11px] text-slate-500">
          catalog.internal/products
        </div>
      </div>
      <div className="bg-slate-950">{children}</div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/catalog/BrowserFrame.tsx
git commit -m "Add BrowserFrame component for Product Catalog case study"
```

---

### Task 3: CategoryTree component

**Files:**
- Create: `src/components/catalog/CategoryTree.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/catalog/CategoryTree.tsx
"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Search } from "lucide-react";
import { categoryTree, type CategoryNode } from "./content";

type CategoryTreeProps = {
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
};

function TreeNode({
  node,
  depth,
  selectedCategoryId,
  onSelectCategory,
}: {
  node: CategoryNode;
  depth: number;
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = !!node.children?.length;
  const isSelected = selectedCategoryId === node.id;

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 rounded-md py-1.5 pr-2 text-[13px] transition-colors ${
          isSelected ? "bg-cyan-300/10 text-cyan-300" : "text-slate-300 hover:bg-white/5"
        }`}
        style={{ paddingLeft: 8 + depth * 14 }}
      >
        {hasChildren ? (
          <button
            type="button"
            aria-label={expanded ? "Collapse" : "Expand"}
            onClick={() => setExpanded((v) => !v)}
            className="shrink-0"
          >
            {expanded ? (
              <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 text-slate-500" />
            ) : (
              <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-500" />
            )}
          </button>
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <button
          type="button"
          onClick={() => onSelectCategory(node.id)}
          className="flex flex-1 items-center justify-between gap-2 text-left"
        >
          <span className="flex-1 truncate">{node.name}</span>
          <span className="shrink-0 text-[11px] text-slate-500">{node.productCount}</span>
        </button>
      </div>
      {hasChildren && expanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={onSelectCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryTree({ selectedCategoryId, onSelectCategory }: CategoryTreeProps) {
  const totalCount = categoryTree.reduce((sum, node) => sum + node.productCount, 0);

  return (
    <div className="flex h-full flex-col bg-neutral-950/40 p-3">
      <div className="mb-3 flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5">
        <Search aria-hidden="true" className="h-3.5 w-3.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search categories"
          className="w-full bg-transparent text-[12px] text-slate-300 placeholder:text-slate-600 focus:outline-none"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          className={`mb-1 flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[13px] font-medium transition-colors ${
            selectedCategoryId === "all" ? "bg-cyan-300/10 text-cyan-300" : "text-slate-200 hover:bg-white/5"
          }`}
        >
          <span>All Products</span>
          <span className="text-[11px] text-slate-500">{totalCount}</span>
        </button>
        {categoryTree.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={onSelectCategory}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/catalog/CategoryTree.tsx
git commit -m "Add CategoryTree component for Product Catalog case study"
```

---

### Task 4: KpiHeader component

**Files:**
- Create: `src/components/catalog/KpiHeader.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/catalog/KpiHeader.tsx
"use client";

import { Search } from "lucide-react";
import TrendBadge from "../pulse/charts/TrendBadge";
import { kpisByScope, allCategories } from "./content";

type KpiHeaderProps = { scopeId: string };

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

function formatCount(value: number): string {
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return `${value}`;
}

export default function KpiHeader({ scopeId }: KpiHeaderProps) {
  const kpis = kpisByScope[scopeId] ?? kpisByScope.all;
  const scopeLabel =
    scopeId === "all" ? "All Products" : allCategories.find((c) => c.id === scopeId)?.name ?? "All Products";

  const cards = [
    { label: "Total Revenue", value: formatCurrency(kpis.revenue.value), deltaPct: kpis.revenue.deltaPct, invert: false },
    { label: "Total Purchases", value: formatCount(kpis.purchases.value), deltaPct: kpis.purchases.deltaPct, invert: false },
    { label: "Total Views", value: formatCount(kpis.views.value), deltaPct: kpis.views.deltaPct, invert: false },
    { label: "Cart Abandons", value: formatCount(kpis.cartAbandons.value), deltaPct: kpis.cartAbandons.deltaPct, invert: true },
  ];

  return (
    <div className="border-b border-white/10 bg-neutral-950/60 p-4">
      <div className="mb-3 flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
        <Search aria-hidden="true" className="h-4 w-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search products"
          className="w-full bg-transparent text-[13px] text-slate-300 placeholder:text-slate-600 focus:outline-none"
        />
      </div>
      <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">{scopeLabel} — Last 30 Days</p>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <p className="text-[10px] uppercase tracking-wide text-slate-500">{card.label}</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-lg font-semibold text-slate-100">{card.value}</p>
              <TrendBadge deltaPct={card.deltaPct} invert={card.invert} />
            </div>
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-cyan-300/20 bg-cyan-300/[0.06] py-1 text-[10px] font-medium text-cyan-300"
            >
              Create Segment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/catalog/KpiHeader.tsx
git commit -m "Add KpiHeader component for Product Catalog case study"
```

---

### Task 5: ListView and GridView components

**Files:**
- Create: `src/components/catalog/ListView.tsx`
- Create: `src/components/catalog/GridView.tsx`

- [ ] **Step 1: Create ListView**

```tsx
// src/components/catalog/ListView.tsx
import { Folder } from "lucide-react";
import type { CategoryNode, Product } from "./content";

type ListViewProps = {
  categories: CategoryNode[];
  products: Product[];
  onCategoryDoubleClick: (id: string) => void;
  onCategorySingleClick: (id: string) => void;
  onProductClick: (id: string) => void;
};

export default function ListView({
  categories,
  products,
  onCategoryDoubleClick,
  onCategorySingleClick,
  onProductClick,
}: ListViewProps) {
  if (categories.length > 0) {
    return (
      <div className="flex flex-col">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategorySingleClick(category.id)}
            onDoubleClick={() => onCategoryDoubleClick(category.id)}
            className="flex items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-white/5"
          >
            <Folder aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-300" />
            <span className="flex-1 truncate text-[13px] text-slate-200">{category.name}</span>
            <span className="text-[11px] text-slate-500">{category.productCount} products</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[1.6fr_0.7fr_0.9fr_0.7fr_0.8fr_0.9fr] gap-2 border-b border-white/10 px-2 pb-2 text-[10px] uppercase tracking-wide text-slate-500">
        <span>Product</span>
        <span className="text-right">Interest</span>
        <span className="text-right">Revenue</span>
        <span className="text-right">Sales</span>
        <span className="text-right">Views</span>
        <span className="text-right">Cart Abandons</span>
      </div>
      {products.map((product) => (
        <button
          key={product.id}
          type="button"
          onClick={() => onProductClick(product.id)}
          className="grid grid-cols-[1.6fr_0.7fr_0.9fr_0.7fr_0.8fr_0.9fr] items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-white/5"
        >
          <span className="flex items-center gap-2 truncate text-[13px] text-slate-200">
            <span className="h-6 w-6 shrink-0 rounded" style={{ backgroundColor: product.swatchColor }} />
            <span className="truncate">{product.name}</span>
          </span>
          <span className="text-right text-[12px] text-slate-300">{product.interestScore}</span>
          <span className="text-right text-[12px] text-slate-300">${(product.revenue / 1000).toFixed(1)}K</span>
          <span className="text-right text-[12px] text-slate-300">{product.sales}</span>
          <span className="text-right text-[12px] text-slate-300">{(product.views / 1000).toFixed(1)}K</span>
          <span className="text-right text-[12px] text-slate-300">{product.cartAbandons}</span>
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create GridView**

```tsx
// src/components/catalog/GridView.tsx
import { Folder, Eye, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import type { CategoryNode, Product } from "./content";

type GridViewProps = {
  categories: CategoryNode[];
  products: Product[];
  onCategoryDoubleClick: (id: string) => void;
  onCategorySingleClick: (id: string) => void;
  onProductClick: (id: string) => void;
};

export default function GridView({
  categories,
  products,
  onCategoryDoubleClick,
  onCategorySingleClick,
  onProductClick,
}: GridViewProps) {
  if (categories.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategorySingleClick(category.id)}
            onDoubleClick={() => onCategoryDoubleClick(category.id)}
            className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-4 hover:bg-white/5"
          >
            <Folder aria-hidden="true" className="h-8 w-8 text-cyan-300" />
            <span className="text-[12px] font-medium text-slate-200">{category.name}</span>
            <span className="text-[10px] text-slate-500">{category.productCount} products</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {products.map((product) => (
        <button
          key={product.id}
          type="button"
          onClick={() => onProductClick(product.id)}
          className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-left hover:bg-white/5"
        >
          <span className="h-16 w-full shrink-0 rounded" style={{ backgroundColor: product.swatchColor }} />
          <span className="truncate text-[12px] font-medium text-slate-200">{product.name}</span>
          <div className="grid grid-cols-2 gap-1.5">
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <TrendingUp aria-hidden="true" className="h-3 w-3 text-emerald-400" />
              {product.interestScore}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <DollarSign aria-hidden="true" className="h-3 w-3 text-cyan-300" />
              {(product.revenue / 1000).toFixed(1)}K
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <Eye aria-hidden="true" className="h-3 w-3 text-slate-400" />
              {(product.views / 1000).toFixed(1)}K
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <ShoppingCart aria-hidden="true" className="h-3 w-3 text-amber-400" />
              {product.cartAbandons}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/catalog/ListView.tsx src/components/catalog/GridView.tsx
git commit -m "Add ListView and GridView components for Product Catalog case study"
```

---

### Task 6: ListingPanel component

**Files:**
- Create: `src/components/catalog/ListingPanel.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/catalog/ListingPanel.tsx
"use client";

import { useState } from "react";
import { List, LayoutGrid, Filter as FilterIcon, ChevronLeft } from "lucide-react";
import { categoryTree, allCategories, productsByCategory, type CategoryNode } from "./content";
import ListView from "./ListView";
import GridView from "./GridView";
import type { SelectedEntity } from "./ProductCatalogApp";

type ListingPanelProps = {
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  onFilterToggle: () => void;
  onSelectEntity: (entity: SelectedEntity) => void;
};

function getChildrenOf(folderId: string): CategoryNode[] {
  if (folderId === "all") return categoryTree;
  const node = allCategories.find((c) => c.id === folderId);
  return node?.children ?? [];
}

export default function ListingPanel({ viewMode, onViewModeChange, onFilterToggle, onSelectEntity }: ListingPanelProps) {
  const [currentFolderId, setCurrentFolderId] = useState("all");

  const folderNode = currentFolderId === "all" ? null : allCategories.find((c) => c.id === currentFolderId) ?? null;
  const childCategories = getChildrenOf(currentFolderId);
  const isLeafFolder = currentFolderId !== "all" && childCategories.length === 0;
  const products = isLeafFolder ? productsByCategory[currentFolderId] ?? [] : [];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          {currentFolderId !== "all" && (
            <button
              type="button"
              onClick={() => setCurrentFolderId("all")}
              className="flex items-center gap-1 text-[12px] text-slate-400 hover:text-slate-200"
            >
              <ChevronLeft aria-hidden="true" className="h-3.5 w-3.5" />
              All Products
            </button>
          )}
          {folderNode && <span className="text-[12px] font-medium text-slate-200">/ {folderNode.name}</span>}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-md border border-white/10">
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              aria-pressed={viewMode === "list"}
              aria-label="List view"
              className={`p-1.5 ${viewMode === "list" ? "bg-cyan-300/15 text-cyan-300" : "text-slate-500"}`}
            >
              <List aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              aria-pressed={viewMode === "grid"}
              aria-label="Grid view"
              className={`p-1.5 ${viewMode === "grid" ? "bg-cyan-300/15 text-cyan-300" : "text-slate-500"}`}
            >
              <LayoutGrid aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={onFilterToggle}
            className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-[12px] text-slate-300 hover:bg-white/5"
          >
            <FilterIcon aria-hidden="true" className="h-3.5 w-3.5" />
            Filter
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {viewMode === "list" ? (
          <ListView
            categories={childCategories}
            products={products}
            onCategoryDoubleClick={setCurrentFolderId}
            onCategorySingleClick={(id) => onSelectEntity({ type: "category", id })}
            onProductClick={(id) => onSelectEntity({ type: "product", id })}
          />
        ) : (
          <GridView
            categories={childCategories}
            products={products}
            onCategoryDoubleClick={setCurrentFolderId}
            onCategorySingleClick={(id) => onSelectEntity({ type: "category", id })}
            onProductClick={(id) => onSelectEntity({ type: "product", id })}
          />
        )}
      </div>
    </div>
  );
}
```

Note: this imports `type SelectedEntity` from `./ProductCatalogApp`, which doesn't exist yet — that's expected, it's created in Task 10. The typecheck in this task's Step 2 **will fail** until Task 10 is done; that's fine, this whole feature's components form one dependency graph, so treat Tasks 3–10 as "in progress" until Task 10 lands, then run a full `npx tsc --noEmit` at the end of Task 10 to confirm everything together. Skip the typecheck sub-step for this task specifically.

- [ ] **Step 2: Lint only (skip typecheck until Task 10)**

Run: `npm run lint`
Expected: no errors (lint doesn't resolve cross-file types the way `tsc` does, so this should pass even with `ProductCatalogApp.tsx` not yet created).

- [ ] **Step 3: Commit**

```bash
git add src/components/catalog/ListingPanel.tsx
git commit -m "Add ListingPanel component for Product Catalog case study"
```

---

### Task 7: FilterPanel component

**Files:**
- Create: `src/components/catalog/FilterPanel.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/catalog/FilterPanel.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { usePrefersReducedMotion } from "../pulse/usePrefersReducedMotion";
import { filterOptions } from "./content";

type FilterPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function FilterPanel({ open, onClose }: FilterPanelProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-10 flex flex-col bg-neutral-950 p-3"
          initial={reduceMotion ? { opacity: 1 } : { x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { x: "-100%", opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Filter</p>
            <button type="button" onClick={onClose} aria-label="Close filter panel">
              <X aria-hidden="true" className="h-4 w-4 text-slate-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <p className="mb-2 text-[10px] uppercase tracking-wide text-slate-500">Price</p>
            <div className="mb-4 flex flex-col gap-1.5">
              {filterOptions.priceRanges.map((range) => (
                <label key={range} className="flex items-center gap-2 text-[12px] text-slate-300">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-white/20 bg-transparent" />
                  {range}
                </label>
              ))}
            </div>
            <p className="mb-2 text-[10px] uppercase tracking-wide text-slate-500">Attributes</p>
            <div className="flex flex-col gap-1.5">
              {filterOptions.attributes.map((attribute) => (
                <label key={attribute} className="flex items-center gap-2 text-[12px] text-slate-300">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-white/20 bg-transparent" />
                  {attribute}
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/catalog/FilterPanel.tsx
git commit -m "Add FilterPanel component for Product Catalog case study"
```

---

### Task 8: InsightsTab, AttributesTab, VariantsTab components

**Files:**
- Create: `src/components/catalog/InsightsTab.tsx`
- Create: `src/components/catalog/AttributesTab.tsx`
- Create: `src/components/catalog/VariantsTab.tsx`

- [ ] **Step 1: Create InsightsTab**

```tsx
// src/components/catalog/InsightsTab.tsx
"use client";

import { useState } from "react";
import DualLineChart from "../pulse/charts/DualLineChart";
import { insightTrendByProduct, insightTrendByCategory, type InsightWindow } from "./content";
import type { SelectedEntity } from "./ProductCatalogApp";

type InsightsTabProps = { entity: NonNullable<SelectedEntity> };

const windows: { id: InsightWindow; label: string }[] = [
  { id: "7d", label: "7D" },
  { id: "30d", label: "30D" },
  { id: "90d", label: "90D" },
];

export default function InsightsTab({ entity }: InsightsTabProps) {
  const [window, setWindow] = useState<InsightWindow>("30d");

  const trendSource = entity.type === "product" ? insightTrendByProduct[entity.id] : insightTrendByCategory[entity.id];
  const trend = trendSource?.[window];

  if (!trend) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex rounded-lg border border-white/10 bg-white/[0.04] p-0.5">
        {windows.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => setWindow(w.id)}
            aria-pressed={window === w.id}
            className={`flex-1 rounded-md py-1 text-[10px] font-semibold uppercase tracking-wide transition-colors ${
              window === w.id ? "bg-cyan-300/15 text-cyan-300" : "text-slate-500"
            }`}
          >
            {w.label}
          </button>
        ))}
      </div>

      <div>
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Interest vs. Conversion
        </p>
        <DualLineChart
          series={[
            { label: "Interest", color: "#22d3ee", data: trend.interest },
            { label: "Conversion", color: "#34d399", data: trend.conversion },
          ]}
        />
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Create Segment</p>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            className="rounded-md border border-white/10 px-2.5 py-1.5 text-left text-[11px] text-slate-300 hover:bg-white/5"
          >
            Interested individuals
          </button>
          <button
            type="button"
            className="rounded-md border border-white/10 px-2.5 py-1.5 text-left text-[11px] text-slate-300 hover:bg-white/5"
          >
            Converted individuals
          </button>
          <button
            type="button"
            className="rounded-md border border-white/10 px-2.5 py-1.5 text-left text-[11px] text-slate-300 hover:bg-white/5"
          >
            Interested minus converted
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create AttributesTab**

```tsx
// src/components/catalog/AttributesTab.tsx
import type { Product } from "./content";

type AttributesTabProps = { product: Product };

export default function AttributesTab({ product }: AttributesTabProps) {
  return (
    <div className="flex flex-col gap-2">
      {product.attributes.map((attribute) => (
        <div key={attribute.name} className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-[12px] text-slate-400">{attribute.name}</span>
          <span className="text-[12px] font-medium text-slate-200">{attribute.value}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create VariantsTab**

```tsx
// src/components/catalog/VariantsTab.tsx
import type { Product } from "./content";

type VariantsTabProps = { product: Product };

export default function VariantsTab({ product }: VariantsTabProps) {
  return (
    <div className="flex flex-col gap-3">
      {product.variants.map((variant) => (
        <div key={variant.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="mb-2 text-[12px] font-semibold text-slate-200">{variant.name}</p>
          <div className="flex flex-col gap-1">
            {variant.attributes.map((attribute) => (
              <div key={attribute.name} className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{attribute.name}</span>
                <span className="text-slate-300">{attribute.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Lint only (InsightsTab depends on `ProductCatalogApp.tsx`, not yet created — same as Task 6)**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/catalog/InsightsTab.tsx src/components/catalog/AttributesTab.tsx src/components/catalog/VariantsTab.tsx
git commit -m "Add AnalyticsPanel tab components for Product Catalog case study"
```

---

### Task 9: AnalyticsPanel component

**Files:**
- Create: `src/components/catalog/AnalyticsPanel.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/catalog/AnalyticsPanel.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { usePrefersReducedMotion } from "../pulse/usePrefersReducedMotion";
import { allCategories, allProducts } from "./content";
import InsightsTab from "./InsightsTab";
import AttributesTab from "./AttributesTab";
import VariantsTab from "./VariantsTab";
import type { SelectedEntity } from "./ProductCatalogApp";

type AnalyticsPanelProps = {
  entity: SelectedEntity;
  onClose: () => void;
};

type Tab = "insights" | "attributes" | "variants";

export default function AnalyticsPanel({ entity, onClose }: AnalyticsPanelProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState<Tab>("insights");

  const product = entity?.type === "product" ? allProducts.find((p) => p.id === entity.id) : undefined;
  const category = entity?.type === "category" ? allCategories.find((c) => c.id === entity.id) : undefined;

  const tabs: { id: Tab; label: string }[] =
    entity?.type === "product"
      ? [
          { id: "insights", label: "Insights" },
          { id: "attributes", label: "Attributes" },
          { id: "variants", label: "Variants" },
        ]
      : [{ id: "insights", label: "Insights" }];

  return (
    <AnimatePresence onExitComplete={() => setActiveTab("insights")}>
      {entity && (
        <motion.div
          className="absolute inset-y-0 right-0 z-20 flex w-80 flex-col border-l border-white/10 bg-neutral-950 shadow-2xl"
          initial={reduceMotion ? { opacity: 1 } : { x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { x: "100%", opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 border-b border-white/10 p-3">
            <span
              className="h-10 w-10 shrink-0 rounded"
              style={{ backgroundColor: product?.swatchColor ?? "#22d3ee" }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-slate-100">{product?.name ?? category?.name}</p>
              <p className="text-[11px] text-slate-500">
                {product ? `${product.sales} sales · In Stock` : `${category?.productCount ?? 0} products`}
              </p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close analytics panel">
              <X aria-hidden="true" className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          <div className="flex border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`flex-1 py-2 text-[11px] font-medium uppercase tracking-wide transition-colors ${
                  activeTab === tab.id ? "border-b-2 border-cyan-300 text-cyan-300" : "text-slate-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {activeTab === "insights" && entity && <InsightsTab entity={entity} />}
            {activeTab === "attributes" && product && <AttributesTab product={product} />}
            {activeTab === "variants" && product && <VariantsTab product={product} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Lint only (depends on `ProductCatalogApp.tsx`, not yet created)**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/catalog/AnalyticsPanel.tsx
git commit -m "Add AnalyticsPanel component for Product Catalog case study"
```

---

### Task 10: ProductCatalogApp (root component)

**Files:**
- Create: `src/components/catalog/ProductCatalogApp.tsx`

This closes the dependency loop from Tasks 6, 8, and 9 — after this task, run a full typecheck across everything.

- [ ] **Step 1: Create the component**

```tsx
// src/components/catalog/ProductCatalogApp.tsx
"use client";

import { useState } from "react";
import BrowserFrame from "./BrowserFrame";
import CategoryTree from "./CategoryTree";
import KpiHeader from "./KpiHeader";
import ListingPanel from "./ListingPanel";
import FilterPanel from "./FilterPanel";
import AnalyticsPanel from "./AnalyticsPanel";

export type SelectedEntity = { type: "product" | "category"; id: string } | null;

export default function ProductCatalogApp() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>(null);

  return (
    <BrowserFrame>
      <div className="relative flex h-[640px] w-full overflow-hidden">
        <div className="relative h-full w-56 shrink-0 border-r border-white/10">
          <CategoryTree selectedCategoryId={selectedCategoryId} onSelectCategory={setSelectedCategoryId} />
          <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
        </div>
        <div className="flex h-full flex-1 flex-col">
          <KpiHeader scopeId={selectedCategoryId} />
          <div className="flex-1 overflow-hidden">
            <ListingPanel
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onFilterToggle={() => setFilterOpen((v) => !v)}
              onSelectEntity={setSelectedEntity}
            />
          </div>
        </div>
        <AnalyticsPanel entity={selectedEntity} onClose={() => setSelectedEntity(null)} />
      </div>
    </BrowserFrame>
  );
}
```

Note the layout: `AnalyticsPanel` is a sibling of the two columns inside the outer `relative flex h-[640px] w-full overflow-hidden` container, positioned `absolute inset-y-0 right-0` — so it spans the *full height* of the app (both the KPI-header row and the listing panel below it), not just the listing panel area. This matches the confirmed wireframe from design (the analytics panel overlays the full right edge, top to bottom), not just the area below the KPI header.

- [ ] **Step 2: Full typecheck across all catalog components**

Run: `npx tsc --noEmit`
Expected: no errors. This is the first point where `SelectedEntity` (used by `ListingPanel.tsx`, `InsightsTab.tsx`, and `AnalyticsPanel.tsx`) actually resolves, since it's exported from this file.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/catalog/ProductCatalogApp.tsx
git commit -m "Add ProductCatalogApp root component for Product Catalog case study"
```

---

### Task 11: Hero section

**Files:**
- Create: `src/components/catalog/sections/Hero.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/catalog/sections/Hero.tsx
"use client";

import { Boxes } from "lucide-react";
import { heroFacts, disclaimerLabel, disclaimerBody } from "../content";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-20">
      <div className="mb-4 flex items-center gap-2 text-cyan-300">
        <Boxes aria-hidden="true" className="h-6 w-6" />
        <p className="text-sm font-medium uppercase tracking-[0.35em]">Product Case Study</p>
      </div>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">Product Catalog</h1>
      <p className="mt-4 max-w-2xl text-xl text-slate-300 md:text-2xl">
        A 0→1 retail product-intelligence capability that turned scattered catalog data into one browsable,
        drillable view.
      </p>
      <p className="mt-4 max-w-2xl leading-7 text-slate-400">
        Merchandisers needed to see which products were converting interest into sales — and which weren&apos;t —
        without exporting spreadsheets. This capability became a cited differentiator across enterprise sales
        opportunities.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {heroFacts.map((fact) => (
          <div key={fact.label} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">{fact.label}</p>
            <p className="text-sm font-semibold text-slate-100">{fact.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
        <p className="text-sm leading-7 text-slate-300">
          <span className="font-semibold text-cyan-300">{disclaimerLabel} — </span>
          {disclaimerBody}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/catalog/sections/Hero.tsx
git commit -m "Add Hero section for Product Catalog case study"
```

---

### Task 12: CaseStudyOverview, MyRole, Outcome, Closing sections

**Files:**
- Create: `src/components/catalog/sections/CaseStudyOverview.tsx`
- Create: `src/components/catalog/sections/MyRole.tsx`
- Create: `src/components/catalog/sections/Outcome.tsx`
- Create: `src/components/catalog/sections/Closing.tsx`

These four mirror `src/components/pulse/sections/{CaseStudyOverview,MyRole,Outcome,Closing}.tsx` exactly in structure, swapping the Pulse content import for the Catalog one. `MyRole` omits Pulse's velocity-metrics grid — there's no equivalent set of real numbers for this project to show there, and the design non-goals rule out fabricating any.

- [ ] **Step 1: Create CaseStudyOverview**

```tsx
// src/components/catalog/sections/CaseStudyOverview.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";
import { caseStudyOverview } from "../content";

export default function CaseStudyOverview() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Case Study</p>
      <h2 className="mb-10 text-3xl font-semibold md:text-4xl">The story behind the product</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {caseStudyOverview.map((card, index) => (
          <motion.div
            key={card.eyebrow}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            {...revealAnimation(
              reduceMotion,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0 },
              { duration: 0.4, delay: index * 0.1 }
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{card.eyebrow}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-100">{card.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create MyRole**

```tsx
// src/components/catalog/sections/MyRole.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";
import { roleLeadership, roleTechnical } from "../content";

export default function MyRole() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">My Role</p>
        <h2 className="mb-10 text-3xl font-semibold md:text-4xl">Sole product owner, concept to shipped capability</h2>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Product Leadership</p>
          <ul className="flex flex-col gap-2.5">
            {roleLeadership.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-7 text-slate-300">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Technical Direction</p>
          <ul className="flex flex-col gap-2.5">
            {roleTechnical.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-7 text-slate-300">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Outcome**

```tsx
// src/components/catalog/sections/Outcome.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";
import { outcomeStatements, nextUp } from "../content";

export default function Outcome() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Outcome</p>
        <h2 className="mb-10 text-3xl font-semibold md:text-4xl">What happened</h2>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ul className="flex flex-col gap-4">
          {outcomeStatements.map((statement) => (
            <li key={statement} className="flex items-start gap-3 leading-7 text-slate-300">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              {statement}
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            What I&apos;d Build Next
          </p>
          <ul className="flex flex-col gap-3">
            {nextUp.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create Closing**

```tsx
// src/components/catalog/sections/Closing.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";
import { closingStatement } from "../content";

export default function Closing() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <motion.div
        className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-8 text-center md:p-12"
        {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Why This Matters</p>
        <p className="mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-snug text-slate-100 md:text-3xl">
          {closingStatement}
        </p>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 5: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/catalog/sections/CaseStudyOverview.tsx src/components/catalog/sections/MyRole.tsx src/components/catalog/sections/Outcome.tsx src/components/catalog/sections/Closing.tsx
git commit -m "Add CaseStudyOverview, MyRole, Outcome, and Closing sections for Product Catalog case study"
```

---

### Task 13: CatalogAppSection (interactive centerpiece)

**Files:**
- Create: `src/components/catalog/sections/CatalogAppSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/catalog/sections/CatalogAppSection.tsx
"use client";

import { motion } from "framer-motion";
import ProductCatalogApp from "../ProductCatalogApp";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";

export default function CatalogAppSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div
        className="mb-10 text-center"
        {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Try It</p>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Browse a category. Open a product.</h2>
        <p className="mx-auto max-w-2xl leading-7 text-slate-300">
          Click through the category tree on the left, switch between list and grid view, or click any product to
          open its analytics panel — everything below is a working, original recreation of the interaction model,
          running on synthetic data.
        </p>
      </motion.div>

      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1 })}>
        <ProductCatalogApp />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/catalog/sections/CatalogAppSection.tsx
git commit -m "Add CatalogAppSection (interactive centerpiece) for Product Catalog case study"
```

---

### Task 14: Assemble the page

**Files:**
- Create: `src/app/work/product-catalog/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// src/app/work/product-catalog/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/catalog/sections/Hero";
import CaseStudyOverview from "@/components/catalog/sections/CaseStudyOverview";
import MyRole from "@/components/catalog/sections/MyRole";
import CatalogAppSection from "@/components/catalog/sections/CatalogAppSection";
import Outcome from "@/components/catalog/sections/Outcome";
import Closing from "@/components/catalog/sections/Closing";

export const metadata: Metadata = {
  title: "Product Catalog — Dustin Hartung",
  description:
    "A product case study: a 0→1 retail product-intelligence capability that became a competitive differentiator and influenced $1.1M+ in ARR, rebuilt as an original portfolio demonstration.",
};

export default function ProductCatalogPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Hero />
      <CaseStudyOverview />
      <MyRole />
      <CatalogAppSection />
      <Outcome />
      <Closing />
    </main>
  );
}
```

- [ ] **Step 2: Full project typecheck, lint, and build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three succeed with exit code 0; the build output lists `/work/product-catalog` as a new static route.

- [ ] **Step 3: Commit**

```bash
git add src/app/work/product-catalog/page.tsx
git commit -m "Assemble Product Catalog case study page"
```

---

### Task 15: Update homepage Featured Work card

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Read the current "Product Catalog" work item**

Run: `grep -n "Product Catalog" -A 5 src/app/page.tsx`
Expected: shows the existing entry with `title: "Product Catalog"`, a `tag`, and `text`, but no `href` or `highlights` (matching the shape the "Executive Companion Pulse" entry already has, since that one was updated in a prior session).

- [ ] **Step 2: Add `href` and `highlights` to the Product Catalog entry**

Find the object in the `work` array with `title: "Product Catalog"` and replace it with:

```ts
  {
    title: "Product Catalog",
    tag: "$1.1M+ influenced ARR",
    text: "Led 0→1 strategy for a retail product intelligence capability that became a competitive differentiator across enterprise opportunities.",
    href: "/work/product-catalog",
    highlights: [
      "React + TypeScript + GraphQL",
      "Category-drilldown and analytics-panel interaction model",
      "Product strategy, UX, and delivery",
      "Cited as a differentiator across enterprise sales opportunities",
    ],
  },
```

- [ ] **Step 3: Typecheck, lint, and build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all succeed; the homepage's Product Catalog card now renders as a link (same `<Link>`-wrapped card treatment the Pulse entry already uses, driven by the presence of `href`).

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "Link the homepage Product Catalog card to its new case study page"
```

---

### Task 16: Static content verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server and fetch the rendered page**

Run: `nohup npm run dev > /tmp/catalog-dev1.log 2>&1 & sleep 4 && curl -s http://localhost:3000/work/product-catalog -o /tmp/catalog-page1.html && echo OK`
Expected: `OK`.

- [ ] **Step 2: Verify key content is present**

Run:
```bash
grep -o "Product Catalog" /tmp/catalog-page1.html | head -1
grep -o "\$1.1M+ influenced ARR" /tmp/catalog-page1.html
grep -oE "Electronics|Apparel|Home &amp; Garden|Beauty|Grocery" /tmp/catalog-page1.html | sort -u
grep -o "Representative Product Demonstration" /tmp/catalog-page1.html
grep -c "Acoustic\|acoustic" /tmp/catalog-page1.html
```
Expected: the title, ARR figure, all 5 top-level category names, and the disclaimer label are present; the employer-name grep returns `0`.

- [ ] **Step 3: Stop the dev server**

Run: `pkill -f "next dev"`
Expected: process terminated, no output needed.

---

### Task 17: Live interaction verification

**Files:** none (verification only)

This task requires a live browser check because the page has real multi-step interactive state. Use whichever browser-preview tooling is available in the working environment (e.g. `npm run dev` + a browser automation/preview tool) to click through:

- [ ] **Step 1: Category tree scoping**

Start the dev server, navigate to `/work/product-catalog`, scroll to the "Try It" section. Click "Audio" under Electronics in the left tree.
Expected: the KPI header's scope label changes to "Audio" and all four KPI values change; the listing panel's contents do **not** change (still shows whatever it was showing before — per the design, tree clicks only scope KPIs).

- [ ] **Step 2: View mode toggle**

Click the grid-view icon next to the list-view icon in the listing panel's toolbar.
Expected: the listing panel switches from row layout to a 3-column tile layout showing the same categories/products.

- [ ] **Step 3: Filter panel**

Click the "Filter" button.
Expected: a panel slides in from the left, covering the category tree, showing price-range and attribute checkboxes. Click the X to close it.
Expected: it slides back out, the category tree is visible again underneath (was never destroyed).

- [ ] **Step 4: Drill-down and product selection**

In the listing panel (starting from "All Products"), double-click the "Electronics" category tile/row.
Expected: the listing panel now shows "Audio" and "Wearables" as its contents (drilled one level in), with a breadcrumb back to "All Products."
Double-click "Audio".
Expected: the listing panel now shows the two audio products (Wireless Earbuds Pro, Over-Ear Studio Headphones) with their metrics columns.
Single-click "Wireless Earbuds Pro" (not double-click).
Expected: the analytics panel slides in from the right, spanning the full height of the app (not just below the KPI header), showing the product's thumbnail swatch, name, sales count, and three tabs (Insights, Attributes, Variants).

- [ ] **Step 5: Analytics panel tabs and window switch**

With the analytics panel open on a product, click the "Attributes" tab.
Expected: shows a vertical list of attribute name/value pairs (Brand, Battery Life, Connectivity for Wireless Earbuds Pro).
Click "Variants".
Expected: shows the two variants (Midnight Black, Arctic White) each with their own attribute rows.
Click back to "Insights", then click "7D", then "90D" in the time-window selector.
Expected: the two line charts (Interest, Conversion) visibly redraw with different data for each window — confirms `InsightsTab`'s window state is genuinely wired to different data arrays, not just a cosmetic toggle.

- [ ] **Step 6: Category-level analytics panel**

Close the analytics panel. In the listing panel, single-click (not double-click) a category tile/row instead of a product.
Expected: the analytics panel opens showing only the "Insights" tab — no Attributes or Variants tabs render for a category entity, per the design's explicit category-vs-product rule.

- [ ] **Step 7: Reduced motion**

If the preview tooling supports emulating `prefers-reduced-motion: reduce`, enable it and repeat opening/closing the filter and analytics panels.
Expected: panels still appear/disappear correctly (via opacity only, no slide), no console errors.

If any of these checks fail, fix the relevant component and re-run Task 16 and the specific failing step of this task before proceeding.

---

### Task 18: Update the design spec status (optional housekeeping)

**Files:**
- Modify: `docs/superpowers/specs/2026-07-05-product-catalog-design.md`

- [ ] **Step 1: Add a brief implementation note**

Append to the end of the spec file:

```markdown

## Implementation note

Built as planned in `docs/superpowers/plans/2026-07-05-product-catalog.md`. No structural deviations from this spec.
```

(If there *were* deviations during implementation, describe them here instead of the line above — this section exists so the spec stays an accurate record of what was actually built, matching the pattern established by the Pulse case study's spec.)

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/specs/2026-07-05-product-catalog-design.md
git commit -m "Note Product Catalog implementation status in design spec"
```

---

### Task 19: Full QA pass

**Files:** none (verification only)

- [ ] **Step 1: Full clean verification**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three succeed with exit code 0.

- [ ] **Step 2: Confirm no stray references to the real employer or real screenshots**

Run: `grep -rn "Acoustic\|acoustic" src/components/catalog/ src/app/work/product-catalog/ 2>/dev/null`
Expected: no output.

- [ ] **Step 3: Confirm no fabricated/placeholder markers slipped into content**

Run: `grep -rn "TODO\|TBD\|FIXME\|Lorem ipsum" src/components/catalog/ src/app/work/product-catalog/ 2>/dev/null`
Expected: no output.

- [ ] **Step 4: Re-run the static content check from Task 16 and the full click-through from Task 17**

Confirm both still pass after all commits in this plan.

---

### Task 20: Pre-merge deliverables

**Files:** none (git/GitHub operations only)

- [ ] **Step 1: Push the branch**

Run: `git push -u origin worktree-product-catalog`
Expected: branch pushed, upstream set.

- [ ] **Step 2: Check for any existing PR from this branch**

Run: `gh pr list --head worktree-product-catalog --state all --json number,state,url`
Expected: likely empty (this is a new branch) — if not empty, use the existing PR instead of creating a new one in the next step.

- [ ] **Step 3: Open the PR**

```bash
gh pr create --base main --head worktree-product-catalog --title "Add Product Catalog case study page" --body "$(cat <<'EOF'
## Summary
- New case study page at /work/product-catalog: a fully interactive desktop-web-app mockup (category tree, KPI header scoped by category, Finder-style list/grid listing panel, filter panel, analytics panel with Insights/Attributes/Variants tabs)
- Reuses Pulse's chart primitives (TrendBadge, DualLineChart) and motion helpers directly, no duplication
- Homepage Product Catalog card now links to the new page

## Test plan
- [x] npx tsc --noEmit
- [x] npm run lint
- [x] npm run build
- [x] Static rendered-HTML content checks
- [x] Live click-through: category scoping, view-mode toggle, filter panel open/close, drill-down navigation, product analytics panel with tab switching and time-window switching, category-level analytics panel (Insights tab only)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

Expected: PR created; report the URL back to the user.

---

## Self-review notes

- **Spec coverage:** every section of the design spec has a corresponding task — content model (Task 1), `BrowserFrame` (Task 2), `CategoryTree` (Task 3), `KpiHeader` (Task 4), `ListView`/`GridView`/`ListingPanel` (Tasks 5–6), `FilterPanel` (Task 7), the three analytics tabs + `AnalyticsPanel` (Tasks 8–9), `ProductCatalogApp` (Task 10), all six page sections (Tasks 11–13), page assembly (Task 14), homepage link (Task 15), and the spec's required verification steps (Tasks 16–17).
- **Category-vs-product analytics panel rule** (spec's explicit clarification) is implemented in Task 9's `AnalyticsPanel` (`tabs` array only includes Attributes/Variants when `entity.type === "product"`) and explicitly checked in Task 17 Step 6.
- **Circular dependency handling:** `ListingPanel.tsx`, `InsightsTab.tsx`, and `AnalyticsPanel.tsx` all import the `SelectedEntity` type from `ProductCatalogApp.tsx`, which itself imports all of them — this is a type-only circular reference (fine in TypeScript, since type imports are erased at compile time) but does mean per-task `tsc` checks fail until Task 10 exists. Tasks 6, 8, and 9 are explicitly marked lint-only for this reason, with the full typecheck deferred to Task 10 Step 2.
