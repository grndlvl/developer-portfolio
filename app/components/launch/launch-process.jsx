// @flow strict

import { launchProcess } from "@/utils/data/launch-data";

function LaunchProcess() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="my-16 scroll-mt-20 border-y border-[#25213b] py-16 lg:my-24 lg:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
          Process
        </p>
        <h2
          id="process-heading"
          className="mt-3 text-3xl font-bold text-white sm:text-4xl"
        >
          A focused path from fit check to live.
        </h2>
      </div>

      <ol className="relative mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
        {/* connector line behind the step numbers on large screens */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-6 hidden h-[2px] bg-gradient-to-r from-[#16f2b3]/40 via-violet-500/40 to-pink-500/40 lg:block"
        />
        {launchProcess.map(([number, title, description]) => (
          <li key={number} className="relative">
            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#16f2b3]/40 bg-[#0d1224] font-mono text-sm font-bold text-[#16f2b3]">
              {number}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              {description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default LaunchProcess;
