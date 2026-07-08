# AI Investment Manager — Case Study Page

## Goal

Add a new portfolio case study, at the same quality bar as Executive Companion Pulse, Product Catalog, AI Product Operating System, and Reqon, for the "AI Investment Manager" — a real, actively-developed personal product (FastAPI + Postgres backend, Streamlit dashboard, 468+ commits as of this writing) that applies a deliberately gated, evidence-first approach to AI-assisted investing.

This case study has a different constraint than the first four. Reqon was a finished, production-shipped product with a live URL; Pulse/Product Catalog/AI Product Operating System required IP-safety genericization. AI Investment Manager is Dustin's own real, in-progress product — but the homepage's existing teaser text ("AI-generated portfolio briefings, evidence-backed recommendations, risk controls, and human review") describes a more finished state than currently exists. The real product's own capability-gate model (`docs/01_product_requirements.md` §2A.3 in the source repo) is explicit: Gate 1 (Evidence & Research Foundation) and Gate 2 (Investment Cockpit & Manual Portfolio Context) are delivered; Gate 3 (Explainable Human-Approved Recommendations) and Gate 4 (Paper-Money Simulation) have started, but only in conservative, deterministic form — no LLM/AI-generated content exists anywhere in the product yet, at any gate. Gate 5 (Real-Money Broker Integration) and Gate 6 (Guardrailed Automation) remain locked.

The core differentiator for this case study is honesty about build stage. The interesting story is not "I built an AI that picks stocks" — it's the discipline itself: nothing acts without evidence, nothing trades without an explicit human approval, and AI is introduced deliberately, later, once earlier trust-building gates are proven. This mirrors positioning Dustin already wrote for the real product in `docs/08_public_consumption_plan.md` ("evidence-first," explicitly avoiding "AI that beats the market" framing).

## Non-goals

