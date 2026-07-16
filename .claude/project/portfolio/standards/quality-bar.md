# Quality Bar

Serves `standards/portfolio-goals.md`'s Project Quality goal — a specific, checkable
definition of done per artifact type, not a vague "make sure it's good." Generalized from AI
Investment Manager's `docs/14_feature_quality_bar.md`, which is itself a real, working example
worth reading alongside this file. Project-specific overlays (a project's own required doc
updates, its own manual-check conventions) belong in that project's `.claude/project/`, layered
on top of — not replacing — the bar below.

QA (`agents/core/qa.md`) checks a job's artifacts against the row matching what the job
actually touched. A job that touches more than one category must clear every applicable row.

## API / backend endpoint

- **Required tests:** empty-state and populated-state test for the new/changed behavior;
  regression tests for edge cases (invalid input, not-found, boundary values). Must run without
  requiring a live external stack unless the project's own `TEST.md` says otherwise.
- **Required empty states:** clean, well-typed empty responses (empty lists/nulls), not errors,
  when no data exists.
- **Required boundary language:** no capability implied that the project hasn't unlocked (a
  project's own gate/principle system — e.g. AIM's Gate model, Reqon's product principles) in
  route names, payload fields, or summaries. Summary counts mean exactly what their labels say.
- **Required docs:** this project's `API.md` (if the surface changed), `CONFIG.md` (if new env
  vars), `JOURNAL.md` entry.
- **Validation commands:** the project's real compile/test commands (see its `BUILD.md`/
  `TEST.md`), never invented ones.
- **Manual checks:** exercise the endpoint (or its test) for both empty and populated cases;
  confirm error handling matches existing route patterns in the same codebase.

## UI / dashboard page

- **Required tests:** the UX brief's stated interaction states (empty/loading/error/retry/
  success) are each actually exercised, not just described.
- **Required states:** every state in the UX brief renders without an unhandled exception.
- **Required boundary language:** same as above — no implied capability the project hasn't
  unlocked, shown in copy, not just code.
- **Required docs:** this project's `UIUX.md` (if patterns changed), `JOURNAL.md` entry.
- **Validation commands:** the project's real UI validation (static checks, import checks,
  screenshot/browser verification per the `run`/`verify` skills where available).
- **Manual checks:** the UI skill's own verification step (`/verify`-equivalent) — drive the
  actual feature in a browser or app, don't just trust the diff.

## Data model change

- **Required tests:** migration applies idempotently on a fresh database and on one that
  already has the prior schema; a representative fixture exists for both empty and populated
  states.
- **Required docs:** this project's `DATA_MODEL.md`, `JOURNAL.md` entry, and — if the change
  affects evidence/provenance-bearing data — confirmation that the provenance chain (or this
  project's equivalent traceability model) still holds.
- **Validation commands:** the project's schema-apply step, plus its full test suite (schema
  changes have a wide blast radius — don't scope validation down to just the touched table).
- **Manual checks:** apply the migration against a copy of real (or realistic fixture) data,
  not just an empty database.

## Workflow handoff (agent role → agent role)

- **Required tests:** the completion envelope validates against
  `schemas/completion-envelope.schema.json`; every field a downstream role depends on
  (`branch`, `artifacts`, `recommendedNextAgent`) is actually populated, not left at a
  template default.
- **Required docs:** the artifact this role is responsible for (product brief, technical
  design, QA report, advisory memo) exists at the path the envelope claims.
- **Validation commands:** none beyond schema validation — a handoff's "test" is that the next
  role can actually pick up the artifact and proceed without re-deriving missing context.
- **Manual checks:** QA re-reads the full chain of artifacts for the job (not just the most
  recent one) before signing off, per `agents/core/qa.md`'s Definition of Done.

## Docs-only / process change

- **Required tests:** none beyond `scripts/validate.py` (in this repo) or the project's own
  doc-consistency check, if one exists.
- **Required docs:** the change itself — this category exists so a docs-only job isn't held to
  a code-artifact bar it can't meet, not so it skips review.
- **Validation commands:** link-check / reference-check where available (see
  `scripts/validate.py`'s `check_doc_links`).
- **Manual checks:** every claim of fact in the new/changed doc traces to something actually
  verified (a real file, a real command output), not assumed.

## Advisory / review-only job (performance audit, security review)

- **Required tests:** none — no code changes to test, by design (see `workflows/performance-audit.md`,
  `workflows/security-review.md`).
- **Required content:** every finding has concrete evidence (profiling output, file:line,
  reproduction steps) — a finding without evidence is a hunch, not a finding, and doesn't meet
  this bar.
- **Required docs:** the report itself, at the path the workflow specifies.
- **Validation commands:** none.
- **Manual checks:** an explicit release-blocking determination (security) or prioritized
  recommendation list (performance) — a report that doesn't conclude anything hasn't cleared
  the bar even if every individual finding is well-evidenced.
