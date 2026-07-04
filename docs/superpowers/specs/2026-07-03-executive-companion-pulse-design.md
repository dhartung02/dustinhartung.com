# Executive Companion Pulse — Case Study Page

## Goal

Add a new portfolio case study, presented as a premium narrative product page (Stripe/Linear/Vercel/Apple-developer-story quality bar), that tells the story of a 0→1 executive mobile app Dustin built. The page must communicate product vision, UX thinking, and executive workflows through **original HTML/CSS/React components** — no screenshots, no bitmap images, no reproduction of any employer's proprietary UI, and no mention of the employer by name.

**Narrative grounding (revision):** the page must read as a truthful account of a shipped 0→1 executive mobile companion/dashboard — secure mobile access, configurable metric cards, telemetry visibility — not as a fictionalized "AI intelligence platform." AI-generated recommendations, customer value/churn scoring, commerce intelligence, and behavioral-signal prioritization are NOT shipped claims; where referenced at all, they are explicitly labeled future-state/conceptual. See "Narrative grounding revision" at the end of this document for the full correction and banned/preferred phrase list.

## Non-goals (this pass)

- No Alerts, Analytics, or Settings screens.
- No Commerce/Catalog Intelligence screen — that content belongs to a separate project ("Product Catalog") and must not be implied as part of this app's shipped scope.
- No full interactive "app demo" — no tab navigation between screens, no routing inside the phone.
- No new dependencies beyond `framer-motion` and `lucide-react`.
- No fabricated business-impact numbers (adoption %, revenue, user counts, ROI) — this now also explicitly covers the AI Briefing concept screen, which must not show fabricated dollar-value/confidence-score figures as if they were real model output.

## Content & IP-safety policy

- The employer's name is never mentioned anywhere in the case study or on the homepage card that links to it.
- Every phone screen renders synthetic/placeholder demo data only (health scores, revenue figures, names, chart values invented for illustration).
- A disclaimer renders near the top of the page, before any screen content:
  > "Representative Product Demonstration — This page recreates the product experience using original HTML/CSS components and synthetic data. It illustrates the product concepts, UX, and technical implementation while avoiding reproduction of proprietary interfaces."
