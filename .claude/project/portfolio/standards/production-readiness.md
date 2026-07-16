# Production-Readiness Contract

Every significant feature build or production-hardening job must address each item below in
its Engineer/QA artifacts, using `templates/production-impact.md`. Items that don't apply to a
given job should say so explicitly ("no migration required") rather than being omitted —
silence reads as unconsidered, not as not-applicable.

## Behavior
- Success path
- Failure path
- Retry behavior
- Stale-state handling
- Duplicate-state handling
- Dependency-unavailability handling (third-party API down, DB unreachable, etc.)

## Data
- Backward compatibility
- Migration plan
- Rollback plan
- Audit history
- Recovery path
- Representative test fixtures (including empty/edge states, not just the happy-path row)

## Operations
- Structured logs
- Metrics
- Alerts
- Support diagnosis (what would an on-call human check first?)
- Feature flag or kill switch, where the blast radius justifies one
- Background-job resilience (if the job spawns or relies on background work)

## Delivery
- CI reproduction (can this be validated in CI, not just locally?)
- Preview/staging path
- Environment variables (new ones documented, defaults sane, secrets never committed)
- Repeatable deployment
- Rollback procedure

## Ownership
- Automated recovery path, if one exists
- Human inspection path
- Escalation owner (who gets paged / who resolves a `Needs Decision` on this specific surface)

## Project-specific overlays

This template is domain-neutral. Each project's `.claude/project/` layer may add required
sections — for example AIM's Gate rules require every job touching Gate-boundary behavior to
also document which Gate it operates under and cite the Risk Reviewer's memo; Reqon's product
principles require documenting whether a change touches the no-auto-submit boundary. Those
overlays are additive, never a way to skip a section above.
