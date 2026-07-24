# Brand Specialist Memo — Nav + Work/Resume/About/Executive Rollout

**Date:** 2026-07-23
**Reviewer lens:** Brand/design coherence — one deliberate personal brand vs. five bolted-on demos
**Scope:** `SiteNav`, `/work`, `/resume`, `/about`, `/executive` + 4 sub-pages, checked against the
established case-study baseline (`src/app/work/reqon/*` and siblings) and the homepage.

## Verdict

The new pages are the most disciplined thing in this repo, brand-wise — more consistent with
*each other* than the case studies are with *each other*. That's the finding worth sitting
with: the new shell pages (`/work`, `/resume`, `/about`, `/executive/*`) all use identical
type scale, spacing, eyebrow treatment, and a single accent color (`cyan-300`/`neutral-*`
throughout). That's good discipline. But it means they now read as a second, cleaner design
system sitting next to an older, more expressive one — the case studies — with the nav bar as
the only thing physically holding both together. A first-time visitor who lands on `/`, clicks
into `/work/reqon`, then clicks `Resume` in the nav, will feel a seam: the case study has
texture (slate palette, emerald accent, motion, contextual disclaimers) and the new pages don't.

This isn't a "the new work is bad" problem. It's a "the new work quietly established a second,
better-disciplined brand standard and never reconciled it with the first" problem.

## Specific inconsistencies

### 1. Two competing color systems, and neither is named as canonical

- Homepage (`src/app/page.tsx`) and every new page use `neutral-*` grays + `cyan-300` as the
  single accent.
- Reqon (`src/components/reqon/sections/*`) uses `slate-*` grays + `emerald-300`/`emerald-400`
  as its accent, with `amber-400` as a secondary accent in `Outcome.tsx`.
- A quick grep across other case studies (e.g. `catalog/sections/Hero.tsx`) shows the "Product
  Case Study" eyebrow there has *no* color class at all — it inherits body text color, unlike
  Reqon's explicit `text-emerald-300`.

So right now there are at least three treatments of the same eyebrow pattern: cyan (new pages
+ homepage), emerald (Reqon), and unstyled/inherited (Catalog). A visitor bouncing between
`/executive/swot` (cyan) and `/work/reqon` (emerald) within the same session is seeing two
different "brand colors" claim to be *the* accent, thirty seconds apart. Neither can be right
if the goal is one coherent identity — this needs to be resolved as a decision, not left as
an artifact of whichever component was built in which sprint.

**What unified would look like:** Pick one signature accent for site-level chrome and
navigation (cyan seems to be winning by volume now that 5 new pages use it) and treat each case
study's individual accent (emerald for Reqon, etc., if that's intentional per-project branding)
as a deliberate, documented exception — the way a design system lets a sub-brand skin itself
while the shell stays constant. Right now nothing in the codebase distinguishes "this is the
site's color" from "this happened to be the color when this page was built." SiteNav, footer
CTA, and every non-case-study page should agree on one accent, full stop.

### 2. `SWOT` quadrant colors accidentally collide with the "system" palette

`src/components/executive/swot/content.ts` assigns `text-cyan-300` to *Strengths*,
`text-amber-300` to *Weaknesses*, `text-emerald-300` to *Opportunities*, `text-rose-300` to
*Threats*. This is a reasonable semantic use of color internal to that one page. But because
cyan is *also* the site's global accent (nav active state, every eyebrow, every "View case
study" link) and emerald is *also* Reqon's case-study identity, a visitor who has just come
from Reqon may subconsciously read "Opportunities" as "the Reqon section" and "Strengths" as
"the primary nav color, so this must be the most important quadrant" — meaning colors are
doing accidental double duty as both semantic (good/bad) and brand (site identity) signals.
This is exactly the kind of thing that's invisible to the page's own author and obvious to a
fresh visitor.

**What unified would look like:** Either give SWOT a fully distinct, self-contained
four-color palette that doesn't reuse the global accent or any case-study's accent, or drop
the semantic coloring and let cyan (the site accent) carry the whole Executive section
consistently, the way `90-day-plan`, `leadership-philosophy`, and `interview-positioning`
already do (all cyan, no per-item color-coding).

### 3. New pages have zero motion; case studies are built around it

Reqon's `CaseStudyOverview.tsx`, `Outcome.tsx`, and `Closing.tsx` all wrap content in
`framer-motion` reveal animations via `usePrefersReducedMotion`/`revealAnimation` (a shared
utility already living at `src/components/pulse/`). None of the five new pages
(`/work`, `/resume`, `/about`, `/executive` + sub-pages) import motion at all — everything
renders static and instant. That's not wrong in isolation (static content pages don't need
scroll-triggered reveals), but it means "motion on scroll" currently reads as a per-case-study
decoration rather than a site-wide design-language choice, which undercuts the idea that
there's one considered design system rather than "whatever the component author did that day."

**What unified would look like:** Either (a) treat motion as explicitly case-study-only —
reserved for the interactive product recreations, a deliberate signal that "you're now inside
a demo" — and state that intent somewhere so it reads as a choice, or (b) bring a light,
consistent reveal-on-scroll treatment to the new pages' list/grid sections (stat rows,
timeline entries, principle cards) using the same shared `pulse` utility, so motion vocabulary
is consistent everywhere it appears rather than only in five of nine top-level destinations.
Given these are lower-stakes content pages, (a) is the cheaper, more defensible choice — but
it should be a stated decision, not a byproduct of the new pages being templated quickly.

