// @flow strict

import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { TbMapPin, TbSparkles } from "react-icons/tb";
import { launchProjects } from "@/utils/data/launch-data";
import { BrowserFrame, PhoneFrame } from "./device-frames";

function MetaRow({ label, children }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-[#16f2b3]">
        {label}
      </dt>
      <dd className="mt-1 leading-7 text-gray-300">{children}</dd>
    </div>
  );
}

// The grndlvl AI throughline -- what a Launch page connects to beyond the page
// itself. Violet accent matches the homepage AI Expertise section.
function AiWork({ items }) {
  return (
    <div className="mt-6 rounded-xl border border-violet-500/25 bg-violet-950/20 p-4 sm:p-5">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#16f2b3]">
        <TbSparkles aria-hidden="true" size={15} />
        AI-assisted work
      </p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <TbSparkles
              aria-hidden="true"
              size={15}
              className="mt-1 flex-shrink-0 text-violet-300"
            />
            <span className="text-sm leading-6 text-gray-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectShowcase({ project, reverse }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#293052] bg-[#11152c]/80">
      <div className="grid lg:grid-cols-2">
        {/* Visual */}
        <div
          className={`relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-violet-700/25 to-pink-600/10 p-7 sm:p-10 lg:p-12 ${
            reverse ? "lg:order-2" : ""
          }`}
        >
          {/* faint brand watermark fills the panel behind the devices; the
              logo is circle-masked and zoomed so white-background artwork
              (e.g. the Backyard Bullies JPEG) shows no white edge */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -left-8 h-56 w-56 overflow-hidden rounded-full opacity-[0.08] grayscale"
          >
            <Image
              src={project.logo}
              alt=""
              width={project.logoWidth}
              height={project.logoHeight}
              className="h-full w-full scale-[1.18] object-cover"
            />
          </span>
          <div className="relative">
            <div className="relative pb-10 pr-10">
              <BrowserFrame
                src={project.desktopShot}
                alt={`The ${project.name} launch page shown on desktop`}
                label={project.siteLabel}
                width={1440}
                height={900}
              />
              <PhoneFrame
                src={project.mobileShot}
                alt={`The ${project.name} launch page shown on a phone`}
                width={390}
                height={844}
                className="absolute bottom-0 right-0 w-24 sm:w-28"
              />
            </div>
            <p className="relative mt-5 flex items-center gap-2 text-xs font-medium text-gray-300">
              {project.href ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]"
                  />
                  Live · {project.siteLabel}
                </>
              ) : (
                <>
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-amber-400"
                  />
                  Pilot build · {project.siteLabel}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Copy */}
        <div className="p-7 sm:p-10">
          <div className="flex items-center gap-4">
            <span className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-[#293052]">
              <Image
                src={project.logo}
                alt=""
                aria-hidden="true"
                width={project.logoWidth}
                height={project.logoHeight}
                className="h-full w-full scale-[1.18] object-cover"
              />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                {project.label}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">
                {project.name}
              </h3>
            </div>
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-gray-400">
            <TbMapPin aria-hidden="true" size={16} className="text-[#16f2b3]" />
            {project.businessType} · {project.location}
          </p>

          <dl className="mt-6 space-y-4">
            <MetaRow label="The problem">{project.problem}</MetaRow>
            <MetaRow label="What was built">{project.built}</MetaRow>
            <MetaRow label="Why it matters">{project.matters}</MetaRow>
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-[#293052] bg-[#0d1224] px-3 py-1 text-xs text-gray-300"
              >
                {tag}
              </li>
            ))}
          </ul>

          <AiWork items={project.aiWork} />

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

          {project.footnote && (
            <p className="mt-6 border-l-2 border-violet-400/40 pl-4 text-sm leading-6 text-gray-400">
              {project.footnote}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function RecentLaunchWork() {
  return (
    <section
      id="recent-launch-work"
      aria-labelledby="recent-launch-work-heading"
      className="my-16 scroll-mt-20 lg:my-24"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
          Recent launch work
        </p>
        <h2
          id="recent-launch-work-heading"
          className="mt-3 text-3xl font-bold text-white sm:text-4xl"
        >
          Real launch pages, built to grow.
        </h2>
      </div>

      <div className="mt-10 space-y-5">
        {launchProjects.map((project, index) => (
          <ProjectShowcase
            key={project.name}
            project={project}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      {/* Invite band */}
      <Link
        href="#start"
        className="group mt-5 flex flex-col items-center gap-5 rounded-2xl border border-dashed border-[#3a4166] bg-[#0d1224] p-7 text-center transition-colors duration-200 hover:border-[#16f2b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:flex-row sm:justify-between sm:p-8 sm:text-left"
      >
        <div className="flex items-center gap-5">
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#293052] bg-[#11152c] text-[#16f2b3] transition-colors duration-200 group-hover:border-[#16f2b3]">
            <MdArrowOutward aria-hidden="true" size={22} />
          </span>
          <div>
            <p className="text-lg font-semibold text-white">
              Your business here next
            </p>
            <p className="mt-1 max-w-xl text-sm leading-6 text-gray-400">
              A limited number of pilot launch builds are open. Start a project
              and it could be the next one live.
            </p>
          </div>
        </div>
        <span className="whitespace-nowrap text-sm font-semibold text-[#16f2b3]">
          Start a Launch Project
        </span>
      </Link>
    </section>
  );
}

export default RecentLaunchWork;
