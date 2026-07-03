# Executive Companion Pulse — Case Study Page

## Goal

Add a new portfolio case study, presented as a premium narrative product page (Stripe/Linear/Vercel/Apple-developer-story quality bar), that tells the story of a 0→1 executive mobile app Dustin built. The page must communicate product vision, UX thinking, and executive workflows through **original HTML/CSS/React components** — no screenshots, no bitmap images, no reproduction of any employer's proprietary UI, and no mention of the employer by name.

## Non-goals (this pass)

- No Alerts, Analytics, or Settings screens (only the 5 screens listed below).
- No full interactive "app demo" — no tab navigation between screens, no routing inside the phone.
- No new dependencies beyond `framer-motion` and `lucide-react`.
- No fabricated business-impact numbers (adoption %, revenue, user counts, ROI).

## Content & IP-safety policy

- The employer's name is never mentioned anywhere in the case study or on the homepage card that links to it.
- Every phone screen renders synthetic/placeholder demo data only (health scores, revenue figures, names, chart values invented for illustration).
- A disclaimer renders near the top of the page, before any screen content:
  > "Representative Product Demonstration — This page recreates the product experience using original HTML/CSS components and synthetic data. It illustrates the product concepts, UX, and technical implementation while avoiding reproduction of proprietary interfaces."
- Hero and Outcome facts are limited to what's already public on Dustin's résumé/LinkedIn:
  0→1 product; built and shipped in ~75 days; AI-assisted development; Apple App Store approved; 261 commits; 63 test files; 748 automated test cases; ~75,000 lines of code; production React Native + TypeScript app; feature flags, telemetry, authentication, automated testing.
- Where a business outcome can't be backed by a public number, use a qualitative statement instead (see Outcome section below) — never an invented figure.

## Route & file structure

- New route: `src/app/work/executive-companion-pulse/page.tsx` (App Router).
- New directory: `src/components/pulse/`
  - `PhoneFrame.tsx` — reusable phone chrome (generic rounded bezel + notch, relative sizing; not a literal Apple trademark asset).
  - `PulseLogo.tsx` — small original SVG mark (circle + pulse-line), used in the Hero. Not a reproduction of any real product's logo.
  - `charts/` — hand-rolled SVG primitives, no charting library: `Sparkline`, `Donut`, `Gauge`, `HorizontalBar`, `ScatterPlot`, `MiniFunnel`, `ProgressRing`, `HeatMap`.
  - `screens/` — one component per phone screen: `ExecutiveFeedScreen`, `CustomerIntelligenceScreen`, `CommerceIntelligenceScreen`, `BehaviorIntelligenceScreen`, `AIBriefingScreen`.
  - `sections/` — page-level layout components: `Hero`, `CaseStudyOverview`, `MyRole`, `NarrativeSection` (shared alternating phone/copy layout consumed by the 5 screen sections), `AIBriefingSection` (centerpiece treatment), `Outcome`, `Closing`.
  - `content.ts` — single typed source of truth for all copy, demo chart data, and the résumé-sourced facts. Components stay presentational; all text/data lives here.
- Icons are imported directly from `lucide-react` at each use site (no wrapper/re-export layer).

## Page flow (narrative scroll)

1. **Hero** — `PulseLogo` mark, "Executive Companion Pulse," one-line positioning, a gently-floating phone (showing the Executive Feed screen), 3–4 fact badges sourced from `content.ts`. The IP-safety disclaimer renders immediately below the hero.
2. **Case Study Overview** — three cards, no phone: **The Insight** ("Executives don't want another login"), **The Product Thesis** ("Compress telemetry into intelligence"), **The Outcome** ("From side project to executive-sponsored initiative"). Replaces the earlier generic "Problem/Market Gap/Thesis" framing with sharper, non-redundant copy.
3. **My Role** — text-only section, no phone: a two-column bullet list (Product Leadership / Technical Direction — technical bullets stay generic: React Native, TypeScript, GraphQL APIs, enterprise SSO authentication, feature-flagged rollout, production telemetry, automated test coverage — no specific vendor/tool names), plus the velocity metrics grid (Days ~75, Commits 261, Test files 63, Test cases 748, Lines of code ~75,000 — same résumé-sourced facts as the Hero badges, not duplicated as prose elsewhere on the page).
4. **Executive Feed** — phone left / copy right. Copy: what executives needed, why desktop dashboards fell short, why mobile changed the equation. Health cards lift slightly on hover; progress rings animate in on scroll.
5. **Customer Intelligence** — copy left / phone right (layout alternates). Lifecycle, segmentation, value mapping, customer health. SVG scatterplot (Value Matrix) draws in on scroll.
6. **Commerce Intelligence** — phone left / copy right. Catalog, revenue, category health, inventory. Horizontal bars animate width on scroll.
7. **Behavior Intelligence** — copy left / phone right. Signals, intent, predictive insight. Mini funnel + heat map; the top signal is visually emphasized (position, weight) but does not pulse or loop — kept static per the "one looping animation total" motion rule below.
8. **AI Briefing** — centerpiece section, largest phone treatment. Briefing lines reveal progressively as the section scrolls into view — the most animation-forward section on the page.
9. **Outcome** — qualitative statements only, no restated numbers:
   - Grew from an innovation project into an executive-sponsored product initiative.
   - Reduced the time required for executives to understand platform health.
   - Consolidated complex enterprise marketing telemetry into decision-ready mobile experiences.
   - Improved executive visibility into customer, campaign, and platform performance.
   - Enabled faster identification of risks and opportunities through AI-driven summaries and health indicators.

   Includes a compact **"What I'd build next"** block (concise, 4 bullets, no elaboration beyond a line each):
   - Insight → Action workflows
   - AI agent over customer/platform data
   - Predictive risk detection
   - Delegation and team follow-up workflows
