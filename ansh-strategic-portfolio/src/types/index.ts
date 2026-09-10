/**
 * Shared content types. The data layer (src/data/portfolio.ts) is the single
 * source of truth for every public fact on this site; these types keep it
 * honest — most notably `ReviewFlag`, which marks anything that still needs a
 * human confirmation before it is allowed to render publicly.
 */

/** Marks content that is written but not yet verified for public display. */
export interface ReviewFlag {
  /** When false the item is kept in the data layer but never rendered. */
  published: boolean;
  /** Internal note describing what still needs confirming. */
  reviewNote?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface BoardSquare {
  /** Algebraic coordinate, e.g. "d4". Used as the key and the mono label. */
  coord: string;
  file: number;
  rank: number;
}

export interface ApproachStep {
  id: string;
  index: string;
  title: string;
  statement: string;
  body: string;
  /** Squares illuminated on the shared board when this step is active. */
  squares: string[];
  /** Ordered path drawn between squares to show the move being made. */
  path: string[];
}

export interface MarketingLens {
  id: string;
  question: string;
  label: string;
  statement: string;
  facets: string[];
  /** Evidence drawn only from verified project work. */
  evidence: string;
  squares: string[];
  path: string[];
}

export interface CaseMetric {
  label: string;
  value: string;
}

export interface CaseChapter {
  key:
    | 'position'
    | 'opportunity'
    | 'insight'
    | 'move'
    | 'execution'
    | 'outcome'
    | 'learning';
  label: string;
  body: string;
}

export interface CaseStudy extends ReviewFlag {
  id: string;
  /** "MOVE 01" etc. */
  moveNumber: string;
  /** The chess framing, e.g. "Expand the Board". */
  moveName: string;
  title: string;
  context: string;
  role: string;
  period: string;
  /** Board choreography: squares held, squares gained, the connecting path. */
  board: {
    origin: string;
    gained: string[];
    path: string[];
  };
  chapters: CaseChapter[];
  metrics: CaseMetric[];
  levers: string[];
  link?: { href: string; label: string; external: boolean };
  /** Capability ids this project proves. Drives the Capabilities section. */
  proves: string[];
}

export interface ArchiveItem extends ReviewFlag {
  id: string;
  title: string;
  context: string;
  period: string;
  summary: string;
  link?: { href: string; label: string; external: boolean };
  proves: string[];
}

export interface Capability {
  id: string;
  territory: 'strategy' | 'marketing' | 'growth' | 'execution';
  name: string;
  /** Ids of case studies or archive items that prove this capability. */
  evidence: string[];
}

export interface Territory {
  id: 'strategy' | 'marketing' | 'growth' | 'execution';
  name: string;
  statement: string;
  squares: string[];
  /** Short tactical label placed on the board so the territory is findable. */
  label: { coord: string; text: string };
}

export interface JourneyStop {
  id: string;
  coord: string;
  place: string;
  frame: string;
  period: string;
  role: string;
  organisation: string;
  detail: string;
  /** Open position — the next move, deliberately unfilled. */
  open?: boolean;
}

export interface AwardGroup {
  id: string;
  heading: string;
  count: string;
  items: { title: string; detail: string }[];
}
