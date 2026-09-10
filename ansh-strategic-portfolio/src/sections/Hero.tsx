import { useEffect, useRef, useState } from 'react';
import { HeroGrid } from '../components/chess/HeroGrid';
import { Action } from '../components/ui';
import { profile } from '../data/portfolio';
import './hero.css';

/**
 * Hero — The Player.
 *
 * The supplied video plays untouched as the full background: autoplay, loop,
 * muted, playsInline, with a CSS overlay above it for readability. Nothing is
 * baked into the file.
 *
 * On scroll the hero pins briefly, the overlay deepens, thin board lines
 * resolve, and the two halves of the headline separate — "I READ THE BOARD"
 * leaving to one side, "THEN I MAKE THE MOVE" to the other — before the page
 * hands over to the strategic board. Under prefers-reduced-motion none of
 * that runs: the hero simply sits still and the page scrolls normally.
 */
export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  /**
   * If the browser cannot decode the file (an unsupported build, a blocked
   * request), the stage falls back to the static board composition rather than
   * showing a broken element. The source file itself is never altered.
   */
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Visitors who asked for reduced motion never pay for the animation
    // library at all — the hero simply stays still.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    // GSAP is loaded on demand, after first paint, so the hero video and
    // headline are not waiting behind it on a slow connection.
    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=90%',
            pin: '.hero__stage',
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        timeline
          .to('.hero__overlay', { opacity: 1, duration: 1 }, 0)
          .to('.hero__lines', { opacity: 1, duration: 1 }, 0)
          .to('.hero__line--read', { xPercent: -14, opacity: 0.25, duration: 1 }, 0)
          .to('.hero__line--move', { xPercent: 14, opacity: 0.25, duration: 1 }, 0)
          .to('.hero__support, .hero__actions, .hero__cue', { opacity: 0, duration: 0.45 }, 0)
          .to('.hero__handoff', { opacity: 1, duration: 0.6 }, 0.4);
      }, root);

      revert = () => context.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <div className="hero" ref={rootRef}>
      <div className={`hero__stage ${videoFailed ? 'has-no-video' : ''}`.trim()}>
        <video
          className="hero__video"
          src={profile.heroVideo.src}
          width={profile.heroVideo.width}
          height={profile.heroVideo.height}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setVideoFailed(true)}
        />
        <div className="hero__scrim" />
        <div className="hero__overlay" />
        <div className="hero__lines" aria-hidden="true" />
        <HeroGrid />

        <div className="hero__content shell">
          <p className="hero__positioning mono">{profile.positioning}</p>

          <h1 className="hero__headline display">
            <span className="hero__line hero__line--read">{profile.headline[0]} </span>
            <span className="hero__line hero__line--move">{profile.headline[1]}</span>
          </h1>

          <p className="hero__support">{profile.supporting}</p>

          <div className="hero__actions">
            <Action href="#moves" variant="solid">
              View My Moves
            </Action>
            <Action href={profile.resumeUrl} download>
              {profile.resumeLabel}
            </Action>
          </div>

          <p className="hero__handoff mono" aria-hidden="true">
            Every market is a board.
          </p>
        </div>

        <div className="hero__cue mono" aria-hidden="true">
          <span>Scroll</span>
          <span className="hero__cue-line" />
        </div>
      </div>
    </div>
  );
}
