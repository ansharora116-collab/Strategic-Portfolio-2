import type { ReactNode } from 'react';
import { Reveal } from '../motion/Reveal';
import './ui.css';

/* ----------------------------- Actions ---------------------------- */

interface ActionProps {
  href: string;
  children: ReactNode;
  /** Solid fill for the primary action; outline for everything else. */
  variant?: 'solid' | 'outline' | 'quiet';
  /** Opens in a new tab and announces it. */
  external?: boolean;
  /** Suggests a download rather than navigation. */
  download?: boolean;
  className?: string;
}

export function Action({
  href,
  children,
  variant = 'outline',
  external = false,
  download = false,
  className = '',
}: ActionProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noreferrer noopener' }
    : {};

  return (
    <a
      className={`action action--${variant} ${className}`.trim()}
      href={href}
      {...externalProps}
      {...(download ? { download: '' } : {})}
    >
      <span>{children}</span>
      {external && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  );
}

/* --------------------------- Section head -------------------------- */

interface SectionHeadProps {
  eyebrow: string;
  /** One string, or two lines rendered as a stacked display headline. */
  title: string | string[];
  standfirst?: string;
  id?: string;
  /** Renders the title in the editorial serif instead of the display face. */
  serif?: boolean;
}

export function SectionHead({ eyebrow, title, standfirst, id, serif }: SectionHeadProps) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <div className="section__head">
      <Reveal variant="fade" className="section__eyebrow">
        <span className="mono">{eyebrow}</span>
      </Reveal>
      <Reveal as="h2" variant="mask" className={`section__title ${serif ? 'section__title--serif' : ''}`.trim()}>
        <span id={id}>
          {lines.map((line, i) => (
            <span className="section__title-line" key={line}>
              {line}
              {i < lines.length - 1 && (
                <>
                  {' '}
                  <br />
                </>
              )}
            </span>
          ))}
        </span>
      </Reveal>
      {standfirst && (
        <Reveal delay={90} className="section__standfirst">
          {standfirst}
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------ Metrics ---------------------------- */

export function MetricList({
  metrics,
  className = '',
}: {
  metrics: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <dl className={`metrics ${className}`.trim()}>
      {metrics.map((metric) => (
        <div className="metrics__item" key={metric.label}>
          <dt className="mono">{metric.label}</dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------- Pills ----------------------------- */

export function PillList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="pills" aria-label={label}>
      {items.map((item) => (
        <li className="pills__item" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
