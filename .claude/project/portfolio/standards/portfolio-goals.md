# Portfolio Goals

Dustin's stated goals for this build-out, in his own words: **project quality, build speed,
consistency, performance, supportability, token optimization.** This doc defines what each
means concretely in this standard, which existing mechanism(s) serve it, and — honestly —
where the mechanism exists on paper but hasn't been exercised or measured yet. Every future
addition to this standard should be able to point at one of these six, or it's scope creep.

## Project quality

**Means:** shipped work meets a defined bar before it's considered done — not "it compiled,"
not "it looks right," a specific, checkable bar per artifact type.

**Mechanisms:**
- `agents/core/qa.md` — QA re-runs validation itself, never trusts Engineer's report
- `agents/reviewers/adversarial-qa.md` — stale/duplicate/interrupted/retry states, for
  high-risk jobs
- `agents/reviewers/product-coherence.md` — redundancy/fragmentation check
- `standards/quality-bar.md` — **new**, per-artifact-type definition of done (see below)
- `standards/production-readiness.md` — behavior/data/operations/delivery/ownership checklist

**Now has real evidence (PR5):** the QA role, advisory council, and Architect's terminal
judgment all fired for real across 3 pilots and changed outcomes, not rubber-stamped them —
Reqon's exploration pilot caught an optimistic UX-cost estimate; AIM's security pilot backed a
"no risk found" claim with the same rigor as a real finding. `quality-bar.md` itself hasn't
been used to gate a real job yet (the 3 pilots predate it slightly in sequencing) — that's the
next real test.

## Build speed

**Means:** jobs that don't need a human in the loop don't wait for one; jobs that don't need
the full team don't spawn it.

**Mechanisms:**
- Autonomy tiers (`agents/shared/risk-and-autonomy.md`) — autonomous jobs proceed through
  local commit unsupervised
- Workflow routing (`agents/shared/workflow-routing.md`) — bug fixes skip PM/Architect by
  default, feature exploration skips Engineer entirely, security reviews stay read-only until
  approved
- Worktree isolation (`standards/worktree-and-branch-standard.md`, live in Reqon) — parallel
  jobs don't serialize on a single working tree
- `standards/credit-efficiency.md` rule 12 — concurrency cap so parallel work doesn't thrash

