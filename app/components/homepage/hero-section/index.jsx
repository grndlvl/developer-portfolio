// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";
import { SiCalendly } from "react-icons/si";
import RotatingCapabilities from "./rotating-capabilities";

const socialLinks = [
  {
    href: personalData.github,
    label: "Jonathan DeLaigle on GitHub",
    icon: BsGithub,
  },
  {
    href: personalData.linkedIn,
    label: "Jonathan DeLaigle on LinkedIn",
    icon: BsLinkedin,
  },
  {
    href: personalData.calendly,
    label: "Schedule a call with Jonathan DeLaigle",
    icon: SiCalendly,
  },
];

function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative py-10 lg:py-20"
    >
      <Image
        src="/hero.svg"
        alt=""
        width={1572}
        height={795}
        priority
        className="absolute -top-[98px] -z-10"
      />

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
            Applied AI · Agentic systems · Workflow integration
          </p>
          <h1
            id="hero-heading"
            className="max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            I turn AI from a chat window into a{" "}
            <span className="bg-gradient-to-r from-pink-500 to-violet-400 bg-clip-text text-transparent">
              working part of your business.
            </span>
          </h1>
          <div className="mt-5 min-h-8 text-lg font-semibold text-[#16f2b3] sm:text-xl">
            <RotatingCapabilities />
          </div>
          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            I design and deploy agentic workflows that connect models, tools,
            data, and people—grounded in 18+ years of building dependable
            production systems. AI makes execution faster; experience provides
            the judgment to know what right looks like—what to trust, test,
            reject, and ship.
          </p>

          <ul
            aria-label="AI specialization"
            className="mt-7 flex flex-wrap gap-3 text-sm text-gray-200"
          >
            {[
              "Multi-agent orchestration",
              "Business workflow automation",
              "Human-in-the-loop systems",
            ].map((specialty) => (
              <li
                key={specialty}
                className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2"
              >
                {specialty}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="#contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Discuss an AI workflow
              <MdArrowOutward aria-hidden="true" size={18} />
            </Link>
            <Link
              href="#ai-expertise"
              className="inline-flex min-h-11 items-center rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-[#16f2b3] hover:text-[#16f2b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore AI capabilities
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-5">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${label} (opens in new window)`}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-pink-500 transition-colors duration-200 hover:bg-pink-500/10 hover:text-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Icon aria-hidden="true" size={26} />
              </Link>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#293164] bg-[#0a0d27]/90 shadow-2xl shadow-violet-950/40">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600" />
          <div className="flex items-center justify-between border-b border-indigo-900/80 px-5 py-4">
            <div className="flex gap-2" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-green-300" />
            </div>
            <span className="font-mono text-xs text-gray-500">
              applied-ai.js
            </span>
          </div>
          <pre
            aria-label="Code example describing Jonathan's applied AI practice"
            className="overflow-x-auto p-5 font-mono text-xs leading-7 sm:p-7 sm:text-sm"
          >
            <code>
              <span className="text-pink-500">const</span>{" "}
              <span className="text-white">appliedAI</span>{" "}
              <span className="text-pink-500">=</span>{" "}
              <span className="text-gray-400">{"{"}</span>
              {"\n  "}
              <span className="text-cyan-300">experience</span>
              <span className="text-gray-400">: </span>
              <span className="text-amber-300">&apos;18+ years&apos;</span>
              <span className="text-gray-400">,</span>
              {"\n  "}
              <span className="text-cyan-300">builds</span>
              <span className="text-gray-400">: [</span>
              <span className="text-amber-300">&apos;agents&apos;</span>
              <span className="text-gray-400">, </span>
              <span className="text-amber-300">&apos;workflows&apos;</span>
              <span className="text-gray-400">],</span>
              {"\n  "}
              <span className="text-cyan-300">connects</span>
              <span className="text-gray-400">: [</span>
              <span className="text-amber-300">&apos;models&apos;</span>
              <span className="text-gray-400">, </span>
              <span className="text-amber-300">&apos;tools&apos;</span>
              <span className="text-gray-400">, </span>
              <span className="text-amber-300">&apos;people&apos;</span>
              <span className="text-gray-400">],</span>
              {"\n  "}
              <span className="text-cyan-300">tested</span>
              <span className="text-gray-400">: </span>
              <span className="text-[#16f2b3]">true</span>
              <span className="text-gray-400">,</span>
              {"\n  "}
              <span className="text-cyan-300">observable</span>
              <span className="text-gray-400">: </span>
              <span className="text-[#16f2b3]">true</span>
              <span className="text-gray-400">,</span>
              {"\n  "}
              <span className="text-cyan-300">humanApproved</span>
              <span className="text-gray-400">: </span>
              <span className="text-[#16f2b3]">true</span>
              <span className="text-gray-400">,</span>
              {"\n  "}
              <span className="text-white">shipsToProduction</span>
              <span className="text-gray-400">() {"{"}</span>
              {"\n    "}
              <span className="text-pink-500">return</span>
              <span className="text-gray-400"> (</span>
              {"\n      "}
              <span className="text-pink-500">this</span>
              <span className="text-gray-400">.</span>
              <span className="text-cyan-300">tested</span>
              <span className="text-gray-400">{" && "}</span>
              {"\n      "}
              <span className="text-pink-500">this</span>
              <span className="text-gray-400">.</span>
              <span className="text-cyan-300">observable</span>
              <span className="text-gray-400">{" && "}</span>
              {"\n      "}
              <span className="text-pink-500">this</span>
              <span className="text-gray-400">.</span>
              <span className="text-cyan-300">humanApproved</span>
              {"\n    "}
              <span className="text-gray-400">{");"}</span>
              {"\n  "}
              <span className="text-gray-400">{"}"}</span>
              {"\n"}
              <span className="text-gray-400">{"};"}</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
