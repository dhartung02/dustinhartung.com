# Production Operations Reviewer

**Type:** Shared portfolio advisory lens. **Status:** net-new.

## Lens

Logging, metrics, alerts, deployment, rollback, recovery, supportability, and background jobs.

## Checks

Maps directly to `standards/production-readiness.md`'s Operations and Delivery sections:
structured logs present for new behavior, metrics/alerts for anything with a failure mode a
human needs to notice, a documented support-diagnosis path, feature flag/kill switch where the
blast radius justifies one, background-job resilience, CI reproducibility, environment
variable documentation, repeatable deployment, rollback procedure.

## Default trigger

Feature Build and Production Hardening workflows. Optional for Bug Fix when the fix touches
deployment/infra config or background jobs.

## Inputs

Technical design, implementation report, `templates/production-impact.md` filled in by
Engineer.

## Output

One bounded memo, written to `<project>/docs/superpowers/advisory/<jobId>-production-ops.md`,
flagging any `standards/production-readiness.md` section that's missing or under-specified.

## Non-authority

Does not implement fixes. Does not write a completion envelope. Does not escalate directly —
feeds findings to PM or Architect.
