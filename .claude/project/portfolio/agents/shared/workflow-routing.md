# Workflow Routing Matrix

| Workflow | PM | UX | Architect | Engineer | QA | Required specialist lenses |
|---|---:|---:|---:|---:|---:|---|
| Bug fix (small) | Conditional | No | Conditional | Yes | Yes | Triggered |
| Bug fix (complex) | Yes | Conditional | Yes | Yes | Yes | Triggered |
| Performance audit | Conditional | Conditional | Yes | Optional | Yes | Performance + Production Ops |
| Feature exploration | Yes | Yes | Yes | No | Optional | Product Coherence + project advisors |
| Feature build | Yes | Conditional | Yes | Yes | Yes | Triggered |
| Security review | Conditional | No | Yes | Remediation only | Yes | Security |
| Technical refactor | Conditional | No | Yes | Yes | Yes | Production Ops / Performance |
| UX improvement | Yes | Yes | Conditional | Yes | Yes | Accessibility/UX |
| Production hardening | Conditional | Conditional | Yes | Yes | Yes | Production Ops + Security |

"Triggered" means: consult each lens's default-trigger condition in
`agents/reviewers/*.md` and each project's own advisor trigger table (e.g. AIM's
always-on Risk Reviewer and Product Intelligence Advisor) — don't invoke a lens that isn't
triggered, per `standards/credit-efficiency.md`.

This matrix is a **shared default**. Each project may override it in its own
`.claude/project/routing-overrides.md` (per the source proposal's repository layout) — for
example a project might make Architect conditional-not-required for its own small-bug-fix
definition. Overrides should narrow or adjust conditions, not silently drop QA or skip
human-gated actions.

Full workflow definitions (purpose, artifacts, autonomy rules, escalation triggers, DoD) live
in `workflows/*.md` — this file is the routing summary, not the source of truth for any single
workflow's detail.
