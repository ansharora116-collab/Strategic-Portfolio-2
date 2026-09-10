import { useState } from 'react';
import { Board } from '../components/chess/Board';
import { Reveal } from '../components/motion/Reveal';
import { SectionHead } from '../components/ui';
import { useIsMobile } from '../hooks/useMediaQuery';
import { earlier, journey } from '../data/portfolio';
import './journey.css';

/**
 * Journey — Moves So Far.
 *
 * The stops are placed as coordinates on the board and connected in the order
 * they happened, so the path never implies a chronology that did not occur.
 * The final square is left open on purpose.
 *
 * Below 760px the board is replaced by a stacked timeline carrying exactly the
 * same information.
 */
export function Journey() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const active = journey.find((stop) => stop.id === activeId);

  const timeline = (
    <ol className="journey__list">
      {journey.map((stop) => (
        <Reveal
          as="li"
          key={stop.id}
          className={`journey__stop ${stop.open ? 'is-open' : ''} ${
            activeId === stop.id ? 'is-active' : ''
          }`.trim()}
        >
          <button
            type="button"
            className="journey__button"
            onMouseEnter={() => setActiveId(stop.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(stop.id)}
            onBlur={() => setActiveId(null)}
            onClick={() => setActiveId(activeId === stop.id ? null : stop.id)}
            aria-pressed={activeId === stop.id}
          >
            <span className="journey__coord mono">{stop.coord}</span>
            <span className="journey__main">
              <span className="journey__place display">{stop.place}</span>
              <span className="journey__frame mono">{stop.frame}</span>
              <span className="journey__role">{stop.role}</span>
              <span className="journey__org">{stop.organisation}</span>
              <span className="journey__detail">{stop.detail}</span>
            </span>
            <span className="journey__period mono">{stop.period}</span>
          </button>
        </Reveal>
      ))}
    </ol>
  );

  return (
    <section className="section journey" id="journey" aria-labelledby="journey-title">
      <div className="shell">
        <SectionHead
          eyebrow="JOURNEY"
          title="MOVES SO FAR"
          standfirst="Six coordinates, in the order they were played."
          id="journey-title"
        />

        <div className="journey__layout">
          {!isMobile && (
            <Reveal className="journey__board" variant="fade">
              <Board
                held={journey.map((stop) => stop.coord)}
                active={active ? [active.coord] : []}
                path={journey.map((stop) => stop.coord)}
                labels={journey.map((stop) => ({
                  coord: stop.coord,
                  text: stop.place.slice(0, 3).toUpperCase(),
                  open: stop.open,
                }))}
                description="Board plotting six career coordinates connected in chronological order, ending on an open square."
                checker={false}
              />
            </Reveal>
          )}

          <div className="journey__timeline">{timeline}</div>
        </div>

        <Reveal className="journey__earlier">
          <span className="mono">{earlier.label}</span>
          <p>{earlier.text}</p>
        </Reveal>
      </div>
    </section>
  );
}
