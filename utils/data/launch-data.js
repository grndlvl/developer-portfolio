// Content model for the grndlvl Launch service page (/launch) and the
// homepage teaser. Keep prose here using "--" instead of em dashes; numeric
// ranges use en dashes (e.g. $1,500–$2,500) by convention.

// Who it is for -- iconKey resolves to a react-icons component in the
// component layer (icons can't live in a plain data module cleanly).
export const launchAudience = [
  { label: "Local businesses & trades", iconKey: "tools" },
  { label: "Gyms, clubs, teams & coaches", iconKey: "barbell" },
  { label: "Community organizations", iconKey: "community" },
  { label: "Service providers", iconKey: "briefcase" },
  { label: "Niche product businesses", iconKey: "store" },
  { label: "Side businesses going pro", iconKey: "trending" },
];

// The "not generic web design" contrast -- rendered as two side-by-side cards.
export const launchContrast = {
  usual: {
    label: "The usual small-business site",
    items: [
      "Trapped inside a website builder",
      "Slow and overloaded with plugins",
      "Often inaccessible to real users",
      "Treated like disposable brochureware",
      "A dead end when you need to grow",
    ],
  },
  grndlvl: {
    label: "A grndlvl Launch page",
    items: [
      "Built by an engineer, not a template",
      "Fast, lightweight, and mobile-first",
      "Accessible and WCAG-aware by default",
      "Clear structure and real performance",
      "Designed to be extended later",
    ],
  },
};

// What you get -- the deliverables grouped into scannable buckets.
export const launchDeliverableGroups = [
  {
    iconKey: "foundation",
    title: "A solid foundation",
    items: [
      "One-page responsive website",
      "Mobile-first layout",
      "Accessible, WCAG-aware build",
      "Fast, lightweight deployment",
    ],
  },
  {
    iconKey: "found",
    title: "Findable & measurable",
    items: [
      "Basic local SEO structure",
      "Analytics-ready setup",
      "Map, location, and social links",
    ],
  },
  {
    iconKey: "convert",
    title: "Built to convert",
    items: [
      "Clear business positioning",
      "Strong calls to action",
      "Service, program, or event sections",
      "Contact links or a contact form",
    ],
  },
  {
    iconKey: "grow",
    title: "Room to grow",
    items: [
      "Booking, payments, and reviews",
      "Newsletters and event feeds",
      "CRM handoff and automation",
    ],
  },
];

// Pilot pricing model: flexible early-project pricing while the grndlvl Launch
// offer is being refined. No rigid public tiers yet. Expansions and ongoing
// changes are always scoped/paid separately.
export const launchPilotIntro = {
  eyebrow: "Pilot Launch Builds",
  heading: "Launch first. Improve over time.",
  lead: "I'm currently taking on a limited number of small-business launch projects at flexible pilot pricing while I refine the grndlvl Launch offer. The goal is to help real local businesses get a clean, credible web presence quickly—then grow the site over time as the business needs more.",
  body: "Many new businesses do not need a massive website project on day one. They need a professional place to send people, a clear explanation of what they offer, and a simple way for customers to take the next step. grndlvl Launch starts there: a focused launch page that can grow into something more useful over time.",
};

export const launchOffers = [
  {
    name: "Pilot Launch Build",
    pricing: "Flexible / pay-what-you-can",
    pricingNote: "for a limited number of early projects",
    badge: "Limited availability",
    featured: true,
    description:
      "A focused one-page launch site for a small business, club, service, or local organization that needs to get online with something clean, credible, and mobile-friendly.",
    includesLabel: "Includes",
    includes: [
      "One-page responsive website",
      "Clear business positioning",
      "Mobile-first layout",
      "Contact call to action",
      "Social and location links",
      "Basic local SEO structure",
      "Lightweight deployment",
      "Room to expand later",
    ],
    boundary:
      "This is meant to get the first version live. Larger content needs, advanced integrations, frequent revisions, or ongoing updates are scoped separately.",
  },
  {
    name: "Add-Ons & Expansions",
    pricing: "Quoted as needed",
    description: "After launch, the site can grow as the business grows.",
    includesLabel: "Possible expansion work",
    includes: [
      "New sections",
      "Events or schedule updates",
      "Reviews and testimonials",
      "FAQs",
      "Sponsor or member sections",
      "Registration, booking, or payment links",
      "Newsletter signup",
      "Better SEO and content structure",
      "Forms and lead routing",
      "Review capture workflows",
      "Analytics improvements",
      "Automations and custom integrations",
    ],
    boundary:
      "This is where grndlvl Launch connects back to the larger grndlvl technical practice. The first site is the foundation. Future improvements can turn it into a more useful business system.",
  },
  {
    name: "Ongoing Support",
    pricing: "$50–$200/month",
    pricingNote: "depending on update frequency and scope",
    description:
      "For businesses that want help keeping the site current after launch.",
    includesLabel: "Includes",
    includes: [
      "Small edits",
      "Seasonal updates",
      "Event updates",
      "Review and testimonial updates",
      "New photos or content",
      "Light SEO improvements",
      "Hosting and domain support",
      "Analytics checks",
      "Small improvements over time",
    ],
    boundary:
      "Support is optional. Some businesses only need the launch build. Others prefer a simple monthly plan so the site stays fresh without having to think about it.",
  },
];

