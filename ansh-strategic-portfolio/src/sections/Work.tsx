import { CaseStudyBlock } from '../components/case-studies/CaseStudyBlock';
import { Reveal } from '../components/motion/Reveal';
import { Action, SectionHead } from '../components/ui';
import { publishedArchive, publishedCaseStudies } from '../data/portfolio';
import './work.css';

/**
 * Featured Work — Moves That Mattered.
 *
 * Four moves told in full, then a compact archive for everything else so the
 * page stays readable. The archive is a plain list on purpose: it is evidence,
 * not a second gallery competing with the four.
 */
export function Work() {
  return (
    <section className="section work" id="moves" aria-labelledby="moves-title">
      <div className="shell">
        <SectionHead
          eyebrow="FEATURED WORK"
          title="MOVES THAT MATTERED"
          standfirst="Four positions, four decisions, four outcomes — read in that order."
          id="moves-title"
        />

        <div className="work__cases">
          {publishedCaseStudies.map((study, index) => (
            <CaseStudyBlock key={study.id} study={study} index={index} />
          ))}
        </div>

        <div className="archive" id="archive">
          <Reveal className="archive__head">
            <h3 className="archive__title mono">Also on the board</h3>
            <p className="archive__note">
              Earlier work and side projects, in brief.
            </p>
          </Reveal>

          <ul className="archive__list">
            {publishedArchive.map((item, index) => (
              <Reveal
                as="li"
                key={item.id}
                className="archive__item"
                id={`archive-${item.id}`}
                delay={Math.min(index * 40, 160)}
              >
                <div className="archive__meta">
                  <span className="mono">{item.period}</span>
                </div>
                <div className="archive__content">
                  <h4 className="archive__item-title">{item.title}</h4>
                  <p className="archive__context mono">{item.context}</p>
                  <p className="archive__summary">{item.summary}</p>
                  {item.link && (
                    <Action
                      href={item.link.href}
                      external={item.link.external}
                      variant="quiet"
                    >
                      {item.link.label}
                    </Action>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
