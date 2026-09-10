import { Reveal } from '../components/motion/Reveal';
import { SectionHead } from '../components/ui';
import { reflection } from '../data/portfolio';

/**
 * Reflection — Moves Not Made.
 *
 * Held back from production. No verified account of a changed assumption or a
 * rejected approach exists yet, and inventing one would be inventing a failure.
 * The section is written and ready: fill `reflection.entries` in
 * src/data/portfolio.ts with Ansh's own words and set `published: true`, and it
 * renders in place without any other change.
 */
export function Reflection() {
  if (!reflection.published || reflection.entries.length === 0) return null;

  return (
    <section className="section reflection" id="reflection" aria-labelledby="reflection-title">
      <div className="shell">
        <SectionHead
          eyebrow={reflection.eyebrow}
          title={reflection.heading}
          id="reflection-title"
          serif
        />
        <div className="reflection__entries">
          {reflection.entries.map((entry) => (
            <Reveal key={entry.title}>
              <h3 className="display">{entry.title}</h3>
              <p>{entry.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
