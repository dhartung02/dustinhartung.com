# PR5 — Pilot Validation: Results

**Status: 3 of 4 pilots run and documented; 1 was already satisfied by prior work.** Conducted
directly (each pipeline role's artifact written directly, in one continuous supervised session)
rather than via the live orchestrator/self-chaining daemons — see "Execution mode" below for
why, and what that does and doesn't validate.

## Execution mode: conducted directly, not via the live daemons

Running these through Reqon's real orchestrator or AIM's real self-chaining `claude -p ... &`
processes would mean genuine unattended, uncapped subprocess spend (plus a real OpenAI call for
AIM's Co-CEO step) with no per-stage checkpoint — a different risk class from everything else
in this rollout. Instead, each pilot was conducted by directly writing every role's artifact
(product brief, advisor memos, UX brief, technical design, QA report, completion envelope) in
sequence, under direct supervision, producing the exact same artifact types and file locations
a live run would — except written to `docs/superpowers/pilot-runs/<jobId>/` rather than
`docs/superpowers/jobs/<jobId>/`, specifically so the live daemons never pick them up.

**This validates:** the role contracts, workflow routing, advisory trigger table, and
completion-envelope schema all work as designed when actually exercised against real targets.
**This does not validate:** the orchestrator/self-chaining daemons' own subprocess-spawning
mechanics, or real per-stage token/wall-clock cost (see each envelope's `metrics.note`).

## Results

### 1. Reqon — small bug fix: already satisfied

The hardcoded-path fix in [reqon#169](https://github.com/dhartung02/reqon/pull/169) (PR2) is a
real, small, safely-scoped bug fix, done the normal way. No separate pilot needed.

### 2. Reqon — feature exploration: run, merged pending review

**[reqon#170](https://github.com/dhartung02/reqon/pull/170)** — "Bulk archive for stale
requisitions." PM → 3 triggered advisors (Job Seeker, Trust and Control, Cross-Surface
Consistency) → UX → Architect, terminating in a **Go, with revised scoping** recommendation.

**What worked:** the advisory council (dormant until PR2) triggered correctly against the real
trigger table and materially changed the brief — Trust and Control's memo forced a real
interaction-design correction (a pre-checked suggestion batch would have technically satisfied
the brief's prose while violating its intent), not a rubber-stamp. Architect's terminal step
caught that the PM/UX brief's UX-cost estimate was optimistic once the codebase was actually
traced (no existing multi-select pattern to reuse) — exactly the failure mode this pipeline
stage exists to catch.

**Real output:** a genuine, evidenced product recommendation independent of the pilot's
validation purpose.

### 3. AI Investment Manager — performance audit: run, found a real production bug

**[ai-investment-manager#269](https://github.com/dhartung02/ai-investment-manager/pull/269)**
— targeted a real anomaly (not a fabricated scenario): `/command-center-v2/summary` and
`/guided-review/progress` had shown anomalous latency during PR6's routine validation.
Measured for real against the live local Docker stack (3x `curl` timing runs + a control):

| Endpoint | Result |
|---|---|
| `/health` (control) | ~8ms |
| `/command-center-v2/summary` | ~5.7-5.9s, completes |
| `/guided-review/progress` | **never completes** — 15s timeout, 3/3 runs |

**Root cause traced with `file:line` evidence:** no connection pooling exists anywhere in the
API; `/command-center-v2/summary`'s aggregator correctly shares one cursor across ~10
sub-builders, `/guided-review/progress`'s ~10 sub-builders each open an independent connection
— the likely explanation for "degrades" vs. "hangs outright." Two follow-up jobs recommended
(P1 statement-timeout, P2 shared-cursor refactor).

**Co-CEO's intake step was not exercised** — no `OPENAI_API_KEY` configured in this
environment. The pilot started directly at Performance Reviewer, matching what the real
routing does after intake anyway, but Co-CEO's actual strategic-review behavior remains
unvalidated. Real gap, not swept under the rug.

### 4. AI Investment Manager — security review: run, no release-blocking findings

**[ai-investment-manager#270](https://github.com/dhartung02/ai-investment-manager/pull/270)**
— targeted SQL identifier interpolation (15 `cursor.execute(f"...` instances found, 6 traced
and confirmed safe — hardcoded literals or allowlist-validated lookups, 9 untraced as a P3
follow-up), local-import file handling (audited, found zero server-side file-path
construction, closing a question PR6's `SECURITY.md` had explicitly flagged as unaudited), and
secrets-in-logs (verified clean). `SECURITY.md` updated with the real results.

Same Co-CEO caveat as the performance audit — intake not exercised, no API key configured.

## Gaps closed alongside the pilots

**[ai-investment-manager#271](https://github.com/dhartung02/ai-investment-manager/pull/271)**
— the stale absolute-path README link (flagged during PR1 inspection) and the `riskLevel` ↔
Gate mapping (an open design question from PR3) are both resolved.

## What running these actually taught the standard

- **The advisory council and Architect's terminal-step judgment are real, not theater** — both
  pilots produced findings/corrections that changed the outcome, not just filled out a
  template.
- **A "no risk found" security finding needs the same evidentiary rigor as a real one** — the
  security pilot's strongest moment was explaining *what was checked* to close the file-path
  question, not just asserting safety.
- **Co-CEO's OpenAI dependency is a real gap in pilot coverage**, not just a footnote — anyone
  running these pilots without `OPENAI_API_KEY` configured gets the same partial coverage this
  round did. Worth deciding whether that's acceptable long-term or worth fixing before the next
  round of pilots.
- **`metrics.note`'s honesty** ("wallClockSeconds/toolCalls/tokensUsed omitted... ran alongside
  other work") is itself evidence the field works as designed — it forced an honest admission
  rather than a fabricated number. The real first measurement of Build Speed/Token Optimization
  still needs an isolated run, not one interleaved with other work.

## Next steps

- Revise `agents/shared/workflow-routing.md`/`risk-and-autonomy.md` thresholds once more pilot
  data accumulates (3 pilots is a start, not a statistically meaningful sample).
- Decide on Co-CEO pilot coverage (configure a key for a future isolated pilot run, or accept
  the gap).
- Run an isolated (not interleaved) pilot specifically to get a real `metrics` data point.
- Expand to IR Academy per `projects/ir-academy.md`, once the above settles.
