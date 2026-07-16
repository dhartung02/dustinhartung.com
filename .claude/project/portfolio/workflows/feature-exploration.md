# Workflow: New-Feature Exploration

**flowType value:** maps to Reqon's/AIM's existing `new-feature` or `ai-feature` values when
the job is explicitly scoped as exploration-only (no implementation). Projects that want a
distinct `feature-exploration` value to avoid ambiguity with feature-build jobs can add one —
see `compat/reqon-mapping.md` / `compat/aim-mapping.md`.

## Purpose

Decide whether a feature idea is worth building, and roughly how, without committing to
implementation.

## Default role sequence

```
PM → Relevant advisors → UX → Architect
```

**No production implementation by default.** Engineer does not run for this workflow — see
`standards/credit-efficiency.md` rule 5.

## Required advisory lenses

Product Coherence (`agents/reviewers/product-coherence.md`, near-always relevant for
exploration) + each project's own advisors per their trigger tables (e.g. AIM's Investor
advisor for `new-feature`/`ai-feature`/`ux-polish` flows).

## Artifacts

- Opportunity brief
- User problem and target user
- Existing-feature overlap analysis
- Alternatives considered
- UX concept
- Architecture options
- Risks and unknowns
- Recommended MVP
- Go / revise / defer recommendation
- Proposed PR or work-package breakdown

## Autonomy level rules

Autonomous through the full exploration — no human-gated action is possible in this workflow
since nothing is implemented or shipped.

## Escalation triggers

Same as PM's and Architect's own contracts. A recommendation to proceed to Feature Build is
itself not an escalation — it's the expected output; the human decides whether to greenlight
it at job intake for the next job.

## Next-step behavior

`recommendedNextAgent: none` — output is a recommendation document for human review, not a
handoff to another agent role. If greenlit, the human opens a new Feature Build job.