- No fabricated AI capability. The interactive mockup will not show AI-generated recommendation text, portfolio briefings, or explanations, because none exist in the real product yet — even the started Gate 3 recommendation packets are deterministic, rule-based, evidence-linked objects, not LLM output.
- No real personal financial data. Any example tickers reuse the real product's own real demo scenario (AAPL/NVDA) — real public companies used the same way the actual product's own README uses them for illustration, not personal portfolio holdings, balances, or dollar figures.
- Not attempting to rebuild the real product's 30+ real dashboard pages (Research Workspace, Evidence Quality, Decision Journal, Packet Review Cockpit, Paper Simulation Handoff, Guided Review, etc.). Only Command Center is recreated as an interactive centerpiece; the rest of the built surface area is described in prose (My Role, Outcome) and represented structurally by the Gate Progress Strip, not rebuilt pixel-by-pixel.
- No fabricated business-impact numbers. The only facts stated as true: a real, self-hosted product under active development (FastAPI + Postgres + Streamlit, 468+ commits), Gates 1–2 delivered, Gates 3–4 started in conservative/deterministic form, Gates 5–6 locked, zero AI/LLM calls in the product to date, human approval required at every action boundary.
- Homepage teaser text for this entry gets corrected in the same pass (matching the precedent already set for Product Catalog and AI Product Operating System earlier in this portfolio's build) so it doesn't overclaim relative to the case study page it links to.

## Content & privacy policy

- No real personal financial data (holdings, account balances, brokerage credentials, real trade history) appears anywhere on this page. Confirmed low risk: the real product's own current implementation is mock-data-only by design (per its README and PRD), and its own demo scenario already uses AAPL/NVDA as safe, real-public-company illustration tickers — this case study reuses that same convention rather than inventing anything new.
- The disclaimer renders near the top of the page, adapted for this page's actual constraint (build-stage honesty, not IP or personal privacy):
  > "Real, In-Progress Product — This page recreates the real Command Center interface from an actively-developed personal product. The gate statuses shown (delivered / started / locked) reflect the real product's actual current state. No AI/LLM-generated content exists in the product yet at any gate; all recommendation and workflow logic shown is deterministic and human-reviewed."
- Hero facts are limited to real, confirmed, non-sensitive scope: self-hosted local product (FastAPI + Postgres + Streamlit); 468+ commits under active development; Gates 1–2 delivered, Gates 3–4 started in conservative/deterministic form; zero AI/LLM calls in the product to date.
- No external link in the Hero (unlike Reqon) — this product runs locally on a Mac mini and has no public URL.

## Route & file structure

- New route: `src/app/work/ai-investment-manager/page.tsx`.
- New directory: `src/components/invest/`
  - `CommandCenterFrame.tsx` — generic desktop browser chrome (own copy, not shared with other case studies' frames, per this repo's established one-copy-per-case-study convention), styled with the real product's actual brand palette (see Visual System below).
  - `NextActionHero.tsx` — recreates the real Command Center's "NEXT WORKFLOW ACTION" hero card: urgency badge, action label, reason text, "Opens: `<target>`" caption, a primary CTA button, and the real boundary caption ("This is workflow routing only. It does not recommend investments, rank tickers, score, allocate, or trade.").
  - `SectionGrid.tsx` — recreates the real "Workflow sections at a glance" grid: 7 section cards (Workflow Inbox, Review Pipeline, Research Intake, Paper Simulation, Decision Memory, Investment Cockpit, System Status), each with a status label, urgency badge, and last-reviewed date — using the real section keys and real urgency vocabulary (none / low / medium / high / critical) from the real product's `command_center_v2_helpers` module.
  - `GateProgressStrip.tsx` — new hand-rolled stepper component (SVG or styled HTML, not a new charting dependency) showing Gates 1 through 6 in order, each labeled with its real name and one of three states: Delivered, Started, Locked — matching the real product's actual current gate statuses exactly.
  - `InvestmentApp.tsx` (`"use client"`) — the root stateful component; owns which section card (if any) is expanded.
  - `content.ts` — single typed source of truth: hero facts, disclaimer copy, case-study overview cards, role bullets, outcome/roadmap statements, and all Command Center / gate-strip data.
- Page-level sections in `src/components/invest/sections/`: `Hero.tsx`, `CommandCenterSection.tsx` (the centerpiece, wrapping `InvestmentApp` and `GateProgressStrip` together with framing copy), `CaseStudyOverview.tsx`, `MyRole.tsx`, `Outcome.tsx`, `Closing.tsx`.
- Reuses from `src/components/pulse/`: `usePrefersReducedMotion.ts`, `revealAnimation.ts` — imported directly, not copied.

## Interaction model

State owned by `InvestmentApp`:

- `expandedSectionKey: string | null` — set by clicking a section card in `SectionGrid`. When a card is expanded, it reveals 2–3 additional detail bullets describing what that section actually covers in the real product (grounded in the real Command Center v2 doc's section descriptions), without simulating navigation to a full sub-page that isn't being rebuilt. Clicking the same card again (or a close control) collapses it. Clicking a different card while one is expanded switches the expansion (only one open at a time — a simple, low-risk interaction, no need for the key-based-remount pattern since there's no nested component state to reset).
- The `NextActionHero`'s CTA button is presentational/inert (styled like a real button, no `onClick` action) — consistent with the established non-goal pattern of not fabricating navigation to pages that aren't rebuilt (same treatment as Reqon's inert detail-panel action buttons).
- `GateProgressStrip` has no interactive state — it's a scroll-revealed, static status display, matching the treatment of AI Product Operating System's `WorkflowDiagram`.

## Page flow (narrative scroll)

1. **Hero** — text-only, fact badges, disclaimer. No external link (local-only product, no public URL).
2. **Command Center + Gate Progress Strip** (`CommandCenterSection`, the centerpiece) — placed right after Hero, per the "lead with the centerpiece" lesson already applied to Product Catalog, AI Product Operating System, and Reqon. Framing copy states the real problem before the dashboard: AI investing tools compete by claiming smarter picks; this product competes by earning trust one gate at a time. The Gate Progress Strip sits directly below the Command Center mockup within the same section, visually completing the "what's built vs. what's next" story.
3. **Case Study Overview** — three cards grounded in the real Public Consumption Plan doc: The Insight (AI investing tools already compete on hype and unverifiable claims, not trust), The Product Thesis (evidence before recommendations, paper-trading before real money, deterministic logic before AI — a trust ladder, not a feature list), The Outcome (a real, working, human-approval-gated pipeline from evidence → recommendation packet → paper trade, built and functioning entirely without AI, by deliberate design).
4. **My Role** — sole builder across backend (FastAPI/Postgres), dashboard (Streamlit), and the capability-gate product/roadmap model itself (the gating discipline is presented as a real product-design contribution, not just an engineering detail).
5. **Outcome** — real scope facts (Gates 1–2 delivered, Gates 3–4 started in deterministic form, zero AI/LLM calls to date, human approval required at every action boundary) plus qualitative statements (evidence-first philosophy, paper-trading-before-real-money trust ladder). "What's Next" maps directly and honestly to the real remaining gate work: Gate 3's eventual AI-assisted explanation layer (still human-approved), Gate 5 (real-money broker integration, read-only sync first), Gate 6 (guardrailed automation, disabled by default) — using the real gate names and real constraints, not invented future features.
6. **Closing** — short pull-quote section, same visual treatment as the prior four case studies.

## Visual system & motion

- Extends the same dark theme and card language already established (rounded-2xl, thin white/10 borders, uppercase tracked labels) — reads as part of the same design system.
- Departs deliberately on color: the real product's actual Streamlit theme is a private-wealth / modern-fintech palette — deep near-black green canvas (`#0E1A14`), dark green panels (`#16241C`), muted warm gold accent (`#C9A86A`), soft near-white text (`#E7EBE6`). `CommandCenterFrame` and the Command Center mockup use the real bespoke background hex values directly (translated to this portfolio's Tailwind conventions, not scattered arbitrarily) as an authentic homage — the same treatment already given to Reqon's real teal/emerald brand accent. Rather than introducing a second, unrelated accent color for the rest of the page, `amber-300`/`amber-400` — an existing color in this portfolio's palette family that also reads as a close, portfolio-safe interpretation of the real gold accent — is used consistently as the accent throughout every section (Hero, Case Study Overview, My Role, Outcome, Closing, and the centerpiece's own accent details), so the whole page carries one coherent accent color while only the centerpiece's actual background canvas uses the bespoke real-product hex values.
- `CommandCenterFrame` matches the established pattern (rounded window chrome, traffic-light dots, generic address-bar placeholder).
- Section-card expand/collapse in `SectionGrid` uses Framer Motion (`motion.div` with an animated `height`/`opacity`, inside `AnimatePresence`) for consistency with every other interactive transition already used across this portfolio's case studies, rather than introducing a second, CSS-only animation approach.
- Section-level reveals (Hero facts, Case Study Overview cards, My Role, Outcome, Closing, and the Gate Progress Strip) use `revealAnimation`/`usePrefersReducedMotion` on scroll, same as prior case studies.
- Motion budget: one expand/collapse interaction (click-triggered, not looping) plus standard scroll-reveals — zero infinite loops, consistent with the established rule across all four prior case studies.

## Verification

- `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- Static rendered-HTML checks (curl) for copy/content correctness, same pattern as prior case studies.
- Live interaction check where the environment's preview tooling allows it: expand/collapse a section card, confirm detail bullets appear/disappear correctly. If blocked by the environment's known preview-tooling limitations (as documented for Pulse, Product Catalog, and Reqon), fall back to static-analysis-plus-explicit-tracing and disclose transparently.
- Grep check before merge: confirm no real personal financial figures, account balances, or brokerage-credential-shaped strings appear anywhere in the new files (expected to trivially pass, since the real product itself is mock-data-only and this case study only reuses its own already-safe AAPL/NVDA demo convention — lower risk than Reqon, but the check is still run for discipline).
- Confirm the Gate Progress Strip's stated statuses (Gate 1–2 Delivered, Gate 3–4 Started, Gate 5–6 Locked) match the real product's PRD `§2A.3` exactly, since accuracy here is the entire point of this case study.
