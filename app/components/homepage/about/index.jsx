// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";

function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="my-16 scroll-mt-20 lg:my-24"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
            About me
          </p>
          <h2
            id="about-heading"
            className="mt-3 text-3xl font-bold text-white sm:text-4xl"
          >
            Turning complex technology into systems people rely on.
          </h2>
          <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg">
            {personalData.description}
          </p>
          {personalData.openForWork && (
            <p className="mt-4 text-base leading-7 text-gray-400">
              {personalData.openForWorkDescription}
            </p>
          )}
        </div>
        <div className="order-1 flex justify-center lg:order-2">
          <div className="flex flex-col items-center gap-4">
            <div className="overflow-hidden rounded-2xl border border-[#293052] bg-[#11152c] p-2 shadow-2xl shadow-violet-950/30">
              <Image
                src={personalData.profile}
                width={300}
                height={300}
                alt={`${personalData.name}, applied AI architect and CTO`}
                className="rounded-xl object-cover grayscale transition-all duration-700 hover:grayscale-0"
              />
            </div>
            {personalData.openForWork && (
              <Link href="#contact">
                <span className="rounded-full border border-[#16f2b3] bg-[#16f2b3]/10 px-4 py-1.5 text-xs font-medium text-[#16f2b3] transition-all duration-300 badge-pulse hover:animate-none hover:bg-[#16f2b3]/20 hover:shadow-md">
                  {personalData.openForWorkTitle}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
