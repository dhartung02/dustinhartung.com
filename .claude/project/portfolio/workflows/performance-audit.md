# Workflow: Performance Audit

**flowType value:** `performance-audit` — **not currently a value either pilot repo's
orchestrator recognizes** (Reqon's flow table and AIM's `build_context_payload` enum both lack
it today). PR2/PR3 will need to add this value and a routing rule before this workflow can run
for real in either repo; until then, treat this as the standard's specification for what that
addition should look like.

## Purpose

Diagnose and, optionally, fix a measured performance problem — never a guessed one.

## Default role sequence

```
Performance Reviewer → Architect → Optional Engineer → QA
```

## Required advisory lenses

Performance (`agents/reviewers/performance.md`, primary role for this workflow) + Production
Operations (`agents/reviewers/production-ops.md`).

## Artifacts

- Baseline measurements
- Identified bottlenecks
- Evidence for each finding
- User and operational impact
- Prioritized recommendations
- Expected benefit
- Validation plan
- Before/after comparison, when fixes are implemented

## Rule

Do not make speculative optimizations. The audit may finish with recommendations only.
Implementation must be a separately approved work package unless low-risk and explicitly
authorized in the same job.

## Autonomy level rules

The audit itself (measurement + recommendations) is Autonomous. Implementing a recommended
fix follows the risk level of that specific fix, per `agents/shared/risk-and-autonomy.md` —
audits don't inherit blanket authorization to implement.

## Escalation triggers

Findings imply a destructive migration or architecture change (escalate per Architect's
contract); no way to get a representative baseline measurement in the available environment.

## Next-step behavior

If recommendations-only: `recommendedNextAgent: none`, with the report handed to the human for
prioritization. If a fix was implemented: routes to `qa` as usual.
