# Ansh Arora — Strategic Portfolio

A cinematic, black-and-white portfolio for founder's office, strategy,
marketing and business-operations roles. Chess is used as the information
system: every market is a board, and the site shows how a position is read, a
move chosen, carried through and measured.

React · TypeScript · Vite · modular CSS · GSAP ScrollTrigger (loaded on demand).

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # tsc -b && vite build  → dist/
npm run preview    # serve the production build
npm run lint       # oxlint
```

Node 20+ recommended (built and verified on Node 22).

## Where things live

```
public/assets/
  video/hero-ansh.mp4              hero loop — unmodified source file
  images/ansh-portrait.jpg         the portrait — unedited, used exactly once
  documents/ansh-arora-resume.pdf  the downloadable résumé
  projects/                        the market-map deck and automation blueprint
src/
  data/portfolio.ts   ← every fact on the site, in one file
  types/              content types, including the publish/review flags
  sections/           one file per section
  components/         chess/, case-studies/, motion/, ui/
  styles/             tokens.css (palette, type, rhythm) + base.css
```

## Editing content

Change `src/data/portfolio.ts` — nothing else. Adding a case study, an archive
item, a capability or a journey stop needs no component change.

Two rules are enforced by the data layer:

- Items carry `published`. Only published content is rendered
  (`publishedCaseStudies`, `publishedArchive`, and the `Reflection` guard), so
  unverified content can be written and stored without appearing publicly.
- Items carry `reviewNote` — an internal note about what still needs
  confirming. It is never rendered.

**The Reflection section is currently hidden** because no verified reflection
content exists. Fill `reflection.entries` and set `published: true` to show it.

## Media rules this project keeps

- The hero video plays `autoplay loop muted playsInline`, is limited to the
  hero, and is never recoloured, regenerated or turned into anything else. The
  readability overlay is CSS above it; the file itself is untouched. If a
  browser cannot decode it, the hero falls back to the static board
  composition.
- The portrait appears **once**, in Behind the Moves, whole and unedited —
  `object-fit: contain` inside a container holding its original 900 × 1352
  ratio, with no text or graphic over it.
- No other image, avatar or silhouette of Ansh exists in the project.

## Accessibility

Semantic landmarks and a clean heading outline (one `h1`, section `h2`s, case
studies `h3` with `h4` chapters); skip link; visible focus rings; real tablists
with arrow-key support; disclosures wired with `aria-expanded`/`aria-controls`;
descriptive link text; alt text on the portrait; every board carries an SVG
`<title>` and its content is always duplicated in adjacent copy. No autoplay
audio. `prefers-reduced-motion` removes the pin, the reveals' movement, the
path draw and the pointer illumination.

## Performance

- Initial JS ≈ 86 KB gzip. GSAP + ScrollTrigger (≈ 46 KB gzip) is a dynamic
  import that never loads under reduced motion.
- Four self-hosted font files, one weight each (Montserrat is variable). No
  third-party requests at runtime.
- The portrait is `loading="lazy"` with reserved dimensions; the video declares
  intrinsic size. No layout shift on load.
- Chess visuals are SVG/CSS. No 3D dependency — a chessboard does not justify
  one.

## Deployment

Not deployed, by instruction. `vite.config.ts` uses `base: './'`, so `dist/`
works from any sub-path (including a GitHub Pages project site) without
changes.