- Hero and Outcome facts are limited to what's already public on Dustin's résumé/LinkedIn:
  0→1 product; built and shipped in ~75 days; AI-assisted development; Apple App Store approved; 261 commits; 63 test files; 748 automated test cases; ~75,000 lines of code; production React Native + TypeScript app; Okta authentication; LaunchDarkly feature flags and phased rollout; DataDog RUM and production observability; automated testing.
  (Revision: Okta/LaunchDarkly/DataDog are named explicitly per Dustin's direct instruction — these are generic third-party enterprise tools, not the employer's name, and he's judged this an acceptable level of specificity for his own work history.)
- Where a business outcome can't be backed by a public number, use a qualitative statement instead (see Outcome section below) — never an invented figure. This applies to the AI Briefing concept screen too: no fabricated dollar-value or confidence-score figures, even as illustration — it's a labeled concept, not simulated model output.

## Route & file structure

- New route: `src/app/work/executive-companion-pulse/page.tsx` (App Router).
- New directory: `src/components/pulse/`
  - `PhoneFrame.tsx` — reusable phone chrome (generic rounded bezel + notch, relative sizing; not a literal Apple trademark asset).
  - `PulseLogo.tsx` — small original SVG mark (circle + pulse-line), used in the Hero. Not a reproduction of any real product's logo.
  - `charts/` — hand-rolled SVG primitives, no charting library: `Sparkline`, `Donut`, `Gauge`, `HorizontalBar`, `ScatterPlot`, `MiniFunnel`, `ProgressRing`, `HeatMap`.
  - `screens/` — one component per phone screen: `ExecutiveFeedScreen` (displayed as "Executive Overview"), `CustomerIntelligenceScreen` (displayed as "Customer & Account Activity"), `BehaviorIntelligenceScreen` (displayed as "Product & Usage Signals"), `AIBriefingScreen` (displayed as a labeled future-state concept, not a shipped feature). `CommerceIntelligenceScreen` was removed per the narrative grounding revision — its content is not part of this app's real scope. Component/file names were left unchanged from earlier tasks; only the user-facing copy/labels changed.
  - `sections/` — page-level layout components: `Hero`, `CaseStudyOverview`, `MyRole`, `NarrativeSection` (shared alternating phone/copy layout, now consumed by 3 screen sections), `AIBriefingSection` (distinct visual treatment, reframed as "Future Direction"), `Outcome`, `Closing`.
  - `content.ts` — single typed source of truth for all copy, demo chart data, and the résumé-sourced facts. Components stay presentational; all text/data lives here.
- Icons are imported directly from `lucide-react` at each use site (no wrapper/re-export layer).

## Page flow (narrative scroll)

1. **Hero** — `PulseLogo` mark, "Executive Companion Pulse," positioning line: "A 0→1 executive mobile companion that turned platform telemetry into a fast, trusted operating view." A gently-floating phone (showing the Executive Overview screen), 6–7 fact badges sourced from `content.ts` (now including Okta, LaunchDarkly, DataDog by name). The IP-safety disclaimer renders immediately below the hero.
2. **Case Study Overview** — three cards, no phone: **The Insight** (executives had data access but it was fragmented across dashboards/reports/Slack/meetings — the gap was speed, not more dashboards), **The Product Thesis** (compress the operating view, don't replicate the desktop), **The Outcome** (grew from a side project into an executive-sponsored, shipped initiative).
3. **My Role** — text-only section, no phone: a two-column bullet list (Product Leadership / Technical Direction — technical bullets now name real tools: React Native, TypeScript, GraphQL API integration, Okta authentication, LaunchDarkly feature flags and phased rollout, DataDog RUM and production observability, automated test coverage), plus the velocity metrics grid (Days ~75, Commits 261, Test files 63, Test cases 748, Lines of code ~75,000).
4. **Executive Overview** (was "Executive Feed") — phone left / copy right. Copy: a fast, trusted, configurable view between meetings — not another dashboard login. Health cards lift slightly on hover; progress rings animate in on scroll.
5. **Customer & Account Activity** (was "Customer Intelligence") — copy left / phone right. High-level account activity and status indicators for executive visibility — explicitly NOT churn prediction, value-matrix scoring, or lifecycle modeling. SVG scatterplot (relabeled "Account Activity Overview," axes "Usage"/"Engagement," not "Spend"/value-scoring) draws in on scroll.
6. ~~Commerce Intelligence~~ — **removed.** That content belonged to a separate project ("Product Catalog") and did not reflect this app's real shipped scope. Folded conceptually into "Product & Usage Signals" below.
7. **Product & Usage Signals** (was "Behavior Intelligence") — copy left / phone right. Usage/behavior telemetry read at an executive level — explicitly NOT intent/risk scoring or automated prioritization. Chart categories renamed away from "Intent"/"Risk" to neutral telemetry buckets ("Feature Usage," "Engagement," "Errors/Issues," "Account Info"); the funnel is relabeled as a plain usage funnel (Sessions → Active Users → Feature Engaged → Repeat Use), not a "signal scoring/prioritization" pipeline; the heat map is relabeled "Weekly Usage Pattern" (no "real-time" or behavioral-intelligence framing). The top item is visually emphasized (position, weight) but does not pulse or loop — kept static per the "one looping animation total" motion rule below.
8. **Future Direction: AI Briefings** (was "AI Briefing," no longer called "the centerpiece") — distinct visual treatment retained (largest phone), but copy now explicitly frames this as NOT shipped: "While the shipped MVP focused on secure access, configurable metric cards, and executive-ready telemetry views, the interaction model created a natural path toward AI-generated briefings..." The phone label reads "Concept: AI Briefing." The screen itself drops fabricated dollar-value and confidence-score fields entirely (no `estimatedValue`, no `confidence`/`priority`/`impact` badges) — just a short synthetic headline + one-line detail per example card, clearly a sketch rather than simulated model output.
9. **Outcome** — qualitative statements only, no restated numbers, none implying AI-driven decisioning as a shipped capability:
   - Gave executives and product leaders faster mobile access to trusted platform, product, and operational signals.
   - Created a production-ready mobile foundation for executive visibility.
   - Reduced dependence on manual status gathering and desktop-only dashboards.
   - Demonstrated how AI-assisted development could accelerate a production-grade internal product from concept to App Store approval.
   - Established reusable patterns for secure authentication, telemetry display, configurable cards, feature-flagged rollout, and production observability.

   Includes a compact **"What I'd build next"** block (concise, 4 bullets, explicitly future-tense/aspirational, not shipped claims):
   - Insight → Action workflows
   - AI agent over customer/platform data
   - Predictive risk detection
   - Delegation and team follow-up workflows
10. **Closing** — a large centered pull-quote styled like the homepage's "Current Focus" treatment (`rounded-3xl border border-cyan-300/20 bg-cyan-300/10`): a short "why this matters" statement tying back to the opening problem, tone adjusted to "fast, trusted signal" rather than "act on." No new facts introduced here — purely a closing beat.

## Motion & accessibility

- All scroll-triggered animation uses Framer Motion `whileInView` with `viewport={{ once: true }}` — plays once, never re-triggers on scroll-back.
- A single `useReducedMotion()` check gates every animation; when true, elements render in final state immediately with no transition.
- Only `transform` and `opacity` are animated — no layout-affecting properties.
- The only looping animation is the hero phone's subtle float, which also respects reduced-motion (renders static when reduced motion is on).
- Motion stays subtle throughout: hover elevation, count-up numbers, chart draw-ins, one pulsing signal, progressive text reveal in the AI Briefing section. No gimmicks (no confetti, bounce, parallax-for-its-own-sake, etc).

## Homepage change

- In `src/app/page.tsx`, the "Executive Dashboard" entry in the `work` array is replaced with:
  - Title: "Executive Companion Pulse"
  - Copy: "Conceived, designed, and built a 0→1 executive mobile companion that turned platform and product telemetry into a fast, trusted operating view for executives."
  - Highlights: AI-assisted development; React Native + TypeScript + Okta; LaunchDarkly feature flags + DataDog observability; Product strategy, UX, architecture, and delivery; Grew from an innovation project into an executive-sponsored initiative.
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

## Narrative grounding revision

After the first version shipped and was reviewed live, Dustin flagged that the narrative had drifted into presenting a fictionalized "AI executive intelligence platform" rather than what was actually built: a 0→1 executive mobile companion/dashboard giving fast, trusted mobile visibility into product/platform/customer/operational telemetry, built largely solo. This revision grounds every claim on the page in that reality.

**Positioning:** "A secure executive mobile companion that turned scattered platform telemetry into a fast, trusted operating view" — not "an AI intelligence platform that tells executives what to do next."

**Facts now explicitly named (previously genericized, per Dustin's direct instruction that these are acceptable specificity — generic enterprise vendor tools, not the employer's name):** Okta (authentication), LaunchDarkly (feature flags / phased rollout), DataDog (RUM / production logging / observability).

**Structural changes:**
- "Commerce Intelligence" removed entirely (Non-goals). That content belonged to the separate "Product Catalog" project, not this app.
- "Executive Feed" → "Executive Overview." "Customer Intelligence" → "Customer & Account Activity." "Behavior Intelligence" → "Product & Usage Signals." "AI Briefing" → "Future Direction: AI Briefings" (word "centerpiece" removed).
- The AI Briefing screen's fabricated dollar-value/confidence-score fields are removed entirely from the data model and the rendered UI — not just hidden. The section's copy explicitly states this is a future-state concept, not a shipped capability.
- Executive Overview's fourth health card ("Campaign Performance") renamed "Product Adoption" — campaign/marketing-specific analytics were never part of this app's confirmed scope.
- Customer & Account Activity: "Customer Value Matrix" → "Account Activity Overview" (axes "Usage"/"Engagement," not "Spend"); "Lifecycle" → "Account Status Mix"; "At-Risk Accounts" stat and category → "Accounts Needing Review"/"Needs Attention" (no churn-prediction framing).
- Product & Usage Signals: "Top Behavioral Signals" → "Top Usage Signals"; Signal Mix categories "Intent"/"Risk" → "Feature Usage"/"Errors & Issues" (no intent/risk-scoring framing); funnel stages → plain usage funnel (Sessions → Active Users → Feature Engaged → Repeat Use), not a "prioritization pipeline"; heat map → "Weekly Usage Pattern" (no "real-time"/behavioral-intelligence framing).

**Banned phrases/claims (must not appear as shipped-capability claims anywhere on the page):** "AI intelligence platform," "recommendation engine," "predictive churn," "customer value matrix," "commerce intelligence," "behavioral scoring," "decision-ready recommendations," "confidence-scored recommendations," "what to do next" (unless explicitly future-state), "AI-driven summaries" (unless explicitly future-state), "centerpiece."

**Preferred vocabulary:** "glanceable," "trusted operating view," "executive-ready," "secure mobile access," "telemetry-backed," "configurable metric cards," "production-ready," "mobile-first," "foundation for future AI briefings."

**What stays impressive, and why:** not a fictional AI platform, but the real execution — identifying the executive workflow gap, designing a mobile-first solution, building it largely solo to production grade, clearing enterprise auth/observability/testing/feature-flag/App-Store-approval bars, and using AI-assisted development to move faster than a traditional process. These are the proof points the copy should lean on.

## Narrative grounding revision, pass 2 (after reviewing real app screenshots)

Dustin shared actual screenshots of the real production app (used only as internal grounding reference for this pass — not stored in the repo, not copied pixel-for-pixel, per the project's standing IP-safety requirement) and asked for one more credibility pass:

- **"Executive Health Score" → "Executive Snapshot"** (`ExecutiveFeedScreen.tsx`) — avoids implying a proprietary scoring model.
- **Executive Overview's health-card set changed** from Revenue/Customer/Product Adoption/Platform to **Platform Health, Product Adoption, Customer Activity, Operational Status** — "Revenue Health" removed since revenue data wasn't confirmed as part of the shipped app's real scope.
- **Product & Usage Signals' "Top Signals" replaced entirely.** The prior examples ("Pricing page revisit," "Demo request started," "Competitor comparison," "Pricing calculator use") were marketing/sales-intent signals that didn't match this app's real telemetry domain. Replaced with product/platform telemetry: weekly active users, feature adoption rate, workflow completions, API usage volume, report usage.
- **"What I'd Build Next" (`nextUp`) tightened to 5 specific, disciplined future-state items:** AI-generated executive briefings, explainable anomaly and risk detection, recommended follow-up workflows, delegation and ownership tracking, drill-down to source data. ("Explainable" is a deliberate word choice — future AI features are framed as interpretable, not black-box.)
- Customer & Account Activity copy tightened further: one bullet now explicitly states the feature is "not churn prediction or account intelligence modeling."

No structural/architectural changes in this pass — content and copy only, within the components and data model already built.
