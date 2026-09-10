/**
 * SINGLE SOURCE OF TRUTH for every public fact on this site.
 *
 * Sourcing rules applied here:
 *  - Metrics, employers, institutions, dates and links are carried over
 *    verbatim from Ansh's résumé (public/assets/documents/ansh-arora-resume.pdf)
 *    and his existing portfolio content file. Nothing is invented.
 *  - The chess framing ("The Position", "The Insight", "The Learning") is
 *    interpretive narration of those verified facts. Where a line asserts more
 *    than the source documents state, it carries a `reviewNote` and, if it
 *    cannot be published safely, `published: false` keeps it out of the DOM.
 *  - See CONTENT_AUDIT.md for the fact-by-fact provenance table.
 */

import type {
  ApproachStep,
  ArchiveItem,
  AwardGroup,
  Capability,
  CaseStudy,
  JourneyStop,
  MarketingLens,
  NavItem,
  Territory,
} from '../types';

const base = import.meta.env.BASE_URL;

export const profile = {
  name: 'Ansh Arora',
  shortName: 'ANSH ARORA',
  monogram: 'A.',
  positioning: "FOUNDER'S OFFICE · STRATEGY · MARKETING",
  headline: ['I READ THE BOARD.', 'THEN I MAKE THE MOVE.'],
  supporting:
    'Turning market insight into strategy, execution and measurable growth.',
  metaDescription:
    'Ansh Arora — strategy, marketing and growth. A portfolio of the moves behind a national dark-store scale-up, enterprise gifting accounts, marketplace automation and an investor-style market map.',
  resumeUrl: `${base}assets/documents/ansh-arora-resume.pdf`,
  resumeLabel: 'Download Résumé',
  portrait: {
    src: `${base}assets/images/ansh-portrait.jpg`,
    /** Intrinsic size — reserved in CSS so the image never shifts layout. */
    width: 900,
    height: 1352,
    alt: 'Ansh Arora, photographed in a patterned black-and-white blazer and white shirt.',
  },
  heroVideo: {
    src: `${base}assets/video/hero-ansh.mp4`,
    width: 1024,
    height: 592,
    /** Descriptive label for assistive technology; the video carries no audio. */
    description:
      'Ansh Arora walking toward the camera in a dark studio. Decorative background footage, no audio.',
  },
} as const;

