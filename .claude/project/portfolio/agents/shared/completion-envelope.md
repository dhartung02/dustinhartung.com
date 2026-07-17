# Completion Envelope Protocol

Every role, on finishing a session (or hitting a blocker), must:

1. Write `$JOB_DIR/envelope.json` matching `schemas/completion-envelope.schema.json` exactly
   — same filename every time, not a per-stage variant (`<stage>-envelope.json`). Reqon's
   real job history shows this drift actually happens in practice
   (`qa-envelope.json` with renamed/extra fields instead of overwriting `envelope.json`) and
   its orchestrator has fallback detection logic to compensate — don't rely on that fallback
   existing everywhere; write the canonical filename.
2. Commit the envelope and any artifacts it references (git add + commit, matching the
   project's own worktree/branch model).
3. Signal completion via whatever mechanism the project uses to advance its pipeline — a
   webhook POST (Reqon's `curl -X POST .../api/agents/complete`), a script invocation (AIM's
   `scripts/dev_pipeline/pipeline_advance.sh "$AGENT_JOB_ID"`), or equivalent. This standard
   doesn't mandate which; it mandates that step 1 and 2 happen first, every time, so whichever
   mechanism is used has something correct to read.

## Schema

```json
{
  "agent": "<pm | ux | architect | engineer | qa | co-ceo | ...>",
  "jobId": "string",
  "project": "string",
  "flowType": "bug-fix | performance-audit | feature-exploration | feature-build | security-review | technical-refactor | ux-improvement | production-hardening | documentation",
  "status": "Complete | Blocked | Needs Decision | Failed",
  "confidence": "High | Medium | Low",
  "riskLevel": "low | medium | high | critical",
  "branch": "string | null",
  "completed": [],
  "decisionsMade": [],
  "assumptions": [],
  "findings": [],
  "blockedBy": [],
  "escalationsNeeded": [],
  "artifacts": {},
  "validation": { "commands": [], "passed": [], "failed": [] },
  "productionImpact": { "migration": "none", "rollback": "not applicable", "observability": [], "supportNotes": [] },
  "metrics": { "model": "string", "wallClockSeconds": 0, "toolCalls": 0, "tokensUsed": { "input": 0, "output": 0, "cacheRead": 0 } },
  "recommendedNextAgent": "string",
  "nextStep": "string"
}
```

Full machine-readable version: `schemas/completion-envelope.schema.json`.

## Field notes (where this deviates from or extends either pilot repo's current format)

- **`branch`** — adopted from AIM's design, not present in Reqon's current envelope. Once a
  job's branch exists, every subsequent stage must copy it forward unchanged rather than
  reconstruct it from job-id/title conventions — AIM's design is explicit about this and it's
  the right rule to standardize on.
- **`flowType`** — this is the field both pilot repos actually call it (not `workflowType`).
  See `compat/reqon-mapping.md` and `compat/aim-mapping.md` for the full field-by-field
  mapping from each repo's current shape to this schema.
- **`project`, `riskLevel`, `validation`, `productionImpact`** — not present in either pilot
  repo's current envelope. These are additive: a project adopting this standard for the first
  time can populate them incrementally; older envelopes without them remain readable (see
  compat mapping docs — these are optional fields with sane fallbacks, not required for
  backward compatibility).
- Advisory lenses (`agents/reviewers/*.md`) never write this envelope — only the 5 core roles
  (or a project's own additional core-ish roles, like AIM's Co-CEO) do.
- **`metrics`** — new, serves `standards/portfolio-goals.md`'s Build Speed and Token
  Optimization goals. Self-reported, best-effort — populate whatever fields the agent
  environment actually exposes (model name is usually known; exact token counts may not be).
  Absence doesn't block anything. This is what turns "we designed for efficiency" into "we can
  measure whether it worked" once real jobs run — see `standards/credit-efficiency.md` rule 13.
