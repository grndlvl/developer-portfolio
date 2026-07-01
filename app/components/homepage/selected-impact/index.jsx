// @flow strict

import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const projects = [
  {
    type: "Applied AI · Accessibility engineering",
    title: "AI-assisted accessibility assurance",
    logos: [{ src: "/logos/zivtech.png", alt: "Zivtech", width: 670, height: 159 }],
    description:
      "Designed a reusable Zivtech harness that combines deterministic automated testing with nondeterministic agent review. Applied on the NCLC platform, it covers both machine-testable failures and higher-context issues involving semantics, keyboard behavior, state communication, and user experience.",
    impact:
      "Moves accessibility earlier into delivery, expands coverage beyond conventional scanners, and keeps experienced human judgment in the approval loop.",
    featured: true,
  },
  {
    type: "AI adoption · Operating model",
    title: "Zivtech’s company-wide AI-first practice",
    logos: [{ src: "/logos/zivtech.png", alt: "Zivtech", width: 670, height: 159 }],
    description:
      "Driving a company-wide mandate to make AI a standard part of how Zivtech operates—not a side tool. That includes agent-enabled research, specification, engineering, code review, documentation, quality assurance, accessibility, and internal workflows, with clear human accountability.",
    impact:
      "Turning isolated experimentation into repeatable workflows, shared standards, and production integrations across the company.",
    href: "https://www.zivtech.com/blog/ai-driven-code-reviews-transforming-efficiency",
    linkLabel: "See one production AI workflow",
  },
  {
    type: "Platform engineering · Logistics",
    title: "GroScale",
    logos: [{ src: "/logos/groscale.png", alt: "GroScale", width: 500, height: 125 }],
    description:
      "Served as lead architect and developer for a high-throughput shipping platform integrating NetSuite, multiple carriers, label generation, tracking, and exception handling through APIs and webhooks.",
    impact: "Scaled from 10,000 to 500,000+ packages per month—a 50× increase—while handling peak loads without downtime.",
    href: "https://www.groscale.com/",
    linkLabel: "Visit GroScale",
  },
  {
    type: "Architecture · Publishing and commerce",
    title: "NCLC Digital Library",
    logos: [{ src: "/logos/nclc.svg", alt: "NCLC", width: 217, height: 104 }],
    description:
      "Led the modernization of a subscription publishing platform from Drupal 7 to Drupal 10, including a React book reader, Solr search, automated content imports, subscription commerce, and the AI-assisted accessibility workflow.",
    impact: "A production-ready platform that streamlined editorial operations and improved access to authoritative legal resources.",
    href: "https://library.nclc.org",
    linkLabel: "Visit the NCLC Digital Library",
  },
  {
    type: "Architecture · Complex digital portfolios",
    title: "Enterprise and multi-brand platforms",
    description:
      "Delivered architecture and engineering across institutional, enterprise, and consumer-brand environments, including Children’s Hospital of Philadelphia, Johns Hopkins, Merck, LSAC, and Philly Marketing Labs.",
    impact: "Production digital systems with demanding content operations, integrations, governance, security, and accessibility requirements.",
    logos: [
      { src: "/logos/chop.svg", alt: "Children’s Hospital of Philadelphia", width: 511, height: 110 },
      { src: "/logos/johns-hopkins.svg", alt: "Johns Hopkins Bloomberg School of Public Health", width: 294, height: 77 },
      { src: "/logos/merck.svg", alt: "Merck", width: 207, height: 62 },
      { src: "/logos/philly-marketing-labs.png", alt: "Philly Marketing Labs", width: 363, height: 100 },
    ],
    href: "https://www.zivtech.com/project/childrens-hospital-philadelphia-vaccine-education-center",
    linkLabel: "View the CHOP project case study",
  },
];

function SelectedImpact() {
  return (
    <section
      id="selected-impact"
      aria-labelledby="selected-impact-heading"
      className="my-16 scroll-mt-20 lg:my-24"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
          Selected impact
        </p>
        <h2
          id="selected-impact-heading"
          className="mt-3 text-3xl font-bold text-white sm:text-4xl"
        >
          AI expertise built on years of shipping consequential systems.
        </h2>
        <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg">
          A representative view of the work behind the title—from AI-enabled
          engineering operations to high-scale logistics and enterprise digital
          platforms.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className={`flex flex-col rounded-2xl border p-6 ${
              project.featured
                ? "border-violet-500/60 bg-gradient-to-br from-violet-950/50 to-[#11152c] md:col-span-2"
                : "border-[#293052] bg-[#11152c]/80"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">
              {project.type}
            </p>
            <h3 className="mt-4 text-xl font-semibold text-white">
              {project.title}
            </h3>
            <p className="mt-3 leading-7 text-gray-300">
              {project.description}
            </p>
            <p className="mt-4 border-l-2 border-[#16f2b3] pl-4 text-sm leading-6 text-gray-400">
              {project.impact}
            </p>
            {project.logos && (
              <ul className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
                {project.logos.map((logo) => (
                  <li key={logo.alt}>
                    <Image
                      src={logo.src}
                      width={logo.width}
                      height={logo.height}
                      alt={logo.alt}
                      className="h-6 w-auto opacity-60 transition duration-200 [filter:brightness(0)_invert(1)] hover:opacity-100"
                    />
                  </li>
                ))}
              </ul>
            )}
            {project.href && (
              <Link
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-[#16f2b3] underline decoration-[#16f2b3]/40 underline-offset-4 hover:decoration-[#16f2b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {project.linkLabel}
                <span className="sr-only">(opens in new window)</span>
                <MdArrowOutward aria-hidden="true" size={17} />
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default SelectedImpact;