### 4. Voice is consistent within new pages, but shifts abruptly from the rest of the site

The homepage and case studies mostly describe Dustin in third person from the site's own
narration ("Dustin Hartung — Products I've led and built," "A self-hosted, AI-assisted
job-search CRM..."), occasionally dropping into first person inside a case study's "My Role"
voice. The new Executive section content (`src/components/executive/*/content.ts`) and About
(`src/components/about/content.ts`) are written entirely in first person ("My first 90 days...",
"I'm a deeply technical business professional...", "I don't hand off understanding to
others..."). Resume (`src/components/resume/content.ts`) is also first person ("My career has
been built on...").

This isn't inherently wrong — first person fits a Resume/About/Executive-positioning context
better than third-person case-study narration — but it means the site now has two distinct
narrative registers with no signal to the reader about why the voice shifts, and no shared
transition. `/executive` page's own intro copy does a good job bridging this explicitly
("These four artifacts are meant for a different audience and a different question — not what
I've shipped, but how I think") — that bridging sentence is exactly the kind of connective
tissue that's missing between `/work` (third person, demo-flavored) and `/about`/`/resume`
(first person, direct) with no equivalent framing sentence on those two pages. About and Resume
just start talking in first person with no acknowledgment of the register change from what a
visitor just saw on `/work` or `/`.

**What unified would look like:** Either commit the whole site to first-person voice
(strongest option — a personal portfolio site talking about itself in third person is already
slightly unusual, and first person reads as more confident and executive) or add a one-line
framing sentence at the top of `/about` and `/resume`, mirroring what `/executive` already does,
that explicitly signals the register shift ("Here's the more direct, first-person version of
who I am beyond the case studies," or similar). Right now `/executive` is the only new page
that bothered to explain itself to a visitor arriving mid-narrative; `/about` and `/resume`
don't.

### 5. The `Current Focus` closing block on the homepage has no sibling anywhere else

`src/app/page.tsx`'s final section — a highlighted cyan card ("Current Focus... Building the
next generation of AI application experiences") — is the homepage's strongest, most opinionated
brand statement: forward-looking, distinctive card treatment (`bg-cyan-300/10`, colored border),
used nowhere else. Reqon's `Closing.tsx` does something structurally identical (a highlighted
card, "Why This Matters," `bg-emerald-300/10`) at the *end* of a case study. But none of the
new top-level pages (`/work`, `/resume`, `/about`, `/executive`) close on anything — they just
end after their last content grid. The site's one recurring closing device ("highlighted
colored card as an emphatic final beat") is present on the homepage and every case study, and
absent from every new page.

**What unified would look like:** Give `/about`, `/resume`, and `/executive` an equivalent
closing beat — doesn't need to be a card, but each of these pages currently just stops, while
every previously-existing page on the site ends on a deliberate note. `/executive` in
particular is crying out for one: after four artifacts about "how I'd lead," ending on a plain
grid with no closing CTA (contact, or a pointer back to Work) undersells the section's own
stated purpose.

### 6. Nothing links the Executive section back into a case study, or vice versa

`/executive`'s intro explicitly contrasts itself with `/work` ("The case studies in Work show
what I've built..."), which is a good piece of connective narrative — but it's one-directional.
None of the five case studies link forward to `/executive` (e.g., "see how this connects to my
broader leadership philosophy"), and `/executive/90-day-plan` or `/executive/leadership-
philosophy` don't reference specific case studies as evidence for their claims (e.g.,
"Institutionalize what works" in Leadership Philosophy explicitly *mentions* the AI product
operating system and Acoustic's mobile app by name in prose, but doesn't link to
`/work/ai-product-operating-system` or `/work/executive-companion-pulse`). Given the content
already namechecks the case studies, the missing links are a low-cost, high-payoff fix — they'd
turn four isolated positioning documents into a woven argument that keeps referring back to
provable work, which is exactly what makes executive positioning credible instead of
aspirational.

**What unified would look like:** Add inline links wherever executive content already
namechecks a specific project (Leadership Philosophy → AI Product Operating System and
Executive Companion Pulse; SWOT's "Opportunities" → the case studies that demonstrate the
claim) and add one small "see it in the work" pointer from relevant case studies back to
`/executive`, closing the loop the intro copy already gestures at.

## What's already working (don't disturb this)

- Nav, homepage, `/work`, `/resume`, `/about`, and all four `/executive/*` pages share
  identical structural DNA: eyebrow (`uppercase tracking-[0.35em] text-cyan-300`) → big
  `text-5xl/6xl font-semibold tracking-tight` H1 → `neutral-950` background → `rounded-3xl
  border border-white/10 bg-white/[0.04]` cards. This is a real, consistent system and it's
  the right one to standardize the rest of the site on, not to abandon.
- `/executive`'s framing paragraph, explicitly distinguishing itself from `/work`, is the
  single best piece of connective narrative-writing added in this round — more pages should
  do what it does.
- SiteNav's active-state treatment (cyan underline-equivalent via text color) is simple, legible,
  and doesn't compete with any case study's own accent since it's chrome, not content.

## Priority if only fixing one thing

Resolve #1 (the cyan-vs-emerald-vs-unstyled accent question) first. Every other inconsistency
in this memo is a symptom of the same root cause: the site has never explicitly decided what
its one brand color is, so each new area of the site quietly re-derives its own answer. Once
that's decided and documented, items #2 and #4 mostly resolve themselves as a consequence.
