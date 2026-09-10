# Project Plan — Ansh Arora, Strategic Portfolio

A new, independent cinematic portfolio built for founder's office, strategy,
marketing and business-operations roles. It is a separate project from the
existing portfolio, which was treated as read-only reference throughout.

---

## 1. Workspace audit (Phase 1, completed)

| Check | Result |
|---|---|
| Working repository | `ansharora116-collab/Strategic-Portfolio-2` — empty at session start (no commits) |
| Existing portfolio in this repo | None |
| Existing portfolio location | Separate repository `ansharora116-collab/ansh-arora-portfolio`, live at `ansharora116-collab.github.io/ansh-arora-portfolio` |
| How it was inspected | Cloned read-only to `/home/user/ansharora116-collab/ansh-arora-portfolio` (outside this project), never written to. `git status` there is clean |
| Target folder `ansh-strategic-portfolio/` | Did not exist. Created fresh |
| Deployment | None configured, none run |

The existing portfolio was read for facts and media only. No file in it was
edited, renamed, moved, formatted or deleted, and no command was run against
its dependencies, config, git history or workflow.

## 2. Assets copied (never moved, never altered)

| Asset | Source | Destination |
|---|---|---|
| Hero video | Supplied with the brief (`…PixVerse_V6_Image_Text_540P…mp4`) | `public/assets/video/hero-ansh.mp4` |
| Portrait photograph | `src/assets/about.jpg` in the existing portfolio | `public/assets/images/ansh-portrait.jpg` |
| Résumé | `public/resume.pdf` in the existing portfolio | `public/assets/documents/ansh-arora-resume.pdf` |
| Coffee market map deck | `public/work/coffee-market-map.pdf` | `public/assets/projects/coffee-market-map.pdf` |
| Automation blueprint | `public/work/coffee-stock-alert.blueprint.json` | `public/assets/projects/coffee-stock-alert.blueprint.json` |
| Bebas Neue, Montserrat | Existing portfolio font files | `src/assets/fonts/` |
| Instrument Serif, JetBrains Mono | Downloaded from Google Fonts, self-hosted | `src/assets/fonts/` |

Both images of Ansh are byte-identical to their sources. Neither was
recoloured, retouched, cropped, filtered or regenerated.

## 3. Sections implemented

| § | Section | Notes |
|---|---|---|
| 6.1 | Hero — The Player | Full-bleed looping video, CSS overlay, subtle chess grid with pointer illumination on fine pointers only |
| 6.2 | Hero-to-board transition | GSAP ScrollTrigger pin: overlay deepens, board lines resolve, the two headline halves separate. Skipped entirely under reduced motion |
| 6.3 | Approach — How I Play | One board, three states, real tablist. Stacked steps below 760px |
| 6.4 | Marketing — Moving the Market | Four questions on one accumulating board; answered squares stay held |
| 6.5 | Featured Work — Moves That Mattered | Four case studies in the fixed 7-chapter order, plus a compact archive of six |
| 6.6 | Reflection — Moves Not Made | Built but **not published** — no verified content exists (see below) |
| 6.7 | Capabilities — Across the Board | Four territories, 18 capabilities, each linked to the work that proves it |
| 6.8 | Behind the Moves | The photograph's only appearance, unedited, shown whole |
| 6.9 | Journey — Moves So Far | Six board coordinates in chronological order, ending on an open square |
| 6.10 | Achievements — The Scoreboard | Five counted groups behind disclosures |
| 6.11 | Closing — Your Move | The opening board returns holding the position built across the page, one square open |

## 4. Deliberately withheld

**Reflection (§6.6) is hidden from production.** The section, its heading and
its styling exist; `reflection.published` in `src/data/portfolio.ts` is `false`
and `entries` is empty, so it renders nothing. Writing a "lesson" or a
"rejected approach" would mean inventing a failure. To publish it: add entries
in Ansh's own words and set `published: true`. No other change is needed.

## 5. Implementation sequence followed

1. **Phase 1 — Protect and audit.** Read-only inspection, folder-conflict
   check, asset copy, docs.
2. **Phase 2 — Static foundation.** Content layer (`src/data/portfolio.ts`),
   semantic layout, responsive behaviour, no complex motion.
3. **Phase 3 — Strategic interactions.** Added and verified one at a time:
   hero-to-board pin, approach states, marketing states, case-study board
   animation, capability-to-evidence linking, journey path, closing board.
4. **Phase 4 — Validation.** Typecheck, lint, production build, three-viewport
   render checks, console checks, keyboard and heading-structure checks,
   reduced-motion check. **Nothing was deployed.**

## 6. Open items for Ansh

See `CONTENT_AUDIT.md` §4 — a short list of facts to confirm and the one
section awaiting his own words.
