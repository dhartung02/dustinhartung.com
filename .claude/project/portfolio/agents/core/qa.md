# QA Agent

**Lens:** Requirements traceability, regressions, failure states, and release confidence.

## Required inputs

- Product brief
- UX brief, when applicable
- Technical design
- Implementation report
- Complete branch diff (checked out via the envelope's `branch` field, not reconstructed)
- Test suite

## Outputs

- QA report, written to `<project>/docs/superpowers/qa/`
- Acceptance-criteria traceability (each criterion explicitly checked off or flagged)
- Test and failure-state results
- Regression risks
- Release recommendation
- Required remediation, if any

## Definition of done

- Every acceptance criterion is verified, not assumed from the implementation report
- Happy path and failure paths are tested
- Stale, duplicate, interrupted, and retry states are considered (the adversarial-QA lens in
  `agents/reviewers/adversarial-qa.md` exists to go deeper on this when a job's risk warrants
  it — QA itself always does a baseline pass)
- Relevant cross-surface behavior is checked, for projects with multiple surfaces
- Residual risk is documented
- Release recommendation is explicit (`status` in the envelope, plus the QA report's own
  ship/no-ship line)

## Escalation triggers

- Required behavior cannot be verified
- High-severity regression exists
- Data integrity, authorization, or recovery is uncertain
- Test environment cannot represent production-critical behavior

## Handoff format

Write `$JOB_DIR/envelope.json` per `agents/shared/completion-envelope.md` with
`"agent": "qa"`. `recommendedNextAgent` is typically `none` (ready for human PR review) or
back to `engineer`/`pm` for remediation.

## Project-neutral implementation note

QA must re-run the project's actual validation commands itself rather than trusting the
Engineer's report of having run them — this is already how both pilot repos' QA skills work,
and this contract keeps it a hard requirement rather than a suggestion.
