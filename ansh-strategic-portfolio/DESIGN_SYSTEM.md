# Design System

## Concept

> Every market is a board. Every outcome begins with the right move.

Chess is the information system, not the decoration. One 8×8 board is reused
across the site and always means the same things:

| Chess element | What it represents here |
|---|---|
| Board | The market and operating environment |
| Held squares (grey) | Ground already taken — earlier answers, existing distribution |
| Active squares (white) | What the current strategy touches |
| Path | The move being made; knight relationships draw as an L |
| Open square | A decision not yet made (the closing board's `h8`) |
| Territories | Capability areas, each linked to proving work |

There are no crowns, thrones, medieval styling, casino visuals or stock chess
photography. Ansh is never portrayed as a king.

## Palette

Fixed by the brief, defined once in `src/styles/tokens.css`:

```css
--black: #050505;      --soft-black: #0b0b0b;
--charcoal: #151515;   --graphite: #252525;
--warm-white: #f2f0ea; --muted-white: #d8d8d3;
--mid-grey: #8d8d88;   --border: rgba(255,255,255,0.14);
```

No gold, no beige luxury gradient, no purple, no neon. The site commits to one
dark composition — the hero video and its overlay define the contrast contract,
so tokens do not invert for light mode.

Contrast on `--black`: warm-white ≈ 17:1, muted-white ≈ 13:1, mid-grey ≈ 5.4:1.
Mid-grey is used only for supporting copy at body size or larger, never for
small essential text.

## Typography — four roles, four files

| Role | Face | Used for |
|---|---|---|
| Display | Bebas Neue | Cinematic headlines, section titles, place names |
| Editorial serif | Instrument Serif | Strategic statements and case outcomes |
| Sans | Montserrat (variable, 300–700) | Navigation and body copy |
| Mono | JetBrains Mono | Coordinates, metrics, eyebrows, tactical labels |

All four are self-hosted `.woff2` with `font-display: swap` — no third-party
font request at runtime. Total font weight: ~104 KB.

Scale is fluid (`--step--2` … `--step-5`), so nothing needs per-breakpoint type
overrides. Body copy is capped at `--measure` (62ch).

## Motion

Allowed: slow fades, mask reveals, board-line expansion, square illumination,
tactical path drawing, one controlled pin, subtle parallax. Everything animates
`transform`, `opacity` or `clip-path`.

Not used: constant movement, scroll hijacking, custom cursors, spinning pieces,
decoration without meaning.

- **Reveals** use IntersectionObserver (`src/hooks/useInView.ts`), not
  ScrollTrigger. The mask variant clips an inner wrapper — clipping the observed
  element itself would zero its intersection rectangle and the reveal would
  never fire.
- **The hero pin** is the only GSAP usage. It is imported dynamically after
  first paint, and never loaded at all under `prefers-reduced-motion`.
- **`prefers-reduced-motion: reduce`** removes the pin, the reveals' movement,
  the cursor-follow illumination, the path draw and the pulsing open square.
  Every section stays fully readable and no information is lost.

## Interaction rules

- Hover is never the only route to information: each board state has a real
  tab, each capability lists its evidence as links, each board carries an SVG
  `<title>` describing what it currently shows.
- Pointer-following illumination is gated behind
  `(hover: hover) and (pointer: fine)` — on touch devices the listener is never
  attached.
- Below 760px, boards give way to stacked, readable content: three approach
  steps, four marketing questions, a stacked journey timeline, capability
  accordions.

## Component map

```
components/
  chess/Board.tsx      one board; held / active / path / labels
  chess/HeroGrid.tsx   the faint hero grid + pointer illumination
  case-studies/        the 7-chapter case study block
  motion/Reveal.tsx    IntersectionObserver reveals
  ui/                  Action, SectionHead, MetricList, PillList, StateTabs
sections/              one file per section of the brief's §6
data/portfolio.ts      the only place facts live
```
