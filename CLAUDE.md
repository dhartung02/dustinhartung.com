# CLAUDE.md — dustinhartung.com

@AGENTS.md

Dustin Hartung's personal portfolio site. Next.js 16 (App Router) + React 19 + TypeScript,
Tailwind 4, deployed on Vercel. No backend, no database, no auth — every route under
`src/app/work/*` is a self-contained, statically-rendered case study page that recreates a
polished, interactive mockup of one of Dustin's real projects (Reqon, AI Investment Manager,
Executive Companion Pulse, Product Catalog, AI Product Operating System) purely in the frontend
(mock/static data baked into each case study's own `content.ts`, no live data source).

## Structure

- `src/app/page.tsx` — homepage, lists all case studies.
- `src/app/work/<slug>/page.tsx` — one route per case study; each composes section
  components (`Hero`, `MyRole`, `Outcome`, `Closing`, `CaseStudyOverview`, plus a
  project-specific interactive demo section) from `src/components/<slug>/`.
- `src/components/<slug>/` — one folder per case study, fully self-contained: its own
  `content.ts` (copy/data), its own interactive UI recreation (e.g. `src/components/reqon/`
  recreates Reqon's dashboard UI, `src/components/invest/` recreates the AI Investment
  Manager's Command Center), and `sections/` for the shared case-study page layout.
- `docs/superpowers/plans/` and `docs/superpowers/specs/` — the design/planning workflow
  already used to build each case study (one plan + one design spec per case study, dated).
  This is this repo's own lightweight spec-then-implement pattern — distinct from Reqon/AIM's
  job-context/completion-envelope pipeline; this repo has no dev-pipeline agent roles wired in.

## Validation Commands

```bash
npm run lint          # eslint (eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit       # no dedicated typecheck script; strict mode is on in tsconfig.json
npm run build          # next build — the real gate, since there is no test suite
```

No automated test suite exists in this repo today — validation is lint + typecheck + a
successful production build, plus manual visual review of the affected case study route(s)
in a browser (this is a portfolio/marketing site; visual regressions are the primary risk,
not logic bugs).

## Portfolio Agent Operating Model

`.claude/project/portfolio/standards/agent-operating-model.md`, once installed — shared
role/workflow standard across Dustin's repos, installed from `development-portfolio-ops`.
**Reference only as of this install** — this repo has no dev-pipeline agent roles wired in
(a from-scratch install, not a migration). It also has the smallest surface area of the four
repos on this standard: no backend, no data model, no auth, no destructive operations — most
of the standard's human-gated categories (secrets, migrations, production data) don't apply
here at all. The one category that does apply: this is a public-facing site, so publish/deploy
stays human-gated like everywhere else. Project-specific overrides go in `.claude/project/`,
never inside `.claude/project/portfolio/` itself (overwritten on every re-install).

**Advisory council** — 4 persona-based advisory skills (Brand Specialist, Recruiter/Hiring
Manager, Executive, Technical Peer Reviewer) live at `.claude/skills/*/SKILL.md`, directly
invocable via the Skill tool. See `.claude/project/advisory-council.md` for the roster and
when to invoke each.

## Searching past Claude Code sessions

This machine archives past sessions with claude-vault (SQLite + full-text search).
When I reference earlier work, a "previous" conversation, or something we did
in another session, search the archive before assuming it's lost:

- Search:  /usr/local/bin/claude-vault search "<query>" --json
- List recent sessions:  /usr/local/bin/claude-vault list --json
- Export one:  /usr/local/bin/claude-vault export <session-id> --format markdown

Prefer --json so you can parse results. Sessions may exist here even if their
original JSONL files were deleted or compacted.
