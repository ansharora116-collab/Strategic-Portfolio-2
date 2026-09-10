import { useState } from 'react';
import { Board } from '../components/chess/Board';
import { Reveal } from '../components/motion/Reveal';
import { SectionHead } from '../components/ui';
import { StateTabs } from '../components/ui/StateTabs';
import { useIsMobile } from '../hooks/useMediaQuery';
import { approach } from '../data/portfolio';
import './board-section.css';

/**
 * Approach — How I Play.
 *
 * One board, three states. Each state lights a different region and draws the
 * move it implies; the alternatives stay grey rather than disappearing, so the
 * board reads as a set of choices rather than three separate diagrams.
 *
 * Below 760px the board drops away and the same three steps stack as plain,
 * fully readable blocks — nothing here is carried by the illustration alone.
 */
export function Approach() {
  const [activeId, setActiveId] = useState(approach.steps[0].id);
  const isMobile = useIsMobile();
  const active = approach.steps.find((step) => step.id === activeId) ?? approach.steps[0];

  if (isMobile) {
    return (
      <section className="section board-section" id="approach" aria-labelledby="approach-title">
        <div className="shell">
          <SectionHead
            eyebrow={approach.eyebrow}
            title={approach.heading}
            standfirst={approach.standfirst}
            id="approach-title"
          />
          <ol className="steps">
            {approach.steps.map((step) => (
              <Reveal as="li" key={step.id} className="steps__item">
                <span className="mono">{step.index}</span>
                <h3 className="steps__title display">{step.title}</h3>
                <p className="steps__statement serif">{step.statement}</p>
                <p className="steps__body">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section className="section board-section" id="approach" aria-labelledby="approach-title">
      <div className="shell">
        <SectionHead
          eyebrow={approach.eyebrow}
          title={approach.heading}
          standfirst={approach.standfirst}
          id="approach-title"
        />

        <div className="board-section__grid">
          <div className="board-section__controls">
            <StateTabs
              items={approach.steps.map((step) => ({ id: step.id, label: step.title }))}
              activeId={activeId}
              onChange={setActiveId}
              label="Approach steps"
              idPrefix="approach"
              numbered
            />
          </div>

          <Reveal className="board-section__board" variant="fade">
            <Board
              held={approach.steps.flatMap((step) => step.squares)}
              active={active.squares}
              path={active.path}
              description={`Board state for ${active.title}: ${active.statement}`}
              key={active.id}
            />
          </Reveal>

          <div className="board-section__panels">
            {approach.steps.map((step) => (
              <div
                key={step.id}
                className="board-section__panel"
                id={`approach-panel-${step.id}`}
                role="tabpanel"
                aria-labelledby={`approach-tab-${step.id}`}
                hidden={step.id !== activeId}
              >
                <p className="board-section__statement serif">{step.statement}</p>
                <p className="board-section__body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
