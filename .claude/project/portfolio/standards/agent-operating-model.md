# Portfolio Agent Operating Model

**Owner:** Dustin Hartung
**Status:** PR1 — adopted for `development-portfolio-ops`, not yet installed into any pilot repo
**Source:** adapted from `/Users/plex/Desktop/portfolio_agent_operating_model.md`, calibrated
against a direct inspection of Reqon and AI Investment Manager (AIM) as of 2026-07-16.

## 1. Purpose

One reusable vocabulary — roles, workflows, advisory lenses, schemas — across Reqon, AIM,
IR Academy, the portfolio site, and future repos, so that:

- agents can progress through low/medium-risk jobs without repeated supervision;
- multiple professional lenses apply to important work without re-deriving them per repo;
- project-specific safety rules (Reqon's product principles, AIM's Gate 1–6 model) stay
  enforced and are never diluted by generalization;
- high-risk actions (push, merge, deploy, secrets, destructive migrations) stay human-gated
  everywhere;
- Claude/model usage per completed work package becomes more efficient over time.

> Roles provide accountability. Workflows provide sequencing. Lenses provide specialized
> judgment. Project configuration provides domain knowledge.

## 2. What's actually true today (grounds this standard in reality, not aspiration)

Both pilot repos already run a version of this model, independently:

- **Reqon**: real running orchestrator daemon (`lib/agent-orchestrator.js`, wired into
  `server.js`), 5 core-role skills, git-worktree-per-job isolation, Supabase-backed job state,
  Slack escalation notifications. Its pipeline has **actually executed real jobs** — there are
  live job directories with real `context.json`/`envelope.json`/escalation artifacts on disk.
  Its advisory-council framework exists but the trigger table is explicitly, deliberately
  empty (`"Status: framework only, no advisors defined yet"`) — zero advisors run today.
- **AIM**: no daemon — skills self-chain via `nohup claude -p ... --skill <skill> &`, gated by
  a single-tree file lock (`docs/superpowers/jobs/.active-job`, implemented identically in
  bash and Python). It has Co-CEO plus the same 4 other core roles (no UX), 5 real
  investment-specific advisors that are always/conditionally invoked, and a hard Gate 1–6
  capability model enforced structurally by an always-on Risk Reviewer advisor. **Its pipeline
  has never actually executed a job** — the scaffolding is complete but unvalidated end-to-end
  (confirmed via `git log` returning zero hits for any `context.json`).

This standard packages what's common between the two (role shapes, the completion-envelope
protocol, escalation tiering, artifact-folder conventions) and explicitly leaves what differs
(orchestration mechanism, worktree usage, domain safety rules) to each project.

## 3. Three-layer architecture

**Layer 1 — Core delivery roles**: PM, UX, Architect, Engineer, QA. Full contracts in
`agents/core/*.md`. Every contract specifies persona/lens, required inputs, outputs,
definition of done, escalation triggers, autonomous decision authority, and handoff format.

**Layer 2 — Standard workflows**: Bug Fix, Performance Audit, New-Feature Exploration,
New-Feature Build, Security Review. Full definitions in `workflows/*.md`. Workflows are
routers, not personas — they select which roles and lenses a given job needs; they don't do
implementation work themselves.

**Layer 3 — Advisory lenses**: 6 shared, portfolio-wide lenses (`agents/reviewers/*.md`) plus
project-specific advisors that live in each project's own repo. Advisors provide one bounded
memo, don't edit production code by default, don't write completion envelopes, and don't
escalate directly — the role that invoked them (usually PM) owns whether a finding becomes an
escalation.

## 4. Project-specific advisors (preserved, not replaced)

**Reqon** (proposed, not yet implemented — advisory trigger table is currently empty):
Job Seeker Advisor, Trust and Control Reviewer, ATS Integration Reviewer, Cross-Surface
Consistency Reviewer, Commercial/Tier Reviewer.

**AI Investment Manager** (already implemented and running today): Research Analyst, Risk
Reviewer (always-on), Portfolio Strategist, Product Intelligence Advisor (always-on),
Investor. Proposed addition: Data Reliability and Recovery Reviewer. **None of AIM's existing
gate rules or advisor triggers are weakened by this standard** — they are referenced, not
rewritten, in `projects/ai-investment-manager.md`.

**IR Academy** (proposed, repo not yet inspected in depth): Clinical Content Reviewer,
Physician Workflow Reviewer, Instructional Design Reviewer, Publication and Approval Safety
Reviewer, Learner Experience Reviewer.

