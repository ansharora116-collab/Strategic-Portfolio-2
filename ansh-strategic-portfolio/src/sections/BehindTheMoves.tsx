import { Reveal } from '../components/motion/Reveal';
import { behind, profile } from '../data/portfolio';
import './behind.css';

/**
 * Behind the Moves — the photograph's only appearance on the site.
 *
 * The image is the original file, unedited: no filter, no crop, no background
 * removal, no overlay and no text across it. It scales inside a container that
 * holds the original 900 × 1352 aspect ratio, so the full composition stays
 * visible and the space is reserved before it loads.
 */
export function BehindTheMoves() {
  return (
    <section className="section behind" id="behind" aria-labelledby="behind-title">
      <div className="shell behind__layout">
        <Reveal className="behind__figure" variant="fade">
          <figure className="behind__frame">
            <img
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              width={profile.portrait.width}
              height={profile.portrait.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </Reveal>

        <div className="behind__copy">
          <Reveal variant="fade" className="section__eyebrow">
            <span className="mono">{behind.eyebrow}</span>
          </Reveal>

          <Reveal as="h2" variant="mask" className="behind__title display">
            <span id="behind-title">{behind.heading}</span>
          </Reveal>

          {behind.body.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 70}>
              <p className={index === 0 ? 'behind__lead serif' : 'behind__body'}>{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={140}>
            <dl className="behind__facts">
              {behind.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="mono">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
