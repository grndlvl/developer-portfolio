// @flow strict

import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { BrowserFrame } from "../../launch/device-frames";
import LaunchWordmark from "../../launch/launch-wordmark";

function LaunchTeaser() {
  return (
    <section
      id="launch"
      aria-labelledby="launch-teaser-heading"
      className="my-16 scroll-mt-20 lg:my-24"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#293052] bg-[#11152c] p-7 sm:p-10">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-40 w-40 -translate-y-1/3 translate-x-1/3 rounded-full bg-violet-500/10 blur-3xl"
        />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="max-w-xl">
            <LaunchWordmark className="text-lg" />
            <h2
              id="launch-teaser-heading"
              className="mt-3 text-2xl font-bold text-white sm:text-3xl"
            >
              Small-business launch pages, built like real software.
            </h2>
            <p className="mt-4 leading-7 text-gray-300">
              A focused website service for small businesses that need a
              professional web presence without platform bloat—fast, clean,
              mobile-first launch pages with clear calls to action, local SEO
              basics, and room to grow into booking, payments, or automation
              later.
            </p>
            <p className="mt-3 text-sm text-gray-400">
              A selective sub-offer from grndlvl. Currently taking a limited
              number of pilot builds.
            </p>
            <Link
              href="/launch"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-violet-400/50 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-[#16f2b3] hover:text-[#16f2b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore grndlvl Launch
              <MdArrowOutward aria-hidden="true" size={18} />
            </Link>
          </div>

          <div className="lg:pl-4">
            <BrowserFrame
              src="/image/launch/backyard-bullies-desktop.jpeg"
              alt="A branded small-business launch page built by grndlvl, shown in a browser"
              label="a grndlvl Launch project"
              width={1440}
              height={900}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LaunchTeaser;
