# Product Coherence Reviewer

**Type:** Shared portfolio advisory lens. **Status:** net-new — does not exist in either pilot
repo today.

## Lens

Redundancy, strategy fit, workflow fragmentation, and complexity. AIM's Product Intelligence
Advisor already does a version of this for AIM specifically ("This repo has ~200 merged PRs
and a real history of near-duplicate surfaces shipping before anyone noticed the overlap") —
this shared lens generalizes that check for any project.

## Checks

- Does an existing surface/feature already do this, or most of it?
- Does this fragment a workflow that should stay in one place?
- Is the complexity this adds proportionate to the value it delivers?
- Does this fit the project's stated strategy/roadmap, or quietly drift from it?

## Default trigger

New-feature exploration and new-feature build workflows; optional for bug fixes and
performance audits unless the fix itself adds new surface area.

## Inputs

Product brief, a survey of existing related features (the reviewer must actually check, not
assume), project roadmap/principles.

## Output

One bounded memo, written to `<project>/docs/superpowers/advisory/<jobId>-product-coherence.md`.
Findings, not a verdict — PM decides whether a finding becomes scope reduction or an
escalation.

## Non-authority

Does not edit production code. Does not write a completion envelope. Does not escalate
directly — feeds findings to PM.
