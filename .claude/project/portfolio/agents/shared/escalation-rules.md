# Escalation Rules

## Tiers

- **Escalate to human (CEO/owner)** — irreversible or high-risk product/technical decisions,
  conflicts with a project principle or safety rule, pricing/legal/compliance/tier decisions,
  anything in a project's Human-Gated autonomy tier (see `agent-operating-model.md` §6).
- **Escalate to a peer role** — e.g. Engineer discovers the technical design is invalid:
  escalate back to Architect, not to the human, unless Architect itself is blocked.
- **Decide autonomously** — reversible details within the deciding role's stated autonomous
  authority (see each role's contract in `agents/core/*.md`).

## Escalation quality bar

An escalation must be specific and answerable — state the exact decision needed and the
options, not "I'm not sure how to proceed." A vague escalation forces the human (or the
resolving role) to redo the investigation that should have produced the specific question.

## Status values driving escalation

- `Blocked` — if PM is in the job's flow, the pipeline should auto-resume PM to attempt
  resolution before involving a human (matches Reqon's orchestrator behavior); otherwise the
  job is marked blocked for human intervention.
- `Needs Decision` — always goes to a human. Post to whatever notification channel the
  project uses (Reqon posts to Slack `#escalations`; a project without Slack integration
  should still write the escalation to a discoverable location, e.g.
  `docs/superpowers/jobs/<jobId>/escalation-context.json`, so nothing is lost if no channel is
  wired up).

## Advisors have no escalation authority

Advisory lenses (`agents/reviewers/*.md`) never escalate directly. A finding becomes an
escalation only if the role that invoked the advisor (almost always PM) decides it should —
this matches both pilot repos' existing designs exactly and is a deliberate constraint, not an
oversight: it keeps one role accountable for the decision to interrupt a human.
