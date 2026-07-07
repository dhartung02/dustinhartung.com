# Reqon — Case Study Page

## Goal

Add a new portfolio case study, at the same quality bar as Executive Companion Pulse, Product Catalog, and AI Product Operating System, for Reqon — a real, production-grade personal product: a self-hosted, AI-assisted job-search CRM spanning a web dashboard, an iOS/iPadOS companion app (React Native/Expo), and a Chrome extension ("Reqon Clip"). Grounded directly against Dustin's real local repo (`~/Documents/reqon`) and its real screenshots (`docs/images/`).

This case study has a different constraint than the first three. Pulse, Product Catalog, and AI Product Operating System all required IP-safety genericization because they were built for a former employer. Reqon is Dustin's own product — there's no employer-IP issue — but the real screenshots expose **personal job-search privacy**: real company names (e.g. a specific company and a specific salary range appear in the real opportunity-detail screenshot), real recruiter/application data, and a real Chrome-extension screenshot showing real target companies. The interactive centerpiece is therefore a pixel-faithful recreation of the real UI, populated entirely with invented companies, roles, and figures — the opposite motivation (privacy, not IP) but the same synthetic-data treatment as the prior three case studies.

## Non-goals

- No real screenshots of the web dashboard, the opportunity-detail panel, or the Chrome extension popup — all three reveal real personal job-search specifics and must be recreated with synthetic data.
- The real mobile-companion screenshot (`docs/images/mobile-companion.png`) is the one exception — confirmed clean (aggregate counts only, no company/personal data) — used as-is, not recreated.
- No fabricated business-impact numbers. The only facts stated as true: this is a real, self-hosted product spanning 3 client surfaces (web, iOS/Expo, Chrome), actively used to track 150+ real opportunities, solo-built and production-shipped (App Store listing drafted). Every number, company name, role title, and status shown *inside* the interactive mockup and the recreated Chrome-extension illustration is synthetic/illustrative.
- Not attempting to rebuild the full real feature set as interactive UI. Reqon's real scope (deterministic multi-ATS scout, Gmail response ingest, a multi-channel notification engine, an MCP server exposing the board to Claude/ChatGPT, budget-capped AI cost controls) is described in prose (My Role / Case Study Overview), not rebuilt as clickable interface — only the board/dashboard + opportunity detail + analytics are recreated as the interactive centerpiece.
- No new charting library — analytics recreates simple bars/funnels using the same hand-rolled approach as prior case studies (plain divs with width percentages, or reusing `HorizontalBar`-equivalent patterns already established), not a new dependency.

## Content & privacy policy

- No real company names, recruiter names, salary figures, application statuses, or dates from Dustin's actual job search appear anywhere on this page.
- The disclaimer renders near the top of the page, before the interactive content, adapted for this page's actual constraint (privacy, not employer IP):
  > "Representative Product Demonstration — This page recreates Reqon's real interface using original components and synthetic data. Company names, roles, statuses, and figures shown are entirely invented for illustration and do not reflect any real job search."
- Hero facts are limited to real, confirmed, non-sensitive scope: self-hosted job-search CRM across 3 surfaces; 150+ opportunities tracked; React Native + Chrome Extension + AI (OpenAI Responses API) stack; solo-built and production-shipped.
- A real external link to **reqon.app** appears in the Hero (opens in a new tab), the same way the homepage links to GitHub/LinkedIn — this is Dustin's own real product, so linking to it directly is appropriate and not an IP-safety concern.

## Route & file structure

