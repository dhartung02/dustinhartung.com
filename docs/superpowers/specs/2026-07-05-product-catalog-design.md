# Product Catalog — Case Study Page

## Goal

Add a new portfolio case study, presented as a premium narrative product page (same quality bar and visual system as the existing Executive Companion Pulse case study), that tells the story of a 0→1 retail product-intelligence capability Dustin built ($1.1M+ influenced ARR, per the homepage's existing "Featured Work" card). The page must communicate the product through an **original, fully interactive desktop web-app mockup** — no screenshots, no reproduction of any employer's proprietary UI, and no mention of the employer by name. Unlike Pulse (a mobile phone UI), this is a desktop browser application: a category tree, a KPI header, a Finder-style product/category listing panel, a slide-over filter panel, and a slide-over analytics panel.

There is no local source repo for this desktop tool to ground against (unlike Pulse, which had `~/Documents/GitHub/connect-pulse` available). The interaction model and layout below come directly from Dustin's own detailed description of what he built, treated as authoritative in the same way a real screenshot review would be.

## Non-goals

- No real filtering logic in the filter panel — it's visually complete (price range, category checkboxes, attribute checkboxes) but doesn't actually filter the listing data.
- No real segment-creation flow — "Create Segment" buttons (on KPI cards and in the Insights tab) are present and clickable-looking but don't open a real builder or produce a real result.
- No fabricated real-world business-impact numbers presented as fact — the $1.1M+ influenced ARR figure already on the homepage is the only real number; everything inside the interactive mockup (category counts, KPI values, product metrics, attribute values) is synthetic/illustrative, consistent with Pulse's existing disclaimer approach.
- No mobile-optimized interactive experience — this is explicitly a desktop app demonstration. On narrow viewports, the whole browser-chrome mockup scales down as a non-interactive illustration (same treatment `PhoneFrame` already gets), rather than being re-flowed into a mobile-friendly interaction model.
- No new charting library — reuse Pulse's existing hand-rolled SVG chart primitives (`Sparkline`, `TrendBadge`, `DualLineChart`, `HorizontalBar`) wherever they fit; only add new chart types if genuinely nothing existing fits.

## Content & IP-safety policy

Identical to Pulse's established policy:
- The employer's name is never mentioned anywhere in the case study or on the homepage card that links to it.
- Every part of the interactive mockup renders synthetic/placeholder demo data only (category names, product names, dollar figures, counts — all invented for illustration).
- The same disclaimer renders near the top of the page, before any interactive content:
  > "Representative Product Demonstration — This page recreates the product experience using original HTML/CSS components and synthetic data. It illustrates the product concepts, UX, and technical implementation while avoiding reproduction of proprietary interfaces."
- Hero facts are limited to what's already public on Dustin's résumé/homepage: 0→1 retail product-intelligence capability; $1.1M+ influenced ARR; became a competitive differentiator across enterprise opportunities.

## Route & file structure

- New route: `src/app/work/product-catalog/page.tsx` (App Router).
- New directory: `src/components/catalog/`
  - `BrowserFrame.tsx` — generic desktop browser chrome (traffic-light dots, plain address-bar placeholder, rounded window with shadow), analogous to Pulse's `PhoneFrame.tsx`. Not a reproduction of any real browser's trademarked chrome.
  - `ProductCatalogApp.tsx` (`"use client"`) — the root stateful component; the only place holding cross-component state.
  - `CategoryTree.tsx`, `KpiHeader.tsx`, `ListingPanel.tsx` (with `ListView.tsx` / `GridView.tsx` sub-components), `FilterPanel.tsx`, `AnalyticsPanel.tsx` (with `InsightsTab.tsx`, `AttributesTab.tsx`, `VariantsTab.tsx`).
  - `content.ts` — single typed source of truth for all copy, category/product/KPI/attribute/variant demo data, and hero/outcome/closing copy. Components stay presentational; all text/data lives here.
- Reuses from `src/components/pulse/`: `charts/Sparkline.tsx`, `charts/TrendBadge.tsx`, `charts/DualLineChart.tsx`, `charts/HorizontalBar.tsx`, `usePrefersReducedMotion.ts`, `revealAnimation.ts` — imported directly, not copied.
- Page-level sections (`Hero`, `CaseStudyOverview`, `MyRole`, `CatalogAppSection`, `Outcome`, `Closing`) live in `src/components/catalog/sections/`, mirroring Pulse's `src/components/pulse/sections/` structure and each section's responsibilities.

## Interaction model (state machine)

All state is owned by `ProductCatalogApp`:

- `selectedCategoryId: string | "all"` — set only by clicking a node in `CategoryTree`. Scopes the `KpiHeader`'s four metrics to that category (or company-wide totals when `"all"`). Does **not** by itself change what `ListingPanel` is showing.
- `currentFolderId: string | "all"` — owned by `ListingPanel` itself (not lifted to the root), representing the panel's own Finder-style drill position. Starts at `"all"` (showing top-level categories). Double-clicking a category row/tile in the listing panel descends into it (sets `currentFolderId` to that category); there is no "back" button requirement beyond breadcrumbs if trivial to add, but it's not required scope.
- `viewMode: "list" | "grid"` — toggled via a radio-button-style control in `ListingPanel`'s toolbar row.
- `filterOpen: boolean` — toggled by the Filter button next to the view-mode toggle. When true, `FilterPanel` slides in and overlays `CategoryTree` (the tree is not destroyed, just visually covered).
- `selectedEntity: { type: "product" | "category"; id: string } | null` — set by a **single click** on any row/tile in `ListingPanel` (product or category). When non-null, `AnalyticsPanel` slides in and overlays the right portion of `ListingPanel`. Set back to `null` when the panel's close control is clicked.
- Inside `AnalyticsPanel`: a local `activeTab: "insights" | "attributes" | "variants"` state, and inside `InsightsTab`, a local `window: "7d" | "30d" | "90d"` state that swaps which pre-baked data array feeds the two `DualLineChart` instances (Interest vs. Conversion) — this is genuinely functional, not just visual.

Clicking a category tree node and single-clicking a category tile in the listing panel are deliberately different actions with different effects (scope-only vs. open-analytics-panel) — this distinction came directly from Dustin's clarification during design and must not be collapsed into one behavior.

**Category vs. product in the analytics panel:** attributes and variants are inherently product-level concepts, so when `selectedEntity.type === "category"`, `AnalyticsPanel` renders only the Insights tab (interest/conversion aggregated across the category) — the Attributes and Variants tabs aren't shown at all for a category, rather than being shown empty. When `selectedEntity.type === "product"`, all three tabs render normally.

## Page flow (narrative scroll)

1. **Hero** — text-only (eyebrow, "Product Catalog" title, positioning line about turning catalog telemetry into a fast product-intelligence view, fact badges: 0→1, $1.1M+ influenced ARR, competitive differentiator), disclaimer immediately below. Deliberately no browser-frame preview here — the interactive centerpiece in section 4 is the page's single visual showcase moment, so Hero doesn't duplicate it (unlike Pulse, which originally had this exact duplication problem with its phone mockup).
2. **Case Study Overview** — three cards, no interactive content: **The Insight**, **The Product Thesis**, **The Outcome** (specific copy to be drafted to fit this product, following Pulse's card structure).
3. **My Role** — text-only section: product-leadership and technical-direction bullets, any velocity/impact metrics available.
4. **The interactive centerpiece** (`CatalogAppSection`) — a few sentences of framing copy ("Try it — browse a category, switch views, open a product"), then the full `ProductCatalogApp` inside `BrowserFrame`, presented once, full width, as the single flagship interactive moment of the page (matching how Pulse treated its AI Briefing section as a flagship moment, scaled up to be this whole page's centerpiece rather than one of several).
5. **Outcome** — qualitative statements about what this capability enabled, plus a compact "What I'd build next" list if there's genuine future-facing content to add (not mandatory if nothing fits).
6. **Closing** — a short pull-quote section, same visual treatment as Pulse's Closing.

## Visual system & motion

- Extends the same dark theme, palette (navy/cyan/emerald/amber, no purple as a primary color), and card language (rounded-2xl, thin white/10 borders, uppercase tracked labels) already established by Pulse — this case study should read as clearly part of the same design system.
- `BrowserFrame` is the desktop analog of `PhoneFrame`: rounded window chrome, shadow, generic (non-branded) address bar text — sized in relative units so it scales down cleanly on narrower viewports without becoming interactive there.
- Filter panel and analytics panel use Framer Motion `AnimatePresence` with slide + fade transitions, triggered by clicks — not scroll-linked, not looping. Since Hero has no floating visual (see above), this page has **zero** infinite-loop animations, which is at least as strict as Pulse's "one loop total" rule.
- Category tree expand/collapse uses a simple height/opacity transition.
- All motion respects `usePrefersReducedMotion()` exactly as Pulse's components do.

## Verification

- `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- Static rendered-HTML checks (curl) for copy/content correctness, same pattern as Pulse.
- Because this page has real multi-step interactive state (unlike Pulse's simpler default-tab-per-phone model), a live click-through in the browser preview tooling is required before considering the work verified: category tree click → confirm KPI header updates; view-mode toggle; filter panel open/close; single-click a product → confirm analytics panel opens with correct data; tab switch inside the panel; time-window switch inside the Insights tab → confirm the chart data changes; double-click a category tile → confirm the listing panel drills down.

## Implementation note

Built as planned in `docs/superpowers/plans/2026-07-05-product-catalog.md` via subagent-driven-development (fresh implementer subagent per task, followed by independent spec-compliance and code-quality review subagents, with fix-and-re-review loops where issues were found), plus a final holistic review across the whole diff. No structural deviations from this spec — the interaction model, the category-vs-product analytics-panel rule, and the `AnalyticsPanel`-as-sibling layout all landed exactly as designed.

Two small documentation-accuracy corrections from the final holistic review: (1) of the four Pulse chart primitives this spec named as available for reuse, only `TrendBadge` and `DualLineChart` ended up actually used — `Sparkline` and `HorizontalBar` didn't fit anything this page needed, which is consistent with the spec's own "wherever they fit" wording, not a deviation; (2) `heroFacts` includes one more badge ("Stack: React + TypeScript + GraphQL") than the spec's Hero-facts sentence lists — added for parity with the existing homepage card copy for this same case study, not a new claim.

Real issues caught and fixed during review (not deviations from spec, but genuine defects found and corrected before merge):
- `AnalyticsPanel`'s tab state didn't reset when switching directly between two open entities without closing the panel first (could leave a blank tab body) — fixed by keying the panel's `motion.div` on entity identity.
- `CategoryTree`'s expand/collapse chevron was originally nested inside the row's selection button (invalid HTML, two interactive elements nested) — fixed to two sibling buttons before implementation even started, confirmed correct by review.
- Several missing accessibility labels (search inputs, `aria-expanded` on the tree's expand toggle, screen-reader labels on `GridView`'s icon-only metric badges) were caught by code review and fixed.
- `Hero.tsx`'s initial draft carried an unnecessary `"use client"` directive left over from the sibling case study's Hero it was structurally based on — removed once its interactive preview was (deliberately) dropped from this page's Hero.

One outstanding, explicitly deferred item: the "Create Segment" buttons (on the KPI cards and in the Insights tab — 7 instances total across `KpiHeader.tsx` and `InsightsTab.tsx`) are visually real but functionally inert, per this spec's own non-goals. Code review flagged that this pattern has repeated enough to justify extracting a shared `SegmentButton`/`SegmentActionList` component, independent of whether these ever become functional — not done in this pass, worth a follow-up.

**Live click-through verification could not be completed** in this environment — the browser preview tooling launches its dev server from the main project directory rather than this git worktree (a workspace-root inference issue with multiple lockfiles present), so it 404s on this route regardless of the code. This is the same limitation previously documented during the Pulse case study build. In its place: every task in the implementation plan went through independent spec-compliance review (verifying the code against the plan's literal text) and code-quality review (reading the actual diff, tracing prop contracts and state flow across files, running `tsc`/`lint`/`build` independently rather than trusting the implementer's report) — including explicit tracing of the full interaction model (category scoping, drill-down, view toggling, filter/analytics panel open-close, tab switching, time-window switching) across `ProductCatalogApp.tsx` and its six children. A manual click-through in a real browser is still recommended before treating this page as fully done, but the static analysis performed is more thorough than a single click-through would have been on its own.

## Post-merge refinements (manual click-through feedback)

Dustin ran the mockup live and reported three refinements, implemented directly (no full brainstorm/plan cycle — small, precisely-specified changes to an already-shipped feature):

1. **"All Products" reset.** Clicking the "All Products" root row in `CategoryTree` now also resets `ListingPanel` back to its root drill position, even when several categories deep. Implemented by giving `ListingPanel` a `key={listingResetToken}` in `ProductCatalogApp`, incremented whenever `selectedCategoryId` is set to `"all"` — a full remount resets the panel's local `currentFolderId` state cleanly, avoiding a `setState`-in-`useEffect` anti-pattern (caught by the project's `react-hooks/set-state-in-effect` lint rule on a first attempt). This is the same key-based remount pattern already used to fix `AnalyticsPanel`'s stale-tab bug.
2. **Create Segment toast.** Clicking any of the four `KpiHeader` "Create Segment" buttons now shows a transient, dismissible toast (`SegmentToast.tsx`, auto-dismisses after ~3.2s) confirming a specific, per-KPI, per-scope segment description (e.g. "Segment of individuals who made a purchase from Electronics in the last 30 days created."). Copy lives in `content.ts` as `segmentToastCopy`. This is still a cosmetic confirmation, not a real segment-creation flow — consistent with the non-goal that "Create Segment" buttons don't produce a real result. The Insights tab's three Create Segment buttons were left as-is (out of scope for this round; expanded segment options are now explicitly called out in "what's next" below).
3. **"What I'd build next"** (`nextUp` in `content.ts`) replaced with Dustin's actual forward-looking list: expanded Create Segment options (including inverse segments), more side-panel analytics/CTAs, in-catalog campaign creation, AI insights (clustering/recommendations), and a channel-sourced lens for the listing panel.

Verified via `npx tsc --noEmit`, `npm run lint`, `npm run build` (all clean) and a static-HTML content check. Live click-through was attempted again for this round via the Chrome extension automation tooling but failed for a different, more fundamental reason than the worktree/dev-server path issue above: the connected browser could not reach `localhost` on this machine at all (confirmed by testing against an already-working `localhost:3000` tab, which also failed, while a public URL loaded fine) — an environment/network-isolation constraint, not a code issue. Static tracing of the new state flow (`CategoryTree` → `ProductCatalogApp.handleSelectCategory` → `listingResetToken` → `ListingPanel` remount; `KpiHeader` button → `segmentToastCopy` lookup → `ProductCatalogApp.toastMessage` → `SegmentToast`) stands in for it here.
