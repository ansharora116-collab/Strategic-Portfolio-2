/** Board geometry helpers. One 8×8 board, used by every chess visual. */

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export const RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

/** Viewport units per square in the SVG coordinate system. */
export const CELL = 12;
export const BOARD_SIZE = CELL * 8;

export interface Cell {
  coord: string;
  /** Column index, 0 = file a. */
  col: number;
  /** Row index, 0 = rank 8 (top of the board as drawn). */
  row: number;
  x: number;
  y: number;
  light: boolean;
}

/** Every square, in reading order (a8 → h1) — row 0 is rank 8, as drawn. */
export const CELLS: Cell[] = RANKS.map((_, row) => RANKS[RANKS.length - 1 - row]).flatMap(
  (rank, row) =>
    FILES.map((file, col) => ({
      coord: `${file}${rank}`,
      col,
      row,
      x: col * CELL,
      y: row * CELL,
      light: (col + row) % 2 === 0,
    })),
);

const BY_COORD = new Map(CELLS.map((square) => [square.coord, square]));

export function cell(coord: string): Cell | undefined {
  return BY_COORD.get(coord);
}

/** Centre point of a square, for drawing paths between squares. */
export function centre(coord: string): { x: number; y: number } {
  const square = cell(coord);
  if (!square) return { x: 0, y: 0 };
  return { x: square.x + CELL / 2, y: square.y + CELL / 2 };
}

/**
 * Path through a list of squares. Consecutive squares that form a knight's
 * relationship are drawn as an L — the move is the point, so it should look
 * like the move rather than a straight line.
 */
export function pathData(coords: string[]): string {
  if (coords.length < 2) return '';
  const points = coords.map(centre);
  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i += 1) {
    const from = points[i - 1];
    const to = points[i];
    const dx = Math.abs(to.x - from.x);
    const dy = Math.abs(to.y - from.y);
    const isKnight =
      (Math.round(dx / CELL) === 1 && Math.round(dy / CELL) === 2) ||
      (Math.round(dx / CELL) === 2 && Math.round(dy / CELL) === 1);

    if (isKnight) {
      // Travel the long leg first, then turn — a legible L.
      d += dx > dy ? ` L ${to.x} ${from.y} L ${to.x} ${to.y}` : ` L ${from.x} ${to.y} L ${to.x} ${to.y}`;
    } else {
      d += ` L ${to.x} ${to.y}`;
    }
  }

  return d;
}
