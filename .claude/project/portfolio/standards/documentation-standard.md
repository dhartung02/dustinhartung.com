# Documentation Consistency Standard

**Reference implementation:** Reqon. Its `CLAUDE.md` + named doc set (`ARCHITECTURE.md`,
`API.md`, `DATA_MODEL.md`, `DESIGN.md`, `UIUX.md`, `CONFIG.md`, `BUILD.md`, `TEST.md`,
`CONTRIBUTING.md`, `SECURITY.md`, `ERRORS.md`, `TASKS.md`, `JOURNAL.md`,
`PLAYBOOKS/DEPLOY.md`) is the pattern every project on this portfolio standard adopts. This
doc generalizes that pattern; `templates/docs/*.md` gives the section skeleton for each file.

## Why one doc set, not "whatever each project already has"

An agent (or a human) landing in any portfolio project should be able to find the same kind of
information in the same-named place every time, without first learning that project's own
documentation dialect. Reqon and AI Investment Manager arrived at this problem from opposite
directions — Reqon has a lean, current-state, reverse-engineered-from-code doc set; AIM has 65+
chronologically-numbered planning/decision docs — and both are genuinely valuable, but neither
alone is portable. This standard doesn't ask either project to throw away what it has; it asks
every project to also expose the same **named entry points**, each either containing the
current-state summary directly (Reqon's approach) or indexing into deeper existing docs where
a project already has more detail than a summary needs to restate (AIM's approach).

## Required doc set

| File | Contents | Required? |
|---|---|---|
| `CLAUDE.md` | Session entry point — see below | Always |
| `ARCHITECTURE.md` | Tech stack, directory structure, key architectural decisions, component architecture | Always |
| `API.md` | Endpoints/interfaces by category, auth, base URL | If the project exposes an API |
| `DATA_MODEL.md` | Entities, schema, migrations, validation rules | If the project persists data |
| `DESIGN.md` | Colors, typography, spacing, visual system | If the project has a custom design system |
| `UIUX.md` | Navigation patterns per surface, component behaviors, interaction states | If the project has a user-facing UI |
| `CONFIG.md` | Environment variables and feature flags, by category | Always |
| `BUILD.md` | Prerequisites, repo layout, build commands per surface, linting, CI/CD | Always |
| `TEST.md` | Test stack, running tests, gotchas, test structure, coverage picture | Always |
| `CONTRIBUTING.md` | Dev setup, ground rules, branch/commit conventions, PR checklist | Always |
| `SECURITY.md` | What's solid, warnings by category, related docs | Always |
| `ERRORS.md` | Critical error ledger (ID, severity, status) | Always |
| `TASKS.md` | Active phase/task, task chain, upcoming phases, completed archive | Always |
| `JOURNAL.md` | Dated narrated engineering log | Always |
| `PLAYBOOKS/DEPLOY.md` | Deployment steps, pre-deploy checklist, rollback | If the project deploys independently |

"If applicable" categories that don't apply must still say so explicitly — either omit the file
and note the omission + reason in `CLAUDE.md`'s table of contents, or keep a one-line file
saying "not applicable — [reason]." Silent absence reads as an oversight, not a decision.

## When a project already has deeper documentation than a summary needs

Don't delete or fork existing detailed docs to satisfy this standard. Each required file may be
either (a) the current-state summary directly, when nothing more detailed exists yet, or (b) a
concise index into existing deeper docs, when they do — same pattern AIM's own `CLAUDE.md`
already uses for its "Companion docs" section. Either way, the named file must exist and must
be enough on its own to orient someone, even if the full depth lives elsewhere.

## `CLAUDE.md` structure

Every project's `CLAUDE.md` should have, at minimum (see `templates/docs/CLAUDE.md.template`):

- **Critical Context** — tech stack, main file, core mechanic, key integration, platform
  support, one hard "DO NOT"
- **Session Startup Checklist** — what to read/check before starting work
- **Table of Contents** — links to every doc in the required set that exists for this project,
  noting "not applicable" for any that don't
- **Quick Reference** — 10-15 most-accessed code locations as `file:line`
- **Current State** — feature checklist
- **Task Templates** — 3-5 common task walkthroughs with file:line references
- **Anti-Patterns** — 5-6 concrete mistakes to avoid, with reasons
- **Journal Update Requirements** — when and how to write a `JOURNAL.md` entry
- Any project-specific hard rules (Reqon's GOLDEN RULEs, AIM's Gate model) — these are
  project-specific content, not a portable section, but every project should have room for its
  own non-negotiables stated this plainly

## Freshness / consistency rules

1. **Every completed job that changes behavior gets a `JOURNAL.md` entry** — dated, narrated,
   linked to the task/job id if one exists. This mirrors `agents/shared/completion-envelope.md`'s
   discipline: an envelope records what happened for the pipeline, a journal entry records it
   for a human skimming history later. They are not the same artifact and neither substitutes
   for the other.
2. **A doc that references a specific `file:line` must be re-verified, not assumed, before
   being trusted** — code moves. QA (`agents/core/qa.md`) should flag a stale reference it
   notices, the same way it flags any other defect.
3. **`ERRORS.md` entries use the ID format `ERR-YYYY-MM-DD-NNN`** and the severity scale
   P0 (critical/system down) – P3 (cosmetic), matching Reqon's ledger exactly — this one's
   worth keeping byte-for-byte identical across projects since it's the kind of thing a human
   scans quickly across multiple repos.
4. **`TASKS.md` reflects real active work, not a wishlist** — a project using a different active
   task-tracking system (AIM's roadmap execution plan, for instance) should have `TASKS.md`
   index into that system rather than duplicate it out of sync.
5. **New documentation added by an agent job follows this same required-set + template
   convention** — don't invent a new ad hoc doc file for something that fits an existing
   category.

## Installing this standard

`scripts/install.sh` already copies `templates/` (including `templates/docs/`) into
`<target-repo>/.claude/project/portfolio/templates/docs/` alongside everything else. The
templates are skeletons to start a new doc from, or to check an existing one against — they are
not meant to be copied verbatim into a project's root, since every required file's actual
content is project-specific.
