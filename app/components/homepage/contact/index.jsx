// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from 'react-icons/bi';
import { BsTwitterX } from 'react-icons/bs';
import { FaDrupal, FaFacebookF } from 'react-icons/fa';
import { IoLogoGithub, IoMdCall } from 'react-icons/io';
import { MdAlternateEmail } from 'react-icons/md';
import { SiCalendly } from "react-icons/si";
import { TbBrandFiverr } from "react-icons/tb";
import SectionHeading from '../../helper/section-heading';
import ContactForm from './contact-form';

function ContactSection() {
  const cleanPhoneNumber = personalData.phone.replace(/[^\d+]/g, '');

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative my-16 scroll-mt-20 border-t border-[#25213b] pt-16 text-white lg:my-24"
    >
      <SectionHeading
        id="contact-heading"
        eyebrow="Contact"
        title="Let's put AI to work in your business."
        className="mb-10"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <ContactForm />
        <div className="lg:w-3/4 ">
          <div className="flex flex-col gap-5 lg:gap-9">
            <p className="text-sm md:text-xl flex items-center gap-3">
              <MdAlternateEmail
                aria-hidden="true"
                className="rounded-full border border-[#293052] bg-[#11152c] p-2 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-[#16f2b3] hover:bg-[#16f2b3]/10 hover:text-[#16f2b3] cursor-pointer"
                size={36}
              />
              <span><a href={`mailto:${personalData.email}`}>{personalData.email}</a></span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <IoMdCall
                aria-hidden="true"
                className="rounded-full border border-[#293052] bg-[#11152c] p-2 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-[#16f2b3] hover:bg-[#16f2b3]/10 hover:text-[#16f2b3] cursor-pointer"
                size={36}
              />
              <span><a href={`tel:${cleanPhoneNumber}`}>{personalData.phone}</a></span>
            </p>
          </div>
          <div className="mt-8 lg:mt-16 flex items-center gap-5 lg:gap-10">
            <Link target="_blank" rel="noreferrer" aria-label="Jonathan DeLaigle on LinkedIn (opens in new window)" href={personalData.linkedIn}>
              <BiLogoLinkedin
                aria-hidden="true"
                className="rounded-full border border-[#293052] bg-[#11152c] p-3 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-[#16f2b3] hover:bg-[#16f2b3]/10 hover:text-[#16f2b3] cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" rel="noreferrer" aria-label="Jonathan DeLaigle on X (opens in new window)" href={personalData.twitter}>
              <BsTwitterX
                aria-hidden="true"
                className="rounded-full border border-[#293052] bg-[#11152c] p-3 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-[#16f2b3] hover:bg-[#16f2b3]/10 hover:text-[#16f2b3] cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" rel="noreferrer" aria-label="Jonathan DeLaigle on Facebook (opens in new window)" href={personalData.facebook}>
              <FaFacebookF
                aria-hidden="true"
                className="rounded-full border border-[#293052] bg-[#11152c] p-3 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-[#16f2b3] hover:bg-[#16f2b3]/10 hover:text-[#16f2b3] cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" rel="noreferrer" aria-label="Schedule a call with Jonathan DeLaigle (opens in new window)" href={personalData.calendly}>
              <SiCalendly
                aria-hidden="true"
                className="rounded-full border border-[#293052] bg-[#11152c] p-3 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-[#16f2b3] hover:bg-[#16f2b3]/10 hover:text-[#16f2b3] cursor-pointer"
                size={48}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