export const launchProjects = [
  {
    name: "Backyard Bullies Wrestling Club",
    label: "Community project · Donated build",
    businessType: "Youth-to-adult wrestling club",
    location: "Augusta, Georgia · CSRA",
    logo: "/logos/backyard-bullies.jpg",
    logoWidth: 256,
    logoHeight: 256,
    desktopShot: "/image/launch/backyard-bullies-desktop.jpeg",
    mobileShot: "/image/launch/backyard-bullies-mobile.jpeg",
    siteLabel: "backyardbullies-wc.com",
    problem:
      "A growing club with no central home online. Programs, schedules, and ways to get involved were scattered across social posts and hard for families to find.",
    built:
      "A bold, mobile-first launch page with programs, schedules, events, coach bios, reviews, sponsor visibility, and clear registration calls to action.",
    matters:
      "Families now have one clear place to understand the club and join, and the organization has a credible base for attracting sponsors and members.",
    tags: ["Programs & schedules", "Events", "Reviews", "Sponsors", "Registration CTAs"],
    aiWork: [
      "Grant research—AI-assisted discovery of community and youth-sports funding the club can pursue.",
      "Reputation sweep—AI research across the web to catch and correct conflicting or outdated info about the club.",
      "Sponsorship development—shaping local sponsorship opportunities that help sustain programs.",
      "AI-ready metadata—structured data so search engines and AI assistants describe the club accurately.",
    ],
    href: "https://www.backyardbullies-wc.com/",
    linkLabel: "Visit the live site",
    footnote:
      "Completed as a community project with significant estimated professional value. Community and pilot builds are considered selectively, not on request.",
  },
  {
    name: "Hall's Balls & Exotics",
    label: "Pilot launch project",
    businessType: "Exotic pet & reptile emporium",
    location: "Martinez, Georgia · CSRA",
    logo: "/logos/halls-balls.png",
    logoWidth: 260,
    logoHeight: 266,
    desktopShot: "/image/launch/halls-balls-desktop.jpeg",
    mobileShot: "/image/launch/halls-balls-mobile.jpeg",
    siteLabel: "Hall's Balls & Exotics",
    problem:
      "A distinctive local business relying on social posts alone, with no credible, branded home online.",
    built:
      "A custom branded launch page built around a bold visual identity, clear business sections, and a focused one-page structure with direct calls to visit and get in touch.",
    matters:
      "A professional presence that matches the brand and gives customers a clear, direct way to find and reach the shop.",
    tags: ["Brand-led design", "The Menagerie", "Care guides", "Visit CTAs"],
    aiWork: [
      "AI-ready metadata—structured business data so search engines and AI assistants surface accurate info.",
      "Presence research—AI-assisted review of existing listings to keep details consistent everywhere.",
    ],
    href: null,
    linkLabel: null,
    footnote: null,
  },
];

export const launchProcess = [
  ["01", "Fit Check", "We make sure the project is a good match for a focused launch page."],
  ["02", "Content & Direction", "We define the business, audience, services, calls to action, and visual direction."],
  ["03", "Build", "I build the page on a clean, mobile-first technical foundation."],
  ["04", "Review & Refine", "We tighten copy, layout, calls to action, and details."],
  ["05", "Launch", "The page goes live with the right links, contact paths, and basic tracking readiness."],
  ["06", "Grow", "Optional support can add updates, events, reviews, automations, booking, payment flows, or deeper technical integrations."],
];
