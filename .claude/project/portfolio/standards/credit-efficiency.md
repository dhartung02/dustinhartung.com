# Credit-Efficiency Rules

1. One agent session per deliverable — don't re-spawn a role mid-job unless it was blocked or
   escalated and is resuming.
2. Store stable knowledge (product principles, gate rules, project conventions) in repository
   files, not in a session's working memory — every role contract's "Required inputs" section
   should point at a file, not assume prior conversation context.
3. Load only the advisory lenses a job's workflow definition actually triggers — see each
   workflow's "Required advisory lenses" section in `workflows/*.md`. Don't invoke a lens
   "just in case."
4. Don't run the full PM→UX→Architect→Engineer→QA pipeline for a trivial change. Bug Fix's
   default route is `Triage → Engineer → QA` — PM and Architect are conditional additions, not
   defaults (see `workflows/bug-fix.md`).
5. Feature exploration never invokes an implementation agent (Engineer) by default — see
   `workflows/feature-exploration.md`. Its job is a go/revise/defer recommendation, not code.
6. Performance audits may finish with recommendations only — implementation is a separately
   approved work package unless the fix is low-risk and explicitly authorized in the same job
   (see `workflows/performance-audit.md`).
7. Security reviews are read-only on the first pass — Engineer only runs for approved
   remediation, never speculatively (see `workflows/security-review.md`).
8. Use the strongest reasoning tier only for architecture, ambiguity, security, migrations,
   and final synthesis. Use lighter/faster tiers for repository exploration and mechanical
   implementation. Reqon already does this in practice — its orchestrator assigns
   `claude-opus-4-8` to Architect, `claude-sonnet-4-6` to PM/UX/Engineer, and
   `claude-haiku-4-5-20251001` to QA (`lib/agent-orchestrator.js`, `DEFAULT_MODELS`) — a
   working reference point for other projects' model-tier defaults, not a hardcoded mandate.
9. Batch related changes into one coherent work package rather than many tiny jobs that each
   pay the fixed overhead of a full role handoff.
10. Don't re-run a full-repository independent review when only a narrow diff changed since
    the last one.
11. Keep implementation and independent review as separate sessions/roles — don't let the
    Engineer that wrote the code also be the QA that signs off on it.
12. No more than a configurable number of active model-consuming sessions run concurrently
    per project (recommended default: 3 — one implementation, one narrow review/investigation,
    one held in reserve). Reqon's orchestrator already enforces a concurrency cap
    (`MAX_CONCURRENT`, env `AGENT_MAX_CONCURRENT`, default 2) for the same underlying reason:
    worktree isolation solves collision-safety, not resource-safety.
13. Track approximate token/time usage per workflow during the pilot phase (PR5) so the
    routing matrix and autonomy thresholds can be revised with real data, not guesses. The
    completion envelope's optional `metrics` field
    (`schemas/completion-envelope.schema.json`, see `agents/shared/completion-envelope.md`) is
    the concrete mechanism for this — populate it whenever the agent environment exposes model/
    time/token data, so this rule becomes measurable instead of aspirational once real jobs run.
