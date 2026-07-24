# Recruiter / Hiring Manager Memo — Executive Positioning, Resume, About
**Reviewer:** Recruiter/Hiring Manager advisory persona
**Date:** 2026-07-23
**Scope:** `/`, `/resume`, `/about`, `/executive`, `/executive/{leadership-philosophy,90-day-plan,swot,interview-positioning}`

Framed as: what stops me from moving this candidate forward, in the order I'd actually hit it.

---

## 1. Homepage still reads "Principal PM," but a whole section now argues "executive" — and never says which role I should evaluate him for

First screen: "Principal Product Manager building AI-native enterprise products." Fine, clear, credible. But the site now also has a dedicated `/executive` section whose entire premise (per its own intro copy) is "not what I've shipped, but how I'd create value in my next executive mandate." That's a VP/Director-level pitch sitting one click away from an IC/senior-manager-level homepage headline, with nothing on the homepage or nav that tells me *which* role Dustin is actually applying for. If I'm screening for a Director or VP req, I want the first screen to say that. If I'm screening for a Principal PM req, the Executive section reads like scope creep. Right now the site is trying to be legible to both audiences and, in the first 90 seconds, is legible to neither. Pick a lane on the homepage headline, or make the Executive section's target level explicit in its own H1.

## 2. The SWOT and Interview Positioning pages hand me the exact objection before I've formed it

`interview-positioning/content.ts` includes this prep row, presented as anticipated interviewer pushback:

> "You've held Principal/Director-level titles, not VP — why consider you for this scope?"

I respect the instinct to prep for hard questions. But putting this verbatim on a public page *plants the question in my head as a recruiter* before I've even decided whether it's relevant to the req I'm filling. If I was on the fence about title level, this page just resolved the fence in the wrong direction — it told me the title gap is real and salient enough that Dustin himself scripted an answer for it. Self-aware framing is good in an actual interview, where I asked the question and he's responding to me. On a static, unprompted marketing page, it reads as pre-emptively defensive and draws my attention to the one thing that would otherwise be a non-issue for most of the roles this portfolio is presumably targeting (Principal/Director-scope PM roles, where this wouldn't even come up).

Same issue, smaller scale, on the SWOT page's Threats quadrant ("risk of being undervalued on time-in-title"). Naming your own biggest perception risk, twice, unprompted, is a choice a lot of hiring managers will read as "candidate is worried about this and wants me to pre-forgive it" rather than as confidence.

## 3. SWOT "Weaknesses" reads like a rehearsed interview-cliché answer, not a real self-assessment

> "Have to consciously work at staying proactive instead of reactive — aware of the trade-off, and treat it as a discipline to manage, not something automatic."

This is structurally identical to the classic "my weakness is I care too much" dodge — name a trait, immediately reframe it as evidence of self-awareness, no concrete instance attached. The other weakness on the same page ("can get pulled deep into technical details") is more credible because it's specific and consistent with claims made elsewhere on the site (the hands-on-builder narrative). But pairing a strong, concrete weakness with a generic, un-illustrated one weakens the credibility of both — it tells me the page is doing "SWOT theater" rather than a genuine self-assessment. I'd want one real example attached to the proactive/reactive claim (a time reactivity cost something) or I'd cut it.

## 4. "About" page ships a visible placeholder as if it were finished content

`about/content.ts`:
```
{ value: "30+", label: "Beta Programs", detail: "as a professional beta tester — exact count pending" },
{ value: "100s", label: "Product Reviews", detail: "submitted as a professional product reviewer — exact count pending" },
```

"Exact count pending" is draft/TODO language that made it into live copy on a public hiring page. It's a small thing in isolation, but it's the kind of detail a careful hiring manager notices, and once noticed it makes me re-scrutinize every other number on the site (the $7M+ P&L, the $1.1M+ ARR, the 65 opportunities) with more suspicion than I otherwise would have. Precision claims only work if all of them look finished — one visibly unfinished one taxes trust in the rest.

## 5. No path to next steps on the pages most likely to close the loop

`/resume` ends after Education/Recognition. `/about` ends after the fact grid. Every `/executive/*` subpage ends after its content block. None of them repeat the "Contact Me / LinkedIn / GitHub" CTA that lives on the homepage, and there's no downloadable PDF resume anywhere — `/resume` is HTML-only. In practice: if I land on `/resume` from a shared link (which is exactly how a recruiter is most likely to encounter this URL — someone forwards it, it's not always entered via the homepage), I have no one-click way to email him, save/print a resume for an ATS or hiring-manager forward, or get to LinkedIn, without navigating back up to the nav bar (unverified whether SiteNav repeats these on every page — if it doesn't, this is a hard stop; if it does, it should still be reinforced at the bottom of long-scroll pages like Resume, since that's where intent-to-contact peaks).

## 6. The 90-Day Plan and Leadership Philosophy pages are the weakest evidence on the site — generic where the rest of the site is specific

The rest of this portfolio's strength is that claims are tied to named, verifiable work: the $1.1M+ ARR figure ties to Product Catalog, the "solo build" claim ties to a named app with a named stack. The 90-Day Plan (`Days 1–30: meet with stakeholders... study the roadmap... hold off on recommendations`) and several Leadership Philosophy principles ("bring business clarity to technical ambiguity," "earn trust through evidence, not promises") could be pasted into nearly any PM candidate's portfolio unchanged — there's no artifact-specific detail (no reference to an actual company, team size, or scenario) anchoring them to Dustin specifically, the way the Resume and Work sections do. This isn't disqualifying on its own — every candidate has some generic-shaped content — but it's the section most likely to prompt a "so what would you actually walk in and do here" follow-up, precisely because it reads as a template rather than a plan.

---

## What's working (would not stop me)

- The $1.1M+ ARR / $7M+ P&L / 65-opportunity figures are specific, appropriately hedged ("influenced," "cited as a differentiator" rather than claiming sole ownership of the revenue), and consistent across Resume, Work, and Home.
- The "solo build" claim for the executive mobile app is repeated consistently with the same stack details in three separate places (work.ts, resume bullet, leadership philosophy) — that consistency itself is a credibility signal.
- The MarTech/data-platform-only framing in Interview Positioning's first prep row is a reasonable, low-risk answer to a real question a generalist-seeking hiring manager might actually ask — unlike the title-level one, this one is worth having on the page.

## Bottom line

Fix, in priority order: (1) resolve the level-targeting ambiguity between the homepage and the Executive section, (2) pull the title-level question out of Interview Positioning or reframe it as a strength (scope vs. title) rather than a rehearsed defense, (3) replace the generic proactive/reactive weakness with a concrete instance or cut it, (4) remove the "exact count pending" placeholders, (5) add a persistent contact/resume-download CTA to Resume, About, and each Executive subpage.
