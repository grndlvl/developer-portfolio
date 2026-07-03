// @flow strict

import { TbX, TbCheck } from "react-icons/tb";
import { launchContrast } from "@/utils/data/launch-data";

function LaunchContrast() {
  return (
    <section
      id="why-different"
      aria-labelledby="why-different-heading"
      className="my-16 scroll-mt-20 lg:my-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
          Not generic web design
        </p>
        <h2
          id="why-different-heading"
          className="mt-3 text-3xl font-bold text-white sm:text-4xl"
        >
          A technical launch foundation, not brochureware.
        </h2>
        <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg">
          Most small-business sites are trapped in a builder, overloaded with
          plugins, or treated as disposable. grndlvl Launch is different:
          it&apos;s the same engineering discipline I bring to enterprise and
          healthcare platforms, right-sized for a local business.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl items-stretch gap-4 sm:grid-cols-2 sm:gap-5">
        {/* The usual */}
        <div className="rounded-2xl border border-[#293052] bg-[#0d1224] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {launchContrast.usual.label}
          </p>
          <ul className="mt-5 space-y-3.5">
            {launchContrast.usual.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-gray-500"
                >
                  <TbX size={13} />
                </span>
                <span className="leading-6 text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* grndlvl Launch */}
        <div className="relative rounded-2xl border border-[#16f2b3]/40 bg-gradient-to-br from-[#0f2b2a] to-[#11152c] p-6 shadow-lg shadow-[#16f2b3]/5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#16f2b3]">
            {launchContrast.grndlvl.label}
          </p>
          <ul className="mt-5 space-y-3.5">
            {launchContrast.grndlvl.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#16f2b3]/15 text-[#16f2b3]"
                >
                  <TbCheck size={13} />
                </span>
                <span className="leading-6 text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LaunchContrast;
