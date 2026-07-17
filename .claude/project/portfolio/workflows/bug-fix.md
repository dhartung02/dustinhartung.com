# Workflow: Bug Fix

**flowType value:** `bug-fix` — already a first-class value in both pilot repos' orchestration
(Reqon's `agent-orchestrator.js` flow table, AIM's `build_context_payload` enum). No new value
needs adding for this workflow.

## Purpose

Fix a known or reported defect with the smallest coherent, regression-tested change.

## Default role sequence

```
Triage → Engineer → QA
```

- Add **PM** when intended behavior is ambiguous (i.e. it's not obvious what "correct" looks
  like without a product judgment call).
- Add **Architect** when the issue crosses system boundaries, data, or infrastructure.
- Add **Security Reviewer** (`agents/reviewers/security.md`) when the defect involves auth,
  permissions, sensitive data, or unsafe input.

## Required advisory lenses

Security (conditional, per above). No other shared lens is a default for bug fixes —
project-specific advisors trigger per their own tables (e.g. AIM's always-on Risk Reviewer
still runs regardless of workflow).

## Artifacts

- Reproduction evidence
- Severity
- Root-cause analysis
- Regression test
- Minimal coherent fix
- Adjacent-risk assessment
- Validation results

## Autonomy level rules

Low/medium-risk defects may progress autonomously through local commit. P0 incidents,
destructive fixes, or ambiguous intended behavior require escalation — see
`agents/shared/risk-and-autonomy.md`.

## Escalation triggers

Same as Engineer's and QA's own contracts (`agents/core/engineer.md`,
`agents/core/qa.md`), plus: intended behavior can't be determined without a product decision.

## Definition of done / production-readiness expectations

Standard Engineer/QA DoD (`agents/core/engineer.md`, `agents/core/qa.md`) plus
`standards/production-readiness.md` for any fix touching data, migrations, or background jobs.

## Next-step behavior

QA's `recommendedNextAgent` is typically `none` (ready for human PR review) unless remediation
is needed, in which case it routes back to `engineer`.
