import { useMemo, useState } from 'react';
import { Board } from '../components/chess/Board';
import { Reveal } from '../components/motion/Reveal';
import { SectionHead } from '../components/ui';
import { useIsMobile } from '../hooks/useMediaQuery';
import {
  capabilities,
  publishedArchive,
  publishedCaseStudies,
  territories,
  toolkit,
} from '../data/portfolio';

import './capabilities.css';

/** Title + in-page anchor for every piece of evidence a capability can cite. */
function useEvidenceIndex() {
  return useMemo(() => {
    const index = new Map<string, { title: string; href: string }>();
    for (const study of publishedCaseStudies) {
      index.set(study.id, { title: study.title, href: `#move-${study.id}` });
    }
    for (const item of publishedArchive) {
      index.set(item.id, { title: item.title, href: `#archive-${item.id}` });
    }
    return index;
  }, []);
}

/**
 * Capabilities — Across the Board.
 *
 * Four territories on one connected board. Nothing here is a badge: every
 * capability names the work that proves it and links to it, so a claim can
 * always be checked in one click. Hover or keyboard focus lights the territory
 * on the board and the proving projects at the same time.
 *
 * On narrow screens the same content becomes a set of disclosure panels.
 */
export function Capabilities() {
  const [activeCapability, setActiveCapability] = useState<string | null>(null);
  const [openTerritory, setOpenTerritory] = useState<string | null>(territories[0].id);
  const isMobile = useIsMobile();
  const evidence = useEvidenceIndex();

  const active = capabilities.find((capability) => capability.id === activeCapability);
  const activeTerritory = territories.find((territory) => territory.id === active?.territory);

  const renderCapability = (capabilityId: string) => {
    const capability = capabilities.find((item) => item.id === capabilityId);
    if (!capability) return null;
    return (
      <>
        <span className="capability__name">{capability.name}</span>
        <span className="capability__evidence">
          {capability.evidence.map((id) => {
            const proof = evidence.get(id);
            if (!proof) return null;
            return (
              <a className="capability__proof" href={proof.href} key={id}>
                {proof.title}
              </a>
            );
          })}
        </span>
      </>
    );
  };

  return (
    <section className="section capabilities" id="capabilities" aria-labelledby="capabilities-title">
      <div className="shell">
        <SectionHead
          eyebrow="CAPABILITIES"
          title="ACROSS THE BOARD"
          standfirst="Four territories, one board. Every capability points at the work that proves it."
          id="capabilities-title"
        />

        <div className="capabilities__layout">
          {!isMobile && (
            <Reveal className="capabilities__board" variant="fade">
              <Board
                held={territories.flatMap((territory) => territory.squares)}
                active={activeTerritory?.squares ?? []}
                labels={territories.map((territory) => territory.label)}
                description={
                  activeTerritory
                    ? `Board showing four capability territories, with ${activeTerritory.name} illuminated: ${activeTerritory.statement}`
                    : 'Board showing four capability territories: strategy, marketing, growth and execution.'
                }
                animatePath={false}
              />
              <p className="capabilities__legend mono">
                {activeTerritory
                  ? `${activeTerritory.name} — ${activeTerritory.statement}`
                  : 'Hover a capability to light its territory'}
              </p>
            </Reveal>
          )}

          <div className="capabilities__territories">
            {territories.map((territory) => {
              const owned = capabilities.filter((item) => item.territory === territory.id);
              const isOpen = openTerritory === territory.id;

              return (
                <Reveal key={territory.id} className="territory">
                  <h3 className="territory__head">
                    {isMobile ? (
                      <button
                        type="button"
                        className="territory__toggle"
                        aria-expanded={isOpen}
                        aria-controls={`territory-${territory.id}`}
                        onClick={() => setOpenTerritory(isOpen ? null : territory.id)}
                      >
                        <span className="territory__name display">{territory.name}</span>
                        <span className="territory__count mono">
                          {owned.length}
                          <span className="visually-hidden"> capabilities</span>
                        </span>
                      </button>
                    ) : (
                      <>
                        <span className="territory__name display">{territory.name}</span>
                        <span className="territory__count mono">
                          {owned.length}
                          <span className="visually-hidden"> capabilities</span>
                        </span>
                      </>
                    )}
                  </h3>

                  <div
                    className="territory__body"
                    id={`territory-${territory.id}`}
                    hidden={isMobile && !isOpen}
                  >
                    <p className="territory__statement">{territory.statement}</p>
                    <ul className="capability-list">
                      {owned.map((capability) => (
                        <li
                          className={`capability ${
                            activeCapability === capability.id ? 'is-active' : ''
                          }`.trim()}
                          key={capability.id}
                          onMouseEnter={() => setActiveCapability(capability.id)}
                          onMouseLeave={() => setActiveCapability(null)}
                          onFocus={() => setActiveCapability(capability.id)}
                          onBlur={() => setActiveCapability(null)}
                        >
                          {renderCapability(capability.id)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="toolkit">
          <h3 className="toolkit__title mono">Tools</h3>
          <ul className="toolkit__list">
            {toolkit.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
