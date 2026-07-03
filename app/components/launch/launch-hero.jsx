// @flow strict

import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import {
  TbArrowLeft,
  TbBolt,
  TbDeviceMobile,
  TbBuildingSkyscraper,
  TbAccessible,
  TbMapPin,
} from "react-icons/tb";
import { BrowserFrame, PhoneFrame } from "./device-frames";

const trustPoints = [
  { icon: TbBuildingSkyscraper, label: "Enterprise-grade engineering" },
  { icon: TbBolt, label: "Fast & lightweight" },
  { icon: TbDeviceMobile, label: "Mobile-first" },
  { icon: TbAccessible, label: "Accessible (WCAG)" },
];

function LaunchHero({ startHref }) {
  return (
    <section
      aria-labelledby="launch-hero-heading"
      className="relative py-8 lg:py-14"
    >
      <div
        aria-hidden="true"
        className="absolute -top-10 right-0 -z-10 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl"
      />

      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gray-400 transition-colors duration-200 hover:text-[#16f2b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <TbArrowLeft aria-hidden="true" size={18} />
        Back to grndlvl
      </Link>

      <div className="mt-6 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
            grndlvl Launch
          </p>
          <h1
            id="launch-hero-heading"
            className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
          >
            Small-business websites built like{" "}
            <span className="bg-gradient-to-r from-pink-500 to-violet-400 bg-clip-text text-transparent">
              real software.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
            Enterprise-grade engineering, small-business scale. A fast,
            credible, mobile-first web presence—without bloated platforms,
            builder lock-in, or unnecessary complexity.
          </p>

          <p className="mt-4 flex items-center gap-2 text-sm text-gray-400">
            <TbMapPin aria-hidden="true" size={16} className="text-[#16f2b3]" />
            Augusta · the CSRA · available remotely
          </p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-[#293052] bg-[#11152c] px-4 py-2 text-sm text-gray-200"
              >
                <Icon aria-hidden="true" size={16} className="text-[#16f2b3]" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={startHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Start a Launch Project
              <MdArrowOutward aria-hidden="true" size={18} />
            </Link>
            <Link
              href="#recent-launch-work"
              className="inline-flex min-h-11 items-center rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-[#16f2b3] hover:text-[#16f2b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              See Recent Launch Work
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:pb-8 lg:pr-8">
          <BrowserFrame
            src="/image/launch/backyard-bullies-desktop.jpeg"
            alt="A launch page built for Backyard Bullies Wrestling Club, shown on desktop"
            label="backyardbullies-wc.com"
            width={1440}
            height={900}
            priority
          />
          <PhoneFrame
            src="/image/launch/backyard-bullies-mobile.jpeg"
            alt="The same launch page shown on a phone"
            width={390}
            height={844}
            className="absolute -bottom-6 right-0 w-24 sm:w-32 lg:-bottom-2 lg:-right-2"
          />
        </div>
      </div>
    </section>
  );
}

export default LaunchHero;