export const navItems: NavItem[] = [
  { label: 'Approach', href: '#approach' },
  { label: 'Moves', href: '#moves' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

/* ------------------------------------------------------------------ */
/* 6.3 — Approach: How I Play                                          */
/* ------------------------------------------------------------------ */

export const approach = {
  eyebrow: 'APPROACH',
  heading: 'HOW I PLAY',
  standfirst:
    'Three moves, in order. Skip the first and the third one costs more than it should.',
  steps: [
    {
      id: 'see',
      index: '01',
      title: 'See the Whole Board',
      statement: 'Read the market before reading the plan.',
      body: 'Market, customer, competition and operating reality — mapped together, because a constraint in operations quietly caps what marketing can promise. Field studies, filings and funnel data over assumption.',
      squares: ['c3', 'd3', 'e3', 'f3', 'c4', 'd4', 'e4', 'f4', 'c5', 'd5', 'e5', 'f5'],
      path: [],
    },
    {
      id: 'leverage',
      index: '02',
      title: 'Find the Leverage',
      statement: 'One move usually carries most of the outcome.',
      body: 'Every board has a square that changes the rest of it — a channel, a price point, a listing, a single account. The work is finding which one, and being willing to leave the others alone.',
      squares: ['d4', 'e5'],
      path: ['d4', 'e5'],
    },
    {
      id: 'carry',
      index: '03',
      title: 'Carry It Through',
      statement: 'Strategy that nobody owns is a slide.',
      body: 'Ownership, people, sequence, timelines and a number that proves it moved. Most of the value shows up in the unglamorous half — SOPs, forecasts, listings, follow-ups.',
      squares: ['e5', 'e6', 'e7', 'd7', 'f7', 'c6', 'g6'],
      path: ['e5', 'e7', 'c6'],
    },
  ] satisfies ApproachStep[],
};

/* ------------------------------------------------------------------ */
/* 6.4 — Marketing Strategy: Moving the Market                         */
/* ------------------------------------------------------------------ */

export const marketing = {
  eyebrow: 'MARKETING STRATEGY',
  heading: ['MARKETING ISN’T MAKING NOISE.', 'IT’S INFLUENCING HOW THE BOARD MOVES.'],
  standfirst:
    'Four questions, asked in sequence, on the same board. Each answer changes where the next piece can go.',
  lenses: [
    {
      id: 'market',
      label: 'Market',
      question: 'Where should we play?',
      statement:
        'Pick the board before picking the move. Segment it, size it, and be honest about who already owns which squares.',
      facets: [
        'Market understanding',
        'Segmentation',
        'Competition',
        'Opportunity assessment',
        'Channel selection',
      ],
      evidence:
        'Quick-commerce dark stores chosen as the route to seven states; India coffee market mapped from company filings rather than aggregators.',
      squares: ['b2', 'c2', 'd2', 'e2', 'f2', 'g2'],
      path: [],
    },
    {
      id: 'customer',
      label: 'Customer',
      question: 'Who are we trying to move?',
      statement:
        'A segment is not a person. Behaviour, motivation and the friction in the middle of the journey decide whether a campaign lands.',
      facets: [
        'Behaviour',
        'Needs and motivations',
        'Journey friction',
        'Decision triggers',
      ],
      evidence:
        'Twelve primary field studies mapping customer segments across underserved housing-finance markets; onboarding simplified, improving it by 17%.',
      squares: ['c4', 'd4', 'e4', 'f4'],
      path: ['d2', 'd4'],
    },
    {
      id: 'positioning',
      label: 'Positioning',
      question: 'Why should they choose us?',
      statement:
        'Differentiation is a claim you can defend on price, proof and perception — not an adjective.',
      facets: [
        'Differentiation',
        'Value proposition',
        'Brand positioning',
        'Pricing and perception',
      ],
      evidence:
        'Pricing and paid-channel mix rebuilt alongside the national footprint; marketplace listings optimised to lift conversion on Meesho and Blinkit.',
      squares: ['d5', 'e5'],
      path: ['d4', 'e5'],
    },
    {
      id: 'execution',
      label: 'Execution',
      question: 'How do we convert intent into outcomes?',
      statement:
        'Distribution, listings, funnel and measurement — the half of marketing that decides whether the strategy was ever real.',
      facets: [
        'Campaign execution',
        'Distribution',
        'Marketplace listings',
        'Funnel optimisation',
        'Measurement',
      ],
      evidence:
        '350+ dark stores across 7 states launched, with 52% revenue growth over the same period.',
      squares: ['e6', 'e7', 'd7', 'f7', 'c7', 'g7'],
      path: ['e5', 'e7'],
    },
  ] satisfies MarketingLens[],
};

/* ------------------------------------------------------------------ */
/* 6.5 — Featured work: Moves That Mattered                            */
/* ------------------------------------------------------------------ */

export const caseStudies: CaseStudy[] = [
  {
    id: 'dark-stores',
    moveNumber: 'MOVE 01',
    moveName: 'Expand the Board',
    title: 'National Dark-Store Scale-Up',
    context: 'Indo Divine Spiritual Solutions Pvt. Ltd. — corporate gifts and spiritual products',
    role: 'Marketing Executive — growth ownership',
    period: "Sept '25 – Jun '26",
    board: { origin: 'd4', gained: ['b2', 'c6', 'f2', 'g5', 'b6', 'f7', 'g3'], path: ['d4', 'f5', 'g3'] },
    chapters: [
      {
        key: 'position',
        label: 'The Position',
        body: 'A brand selling in one city, with demand concentrated where it was already known. Distribution was the constraint, not product.',
      },
      {
        key: 'opportunity',
        label: 'The Opportunity',
        body: 'Quick-commerce dark stores make national reach available without owning retail shelves — the same catalogue can appear in seven states if the listings, pricing and supply behind it hold up.',
      },
      {
        key: 'insight',
        label: 'The Insight',
        body: 'Footprint on its own is a vanity number. A new store only pays back when pricing, listing quality and paid support arrive with it, so the unit of work is a coordinated launch, not a store count.',
      },
      {
        key: 'move',
        label: 'The Move',
        body: 'Treat every new city as one move with four pieces on it: distribution, pricing, funnel and paid channels — sequenced together rather than handed to separate owners.',
      },
      {
        key: 'execution',
        label: 'The Execution',
        body: 'Owned launch execution across the scale-up from a single city to 350+ dark stores in 7 states, running funnel improvement, pricing and paid-channel optimisation alongside the rollout.',
      },
      {
        key: 'outcome',
        label: 'The Outcome',
        body: '350+ dark stores across 7 states, and 52% revenue growth over the same period.',
      },
      {
        key: 'learning',
        label: 'The Learning',
        body: 'Reach is the first half of the move. The revenue came from what was tuned behind each store — which is where the next expansion starts, not ends.',
      },
    ],
    metrics: [
      { label: 'FOOTPRINT', value: '350+ dark stores' },
      { label: 'REACH', value: '7 states' },
      { label: 'REVENUE', value: '+52%' },
    ],
    levers: [
      'Launch execution',
      'Distribution strategy',
      'Pricing',
      'Paid channels',
      'Funnel analysis',
    ],
    link: {
      href: 'https://www.linkedin.com/in/ansh-arora-44b51a257',
      label: 'Context on LinkedIn',
      external: true,
    },
    proves: ['gtm', 'distribution', 'pricing', 'funnel', 'launch', 'ownership'],
    published: true,
    reviewNote:
      'Metrics verified from résumé. Position/Insight/Learning are interpretive framing of those facts — confirm phrasing before sharing widely.',
  },
  {
    id: 'enterprise-gifting',
    moveNumber: 'MOVE 02',
    moveName: 'Create a New Opening',
    title: 'Enterprise Gifting Accounts',
    context: 'Indo Divine Spiritual Solutions Pvt. Ltd. — corporate gifting line',
    role: 'Marketing Executive — enterprise sales and key accounts',
    period: "Sept '25 – Jun '26",
    board: { origin: 'c2', gained: ['e4', 'g6'], path: ['c2', 'e4', 'g6'] },
    chapters: [
      {
        key: 'position',
        label: 'The Position',
        body: 'A consumer-facing gifting catalogue with an underdeveloped commercial route beside it: large companies buy the same products, in volume, on a corporate calendar.',
      },
      {
        key: 'opportunity',
        label: 'The Opportunity',
        body: 'One enterprise account can be worth a season of retail orders, and enterprise gifting repeats — festival by festival, year on year.',
      },
      {
        key: 'insight',
        label: 'The Insight',
        body: 'Enterprise buyers are not choosing a product, they are choosing certainty — that volume, timing and presentation will hold. The pitch has to be an operating promise, not a catalogue.',
      },
      {
        key: 'move',
        label: 'The Move',
        body: 'Open the channel with a marquee name first, so the second conversation starts from proof rather than from introduction.',
      },
      {
        key: 'execution',
        label: 'The Execution',
        body: 'Spearheaded the Adani Group gifting acquisition within the first month in role, then developed the partnership that won the marquee Holi gifting business with Shree Cement.',
      },
      {
        key: 'outcome',
        label: 'The Outcome',
        body: '₹30L in revenue secured through the Adani Group acquisition, and the Holi gifting business won with Shree Cement during the same tenure.',
      },
      {
        key: 'learning',
        label: 'The Learning',
        body: 'The opening move in a new channel is worth more than its own revenue — it is the reference that makes every following account cheaper to win.',
      },
    ],
    metrics: [
      { label: 'REVENUE', value: '₹30L secured' },
      { label: 'ACCOUNTS', value: 'Adani Group · Shree Cement' },
      { label: 'TIME TO OPEN', value: 'Within month 1' },
    ],
    levers: [
      'Enterprise sales',
      'Partnership development',
      'Key account management',
      'Stakeholder management',
      'Commercial negotiation',
    ],
    link: {
      href: 'https://www.linkedin.com/in/ansh-arora-44b51a257',
      label: 'Context on LinkedIn',
      external: true,
    },
    proves: ['enterprise', 'partnerships', 'stakeholders', 'ownership'],
    published: true,
    reviewNote:
      '₹30L and both account names verified from résumé. Insight/Learning are framing.',
  },
  {
    id: 'marketplace-ops',
    moveNumber: 'MOVE 03',
    moveName: 'Strengthen the Position',
    title: 'Marketplace Operations and Automation',
    context: 'Indo Divine Spiritual Solutions Pvt. Ltd. — Meesho and Blinkit',
    role: 'Marketing Executive — e-commerce and operations',
    period: "Sept '25 – Jun '26",
    board: { origin: 'c3', gained: ['d4', 'e4', 'e5'], path: ['c3', 'e4'] },
    chapters: [
      {
        key: 'position',
        label: 'The Position',
        body: 'Listings, packaging design and demand planning sat as separate manual jobs. Each one worked; together they set the speed limit on every launch.',
      },
      {
        key: 'opportunity',
        label: 'The Opportunity',
        body: 'On a marketplace, the listing is the storefront and the shelf. Improving it lifts conversion on traffic that has already been paid for — the cheapest growth available.',
      },
      {
        key: 'insight',
        label: 'The Insight',
        body: 'The bottleneck was turnaround, not effort. Work that repeats every cycle — forecasting, planning, packaging design — should be a system, so attention can go to the decisions that do not repeat.',
      },
      {
        key: 'move',
        label: 'The Move',
        body: 'Optimise the listings for conversion, then automate the planning workflow behind them so the operation could take the volume the listings brought in.',
      },
      {
        key: 'execution',
        label: 'The Execution',
        body: 'Led marketplace launch execution on Meesho and Blinkit, lifting conversion through listing optimisation, and automated forecasting and planning workflows.',
      },
      {
        key: 'outcome',
        label: 'The Outcome',
        body: 'Box-design turnaround time cut by 86%, with conversion lifted through listing optimisation across both marketplaces.',
      },
      {
        key: 'learning',
        label: 'The Learning',
        body: 'Coordination beats effort. The pieces were already there — the gain came from making them move as one system instead of four queues.',
      },
    ],
    metrics: [
      { label: 'CHANNELS', value: 'Meesho · Blinkit' },
      { label: 'TURNAROUND', value: '−86% design time' },
      { label: 'LEVER', value: 'Listings + forecasting' },
    ],
    levers: [
      'Marketplace operations',
      'Listing optimisation',
      'Demand forecasting',
      'Process and SOP design',
      'Workflow automation',
    ],
    link: {
      href: `${base}assets/projects/coffee-stock-alert.blueprint.json`,
      label: 'Related automation blueprint',
      external: false,
    },
    proves: ['marketplace', 'process', 'forecasting', 'automation', 'funnel'],
    published: true,
    reviewNote:
      '86% turnaround reduction and both marketplaces verified from résumé. Conversion lift is stated without a figure, as the source gives none. The linked blueprint is a separate automation project, labelled as related.',
  },
  {
    id: 'coffee-market-map',
    moveNumber: 'MOVE 04',
    moveName: 'Think Ahead',
    title: 'India Coffee and Café Market Map',
    context: "Masters' Union — PGP in Technology & Business Management, Team 6",
    role: 'Market sizing, competitive analysis and investment thesis',
    period: 'Pursuing',
    board: { origin: 'e4', gained: ['b7', 'c7', 'd7'], path: ['e4', 'd6', 'c7'] },
    chapters: [
      {
        key: 'position',
        label: 'The Position',
        body: "India's café expansion is the visible story — new outlets, new brands, coverage that looks like the whole market.",
      },
      {
        key: 'opportunity',
        label: 'The Opportunity',
        body: 'Beside it sits the less-visible at-home cup: bought more often, priced lower, and far less crowded than the storefront race.',
      },
      {
        key: 'insight',
        label: 'The Insight',
        body: 'Read from company filings rather than aggregators, the café boom looks less like the profit pool and more like a marketing channel for the category — and the durable margin sits in the home cup.',
      },
      {
        key: 'move',
        label: 'The Move',
        body: 'Build the case on primary financials: line up Tata Starbucks against CCL and Continental, then let the unit economics decide the recommended position rather than the narrative.',
      },
      {
        key: 'execution',
        label: 'The Execution',
        body: 'A ten-slide investor-style market map: sizing, competitive benchmarking, unit economics and a backable closing position.',
      },
      {
        key: 'outcome',
        label: 'The Outcome',
        body: 'A ₹8,200 Cr market sized on FY26 filings, with an investment position argued from evidence rather than from the visible trend.',
      },
      {
        key: 'learning',
        label: 'The Learning',
        body: 'The most expensive assumption is usually the popular one. Checking it against filings changed which move the evidence supported.',
      },
    ],
    metrics: [
      { label: 'SCOPE', value: '₹8,200 Cr market' },
      { label: 'EVIDENCE', value: 'FY26 company filings' },
      { label: 'FORMAT', value: '10-slide market map' },
    ],
    levers: [
      'Market sizing',
      'Competitive benchmarking',
      'Unit economics',
      'Financial analysis',
      'Investment thesis',
    ],
    link: {
      href: `${base}assets/projects/coffee-market-map.pdf`,
      label: 'View the deck (PDF)',
      external: false,
    },
    proves: ['sizing', 'competitive', 'unitecon', 'research'],
    published: true,
    reviewNote:
      '₹8,200 Cr, FY26 filings, ten slides and Team 6 carried over from the existing portfolio — confirm before public use. Team project: contribution is described, sole ownership is not implied.',
  },
];

export const archive: ArchiveItem[] = [
  {
    id: 'empowerlille',
    title: 'EmpowerLille',
    context: 'IESEG School of Management — capstone, co-researcher and strategy lead',
    period: '2024 – 2025',
    summary:
      'A B2B2C social enterprise linking waste management with homeless reintegration. Built a dual-revenue model validating unit economics across B2B partnerships and B2C sales, on hypothesis-driven primary research reaching 80% concept validation. Graded A.',
    proves: ['unitecon', 'research', 'sizing'],
    published: true,
  },
  {
    id: 'jk-cements',
    title: 'Construction Chemicals — Regional GTM Support',
    context: 'JK Cements Ltd. — Sales & Marketing Intern, Gurgaon',
    period: "Apr '25 – Aug '25",
    summary:
      'Ran competitive analysis and industry research on construction chemicals to identify demand trends, delivered strategic recommendations to the Zonal Head, and coordinated with 16 Area Sales Managers on regional GTM execution across 5 zones.',
    proves: ['competitive', 'gtm', 'stakeholders'],
    published: true,
  },
  {
    id: 'svatantra',
    title: 'Underserved-Market Segmentation',
    context: 'Svatantra Micro Housing Finance Corporation — Marketing Intern, Jaipur',
    period: "May '24 – Jul '24",
    summary:
      'Mapped customer segments across 12 primary field studies, benchmarked insights against competitors to shape acquisition and outreach, improved customer onboarding by 17%, and supported ₹50L+ in loan disbursement within two months.',
    proves: ['research', 'funnel', 'sizing'],
    published: true,
  },
  {
    id: 'aiesec',
    title: 'Youth Exchange Growth',
    context: 'AIESEC in Bengaluru — Marketing Team Member',
    period: "Aug '23 – Feb '24",
    summary:
      'Grew programme enrolments 12% by owning social and digital content execution, streamlined campaign delivery across the team, and aligned international stakeholders across AIESEC chapters.',
    proves: ['campaigns', 'stakeholders'],
    published: true,
  },
  {
    id: 'stock-alert',
    title: 'Orders-to-Stock-Alert Automation',
    context: 'No-code inventory system — Make.com and Airtable',
    period: 'Pursuing',
    summary:
      'Every order read from Airtable is exploded through its recipe, ingredient stock is decremented, and anything hitting its reorder threshold triggers one alert email carrying a ready-to-send supplier request — with a failure handler so a broken run never passes silently.',
    link: {
      href: `${base}assets/projects/coffee-stock-alert.blueprint.json`,
      label: 'View the blueprint',
      external: false,
    },
    proves: ['automation', 'process'],
    published: true,
  },
  {
    id: 'meadows',
    title: 'Corporate Client Events',
    context: 'Meadows Creations — Management Intern (Remote)',
    period: "May '23 – Jul '23",
    summary:
      'Delivered corporate client events by owning timelines and vendor coordination, and supported promotional campaigns tied to event branding and activation.',
    proves: ['campaigns', 'ownership'],
    published: true,
  },
];

/* ------------------------------------------------------------------ */
/* 6.6 — Reflection: Moves Not Made                                    */
/* Held back from production: no verified reflection content exists.   */
/* Fill `entries` with Ansh's own words, then set published: true.     */
/* ------------------------------------------------------------------ */

export const reflection = {
  published: false,
  reviewNote:
    'PLACEHOLDER — needs Ansh to supply a real changed assumption or rejected approach in his own words. Nothing here may be invented, so the section stays out of the DOM until published is true.',
  eyebrow: 'REFLECTION',
  heading: 'GOOD STRATEGY IS ALSO KNOWING WHICH MOVES NOT TO MAKE.',
  entries: [] as { title: string; body: string }[],
};

/* ------------------------------------------------------------------ */
/* 6.7 — Capabilities: Across the Board                                */
/* Every capability points at the work that proves it.                 */
/* ------------------------------------------------------------------ */

export const territories: Territory[] = [
  {
    id: 'strategy',
    name: 'Strategy',
    statement: 'Size the board, benchmark the field, choose the position worth defending.',
    squares: ['a7', 'b7', 'c7', 'a8', 'b8', 'c8'],
    label: { coord: 'b8', text: 'STR' },
  },
  {
    id: 'marketing',
    name: 'Marketing',
    statement: 'Move demand: segment, position, price and campaign.',
    squares: ['f7', 'g7', 'h7', 'f8', 'g8', 'h8'],
    label: { coord: 'g8', text: 'MKT' },
  },
  {
    id: 'growth',
    name: 'Growth',
    statement: 'Distribution, funnel and channel mix that compound.',
    squares: ['a1', 'b1', 'c1', 'a2', 'b2', 'c2'],
    label: { coord: 'b1', text: 'GRW' },
  },
  {
    id: 'execution',
    name: 'Execution',
    statement: 'Ownership, process and measurement that make it real.',
    squares: ['f1', 'g1', 'h1', 'f2', 'g2', 'h2'],
    label: { coord: 'g1', text: 'EXE' },
  },
];

export const capabilities: Capability[] = [
  { id: 'sizing', territory: 'strategy', name: 'Market sizing & opportunity assessment', evidence: ['coffee-market-map', 'empowerlille', 'svatantra'] },
  { id: 'competitive', territory: 'strategy', name: 'Competitive analysis & benchmarking', evidence: ['coffee-market-map', 'jk-cements'] },
  { id: 'unitecon', territory: 'strategy', name: 'Unit economics', evidence: ['coffee-market-map', 'empowerlille'] },
  { id: 'research', territory: 'strategy', name: 'Primary research & hypothesis testing', evidence: ['empowerlille', 'svatantra', 'coffee-market-map'] },

  { id: 'gtm', territory: 'marketing', name: 'Go-to-market strategy', evidence: ['dark-stores', 'jk-cements'] },
  { id: 'pricing', territory: 'marketing', name: 'Pricing & perception', evidence: ['dark-stores'] },
  { id: 'campaigns', territory: 'marketing', name: 'Campaign & content execution', evidence: ['aiesec', 'meadows'] },
  { id: 'marketplace', territory: 'marketing', name: 'Marketplace listings & conversion', evidence: ['marketplace-ops'] },

  { id: 'distribution', territory: 'growth', name: 'Distribution & channel expansion', evidence: ['dark-stores'] },
  { id: 'funnel', territory: 'growth', name: 'Funnel analysis & optimisation', evidence: ['dark-stores', 'marketplace-ops', 'svatantra'] },
  { id: 'enterprise', territory: 'growth', name: 'Enterprise sales & key accounts', evidence: ['enterprise-gifting'] },
  { id: 'partnerships', territory: 'growth', name: 'Partnership development', evidence: ['enterprise-gifting'] },

  { id: 'launch', territory: 'execution', name: 'Launch execution', evidence: ['dark-stores', 'marketplace-ops'] },
  { id: 'process', territory: 'execution', name: 'Process & SOP design', evidence: ['marketplace-ops', 'stock-alert'] },
  { id: 'forecasting', territory: 'execution', name: 'Forecasting & planning', evidence: ['marketplace-ops'] },
  { id: 'automation', territory: 'execution', name: 'Workflow automation', evidence: ['marketplace-ops', 'stock-alert'] },
  { id: 'stakeholders', territory: 'execution', name: 'Stakeholder management', evidence: ['enterprise-gifting', 'jk-cements', 'aiesec'] },
  { id: 'ownership', territory: 'execution', name: 'Cross-functional ownership', evidence: ['dark-stores', 'enterprise-gifting', 'meadows'] },
];

/** Tools, kept separate from capabilities because a tool is not a claim. */
export const toolkit = [
  'Advanced Excel',
  'Google Sheets',
  'Tableau',
  'Power BI',
  'SPSS',
  'Make.com',
  'Airtable',
];

/* ------------------------------------------------------------------ */
/* 6.8 — Behind the Moves                                              */
/* ------------------------------------------------------------------ */

export const behind = {
  eyebrow: 'BEHIND THE MOVES',
  heading: 'THE PERSON BEHIND THE DECISIONS.',
  body: [
    'Competitive about outcomes. Curious about people. Most comfortable when a problem sits somewhere between strategy and execution.',
    'Five competition podiums taught the useful half of that: you get one read of the situation, a clock, and no second attempt at the opening.',
  ],
  /** Short factual asides shown beside the photograph. */
  facts: [
    { label: 'BASED', value: 'New Delhi, India' },
    { label: 'STUDYING', value: "Masters' Union — PGP in Technology & Business Management" },
    { label: 'BACKGROUND', value: 'E-commerce, growth and operations' },
  ],
};

/* ------------------------------------------------------------------ */
/* 6.9 — Journey: Moves So Far                                         */
/* ------------------------------------------------------------------ */

export const journey: JourneyStop[] = [
  {
    id: 'bengaluru',
    coord: 'b2',
    place: 'Bengaluru',
    frame: 'Foundations',
    period: '2022 – 2024',
    role: 'BBA (Honours) · AIESEC Marketing Team Member',
    organisation: 'Christ University',
    detail:
      'GPA 3.36/4, top 20% of the cohort. Member of the Christ National Level Festing Team, and selected from 400+ students across 4 campuses for the credit transfer programme to IESEG, France.',
  },
  {
    id: 'lille',
    coord: 'd4',
    place: 'Lille',
    frame: 'Broader perspective',
    period: '2024 – 2025',
    role: 'BBA — international degree · EmpowerLille capstone',
    organisation: 'IESEG School of Management, France',
    detail:
      "Grade 'A' with a EUR 1,241 merit scholarship. Led the EmpowerLille capstone: a B2B2C social enterprise model validated through primary research.",
  },
  {
    id: 'gurugram',
    coord: 'f5',
    place: 'Gurugram',
    frame: 'Market exposure',
    period: "Apr '25 – Aug '25",
    role: 'Sales & Marketing Intern',
    organisation: 'JK Cements Ltd.',
    detail:
      'Competitive analysis on construction chemicals, strategic recommendations to the Zonal Head, and GTM coordination with 16 Area Sales Managers across 5 zones.',
  },
  {
    id: 'jaipur',
    coord: 'e7',
    place: 'Jaipur',
    frame: 'Operating ownership',
    period: "Sept '25 – Jun '26",
    role: 'Marketing Executive',
    organisation: 'Indo Divine Spiritual Solutions Pvt. Ltd.',
    detail:
      'Scaled the brand to 350+ dark stores across 7 states with 52% revenue growth, opened enterprise gifting with ₹30L secured, and cut box-design turnaround by 86%.',
  },
  {
    id: 'masters-union',
    coord: 'g6',
    place: "Masters' Union",
    frame: 'Strategic acceleration',
    period: 'Pursuing',
    role: 'PGP in Technology & Business Management — Young Leaders Cohort',
    organisation: "Masters' Union, New Delhi",
    detail:
      'Selected for the Young Leaders Cohort. Market mapping, unit economics and automation work built on an operating track record.',
  },
  {
    id: 'next',
    coord: 'h8',
    place: 'Next',
    frame: 'Open position',
    period: 'Open',
    role: "Founder's office · strategy · marketing · growth",
    organisation: 'Undecided',
    detail: 'One square is deliberately unplayed.',
    open: true,
  },
];

/** Earlier schooling, shown as a single restrained line under the journey. */
export const earlier = {
  label: 'EARLIER',
  text: 'Neerja Modi School, Jaipur — Class XII CBSE, Commerce with Applied Mathematics, 83.6%; Class X CBSE, 91%. Prefect and Student Council (2019 – 2022).',
};

/* ------------------------------------------------------------------ */
/* 6.10 — Achievements: The Scoreboard                                 */
/* ------------------------------------------------------------------ */

export const achievements = {
  eyebrow: 'THE SCOREBOARD',
  heading: 'COMPETITION TAUGHT ME TO THINK UNDER PRESSURE.',
  standfirst:
    'Case competitions and business fests, judged on a clock. Five podium finishes across national and college level.',
  groups: [
    {
      id: 'first',
      heading: 'First-place finishes',
      count: '2',
      items: [
        { title: 'Marketing Premier League — Inter-college', detail: 'Head-to-head marketing challenges.' },
        { title: 'Colossus Business Fest — Intra-college', detail: 'Competed as PR & Marketing Manager.' },
      ],
    },
    {
      id: 'second',
      heading: 'Second-place finishes',
      count: '3',
      items: [
        { title: 'Sustainathon — National', detail: 'Sustainability-driven business solutions.' },
        { title: 'Enchainer Business Fest — National', detail: 'Problem-solving and business strategy.' },
        { title: 'Novice Business Fest — Intra-college', detail: 'Strategic marketing and execution.' },
      ],
    },
    {
      id: 'academic',
      heading: 'Academic recognition',
      count: '4',
      items: [
        { title: 'EUR 1,241 Merit Scholarship — IESEG, France', detail: "Awarded alongside Grade 'A' on the international degree." },
        { title: 'GPA 3.36/4 — Christ University', detail: 'Top 20% of the cohort.' },
        { title: 'Class XII CBSE — 83.6%', detail: 'Commerce with Applied Mathematics, Neerja Modi School.' },
        { title: 'Class X CBSE — 91%', detail: 'Neerja Modi School, Jaipur.' },
      ],
    },
    {
      id: 'selections',
      heading: 'Competitive selections',
      count: '3',
      items: [
        { title: 'IESEG Credit Transfer Programme', detail: 'Selected from 400+ students across 4 campuses.' },
        { title: "Young Leaders Cohort — Masters' Union", detail: 'PGP in Technology & Business Management.' },
        { title: 'Christ National Level Festing Team', detail: 'Represented the university in national competition.' },
      ],
    },
    {
      id: 'leadership',
      heading: 'Leadership positions',
      count: '5',
      items: [
        { title: 'SDG Cell — Sub-Head, Logistics', detail: 'Led logistics for sustainability events. Christ University.' },
        { title: 'CUSBMA — Organisational Committee, Logistics', detail: 'Large-scale university event coordination.' },
        { title: 'SWO — Stage Committee', detail: 'Stage operations across university events.' },
        { title: 'CAPS — Research Team Member', detail: 'Data insights and reporting.' },
        { title: 'Prefect & Student Council — Neerja Modi School', detail: 'School leadership, Class XII.' },
      ],
    },
  ] satisfies AwardGroup[],
};

/* ------------------------------------------------------------------ */
/* 6.11 — Closing: Your Move                                           */
/* ------------------------------------------------------------------ */

export const closing = {
  eyebrow: 'YOUR MOVE',
  heading: ['THE BOARD IS SET.', 'WHAT SHOULD WE MOVE NEXT?'],
  body: 'Open to founder’s office, strategy, marketing and business operations roles. One square is still open — tell me what sits on it.',
};

export const contact = {
  email: 'ansharora116@gmail.com',
  phone: '+91 98291 17034',
  linkedin: 'https://www.linkedin.com/in/ansh-arora-44b51a257',
  footerNote: 'ANSH ARORA — STRATEGIC PORTFOLIO',
};

/** Public helper: only ever render published content. */
export const publishedCaseStudies = caseStudies.filter((c) => c.published);
export const publishedArchive = archive.filter((a) => a.published);
