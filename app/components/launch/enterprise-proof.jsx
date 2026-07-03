// @flow strict

import Image from "next/image";

// The bridge back to the grndlvl CTO brand: the same engineer behind these
// enterprise/healthcare platforms builds the small-business launch pages.
const logos = [
  { src: "/logos/chop.svg", alt: "Children's Hospital of Philadelphia", width: 511, height: 110 },
  { src: "/logos/johns-hopkins.svg", alt: "Johns Hopkins", width: 294, height: 77 },
  { src: "/logos/merck.svg", alt: "Merck", width: 207, height: 62 },
  { src: "/logos/nclc.svg", alt: "NCLC", width: 217, height: 104 },
];

function EnterpriseProof() {
  return (
    <section
      aria-label="Enterprise engineering background"
      className="my-12 rounded-2xl border border-[#293052] bg-[#11152c]/60 px-6 py-8 sm:px-10"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
        <p className="max-w-xs text-sm leading-6 text-gray-300">
          <span className="font-semibold text-white">
            The engineering behind enterprise platforms
          </span>
          , right-sized for your business.
        </p>
        <ul className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-5 lg:justify-end">
          {logos.map((logo) => (
            <li key={logo.alt}>
              <Image
                src={logo.src}
                width={logo.width}
                height={logo.height}
                alt={logo.alt}
                className="h-6 w-auto opacity-60 [filter:brightness(0)_invert(1)]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default EnterpriseProof;
