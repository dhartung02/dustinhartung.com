# Workflow: Security Review

**flowType value:** `security-review` — **not currently a value either pilot repo's
orchestrator recognizes**, same caveat as `workflows/performance-audit.md`. PR2/PR3 will need
to add it before this workflow can run for real.

## Purpose

Find and, once approved, remediate security issues — read-only first, remediation second.

## Default role sequence

```
Security Reviewer → Architect → Engineer for remediation → QA → Security Recheck
```

The first pass should normally be read-only — see `agents/reviewers/security.md`'s
non-authority section.

## Required advisory lenses

Security (`agents/reviewers/security.md`, primary role). AIM's always-on Risk Reviewer runs
regardless, per its own trigger table.

## Artifacts

- Review scope
- Threat surface
- Concrete code paths or configuration findings
- Severity, exploitability, likelihood, and impact
- Remediation
- Required regression test
- Residual risk
- Release-blocking determination

## Review categories

Authentication, authorization, tenant isolation, input validation, injection, secrets,
sensitive logging, file and URL handling, dependency risk, rate limiting, data exposure,
destructive operations, AI/tool misuse, deployment configuration.

## Autonomy level rules

The read-only review pass is Autonomous. Remediation is Supervised at most — Engineer only
implements fixes that have been explicitly approved, never speculatively (`Remediation only`
in `agents/shared/workflow-routing.md`'s Security Review row).

## Escalation triggers

Any critical/high-severity finding with active exploitability is `Needs Decision` immediately,
not queued for the normal report cadence.

## Next-step behavior

Read-only pass: `recommendedNextAgent: none`, report handed to human for a remediation
decision. Once remediation is approved and implemented: routes to `qa`, then a Security
Recheck pass (Security Reviewer re-runs against the fix) before the job is considered done.
