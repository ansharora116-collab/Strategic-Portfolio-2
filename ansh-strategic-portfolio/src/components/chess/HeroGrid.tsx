import { useEffect, useRef } from 'react';
import { useFinePointer } from '../../hooks/useMediaQuery';
import './hero-grid.css';

const COLS = 8;
const ROWS = 8;
const CELL_COUNT = COLS * ROWS;

/**
 * The faint board laid over the hero video. It is deliberately near the
 * threshold of visibility: it must never compete with Ansh or cost the
 * headline any contrast.
 *
 * On a fine pointer, squares near the cursor lift a little — the board
 * responding to attention. Touch devices get the static grid, and no
 * listener is attached at all.
 */
export function HeroGrid() {
  const finePointer = useFinePointer();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !finePointer) return;

    const cells = Array.from(root.querySelectorAll<HTMLElement>('.hero-grid__cell'));
    let frame = 0;

    const paint = (clientX: number, clientY: number) => {
      const rect = root.getBoundingClientRect();
      const col = ((clientX - rect.left) / rect.width) * COLS;
      const row = ((clientY - rect.top) / rect.height) * ROWS;

      for (let i = 0; i < cells.length; i += 1) {
        const cx = (i % COLS) + 0.5;
        const cy = Math.floor(i / COLS) + 0.5;
        const distance = Math.hypot(cx - col, cy - row);
        // Only the two rings around the pointer register at all.
        const strength = Math.max(0, 1 - distance / 2.1);
        cells[i].style.opacity = strength ? (strength * strength * 0.5).toFixed(3) : '0';
      }
    };

    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        paint(event.clientX, event.clientY);
      });
    };

    const onLeave = () => {
      for (const c of cells) c.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      onLeave();
    };
  }, [finePointer]);

  return (
    <div className="hero-grid" ref={rootRef} aria-hidden="true">
      <div className="hero-grid__lines" />
      <div className="hero-grid__cells">
        {Array.from({ length: CELL_COUNT }, (_, i) => (
          <span key={i} className="hero-grid__cell" />
        ))}
      </div>
    </div>
  );
}
