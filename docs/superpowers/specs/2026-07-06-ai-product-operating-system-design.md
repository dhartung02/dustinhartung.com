# AI Product Operating System — Case Study Page

## Goal

Add a new portfolio case study, presented at the same quality bar as Executive Companion Pulse and Product Catalog, for the AI Product Operating System — six real Claude Skills Dustin built that automate the PM workflow from feature idea through shipped release. Unlike the prior two case studies, there is no application UI to recreate: the product *is* a set of skill definitions invoked through chat. The centerpiece must be honest to that fact rather than fabricating an app that never existed.

The six skills in scope (grounded against Dustin's real, currently-installed skill definitions):
- **PRD Builder** — drafts a Product Requirements Document from a feature idea, enriched with org context, customer signals, and competitive intelligence.
- **Objective Builder** — creates the committed delivery record (the tracker's source of truth for engineering/QA) from a PRD or guided intake.
- **Story Builder** — creates epics and stories in the tracker from a PRD or ad hoc description.
- **Release Announcement Builder** — drafts release announcements once work ships.
- **PM Radar** — a unified Slack + email digest surfacing decisions, blockers, action items, and ticket candidates.
- **PM Jira Digest** — a weekly, prioritized digest of a PM's open tickets.

The one confirmed real, quantifiable outcome: PRD authoring time went from weeks to days. Everything else in the case study is qualitative, grounded in real skill capabilities but not tied to a specific fabricated number.

## Non-goals

- **No fabricated interactive app UI.** Dustin explicitly corrected this during brainstorming — there was never a GUI, so building one (in the style of Pulse's `PhoneFrame` or Product Catalog's `BrowserFrame`) would misrepresent the work. The centerpiece is a static workflow diagram plus a scroll-revealed terminal-style transcript — no buttons, no clickable state, no simulated app.
- **No verbatim reproduction of the real skill markdown.** Skill capabilities are described in original wording for this case study, not copied from the actual `SKILL.md` files.
- **No real company name, internal-only terminology, real personas, real squad/tribe names, or the source repo's name/org.** Specifically: the tracker's internal name for the committed delivery record is generalized to "Objective"; the internal customer-intelligence and competitive-intelligence connectors are described generically (e.g. "a customer-intelligence connector") without naming the real internal system; no persona names (real or invented-to-look-real) are used in a way that implies they're real individuals. Jira, Confluence, Slack, and Obsidian remain as real tool names — they're generic third-party SaaS, not identifying of the employer.
- **No fabricated adoption or usage numbers.** The only stated fact is PRD authoring time (weeks → days). Everything else — reduced context-switching, fewer spec/ticket drift issues, etc. — is phrased qualitatively.
- **Scope limited to the six skills above.** The real plugin has 15 skills; the other nine (competitor-landscape-report, dependency-analyzer, metrics-review, migration-overview, objective-quality-review, presentation-script, roadmap-update, stakeholder-update, user-research-synthesis) are real but out of scope for this page. They may be referenced honestly in "What I'd build next" as existing-but-uncovered-here, never described as hypothetical.
- **No real feature request as the demo scenario.** The transcript walkthrough uses an invented, clearly-synthetic feature idea (see Interaction/Content below) — never the real example PRD found during research (which describes actual internal work and must never be referenced).

## Content & IP-safety policy

- The employer's name is never mentioned anywhere in the case study or the homepage card that links to it.
- The disclaimer renders near the top of the page, before the centerpiece, adapted from Pulse/Catalog's wording since there's no "interface" being recreated here:
  > "Representative Workflow Demonstration — This page illustrates a real AI-skill-based PM workflow using an original diagram and a synthetic example scenario. It does not reproduce the underlying skill source, internal company systems, or any real feature request; all names, tools, and data shown are for illustration."
- Hero facts are limited to what's already public/confirmed: built as a system of Claude Skills; started as personal/shared tooling before being migrated into the company's formal, capability-based skill library; PRD authoring time went from weeks to days.

## Route & file structure

- New route: `src/app/work/ai-product-operating-system/page.tsx`.
- New directory: `src/components/opsystem/`
  - `TerminalFrame.tsx` — generic terminal window chrome (traffic-light dots, no address bar, monospace prompt line placeholder), analogous to `BrowserFrame`/`PhoneFrame` but for a terminal rather than a browser or phone. Not a reproduction of any real terminal emulator's branding.
  - `WorkflowDiagram.tsx` — new hand-rolled SVG diagram component (a flowchart, not a line/bar/Sankey chart, so not reused from Pulse's chart primitives). Renders labeled nodes and directional arrows, including bidirectional (double-headed) arrows for the sync relationship.
  - `SkillTranscript.tsx` — renders a scripted sequence of transcript "turns" (prompt-in lines, skill-step output lines) inside `TerminalFrame`, revealed on scroll.
  - `content.ts` — single typed source of truth: hero facts, disclaimer copy, case study overview cards, role bullets, outcome statements, next-up list, the workflow diagram's node/edge data, and the transcript script.
- Page-level sections in `src/components/opsystem/sections/`: `Hero.tsx`, `WorkflowSection.tsx` (the centerpiece — diagram + transcript), `CaseStudyOverview.tsx`, `MyRole.tsx`, `Outcome.tsx`, `Closing.tsx` — mirroring the sections pattern from Pulse and Product Catalog.
- Reuses from `src/components/pulse/`: `usePrefersReducedMotion.ts`, `revealAnimation.ts` — imported directly, not copied. No chart primitives are reused since none fit a flowchart's shape.

## Centerpiece: workflow diagram + transcript

**Workflow diagram** — three clusters:

1. **Context sources**, feeding into PRD Builder as it drafts:
   - Org structure / role-based ownership data (who owns what, generalized — no real squad or persona names).
   - Customer intelligence — voice-of-customer feedback and incident/support signals, grounding the problem statement in real signals rather than the PM's memory.
   - Competitive intelligence — market/competitor research, used to frame the value or impact case for the objective, not just what it is.
2. **Build & sync lane**, drawn with bidirectional arrows between all three artifacts (not a one-way handoff): PRD ↔ Objective ↔ Stories. A change to any one propagates to the others — this is the "everything stays in sync" behavior Dustin confirmed, and it's the most structurally important thing this diagram needs to communicate correctly. Stories, once shipped, feed into Release Announcement Builder → Release Note.
3. **Stay-informed lane**, running in parallel: PM Radar (Slack + email) produces a digest that can feed ticket candidates into Story Builder; PM Jira Digest produces a separate weekly prioritized digest.

**Transcript** — one scripted, abbreviated walkthrough of PRD Builder, styled as a terminal session inside `TerminalFrame`, revealed turn-by-turn on scroll (no click-to-advance):
- Prompt in: an invented, clearly-synthetic feature idea (e.g. "self-service saved audience segments" or similar — never the real example PRD found during research).
- A step showing the skill pulling supporting evidence — related customer feedback / incident signals for the problem statement.
- A step showing the skill checking competitive positioning to frame value/impact.
- A condensed view of the resulting PRD structure (problem statement, use case, success metric — not the full 14-section real template, just enough to feel authentic).
- A closing line noting the handoff option into Objective Builder / Story Builder.

This transcript is presentational copy Dustin and Claude will write together at plan time — the exact line-by-line script is not finalized in this spec, only its shape and the two required "evidence-pulling" beats above.

## Page flow (narrative scroll)

1. **Hero** — text-only, same pattern as Product Catalog's Hero (no preview duplication of the centerpiece). Eyebrow, title, positioning line, fact badges (system of Claude Skills; migrated from personal tooling into the company's capability-based skill library; PRD authoring: weeks → days), disclaimer immediately below.
2. **The centerpiece** (`WorkflowSection`) — placed right after Hero, learning directly from the Product Catalog reorder: this page's single best asset doesn't sit behind two text sections. Framing copy states the problem (PM workflow fragmented across docs, tickets, chat, email) before presenting the diagram, then the transcript.
3. **Case Study Overview** — three cards: The Insight, The Product Thesis, The Outcome — following the established structure, content specific to this system.
4. **My Role** — product-leadership and technical-direction bullets, including designing the three-way PRD/Objective/Story sync and establishing the pattern that got these skills migrated into the company-wide capability library.
5. **Outcome** — leads with the PRD authoring metric, plus qualitative wins (less context-switching across tools, less spec/ticket drift). "What I'd build next" honestly references the other real, currently out-of-scope skills (roadmap updates, stakeholder communications, competitive-landscape reporting, research synthesis).
6. **Closing** — short pull-quote section, same visual treatment as Pulse/Catalog's Closing.

## Visual system & motion

- Extends the same dark theme, palette, and card language already established by Pulse and Product Catalog — reads as clearly part of the same design system.
- `TerminalFrame` is a new sibling to `PhoneFrame`/`BrowserFrame`: dark window chrome, monospace content area, no address bar (a terminal has no URL).
- The workflow diagram and transcript are both scroll-revealed (`revealAnimation`, respecting `usePrefersReducedMotion`) — no click-driven interactivity, no infinite loops. This keeps the page's motion budget at the same "as strict as or stricter than Pulse" level Product Catalog established.

## Verification

- `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- Static rendered-HTML checks (curl) for copy/content correctness, same pattern as prior case studies.
- Because this page has no click-driven interactivity, the live-click-through verification step that applied to Pulse and Product Catalog's interaction models does not apply here in the same way — verification is primarily about content accuracy (no real names/terms leaking through) and correct rendering of the diagram/transcript at a couple of viewport widths.
- Explicit grep check before merge: confirm zero matches for the employer name, the real internal terminology this spec generalizes away (the tracker's internal objective name, the internal intelligence-connector name), and any real persona or squad name encountered during research.
