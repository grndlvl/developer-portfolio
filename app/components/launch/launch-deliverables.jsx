// @flow strict

import {
  TbLayoutGrid,
  TbMapPin,
  TbTargetArrow,
  TbTrendingUp,
  TbCheck,
  TbTool,
  TbBarbell,
  TbUsersGroup,
  TbBriefcase,
  TbBuildingStore,
} from "react-icons/tb";
import {
  launchDeliverableGroups,
  launchAudience,
} from "@/utils/data/launch-data";

const groupIcons = {
  foundation: TbLayoutGrid,
  found: TbMapPin,
  convert: TbTargetArrow,
  grow: TbTrendingUp,
};

const audienceIcons = {
  tools: TbTool,
  barbell: TbBarbell,
  community: TbUsersGroup,
  briefcase: TbBriefcase,
  store: TbBuildingStore,
  trending: TbTrendingUp,
};

function LaunchDeliverables() {
  return (
    <section
      id="what-you-get"
      aria-labelledby="what-you-get-heading"
      className="my-16 scroll-mt-20 lg:my-24"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
          What you get
        </p>
        <h2
          id="what-you-get-heading"
          className="mt-3 text-3xl font-bold text-white sm:text-4xl"
        >
          A clean, credible foundation with room to grow.
        </h2>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {launchDeliverableGroups.map((group) => {
          const Icon = groupIcons[group.iconKey];
          return (
            <article
              key={group.title}
              className="flex flex-col rounded-2xl border border-[#293052] bg-[#11152c]/80 p-6 transition-colors duration-200 hover:border-violet-500/70"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#293052] bg-[#0d1224] text-[#16f2b3]">
                <Icon aria-hidden="true" size={22} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <TbCheck
                      aria-hidden="true"
                      size={17}
                      className="mt-1 flex-shrink-0 text-[#16f2b3]"
                    />
                    <span className="text-sm leading-6 text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      {/* Who it is for */}
      <div className="mt-14 rounded-2xl border border-[#293052] bg-[#11152c]/60 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
          <div className="lg:w-72 lg:flex-shrink-0">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
              Who it is for
            </p>
            <p className="mt-3 leading-7 text-gray-300">
              Businesses ready for a credible first step—not a full custom
              software project yet.
            </p>
          </div>
          <ul className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {launchAudience.map(({ label, iconKey }) => {
              const Icon = audienceIcons[iconKey];
              return (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-[#293052] bg-[#0d1224] px-4 py-3"
                >
                  <Icon
                    aria-hidden="true"
                    size={18}
                    className="flex-shrink-0 text-[#16f2b3]"
                  />
                  <span className="text-sm text-gray-200">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LaunchDeliverables;
