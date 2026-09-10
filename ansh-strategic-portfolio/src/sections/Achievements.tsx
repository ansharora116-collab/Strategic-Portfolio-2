import { useState } from 'react';
import { Reveal } from '../components/motion/Reveal';
import { SectionHead } from '../components/ui';
import { achievements } from '../data/portfolio';
import './achievements.css';

/**
 * Achievements — The Scoreboard.
 *
 * Condensed into five counted groups with the detail behind a disclosure, so
 * the section reads as a record rather than a trophy cabinet. No trophies, no
 * confetti, no victory animation — the numbers do the work.
 */
export function Achievements() {
  const [openId, setOpenId] = useState<string | null>(achievements.groups[0].id);

  return (
    <section className="section scoreboard" id="achievements" aria-labelledby="achievements-title">
      <div className="shell">
        <SectionHead
          eyebrow={achievements.eyebrow}
          title={achievements.heading}
          standfirst={achievements.standfirst}
          id="achievements-title"
        />

        <ul className="scoreboard__groups">
          {achievements.groups.map((group, index) => {
            const isOpen = openId === group.id;
            return (
              <Reveal
                as="li"
                key={group.id}
                className={`scoregroup ${isOpen ? 'is-open' : ''}`.trim()}
                delay={Math.min(index * 50, 200)}
              >
                <h3 className="scoregroup__head">
                  <button
                    type="button"
                    className="scoregroup__toggle"
                    aria-expanded={isOpen}
                    aria-controls={`scoregroup-${group.id}`}
                    onClick={() => setOpenId(isOpen ? null : group.id)}
                  >
                    <span className="scoregroup__count display">{group.count}</span>
                    <span className="scoregroup__title">{group.heading}</span>
                    <span className="scoregroup__sign" aria-hidden="true" />
                  </button>
                </h3>

                <div className="scoregroup__body" id={`scoregroup-${group.id}`} hidden={!isOpen}>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.title}>
                        <span className="scoregroup__item-title">{item.title}</span>
                        <span className="scoregroup__item-detail">{item.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