## 5. Deviations from the source proposal (documented per its own instruction to flag conflicts)

1. **`flowType`, not `workflowType`, is the canonical job-context field name.** The source
   proposal's schema used `workflowType`; both pilot repos ship `flowType` in real code today.
   `schemas/job-context.schema.json` treats `flowType` as canonical and accepts `workflowType`
   as a synonym, so nothing already-working in either repo needs to be renamed to adopt this
   standard.
2. **`branch` is a first-class optional field on the completion envelope**, adopted from AIM's
   design (not present in the source proposal's example envelope). It lets QA/reviewers check
   out the exact branch a job produced instead of reconstructing it from job-id/title
   conventions. Genuine improvement, zero cost for repos that don't set it.
3. **No git submodules, subtree, or remote wiring in PR1.** The source proposal already says
   to avoid submodules initially; this repo goes further and stays fully local (no GitHub
   remote) until Dustin explicitly asks for one, consistent with push/PR/deploy staying
   human-gated.
4. **Control-plane setup artifacts (super.engineering, Superset) landed in PR4 as templates**,
   not verified configs. **Correction (2026-07-16, this update):** both tools are actually
   installed on this machine — `which super.engineering`/`which superset` failing only meant
   neither CLI is on `PATH`; both are real Mac apps with working CLIs at non-`PATH` locations
   (`sc` for Superconductor/super.engineering, `superset` for Superset — see
   `control-plane/README.md` for the real, confirmed comparison between them). Neither has
   been configured against a real pilot project or run against a real pilot job yet. See
   `control-plane/`. Expect the setup-script templates to need revision once real usage surfaces
   the actual constraints.
5. **The worktree standard (`standards/worktree-and-branch-standard.md`) is documentation
   only in PR1** — it is not wired into AIM's job-lock system or any repo's `.claude/`. Reqon
   already has real worktree isolation and doesn't need it; AIM's file-lock system stays as-is
   until a tested replacement exists (per the source proposal's explicit instruction: "Do not
   remove the current queue/lock mechanism until a replacement is implemented and tested").

## 6. Autonomy levels

**Autonomous** — inspect, design, edit, test, review, commit locally. Known bug fixes, tests,
docs, low-risk refactoring, observability improvements, non-destructive performance fixes.

**Supervised** — produce a plan, then proceed through local commit unless escalation occurs.
Most feature builds, new APIs, UI workflows, non-destructive schema additions, integration
changes.

**Human-gated** — stop for approval before the gated action. Destructive migrations,
auth/authz redesign, payments, production infrastructure, secrets/credentials, medical
publication rules (IR Academy), investment recommendation semantics (AIM), production data
changes, deployment and merge — everywhere, always.

## 7. Credit efficiency

See `standards/credit-efficiency.md` for the full rule set. Headline: small bug fixes don't
invoke the full team; feature exploration never invokes an implementation agent; performance
audits can finish with recommendations only; security reviews are read-only until remediation
is explicitly approved; project-specific advisors run only when their trigger fires.

## 8. Implementation sequence (this repo's own roadmap)

- **PR1 — Portfolio standard and schemas** (this PR): this repo's content. Zero pilot-repo
  edits.
- **PR2 — Reqon alignment**: map Reqon's 5 existing skills onto `agents/core/*`, populate the
  advisory trigger table, fix stale hardcoded paths (`/Users/plex/Documents/reqon` →
  `/Users/plex/Documents/Projects/reqon`), install this standard, pilot one bug fix + one
  feature exploration.
- **PR3 — AIM alignment**: map Co-CEO/PM/Architect/Engineer/QA onto `agents/core/*`, keep
  Gate 1–6 and the 5 investment advisors untouched, add the proposed Data Reliability and
  Recovery Reviewer, install this standard, pilot a performance audit + bug fix (AIM's first
  real end-to-end pipeline run).
- **PR4 — Worktree and control-plane integration**: wire the worktree standard into AIM as an
  opt-in alternative to its file lock (lock stays until the replacement is tested), produce
  super.engineering and Superset setup artifacts against real pilot usage.
- **PR5 — Pilot validation and documentation**: run the 4 pilot jobs (Reqon bug fix, Reqon
  feature exploration, AIM performance audit, AIM security review), measure elapsed
  time/escalations/model usage, revise routing and autonomy thresholds, expand to IR Academy.
