// @flow strict

import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { TbHeartHandshake } from "react-icons/tb";

function CommunityWork() {
  return (
    <section
      id="community-work"
      aria-labelledby="community-work-heading"
      className="my-16 scroll-mt-20 lg:my-24"
    >
      <div className="overflow-hidden rounded-2xl border border-[#293052] bg-[#11152c]">
        <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
          <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700/30 to-pink-600/10 p-7 sm:p-9">
            <Image
              src="/logos/backyard-bullies.jpg"
              width={420}
              height={420}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full opacity-[0.12] grayscale"
            />
            <div className="relative z-10">
              <TbHeartHandshake
                aria-hidden="true"
                className="text-[#16f2b3]"
                size={34}
              />
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
                Current community project
              </p>
              <h2
                id="community-work-heading"
                className="mt-3 text-3xl font-bold text-white"
              >
                Practical technology for organizations of every size.
              </h2>
            </div>
            <p className="relative z-10 mt-8 text-sm leading-6 text-gray-400">
              Enterprise experience, applied with the speed and resourcefulness
              small organizations need.
            </p>
          </div>

          <article className="p-7 sm:p-9">
            <p className="text-sm text-pink-400">Augusta, Georgia</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Backyard Bullies Wrestling Club
            </h3>
            <p className="mt-4 leading-7 text-gray-300">
              Supporting a growing community wrestling organization across
              research, information architecture, UX and visual design, content
              strategy, and web implementation. The result gives families one
              clear place to understand programs, schedules, camps, coaches,
              membership, and ways to get involved.
            </p>
            <p className="mt-4 leading-7 text-gray-300">
              I&apos;m also helping the club grow its funding base—assisting with
              sponsorship recruitment research and grant research to identify and
              pursue opportunities that sustain its programs.
            </p>
            <p className="mt-4 leading-7 text-gray-400">
              This is the same approach I bring to small-business engagements:
              use AI to accelerate research and execution, then apply experienced
              human judgment to the strategy, design, and finished product.
            </p>
            <Link
              href="https://www.backyardbullies-wc.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-violet-400/50 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-[#16f2b3] hover:text-[#16f2b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Visit Backyard Bullies Wrestling Club
              <span className="sr-only">(opens in new window)</span>
              <MdArrowOutward aria-hidden="true" size={18} />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}

export default CommunityWork;
