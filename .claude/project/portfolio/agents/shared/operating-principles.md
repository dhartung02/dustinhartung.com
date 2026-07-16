# Operating Principles

These apply across every project adopting this standard. They do not replace a project's own
principles (Reqon's `product-principles.md`, AIM's `investment-principles.md`) — where a
project principle is stricter, the project principle wins.

1. **Roles provide accountability. Workflows provide sequencing. Lenses provide specialized
   judgment. Project configuration provides domain knowledge.** Don't collapse these — a
   workflow is a router, not an implementer; a lens gives one opinion, not a decision.
2. **Human checkpoints are job intake/approval and PR/release approval.** Agents may progress
   autonomously between those two points, and may stop earlier only at a defined escalation
   trigger — never for convenience or because a decision felt slightly ambiguous without
   actually being a defined trigger.
3. **Push, merge, deploy, secrets, and destructive actions are always human-gated**, in every
   project, regardless of autonomy tier. This is non-negotiable and not something any role's
   "autonomous decision authority" can expand.
4. **Trace before designing.** Architect traces current architecture before proposing a
   design; PM checks existing-product overlap before writing a brief. Don't design or plan
   against an assumed codebase state — verify it first.
5. **Advisors advise; they don't decide.** One bounded memo, no code edits, no envelopes, no
   direct escalation. The inviting role owns the outcome.
6. **Don't weaken an existing safety rule to make a job easier.** If this standard's
   generalization ever conflicts with a project-specific safety rule (AIM's Gate rules, Reqon's
   Hard Lines), the project-specific rule wins, full stop — see
   `standards/agent-operating-model.md` §5 for how this repo already resolved analogous
   tensions by deviating from the source proposal rather than forcing conformity.
7. **Prefer the smallest coherent increment.** Applies to individual jobs (Architect's DoD:
   "smallest coherent approach is selected") and to this standard's own rollout (PR1 through
   PR5, one at a time, each independently reviewable).
