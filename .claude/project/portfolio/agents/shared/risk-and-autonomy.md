# Risk and Autonomy

Full autonomy-tier definitions live in `standards/agent-operating-model.md` §6. This file adds
the mapping from a job's declared `riskLevel` (in `context.json` and the completion envelope)
to the expected autonomy tier — a starting default, not a substitute for a role's own
escalation judgment.

| `riskLevel` | Default autonomy | Notes |
|---|---|---|
| `low` | Autonomous | Known bug fixes, docs, tests, non-destructive refactors |
| `medium` | Supervised | Most feature builds, new APIs, non-destructive schema additions |
| `high` | Supervised, with mandatory PM/Architect involvement | Integration changes, jobs touching a project's Hard Lines / Gate boundaries |
| `critical` | Human-gated from the start | Destructive migrations, auth/authz redesign, payments, production infra, secrets, medical publication rules, investment recommendation semantics, production data changes |

A job's declared `riskLevel` is a starting point set by whoever creates the job (human or PM).
Any role may raise it mid-job if it discovers the work is riskier than assumed — that's an
escalation (`Needs Decision`), not a silent scope change. No role may lower a `critical` job's
gating to route around a human checkpoint.
