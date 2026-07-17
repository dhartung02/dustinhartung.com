# Workflow: New-Feature Build

**flowType value:** matches Reqon's/AIM's existing `new-feature` or `ai-feature` values.

## Purpose

Implement and ship a feature that's already been scoped (either directly, or as the follow-up
to a Feature Exploration job).

## Default role sequence

```
PM → UX (if applicable) → Architect → Engineer → QA → Independent Review
```

"Independent Review" is whichever project-specific and shared advisory lenses the job's
routing triggers (see `agents/shared/workflow-routing.md`), plus, for AIM specifically, the
Co-CEO PR-review step already built into its pipeline.

## Required advisory lenses

Per `agents/shared/workflow-routing.md`'s Feature Build row: "Triggered" — consult each lens's
own default-trigger condition and each project's advisor trigger table. Production Operations
(`agents/reviewers/production-ops.md`) is a near-default given `standards/production-readiness.md`'s
scope.

## Artifacts

- Product brief
- UX brief, when applicable
- Technical design
- Implementation report
- Automated tests
- QA report
- Production-impact assessment (`templates/production-impact.md`)
- PR summary
- Support and documentation updates

## Autonomy level rules

Supervised by default (`agents/shared/risk-and-autonomy.md`) — PM produces a brief, then the
job proceeds through local commit unless an escalation trigger fires. Push/PR/merge/deploy
stay human-gated regardless of how smoothly the job went.

## Escalation triggers

Union of every role's own escalation triggers in `agents/core/*.md`, since this workflow
exercises the full pipeline.

## Next-step behavior

QA's `recommendedNextAgent` is typically `none` once Independent Review clears — ready for
human PR creation/review. If a reviewer's finding requires rework, routes back to `engineer` or
`pm` as appropriate.
