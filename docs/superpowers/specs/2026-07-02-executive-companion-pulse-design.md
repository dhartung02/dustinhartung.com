# Executive Companion Pulse — case study page

## Goal

Add a polished, product-launch-quality case study page to dustinhartung.com for
"Executive Companion Pulse" — a fictionalized/neutral portfolio treatment of a
real enterprise SaaS executive companion app the author conceived, defined,
prototyped, and drove from side project to executive-sponsored initiative.

The page must read as an original product, not a screenshot gallery: no
former-employer names, logos, or proprietary references. All product screens
are rebuilt natively in HTML/CSS/React using realistic fake data, not images.

## Non-goals

- No CMS/MDX — content lives in a plain TS data file, matching the site's
  current all-static-JSX pattern (see `src/app/page.tsx`).
- No new dependencies. Tailwind v4 + plain React only, matching existing stack.
- No dark/light mode toggle — the page shell always uses the site's existing
  dark theme (see below); light is only used inside device screens.
- No image assets for the phone screens (per requirement) — everything is
  built with div/CSS.

## Route & files

- `src/app/work/executive-companion-pulse/page.tsx` — the case study page.
- `src/components/case-study/` — new directory for shared components:
  - `PhoneMockup.tsx`
  - `MetricCard.tsx`
  - `HealthScoreCard.tsx`
  - `InsightCard.tsx`
  - `CapabilitySection.tsx`
  - `CaseStudyCard.tsx`
  - `RoadmapCard.tsx`
  - `PulseLogo.tsx` (small neutral logo mark used in the phone status bar and
    optionally in the page hero)
- `src/app/work/executive-companion-pulse/content.ts` — static content: metric
  numbers, capability screen data, roadmap items, etc. Keeps `page.tsx`
  focused on layout/composition.

## Theme

Page shell matches the existing site language exactly:
`bg-neutral-950`, white text, `text-cyan-300` accents, `rounded-3xl` cards,
`border-white/10` / `bg-white/[0.04]` card treatment, same type scale as the
homepage (`text-5xl md:text-7xl` hero, `uppercase tracking-[0.35em]` eyebrows).

Inside `PhoneMockup` components, screens use the product's own light palette
(this is "the product," not "the portfolio"):

| Token | Hex | Usage |
|---|---|---|
| Deep navy | `#123B5D` | primary text / headers inside screens |
| Cyan | `#13B8D9` | primary accent, links, active nav |
| Emerald | `#10B981` | healthy / positive state |
| Amber | `#F59E0B` | watch / caution state |
| Red | `#EF4444` | risk / negative state |
| Soft background | `#F6F8FB` | screen background |
| Card border | `#DCE4EF` | in-screen card borders |

These are applied via inline style / arbitrary Tailwind values scoped to
`PhoneMockup` children only — they must not leak into the page shell.

## Components

