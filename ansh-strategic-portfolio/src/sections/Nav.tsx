import { useEffect, useState } from 'react';
import { navItems, profile } from '../data/portfolio';
import './nav.css';

/**
 * Fixed navigation. It stays transparent over the hero and picks up a
 * background once the page has scrolled, so the video is never fighting a bar.
 * On narrow screens the links collapse into a panel that traps nothing and
 * closes on Escape or on choosing a destination.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`.trim()}>
      <div className="nav__bar shell">
        <a className="nav__mark display" href="#top">
          {profile.monogram}
          <span className="visually-hidden">{profile.name} — back to top</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="nav__resume mono" href={profile.resumeUrl} download="">
          Résumé
        </a>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="nav__toggle-bar" aria-hidden="true" />
          <span className="nav__toggle-bar" aria-hidden="true" />
        </button>
      </div>

      <div className="nav__panel" id="nav-panel" hidden={!open}>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <a className="display" href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a className="display" href={profile.resumeUrl} download="" onClick={() => setOpen(false)}>
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
