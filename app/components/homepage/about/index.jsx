// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";

function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            About Me
          </p>
          <p className="text-gray-200 text-sm lg:text-lg">
            {personalData.description}
          </p>
          {personalData.openForWork && <p className="text-gray-400 text-sm lg:text-base mt-4">
            {personalData.openForWorkDescription}
          </p>}
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <div className="flex flex-col items-center space-y-2">
            <div className="max-h-[280px] max-w-[280px] overflow-hidden rounded-lg transition-all duration-1000">
              <Image
                src={personalData.profile}
                width={280}
                height={280}
                alt="{personalData.name}'s profile picture"
                className="object-cover grayscale hover:grayscale-0 hover:scale-110 transition-all duration-1000 cursor-pointer"
              />
            </div>
            {personalData.openForWork && <Link href="#contact">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#16f2b3]/10 text-[#16f2b3] border border-[#16f2b3] hover:bg-[#16f2b3]/20 hover:shadow-md transition-all duration-300 animate-pulse hover:animate-none">
                {personalData.openForWorkTitle}
              </span>
            </Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