**`PhoneMockup`** — device frame (rounded corners, notch, side buttons) that
wraps arbitrary screen content. Fixed aspect ratio via `aspect-[9/19.5]`,
width controlled by container/`clamp()` so it scales down on mobile without
overflowing. Renders the shared screen header (pulse logo left, "Good
evening" + date center/right, bell + "EC" avatar right) and shared bottom nav
(Home, Pulse, Customers, Commerce, Signals, Action, Brief) so every screen is
consistent. Accepts `children` for the screen body.

**`MetricCard`** — small stat block (label, value, delta) used in Pulse
Metrics and the dev-velocity card.

**`HealthScoreCard`** — score/status pill (emerald/amber/red) with a label,
used in Executive Feed and Commerce/Behavior screens.

**`InsightCard`** — "what changed / what to watch / recommended action" row
used in Executive Feed and AI Briefing.

**`CapabilitySection`** — repeating layout: phone mockup on one side, heading
+ description + bullet list on the other, alternating left/right on desktop,
stacked on mobile. Used for the 6 capability cards and 4 enterprise-ops
screens.

**`CaseStudyCard`** — dark-theme card (insight / thesis / outcome) for the
case study overview section.

**`RoadmapCard`** — dark-theme card with title + description for the
strategic roadmap section.

## Page sections (content verbatim from brief)

1. **Hero** — eyebrow, "Executive Companion Pulse" title, subtitle "AI-powered
   mobile decision support for marketing leaders.", supporting paragraph,
   large `PhoneMockup` showing the Executive Feed screen. Small disclosure
   line beneath: *"Representative demo screens. Branding and data modified
   for portfolio use."*

2. **Case study overview** — "From side project to executive-sponsored
   product initiative." Three `CaseStudyCard`s: The insight / The product
   thesis / The outcome (copy as given).

3. **My role** — product leadership bullet list, technical direction bullet
   list, and a development-velocity `MetricCard` grid: 75 days, 261 commits,
   63 test files, 748 test cases, 75,463 lines of code.

4. **Product philosophy** — "Built around decision domains, not feature
   tabs." Intro paragraph, then 6 `CapabilitySection`s: Executive Feed, Pulse
   Metrics, Customer Intelligence (all "Audience" terminology renamed to
   "Customer"), Commerce Insights, Behavior Signals, AI Briefing.

5. **Enterprise operations** — 4 more `CapabilitySection`/card treatments:
   Action Center / Alerts, Signal Export, Job Monitor, Settings — framed to
   show operational depth, not just a dashboard.

6. **Strategic roadmap** — "Where I would take it next." 4 `RoadmapCard`s:
   More actions (with the segment → one-tap campaign example), AI agent,
   Predictive intelligence, Delegation workflows.

7. **Closing** — "Why this matters" + the one-line closing statement, styled
   as a large centered pull-quote, matching the homepage's "Current Focus"
   card treatment.

## Screen content rules

- Header: pulse logo mark (left), "Good evening" + date (center/right), bell
  icon + "EC" avatar (right). No "Sign-in required" text anywhere.
- Bottom nav labels exactly: Home, Pulse, Customers, Commerce, Signals,
  Action, Brief.
- All "Audience" concepts renamed to "Customer": Customers, Customer
  Explorer, Total Customers, Customer Lifecycle, Customer Engagement,
  Customer Value Map.
- Pulse Metrics screen: revenue, orders, product views, cart abandon,
  customer count, signal count.
- Commerce Insights: catalog overview, revenue, conversion, product/category
  momentum.
- Behavior Signals: funnel movement, intent signals, searches, abandonment.
- AI Briefing: what changed, what to watch, what's working, recommended
  actions.
- All data is realistic but fabricated (no real customer/company names).

## Homepage update (in scope)

In `src/app/page.tsx`, update the `work` array's "Executive Dashboard" entry:

- `title`: `"Executive Companion Pulse"`
- `text`: `"0→1 executive mobile companion app that turned complex enterprise marketing telemetry into decision-ready insights, AI briefings, and action workflows."`
- Card becomes a link (`<a href="/work/executive-companion-pulse">`) wrapping
  the existing `<article>` markup, styled the same as today plus a hover
  state consistent with the hero CTAs.

## Responsive behavior

- Desktop: phone mockups shown inside cards, capability sections in
  alternating two-column layout.
- Mobile: everything stacks single-column; `PhoneMockup` shrinks via
  `clamp()`/`max-w-full` so it never overflows the viewport; bottom nav
  labels may abbreviate or wrap rather than overflow.

## Testing / verification

No test framework exists in this repo yet (no test script in `package.json`).
Verification is: `npm run lint`, `npm run build`, and manual browser check via
the preview tool (dev server) at both desktop and mobile widths, confirming
no horizontal overflow and no console errors.

## Open items resolved during brainstorming

- Skip visual-companion browser mockups — proceed directly to build.
- Palette applies inside device screens only; page shell stays on the
  existing dark theme.
- Homepage card is in scope and gets updated per above.
- No source images/HTML are being provided — screens are built from the
  detailed content spec above, not traced from external references.
