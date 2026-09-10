import type { ElementType, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import './reveal.css';

interface RevealProps {
  children: ReactNode;
  /** Rendered element. Keeps reveals from flattening the heading outline. */
  as?: ElementType;
  /** Stagger in ms, applied as a transition-delay. Keep under ~240ms. */
  delay?: number;
  /** 'up' slides a short distance; 'mask' wipes a line of type into view. */
  variant?: 'up' | 'mask' | 'fade';
  className?: string;
  /** Anchor target, so an in-page link can point straight at a revealed item. */
  id?: string;
}

/**
 * Transform/opacity only, so it stays on the compositor. Under
 * prefers-reduced-motion the CSS drops the movement and shows content
 * immediately — no JS branch needed.
 *
 * The mask variant clips an inner wrapper rather than the observed element:
 * a fully clipped element reports an empty intersection rectangle, so
 * IntersectionObserver would never fire and the reveal would never run.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  variant = 'up',
  className = '',
  id,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal reveal--${variant} ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {variant === 'mask' ? <span className="reveal__inner">{children}</span> : children}
    </Tag>
  );
}