**Honest gap:** real elapsed-time measurement still doesn't exist — the 3 PR5 pilots ran
interleaved with other work in one continuous session, so per-stage wall-clock isn't cleanly
separable (see each pilot's `envelope.json.metrics.note`). What PR5 did validate: workflow
routing's conditional-role logic held exactly as designed (Reqon's exploration pilot correctly
skipped Engineer; both AIM pilots correctly skipped PM once routed past Co-CEO). The next real
measurement needs an isolated pilot run, not an interleaved one. AIM's single-tree lock
(`docs/63_agent_persona_plugin.md` §2) is a deliberate speed-vs-isolation tradeoff, not a
defect — worth revisiting once the worktree architectural blocker
(`scripts/dev_pipeline/worktree_lib.sh`'s header, in AIM) is actually fixed and jobs can run in
parallel there too.

## Consistency

**Means:** the same role/workflow/lens vocabulary and the same documentation entry points
exist in every portfolio project, so nobody re-learns a project's dialect to get oriented.

**Mechanisms:**
- This entire repo — `agents/core/*`, `workflows/*`, `agents/reviewers/*`, `schemas/*`
- `standards/documentation-standard.md` — same 11-14 named docs everywhere, live in both
  pilots as of PR2/PR3/PR6
- `scripts/install.sh` — versioned copy, so drift between what's installed and what this repo
  defines is detectable (`.portfolio-version`) rather than silent

**This is the most directly and completely served goal** — it's most of what PR1–PR6 already
are.

## Performance

**Means two distinct things, both real:**
1. **Product performance** — the software the pipeline builds is fast enough for its users.
2. **Pipeline performance** — the agent pipeline itself doesn't waste wall-clock time.

**Mechanisms:**
1. `agents/reviewers/performance.md` + `workflows/performance-audit.md` — evidence-based
   audits, no speculative optimization, both pilots have this role live as of PR2/PR3.
2. Same mechanisms as Build Speed above — the two goals share infrastructure by design.

**Now has real evidence (PR5):** the first-ever performance audit on either pilot found a real
production bug — `/guided-review/progress` (AIM) never returns within 15 seconds, root-caused
to a missing-connection-pooling pattern with `file:line` evidence
([ai-investment-manager#269](https://github.com/dhartung02/ai-investment-manager/pull/269)).
"Evidence-based, no speculative optimization" held — the audit stopped at recommendations, no
code was touched even though the fix looked easy. Pipeline performance itself (goal 2) remains
unmeasured, same as Build Speed above.

## Supportability

**Means:** when something breaks in production, a human can diagnose and recover without
spelunking through undocumented behavior.

**Mechanisms:**
- `standards/production-readiness.md` — logs, metrics, alerts, support diagnosis, escalation
  owner, required on every feature build
- `agents/reviewers/production-ops.md` — dedicated lens checking exactly this
- `standards/documentation-standard.md`'s `SECURITY.md`/`ERRORS.md`/`JOURNAL.md` — a human
  landing cold has somewhere to look
- `ERRORS.md`'s ID format (`ERR-YYYY-MM-DD-NNN`) kept identical across projects specifically so
  a human scanning multiple repos' open issues doesn't have to context-switch formats

**Honest gap:** AIM's `ERRORS.md`/`JOURNAL.md` (PR6) start empty — supportability tooling
exists but has no track record yet. That's expected for week-one adoption, not a red flag, but
worth checking again after real usage accumulates. One concrete step taken: PR5's security
pilot updated `SECURITY.md` with real findings rather than leaving it as an untested inspection
draft — the first real evidence the documentation stays current when a real job touches it.

## Token optimization

**Means:** don't spend model tokens on work that doesn't need them — right-sized reasoning
tier per role, no redundant reviews, no full-team invocations for small jobs.

**Mechanisms:**
- `standards/credit-efficiency.md` — the dedicated doc for this goal specifically
- Model-tier guidance (rule 8) — Architect gets the strongest reasoning, QA the lightest,
  matching Reqon's real `DEFAULT_MODELS` assignment
- Workflow routing's conditional roles — the same mechanism serving Build Speed also serves
  this goal, since an uninvoked role spends zero tokens
- **New as of this update**: an optional `metrics` field on the completion envelope
  (`schemas/completion-envelope.schema.json`) so token/time usage becomes measurable per job,
  not just governed by policy — see `agents/shared/completion-envelope.md`

**Honest gap:** the metrics field was populated in all 3 PR5 pilots' envelopes, but honestly —
every one has `wallClockSeconds`/`toolCalls`/`tokensUsed` omitted, not filled with a number,
because the pilots ran interleaved with other work in one continuous session (see each
envelope's `metrics.note`). This is real evidence the field's honesty mechanism works (it
forced "we don't actually know" instead of a fabricated number), but "token optimization" is
still enforced by design (routing, model tiers) and not yet verified by data. The next pilot
run should be isolated specifically to get a real number.

## What this means for what's next

PR5 ran 3 of 4 planned pilots and closed 2 independent small gaps. Project Quality,
Consistency, Performance, and Supportability all now have at least one real data point;
Build Speed and Token Optimization remain enforced-by-design-but-unmeasured — both need an
isolated (not interleaved) pilot run to get real numbers, which is the clearest concrete next
step. Also surfaced: AIM's Co-CEO step (OpenAI-dependent) wasn't exercised in either AIM pilot
since no `OPENAI_API_KEY` is configured in this environment — real, undecided gap in pilot
coverage, not swept under the rug. See `standards/pr5-pilot-readiness.md` for full pilot
results and the specific next steps.
