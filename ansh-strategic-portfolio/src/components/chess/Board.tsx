import { useId } from 'react';
import { BOARD_SIZE, CELL, CELLS, cell, pathData } from '../../utils/board';
import './board.css';

export interface BoardProps {
  /** Squares held from the start of the sequence — drawn as a quiet outline. */
  held?: string[];
  /** Squares the current state activates — drawn white. */
  active?: string[];
  /** Ordered squares connected by a tactical path. */
  path?: string[];
  /** Squares carrying a small mono label, e.g. a journey coordinate. */
  labels?: { coord: string; text: string; open?: boolean }[];
  /** Draw the alternating light squares. Off gives a pure line drawing. */
  checker?: boolean;
  /** Animate the path stroke in when true. */
  animatePath?: boolean;
  /** Sentence describing what the board currently shows, for screen readers. */
  description: string;
  className?: string;
}

/**
 * One board, reused everywhere. It carries meaning rather than decoration:
 * `active` squares are the region a strategy touches, `path` is the move.
 *
 * The SVG is marked up as an image with a description, because the same
 * information is always available in the adjacent copy — motion never
 * carries anything on its own.
 */
export function Board({
  held = [],
  active = [],
  path = [],
  labels = [],
  checker = true,
  animatePath = true,
  description,
  className = '',
}: BoardProps) {
  const titleId = useId();
  const heldSet = new Set(held);
  const activeSet = new Set(active);
  const labelled = new Set(labels.map((label) => label.coord));
  const d = pathData(path);

  return (
    <svg
      className={`board ${className}`.trim()}
      viewBox={`-1 -1 ${BOARD_SIZE + 2} ${BOARD_SIZE + 2}`}
      role="img"
      aria-labelledby={titleId}
      focusable="false"
    >
      <title id={titleId}>{description}</title>

      {checker && (
        <g className="board__checker">
          {CELLS.filter((c) => c.light).map((c) => (
            <rect key={c.coord} x={c.x} y={c.y} width={CELL} height={CELL} />
          ))}
        </g>
      )}

      <g className="board__grid">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * CELL} y1={0} x2={i * CELL} y2={BOARD_SIZE} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * CELL} x2={BOARD_SIZE} y2={i * CELL} />
        ))}
      </g>

      <g className="board__squares">
        {CELLS.map((c) => {
          const isActive = activeSet.has(c.coord);
          const isHeld = heldSet.has(c.coord) && !isActive;
          if (!isActive && !isHeld) return null;
          return (
            <rect
              key={c.coord}
              className={isActive ? 'board__square is-active' : 'board__square is-held'}
              x={c.x}
              y={c.y}
              width={CELL}
              height={CELL}
            />
          );
        })}
      </g>

      {d && (
        <path
          className={`board__path ${animatePath ? 'is-drawing' : ''}`.trim()}
          d={d}
          fill="none"
        />
      )}

      {path.length > 0 && (
        <g className="board__nodes">
          {path.map((coord, index) => {
            const c = cell(coord);
            // A labelled square shows its coordinate instead of a node dot.
            if (!c || labelled.has(coord)) return null;
            return (
              <circle
                key={`${coord}-${index}`}
                cx={c.x + CELL / 2}
                cy={c.y + CELL / 2}
                r={index === path.length - 1 ? 1.9 : 1.2}
              />
            );
          })}
        </g>
      )}

      {labels.length > 0 && (
        <g className="board__labels">
          {labels.map(({ coord, text, open }) => {
            const c = cell(coord);
            if (!c) return null;
            return (
              <g key={coord} className={open ? 'is-open' : undefined}>
                {open && (
                  <rect
                    className="board__open"
                    x={c.x + 1}
                    y={c.y + 1}
                    width={CELL - 2}
                    height={CELL - 2}
                  />
                )}
                <text x={c.x + CELL / 2} y={c.y + CELL / 2 + 1.2}>
                  {text}
                </text>
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}
