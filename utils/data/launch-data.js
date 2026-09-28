// Content model for the grndlvl Launch service page (/launch) and the
// homepage teaser. Use em dashes in prose; numeric ranges use en dashes
// (e.g. $1,500–$2,500) by convention.

// Who it is for—iconKey resolves to a react-icons component in the
// component layer (icons can't live in a plain data module cleanly).
export const launchAudience = [
  { label: "Local businesses & trades", iconKey: "tools" },
  { label: "Gyms, clubs, teams & coaches", iconKey: "barbell" },
  { label: "Community organizations", iconKey: "community" },
  { label: "Service providers", iconKey: "briefcase" },
  { label: "Niche product businesses", iconKey: "store" },
  { label: "Side businesses going pro", iconKey: "trending" },
];

// The "not generic web design" contrast—rendered as two side-by-side cards.
export const launchContrast = {
  usual: {
    label: "The usual small-business site",
    items: [
      "Trapped inside a website builder",
      "Slow and overloaded with plugins",
      "Often inaccessible to real users",
      "Invisible to AI search and assistants",
      "Treated like disposable brochureware",
      "A dead end when you need to grow",
    ],
  },
  grndlvl: {
    label: "A grndlvl Launch",
    items: [
      "Built by an engineer, not a template",
      "Fast, lightweight, and mobile-first",
      "Accessible and WCAG-aware by default",
      "Found by people and AI assistants",
      "Clear structure and real performance",
      "Designed to grow into more than a website",
    ],
  },
};

// What you get—the deliverables grouped into scannable buckets.
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
    title: "Found by people & AI",
    items: [
      "Local SEO structure",
      "Structured data (schema.org)",
      "AI-readable content so assistants describe you right",
      "Analytics & Google Search Console setup",
    ],
  },
  {
    iconKey: "convert",
    title: "Built to convert & capture",
    items: [
      "Clear positioning & service sections",
      "Strong calls to action",
      "Contact forms & mailing-list signup",
      "Lead capture & data collection",
    ],
  },
  {
    iconKey: "grow",
    title: "More than a website",
    items: [
      "AI-assisted research & content",
      "Booking, payments & reviews",
      "Newsletters, CRM & lead routing",
      "Custom integrations & automation",
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
      "Contact form & analytics setup",
      "Local SEO + AI-ready structure",
      "Social and location links",
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
    estValue: "$5,000+",
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
    name: "Faglier's Mixed Martial Arts",
    label: "Local business · Launch build",
    businessType: "Family-run mixed martial arts gym",
    location: "Augusta, Georgia · CSRA",
    logo: "/logos/fagliers.jpg",
    logoWidth: 958,
    logoHeight: 960,
    desktopShot: "/image/launch/fagliers-desktop.jpeg",
    mobileShot: "/image/launch/fagliers-mobile.jpeg",
    siteLabel: "fagliersmma.com",
    problem:
      "A respected family-run gym with decades of history but no active official website. Programs, schedules, pricing, coaches, and events were spread across social channels and older listings.",
    built:
      "A fast, accessible, mobile-first site that brings the gym's programs, schedule, pricing, coaching lineage, events, photos, and 3-class trial offer into one clear experience.",
    matters:
      "Prospective students can understand what the gym teaches, who it serves, and how to start, while the family has a credible home for current information and fight-community updates.",
    tags: [
      "Programs & pricing",
      "Class schedule",
      "Events",
      "Local SEO",
      "Trial-class CTA",
    ],
    aiWork: [
      "Research synthesis—reconciling public sources and gym-provided details into one accurate business profile.",
      "Content architecture—organizing a deep martial-arts offering into clear paths for kids, adults, beginners, and fighters.",
      "Event publishing—turning fight announcements and community updates into structured, discoverable site content.",
      "AI-ready metadata—structured data and a dedicated AI-readable summary so assistants can describe the gym accurately.",
    ],
    href: "https://fagliersmma.com/",
    linkLabel: "Visit the live site",
  },
  {
    name: "Flutterby Studio",
    label: "Local business · Launch build",
    businessType: "Portrait and family photographer",
    location: "Grovetown, Georgia · CSRA",
    logo: "/logos/flutterby-studio.webp",
    logoWidth: 400,
    logoHeight: 400,
    desktopShot: "/image/launch/flutterby-studio-desktop.jpeg",
    mobileShot: "/image/launch/flutterby-studio-mobile.jpeg",
    siteLabel: "flutterbystudioga.com",
    problem:
      "A photographer with seven years of experience needed an owned home that could carry the warmth of her work beyond social media while making session choices, pricing, policies, and next steps easy to understand.",
    built:
      "An art-led, mobile-first photography site and custom logo system, with Amber's story, an immersive portfolio, testimonials, session packages, FAQs, social paths, and a direct inquiry form.",
    matters:
      "Prospective clients can recognize Amber's style, understand what a session costs and feels like, and move from inspiration to a conversation without piecing details together across social channels.",
    tags: [
      "Photography portfolio",
      "Sessions & pricing",
      "Testimonials",
      "FAQs",
      "Inquiry form",
      "Logo development",
    ],
    aiWork: [
      "Research synthesis—turning Amber's story, services, policies, and social proof into a clear client journey.",
      "Content architecture—pairing a visual portfolio with pricing, process, FAQs, and a focused inquiry path.",
      "Brand voice development—shaping warm, confidence-building copy around Amber's perspective and client experience.",
      "Logo development—creating a botanical wordmark and butterfly-flower mark that carry the studio's visual identity across the site.",
      "AI-ready metadata—LocalBusiness, service, and FAQ structured data so search engines and assistants can understand the studio.",
    ],
    href: "https://flutterbystudioga.com/",
    linkLabel: "Visit the live site",
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