- New route: `src/app/work/reqon/page.tsx`.
- New directory: `src/components/reqon/`
  - `BrowserFrame.tsx` — generic desktop browser chrome (own copy, not shared with Product Catalog's, per this repo's established one-copy-per-case-study convention), styled with Reqon's real teal/emerald accent (already within this portfolio's existing palette family, no new colors needed).
  - `ReqonApp.tsx` (`"use client"`) — the root stateful component for the interactive dashboard mockup.
  - `TabBar.tsx`, `StatStrip.tsx`, `ActionNeededGrid.tsx`, `OpportunityList.tsx`, `OpportunityDetailPanel.tsx`, `AnalyticsTab.tsx` — the dashboard's sub-components, mirroring the real UI's actual sections (tab bar; the Open/Applied/Follow-up/Rejected/Interviews/Offers + Total roles/Tier A/Response rate/Avg days→contact stat strip; the seven "action needed" cards; the opportunity row list; the click-to-open detail slide-over; the Analytics tab's insights + funnel + outcomes).
  - `ChromeExtensionIllustration.tsx` — a static (non-interactive) recreation of the Chrome extension popup, synthetic data, presented as a supporting visual rather than part of the interactive centerpiece.
  - `content.ts` — single typed source of truth: hero facts, disclaimer copy, case-study overview cards, role bullets, outcome statements, next-up list, and all synthetic dashboard/opportunity/analytics/chrome-extension data.
- Page-level sections in `src/components/reqon/sections/`: `Hero.tsx`, `DashboardSection.tsx` (the centerpiece), `CaseStudyOverview.tsx`, `MyRole.tsx`, `SupportingSurfaces.tsx` (real mobile screenshot + recreated Chrome-extension illustration side by side), `Outcome.tsx`, `Closing.tsx`.
- Reuses from `src/components/pulse/`: `usePrefersReducedMotion.ts`, `revealAnimation.ts` — imported directly, not copied.
- The real mobile screenshot (`~/Documents/reqon/docs/images/mobile-companion.png`) is copied into this repo's `public/` directory (e.g. `public/reqon/mobile-companion.png`) and rendered via a plain `<img>`/Next `<Image>` — this is the one real asset used verbatim, already confirmed to contain no personal/sensitive data.

## Interaction model

State owned by `ReqonApp`:

- `activeTab: "today" | "open" | "applied" | "interviewing" | "rejected" | "analytics"` — toggled via `TabBar`. Confirmed against both real screenshots: the stat strip (Open/Applied/Follow-up due/Rejected/Interviews/Offers + Total roles/Tier A/Response rate/Avg days→contact) is always visible regardless of tab. Below it, content differs by tab: `"today"` shows the action-needed card grid (New since last run, Needs verification, Apply next, Tier A·not applied, Follow-up due, Recently closed, In interviews) followed by `OpportunityList`; `"open"`/`"applied"`/`"interviewing"`/`"rejected"` show only `OpportunityList` filtered to that synthetic subset, no action-needed grid; `"analytics"` replaces everything below the stat strip with `AnalyticsTab` (insights bullets, conversion funnel, application outcomes).
- `selectedOpportunityId: string | null` — set by clicking a row in `OpportunityList`. When non-null, `OpportunityDetailPanel` slides in from the right (same slide-over pattern as Product Catalog's `AnalyticsPanel` and AI Product Operating System's terminal — but here it's click-triggered, not scroll-triggered, since this centerpiece is explicitly meant to be an interactive recreation, unlike AI Product Operating System's page). Closed via an explicit close control.
- Inside `OpportunityDetailPanel`: no further nested state — it's a read-only display of the selected synthetic opportunity's fields (tier/fit/probability/EV badges, company/role/status/dates, next-action note) plus inert action buttons (Open/Edit details/Enrich/AI draft/Delete — visually real, functionally inert, consistent with the non-goal against fabricating real interactivity beyond what's needed to demonstrate the UI).

## Page flow (narrative scroll)

1. **Hero** — text-only, fact badges, disclaimer, and a real external link to reqon.app (opens in a new tab, styled like a small secondary CTA near the fact badges).
2. **The interactive centerpiece** (`DashboardSection`) — placed right after Hero, per the lesson already applied to Product Catalog and AI Product Operating System: this page's best asset leads, not buried. Framing copy states the real problem (job searches scatter across spreadsheets, tabs, email) before presenting the dashboard.
3. **Case Study Overview** — three cards: The Insight (scattered workflow, from the real README's "Why I Built This"), The Product Thesis (structured pipeline + deterministic-first scout + optional, reviewable, budget-capped AI — human always in control), The Outcome (a real system built and used, not just a portfolio exercise).
4. **My Role** — sole builder: product, design, and engineering, across web/iOS/Chrome/AI integration.
5. **Supporting Surfaces** — the real mobile screenshot and the recreated Chrome-extension illustration, presented side by side as static supporting visuals (not part of the interactive centerpiece), with a line of framing copy noting these are companion surfaces to the same self-hosted board.
6. **Outcome** — real scope facts (150+ tracked, 3 surfaces, solo-built, production-shipped) plus qualitative statements (deterministic-first philosophy, human-controlled AI). "What I'd Build Next" references real, honest future-facing ideas (e.g., expanded ATS coverage, deeper Gmail-based triage, calendar-integrated interview scheduling) — clearly framed as future work, not existing capability.
7. **Closing** — short pull-quote section, same visual treatment as the prior three case studies.

## Visual system & motion

- Extends the same dark theme and card language already established (rounded-2xl, thin white/10 borders, uppercase tracked labels) — reads as part of the same design system.
- Leans into Reqon's real brand accent (a teal/emerald green, already within this portfolio's existing cyan/emerald/amber palette family) for the dashboard mockup's primary accent color, as a deliberate, authentic homage to the real product's actual branding — no new colors introduced outside the existing palette.
- `BrowserFrame` matches the established pattern (rounded window chrome, traffic-light dots, generic address-bar placeholder).
- The detail panel slide-over uses Framer Motion `AnimatePresence`, click-triggered (not scroll-triggered) — this is the one case study where click-driven interactivity is appropriate, since (unlike AI Product Operating System) there's a real, faithfully-recreated GUI to make interactive.
- Section-level reveals (Hero facts, Case Study Overview cards, My Role, Supporting Surfaces, Outcome, Closing) use `revealAnimation`/`usePrefersReducedMotion` on scroll, same as prior case studies.
- Motion budget: one interactive slide-over (click-triggered, not looping) plus standard scroll-reveals — zero infinite loops, consistent with the established rule across all three prior case studies.

## Verification

- `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- Static rendered-HTML checks (curl) for copy/content correctness, same pattern as prior case studies.
- Because this page has real interactive state (tab switching, opportunity selection), a live click-through in the browser preview tooling is the correct verification target where the tooling allows it — tab switch, row click → detail panel open with correct synthetic data, close control, and confirm the stat strip/action-needed grid stay constant across tabs. If the environment's known preview-tooling limitations block a live click-through (as happened for Pulse and Product Catalog), fall back to the same static-analysis-plus-explicit-tracing approach used there, and disclose the limitation transparently rather than claiming false verification.
- Explicit grep check before merge: confirm zero matches for any real company name, recruiter name, or salary figure found in the real screenshots during research (the real company name and salary range seen in the real opportunity-detail screenshot, and the three real company names seen in the real Chrome-extension screenshot).
