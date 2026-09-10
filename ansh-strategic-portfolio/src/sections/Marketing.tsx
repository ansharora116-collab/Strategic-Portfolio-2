import { useState } from 'react';
import { Board } from '../components/chess/Board';
import { Reveal } from '../components/motion/Reveal';
import { SectionHead } from '../components/ui';
import { StateTabs } from '../components/ui/StateTabs';
import { useIsMobile } from '../hooks/useMediaQuery';
import { marketing } from '../data/portfolio';
import './board-section.css';


/** Panel contents for one lens. Defined outside the component: it depends on
 *  nothing but the lens it is handed. */
function LensBody({ lensId }: { lensId: string }) {
  const lens = marketing.lenses.find((item) => item.id === lensId);
  if (!lens) return null;
  return (
    <>
      <p className="board-section__statement serif">{lens.statement}</p>
      <ul className="facets" aria-label={`${lens.label} — what this covers`}>
        {lens.facets.map((facet) => (
          <li key={facet}>{facet}</li>
        ))}
      </ul>
      <p className="board-section__evidence">
        <span className="mono">In practice</span>
        {lens.evidence}
      </p>
    </>
  );
}

/**
 * Marketing Strategy — Moving the Market.
 *
 * Four questions asked of the same board, in the order they actually get
 * answered: where to play, who to move, why they choose you, how intent turns
 * into outcomes. Each answer carries forward — the squares won by the previous
 * question stay held, so the board accumulates rather than resetting.
 */
export function Marketing() {
  const [activeId, setActiveId] = useState(marketing.lenses[0].id);
  const isMobile = useIsMobile();
  const activeIndex = Math.max(
    0,
    marketing.lenses.findIndex((lens) => lens.id === activeId),
  );
  const active = marketing.lenses[activeIndex];
  /** Everything answered so far stays on the board as held ground. */
  const held = marketing.lenses.slice(0, activeIndex).flatMap((lens) => lens.squares);

  return (
    <section className="section board-section" id="marketing" aria-labelledby="marketing-title">
      <div className="shell">
        <SectionHead
          eyebrow={marketing.eyebrow}
          title={marketing.heading}
          standfirst={marketing.standfirst}
          id="marketing-title"
        />

        {isMobile ? (
          <ol className="steps">
            {marketing.lenses.map((lens, index) => (
              <Reveal as="li" key={lens.id} className="steps__item">
                <span className="mono">{String(index + 1).padStart(2, '0')} · {lens.label}</span>
                <h3 className="steps__title display">{lens.question}</h3>
                <LensBody lensId={lens.id} />
              </Reveal>
            ))}
          </ol>
        ) : (
          <div className="board-section__grid board-section__grid--wide">
            <div className="board-section__controls">
              <StateTabs
                items={marketing.lenses.map((lens) => ({
                  id: lens.id,
                  label: lens.label,
                  hint: lens.question,
                }))}
                activeId={activeId}
                onChange={setActiveId}
                label="Marketing questions"
                idPrefix="marketing"
                numbered
              />
            </div>

            <Reveal className="board-section__board" variant="fade">
              <Board
                held={held}
                active={active.squares}
                path={active.path}
                description={`Board state for the question: ${active.question} — ${active.statement}`}
                key={active.id}
              />
            </Reveal>

            <div className="board-section__panels">
              {marketing.lenses.map((lens) => (
                <div
                  key={lens.id}
                  className="board-section__panel"
                  id={`marketing-panel-${lens.id}`}
                  role="tabpanel"
                  aria-labelledby={`marketing-tab-${lens.id}`}
                  hidden={lens.id !== activeId}
                >
                  <h3 className="board-section__question display">{lens.question}</h3>
                  <LensBody lensId={lens.id} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
