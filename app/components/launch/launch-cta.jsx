// @flow strict

import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

function LaunchCta({ id, mailtoHref }) {
  return (
    <section
      id={id}
      aria-labelledby="launch-cta-heading"
      className="my-16 scroll-mt-20 lg:my-24"
    >
      <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/50 to-[#11152c] p-8 sm:p-12">
        <Image
          src="/grid.svg"
          alt=""
          aria-hidden="true"
          width={600}
          height={600}
          className="pointer-events-none absolute right-0 top-0 -z-0 h-full w-auto opacity-20"
        />
        <div className="relative z-10 max-w-3xl">
          <Image
            src="/brand/glyph-tile.svg"
            alt=""
            aria-hidden="true"
            width={56}
            height={56}
            className="h-12 w-12 rounded-xl"
          />
          <h2
            id="launch-cta-heading"
            className="mt-6 text-3xl font-bold text-white sm:text-4xl"
          >
            Need a professional launch page for your business?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            Tell me what you are building, what you need people to do, and what
            is currently getting in the way. If it is a fit, I&apos;ll help you
            turn it into a clean, credible web presence.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={mailtoHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Start a grndlvl Launch Project
              <MdArrowOutward aria-hidden="true" size={18} />
            </Link>
            <span className="text-sm text-gray-400">
              Rooted in the CSRA—building for Augusta and beyond. A limited
              number of pilot builds are open.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LaunchCta;
