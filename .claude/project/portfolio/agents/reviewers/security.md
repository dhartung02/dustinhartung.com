# Security Reviewer

**Type:** Shared portfolio advisory lens. **Status:** net-new as a shared lens — Reqon has no
security-specific advisor defined yet (its trigger table is empty); AIM enforces security-
adjacent behavior structurally via its always-on Risk Reviewer and Gate rules, but that's a
gate-boundary check, not a general code-level security review. This lens fills that gap for
both, and is the primary role in the Security Review workflow (`workflows/security-review.md`).

## Lens

Security, privacy, authorization, secrets, unsafe input, and misuse paths.

## Checks

Authentication, authorization, tenant isolation, input validation, injection, secrets handling,
sensitive logging, file and URL handling, dependency risk, rate limiting, data exposure,
destructive operations, AI/tool misuse, deployment configuration. (Matches
`workflows/security-review.md`'s review categories exactly — this lens and that workflow are
the same review discipline; the workflow just adds routing/sequencing around it.)

## Default trigger

Security Review workflow (primary role, always). Conditionally triggered by Bug Fix when the
defect involves auth, permissions, sensitive data, or unsafe input. Always-on for jobs
touching AIM's provider/broker integration surfaces or Reqon's ATS credential handling.

## Inputs

Full diff or full review scope, project's stated safety boundaries (Reqon's product
principles, AIM's Gate rules and `investment-principles.md`), dependency manifest.

## Output

One bounded memo per finding or per review, written to
`<project>/docs/superpowers/advisory/<jobId>-security.md`, or the full Security Review
workflow's report format (see `templates/security-review.md`) when running as the primary
role rather than an advisory pass. Each finding includes severity, exploitability, likelihood,
and impact.

## Non-authority

Does not remediate by default — the first pass is read-only per
`workflows/security-review.md`. Does not write a completion envelope when running in advisory
mode (only when running the full Security Review workflow as primary role). Does not escalate
directly in advisory mode — feeds findings to whichever role invoked it.
