# Worktree and Branch Standard

**Status: documentation only.** Not wired into any repo's automation yet — see
`agent-operating-model.md` §5, deviation 5. Reqon already implements a version of this and
doesn't need it. AIM deliberately uses a single-tree file lock instead and should not be
migrated until a tested replacement exists (PR4).

## Target shape

```
one job  =  one branch  =  one isolated worktree  =  one artifact directory  =  one active delivery chain
```

## Branch naming

```
agent/<workflow-type>/<job-id>
```

Examples:
```
agent/bug-fix/reqon-20260713-auth-loop
agent/performance-audit/aim-20260713-briefing-query
agent/feature-exploration/ir-20260713-media-pathways
```

Reqon's current convention (`agent/<slugified-title>-<8charJobIdPrefix>`, e.g.
`agent/enrichment-lib-docs-cleanup-84738be5`) predates this standard and doesn't need
retrofitting — PR2 can adopt the `<workflow-type>/<job-id>` shape for new jobs going forward
without rewriting history.

## Rules

- No direct agent edits on `main` — every job gets its own worktree before any file is
  touched.
- No two implementation agents in one worktree at a time.
- `node_modules` (or equivalent dependency dirs) may be symlinked into a worktree for speed,
  but any stage that changes `package.json`/lockfiles or installs a new dependency must be
  treated as affecting every concurrent worktree and the primary checkout — this is a known,
  documented risk in Reqon's current implementation (`lib/agent-orchestrator.js`), not a new
  concern this standard introduces.
- `.env` and other gitignored local config: copy or symlink into the worktree without ever
  committing secrets. Never write a secret value into a job's `context.json`, `envelope.json`,
  or any `docs/superpowers/` artifact.
- A worktree's own metadata (e.g. `worktree.json: {worktreePath, branch}`) is the source of
  truth for where a job's work lives — not a database row — so job state survives a database
  being unconfigured or unreachable (this mirrors Reqon's existing design).
- **Stale-worktree detection**: before creating a new worktree, check `git worktree list` for
  entries whose path no longer exists or whose branch has already merged/been deleted, and
  prune them (`git worktree prune`). Reqon's repo currently has two worktrees registered under
  a different username/path (`/Users/dustinhartung/Documents/reqon/.worktrees/...`) that
  `git worktree list` already flags `prunable` — a concrete, present example of exactly the
  drift this rule prevents.
- On successful job completion: commit, push (human-gated — see role contracts), then remove
  the worktree. On failure or block: leave the worktree in place for inspection/retry; don't
  auto-clean.
- Concurrency across worktrees is capped per project (Reqon currently defaults to 2 concurrent
  jobs via `AGENT_MAX_CONCURRENT`) — worktree isolation solves collision-safety, not
  resource-safety (API rate limits, CPU/memory for N simultaneous agent subprocesses).

## Compatibility with super.engineering and Superset

Both tools are built around per-project isolated worktrees as a first-class concept (see
`agent-operating-model.md` §5, deviation 4, for why concrete setup configs are deferred to
PR4). This standard is written to be tool-agnostic so either control plane can drive it.

## Migration path for AIM's queue/lock system

AIM's `docs/superpowers/jobs/.active-job` lock (implemented in `scripts/dev_pipeline/lib.sh`
and mirrored in `apps/dashboard/dev_command_center_helpers.py`) is explicitly a deliberate
choice to accept strictly-serial job execution in exchange for avoiding worktree lifecycle
overhead in a single-operator, local, file-based setup. Do not remove it until:

1. AIM has run at least one real job end-to-end under the *existing* lock system (it has not,
   as of this writing), so there's a known-good baseline to compare against;
2. a worktree-based alternative has been implemented and tested in AIM's PR4 as an **opt-in**
   path, not a replacement, so the lock system remains available as a fallback;
3. Dustin has explicitly approved retiring the lock system.