10. **Closing** — a large centered pull-quote styled like the homepage's "Current Focus" treatment (`rounded-3xl border border-cyan-300/20 bg-cyan-300/10`): a short "why this matters" statement tying back to the opening problem. No new facts introduced here — purely a closing beat.

## Motion & accessibility

- All scroll-triggered animation uses Framer Motion `whileInView` with `viewport={{ once: true }}` — plays once, never re-triggers on scroll-back.
- A single `useReducedMotion()` check gates every animation; when true, elements render in final state immediately with no transition.
- Only `transform` and `opacity` are animated — no layout-affecting properties.
- The only looping animation is the hero phone's subtle float, which also respects reduced-motion (renders static when reduced motion is on).
- Motion stays subtle throughout: hover elevation, count-up numbers, chart draw-ins, one pulsing signal, progressive text reveal in the AI Briefing section. No gimmicks (no confetti, bounce, parallax-for-its-own-sake, etc).

## Homepage change

- In `src/app/page.tsx`, the "Executive Dashboard" entry in the `work` array is replaced with:
  - Title: "Executive Companion Pulse"
  - Copy: "Conceived, defined, and built a 0→1 executive mobile companion that transformed complex enterprise marketing telemetry into decision-ready insights, AI briefings, and actionable recommendations."
  - Highlights: AI-assisted development; React Native + TypeScript; Executive intelligence dashboards; Product strategy, UX, architecture, and delivery; Grew from an innovation project into an executive-sponsored product initiative.
- This card becomes a Next.js `<Link href="/work/executive-companion-pulse">` wrapping the whole card, with a small "View case study →" affordance. No other Featured Work cards change.

## Visual system & responsiveness

- Extends the existing dark theme (`neutral-950` background, white text) already established on the homepage.
- Primary palette: blue, cyan, navy, white, emerald — this is the dominant feel of the page. Amber is a minor accent (e.g. warnings/attention states). Indigo, if used at all, is a minor accent only — never a primary or dominant color. No purple anywhere on this page.
- Alternating two-column grid (phone + copy) collapses to a single stacked column below the `lg` breakpoint. `PhoneFrame` is sized in relative units (max-width/aspect-ratio) so it never overflows or crops at any viewport width.
- All charts are inline SVG, redrawn from scratch for this page (no shared code with any prior/employer design).

## Dependencies

- Add `framer-motion` and `lucide-react`. No other new dependencies for this pass.

## Out of scope / future work

Captured only as the "What I'd build next" bullets in the Outcome section — not built in this pass.

## Implementation note

An earlier, uncommitted prototype (`src/app/work/executive-companion-pulse/`, `src/components/case-study/`) existed from before this design was finalized. It used a different scope (7 in-phone tabs including out-of-scope screens), a light color scheme, and in-phone tab navigation — all of which conflicted with this spec. The code was discarded rather than adapted.

A second, independent session was concurrently producing its own spec (`docs/superpowers/specs/2026-07-02-executive-companion-pulse-design.md`) and plan (`docs/superpowers/plans/2026-07-02-executive-companion-pulse.md`) for the same feature, unaware of the scope/guardrails negotiated in this document. Per Dustin's direction, this spec was merged with the reusable parts of that work:

**Adopted from the other session:** the "Case Study Overview" three-card framing (Insight/Thesis/Outcome), the "My Role" section structure and its product-leadership bullet list, the velocity metrics grid, the "Closing" pull-quote section, and a small `PulseLogo` mark.

**Explicitly not adopted:** its ~10-screen scope (Pulse Metrics, Action Center, Signal Export, Job Monitor, Settings), bottom tab-bar navigation, a light-mode-inside-the-phone palette, and its "Technical Direction" bullets naming specific third-party vendors (those are genericized here — see My Role above — consistent with the homepage card copy Dustin already dictated, which also avoids naming specific vendor tools).

This spec (2026-07-03) remains the sole source of truth for implementation. The 2026-07-02 spec/plan files are left in place (not deleted) pending Dustin's own decision on whether to remove them.

**Correction (found during Task 10's code review):** the original "Behavior Intelligence" page-flow bullet called for a "hot signal pulses subtly" effect, which contradicts the "only looping animation is the hero phone's float" motion rule below — a genuine internal contradiction introduced when merging source material. Resolved per Dustin's direction: no second loop; the top signal stays static, emphasized only by position/weight. The plan and its implementation were never out of sync with each other on this point — only the design spec's two sections briefly contradicted each other, now fixed.
