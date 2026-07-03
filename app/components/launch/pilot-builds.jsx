// @flow strict

import { TbCheck } from "react-icons/tb";
import { launchOffers, launchPilotIntro } from "@/utils/data/launch-data";

function PilotBuilds() {
  return (
    <section
      id="pilot-builds"
      aria-labelledby="pilot-builds-heading"
      className="my-16 scroll-mt-20 border-y border-[#25213b] py-16 lg:my-24 lg:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
          {launchPilotIntro.eyebrow}
        </p>
        <h2
          id="pilot-builds-heading"
          className="mt-3 text-3xl font-bold text-white sm:text-4xl"
        >
          {launchPilotIntro.heading}
        </h2>
        <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg">
          {launchPilotIntro.lead}
        </p>
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-gray-400 sm:text-lg">
        {launchPilotIntro.body}
      </p>

      <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
        {launchOffers.map((offer) => (
          <article
            key={offer.name}
            className={`flex flex-col rounded-2xl border p-6 ${
              offer.featured
                ? "border-violet-500/60 bg-gradient-to-br from-violet-950/50 to-[#11152c] shadow-xl shadow-violet-950/30 lg:-translate-y-3"
                : "border-[#293052] bg-[#11152c]/80"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold text-white">{offer.name}</h3>
              {offer.badge && (
                <span className="whitespace-nowrap rounded-full border border-pink-400/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-300">
                  {offer.badge}
                </span>
              )}
            </div>

            <p className="mt-4 text-lg font-semibold text-[#16f2b3]">
              {offer.pricing}
            </p>
            {offer.pricingNote && (
              <p className="mt-1 text-sm text-gray-400">{offer.pricingNote}</p>
            )}

            <p className="mt-4 leading-7 text-gray-300">{offer.description}</p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-pink-400">
              {offer.includesLabel}
            </p>
            <ul className="mt-3 space-y-2">
              {offer.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <TbCheck
                    aria-hidden="true"
                    size={18}
                    className="mt-0.5 flex-shrink-0 text-[#16f2b3]"
                  />
                  <span className="text-sm leading-6 text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 border-l-2 border-[#16f2b3] pl-4 text-sm leading-6 text-gray-400">
              {offer.boundary}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PilotBuilds;
