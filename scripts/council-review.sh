#!/usr/bin/env bash
# scripts/council-review.sh — fan out a parallel advisory-council review across every
# persona skill in this repo's .claude/skills/, each in its own isolated Superconductor
# worktree. Run this from a Superconductor custom action (Project scope), or directly:
#   bash scripts/council-review.sh
set -euo pipefail

SC="$(command -v sc || echo /Applications/super.engineering.app/Contents/MacOS/sc)"
if [ ! -x "$SC" ]; then
  echo "council-review: 'sc' CLI not found. Install/open Superconductor first." >&2
  exit 1
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_NAME="$(basename "$ROOT")"

# Advisory council roster for this repo — see .claude/project/advisory-council.md.
SKILLS=(
  "brand-specialist"
  "recruiter-hiring-manager"
  "executive-reviewer"
  "technical-peer-reviewer"
)

echo "What should the council review? (e.g. 'the AI Investment Manager case study page')"
read -r ITEM
if [ -z "$ITEM" ]; then
  echo "council-review: nothing entered, aborting." >&2
  exit 1
fi

echo ""
echo "Fanning out ${#SKILLS[@]} parallel reviews of: $ITEM"
for skill in "${SKILLS[@]}"; do
  echo "  -> $skill"
  "$SC" worktree create --project "$PROJECT_NAME" \
    --prompt "Use the $skill skill to review: $ITEM" \
    --json > /dev/null &
done
wait
echo ""
echo "All ${#SKILLS[@]} council sessions launched — check the Superconductor sidebar."
