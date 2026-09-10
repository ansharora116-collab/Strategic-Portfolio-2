import { Board } from '../components/chess/Board';
import { Reveal } from '../components/motion/Reveal';
import { Action } from '../components/ui';
import { closing, contact, profile } from '../data/portfolio';
import './closing.css';

/** Ground held across the four featured moves — a strong, unfinished position. */
const HELD = [
  'b2', 'c2', 'd4', 'e4', 'e5', 'f5', 'c6', 'g6', 'e7', 'd7', 'b7', 'c7', 'g3',
];

/** The one square left deliberately unplayed. */
const OPEN_SQUARE = 'h8';

/**
 * Closing — Your Move.
 *
 * The opening board returns, now carrying the position built across the page,
 * with a single square left open. Neither the video nor the photograph appears
 * here: the last image of the site is the board, and the next move is the
 * visitor's.
 */
export function Closing() {
  return (
    <section className="section closing section--flush" id="contact" aria-labelledby="closing-title">
      <div className="shell closing__layout">
        <div className="closing__copy">
          <Reveal variant="fade" className="section__eyebrow">
            <span className="mono">{closing.eyebrow}</span>
          </Reveal>

          <Reveal as="h2" variant="mask" className="closing__title display">
            <span id="closing-title">
              {closing.heading[0]}{' '}
              <br />
              {closing.heading[1]}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <p className="closing__body">{closing.body}</p>
          </Reveal>

          <Reveal delay={140} className="closing__actions">
            <Action href={`mailto:${contact.email}`} variant="solid">
              Your Move — Email Ansh
            </Action>
            <Action href={contact.linkedin} external>
              LinkedIn
            </Action>
            <Action href={profile.resumeUrl} download>
              {profile.resumeLabel}
            </Action>
          </Reveal>

          <Reveal delay={180} className="closing__direct">
            <a className="closing__email" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <a className="closing__phone" href={`tel:${contact.phone.replace(/\s/g, '')}`}>
              {contact.phone}
            </a>
          </Reveal>
        </div>

        <Reveal className="closing__board" variant="fade">
          <Board
            held={HELD}
            active={[]}
            labels={[{ coord: OPEN_SQUARE, text: '?', open: true }]}
            description="The board at the end of the page: ground held across four moves, with one square at h8 still open."
            animatePath={false}
          />
          <p className="closing__caption mono">One square open — h8</p>
        </Reveal>
      </div>

      <footer className="footer">
        <div className="shell footer__inner">
          <span className="mono">{contact.footerNote}</span>
          <a className="mono" href="#top">
            Back to the board
          </a>
        </div>
      </footer>
    </section>
  );
}
