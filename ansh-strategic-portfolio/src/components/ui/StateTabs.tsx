import { useRef } from 'react';
import './state-tabs.css';

export interface TabItem {
  id: string;
  label: string;
  /** Optional short line under the label, used by the marketing questions. */
  hint?: string;
}

interface StateTabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  /** Accessible name for the tab list. */
  label: string;
  /** Prefix used to build the tab/panel id pair. */
  idPrefix: string;
  /** Numbers the tabs, e.g. 01 / 02. */
  numbered?: boolean;
  className?: string;
}

/**
 * A real tablist: arrow keys move between states, Home/End jump to the ends,
 * and each tab owns its panel through aria-controls. The board beside it is
 * the illustration — every state is fully readable in the panel text alone.
 */
export function StateTabs({
  items,
  activeId,
  onChange,
  label,
  idPrefix,
  numbered = false,
  className = '',
}: StateTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const focusTab = (index: number) => {
    const next = items[(index + items.length) % items.length];
    onChange(next.id);
    listRef.current
      ?.querySelector<HTMLButtonElement>(`#${idPrefix}-tab-${next.id}`)
      ?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const current = items.findIndex((item) => item.id === activeId);
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        focusTab(current + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        focusTab(current - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(items.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`state-tabs ${className}`.trim()}
      role="tablist"
      aria-label={label}
      aria-orientation="vertical"
      ref={listRef}
      onKeyDown={onKeyDown}
    >
      {items.map((item, index) => {
        const selected = item.id === activeId;
        return (
          <button
            key={item.id}
            className={`state-tabs__tab ${selected ? 'is-active' : ''}`.trim()}
            id={`${idPrefix}-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${item.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
          >
            {numbered && (
              <span className="state-tabs__index mono">
                {String(index + 1).padStart(2, '0')}
              </span>
            )}
            <span className="state-tabs__label">{item.label}</span>
            {item.hint && <span className="state-tabs__hint">{item.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}
