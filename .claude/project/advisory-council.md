# Advisory Council

Project-specific advisory lenses for the portfolio site — persona-based reviewers a human or a
Claude Code session can invoke ad hoc when reviewing site content, framing, or components.
These are **not** wired into a dev-pipeline orchestrator (this repo doesn't have one — see
`portfolio/standards/agent-operating-model.md`'s note on this being a from-scratch reference
install, the smallest-surface-area repo on the standard). Invoke any of them directly via the
Skill tool; each is a standalone `.claude/skills/<name>/SKILL.md`.

| Skill | Persona | When to invoke |
|---|---|---|
| `brand-specialist` | Brand/design consultant | Reviewing homepage or case-study pages for visual/narrative consistency |
| `recruiter-hiring-manager` | Recruiter / hiring manager | Reviewing framing, structure, or the opening screen of any page — this is the site's primary real-world audience |
| `executive-reviewer` | Senior exec (VP/CEO-level) | Reviewing case-study narrative for strategic framing and judgment, not just execution detail |
| `technical-peer-reviewer` | Engineering lead / staff engineer (**recommended addition**, not originally named) | Reviewing technical claims or the interactive recreations' actual implementation |

## Why the fourth role

Brand Specialist, Recruiter/Hiring Manager, and Executive are all business/design-facing —
none of them would catch technical overstatement, which is a real risk surface given this site
describes hands-on technical work (architectures, implementation decisions) that a technical
reader would actually probe. `technical-peer-reviewer` fills that gap. It's easy to remove if
not wanted; nothing else in this council depends on it.

## Output convention

None of these skills have a dev-pipeline job to write into, so each defaults to
`docs/advisory/<skill-name>-<YYYY-MM-DD>-<slug>.md` plus presenting the memo directly in the
response.
