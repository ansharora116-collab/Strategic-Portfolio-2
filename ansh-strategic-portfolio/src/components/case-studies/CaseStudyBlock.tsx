import { Board } from '../chess/Board';
import { Reveal } from '../motion/Reveal';
import { Action, MetricList, PillList } from '../ui';
import { useInView } from '../../hooks/useInView';
import type { CaseStudy } from '../../types';
import './case-study.css';

/**
 * One featured move, told in the fixed order the brief sets:
 * Position → Opportunity → Insight → Move → Execution → Outcome → Learning.
 *
 * Reasoning comes before the number in every case — the outcome chapter is
 * near the end, not the headline. On desktop the board sticks beside the
 * chapters and draws its move once the block is on screen; on narrow screens
 * the board sits above the text at full width.
 */
export function CaseStudyBlock({ study, index }: { study: CaseStudy; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });
  const outcome = study.chapters.find((chapter) => chapter.key === 'outcome');

  return (
    <article
      className={`case ${index % 2 === 1 ? 'case--flip' : ''}`.trim()}
      id={`move-${study.id}`}
      aria-labelledby={`move-${study.id}-title`}
    >
      <header className="case__head">
        <Reveal variant="fade" className="case__meta">
          <span className="mono">{study.moveNumber}</span>
          <span className="mono case__movename">{study.moveName}</span>
        </Reveal>
        <Reveal as="h3" variant="mask" className="case__title display">
          <span id={`move-${study.id}-title`}>{study.title}</span>
        </Reveal>
        <Reveal delay={80} className="case__context">
          <span>{study.context}</span>
          <span className="case__dot" aria-hidden="true">
            ·
          </span>
          <span>{study.role}</span>
          <span className="case__dot" aria-hidden="true">
            ·
          </span>
          <span>{study.period}</span>
        </Reveal>
      </header>

      <div className="case__body">
        <div className="case__visual" ref={ref}>
          <div className="case__board">
            <Board
              held={[study.board.origin]}
              active={inView ? study.board.gained : []}
              path={inView ? study.board.path : []}
              description={`Board for ${study.title}: one held square at ${study.board.origin} expanding into ${study.board.gained.length} further squares.`}
              animatePath={inView}
            />
          </div>
          {outcome && (
            <p className="case__board-caption mono">
              {study.board.gained.length + 1} squares · {study.moveName}
            </p>
          )}
        </div>

        <div className="case__narrative">
          <ol className="chapters">
            {study.chapters.map((chapter, chapterIndex) => (
              <Reveal
                as="li"
                key={chapter.key}
                className={`chapters__item chapters__item--${chapter.key}`}
                delay={Math.min(chapterIndex * 40, 160)}
              >
                <h4 className="chapters__label mono">{chapter.label}</h4>
                <p className="chapters__body">{chapter.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="case__footer">
            <MetricList metrics={study.metrics} className="case__metrics" />
            <PillList items={study.levers} label={`Levers used on ${study.title}`} />
            {study.link && (
              <Action
                href={study.link.href}
                external={study.link.external}
                variant="quiet"
                className="case__link"
              >
                {study.link.label}
              </Action>
            )}
          </Reveal>
        </div>
      </div>
    </article>
  );
}
