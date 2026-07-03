// schema.org structured data (JSON-LD) for AI/search discoverability.
// Rendered via the <JsonLd> component in the layout (global) and on /launch.
import { personalData } from "@/utils/data/personal-data";

export const siteUrl = (
  process.env.NEXT_PUBLIC_APP_URL || "https://www.grndlvl.com"
).replace(/\/$/, "");

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const launchServiceId = `${siteUrl}/launch#service`;

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: personalData.name,
  alternateName: "grndlvl",
  url: siteUrl,
  image: `${siteUrl}${personalData.profile}`,
  jobTitle: "Applied AI Architect, CTO & Software Engineer",
  description:
    "Applied AI architect, CTO, and software engineer with 18+ years of experience. Designs agentic AI systems, integrates AI into business workflows, and ships production software.",
  email: `mailto:${personalData.email}`,
  telephone: personalData.phone,
  worksFor: {
    "@type": "Organization",
    name: "Zivtech",
    url: "https://www.zivtech.com",
  },
  knowsAbout: [
    "Applied Artificial Intelligence",
    "Agentic AI systems",
    "Multi-agent orchestration",
    "AI workflow automation",
    "Software architecture",
    "Full-stack development",
    "Next.js",
    "React",
    "Drupal",
    "DevOps and infrastructure",
    "Web accessibility (WCAG 2.2)",
    "Technical leadership",
  ],
  sameAs: [
    personalData.github,
    personalData.linkedIn,
    personalData.twitter,
    personalData.facebook,
    personalData.youtube,
    personalData.twitch,
    personalData.instagram,
    personalData.kick,
    personalData.bluesky,
    personalData.drupal,
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: "grndlvl — Jonathan DeLaigle",
  description:
    "Jonathan DeLaigle designs agentic AI systems, integrates AI into business workflows, and builds production software. Also home to grndlvl Launch, fast and accessible small-business launch pages.",
  publisher: { "@id": personId },
  inLanguage: "en-US",
};

// Global graph rendered on every page via the layout.
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema],
};

// grndlvl Launch service, rendered on /launch.
export const launchServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": launchServiceId,
  name: "grndlvl Launch",
  serviceType: "Small-business website design and development",
  url: `${siteUrl}/launch`,
  description:
    "Fast, credible, mobile-first launch pages for small businesses, clubs, and local organizations—built with enterprise-grade engineering discipline, accessible by default, and ready to grow into booking, payments, and automation.",
  provider: { "@id": personId },
  areaServed: [
    { "@type": "City", name: "Augusta, Georgia" },
    {
      "@type": "AdministrativeArea",
      name: "Central Savannah River Area (CSRA)",
    },
    { "@type": "Place", name: "Remote / worldwide" },
  ],
  audience: {
    "@type": "BusinessAudience",
    name: "Local businesses, clubs, coaches, and community organizations",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "grndlvl Launch — ways to work together",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pilot Launch Build",
          description:
            "A focused one-page launch site for a small business, club, or local organization—clean, credible, and mobile-first.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Add-Ons & Expansions",
          description:
            "Post-launch growth: new sections, events, reviews, registration, booking, payments, newsletters, forms, automations, and custom integrations.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ongoing Support",
          description:
            "Optional monthly support to keep the site current after launch.",
        },
      },
    ],
  },
};
