import Image from "next/image";

export const metadata = {
  title: "Brand Assets",
  description:
    "Download official grndlvl sponsor marks and review guidance for apparel, print, and digital use.",
  alternates: {
    canonical: "/brand",
  },
  openGraph: {
    title: "grndlvl Brand Assets",
    description:
      "Official grndlvl sponsor marks for apparel, print, and digital use.",
    url: "/brand",
    siteName: "grndlvl",
    locale: "en_US",
    type: "website",
  },
};

const sponsorMarks = [
  {
    name: "White sponsor mark",
    description: "For black, navy, and other dark apparel or backgrounds.",
    src: "/brand/sponsor-mark-light-print.svg",
    surface: "bg-[#171717]",
  },
  {
    name: "Black sponsor mark",
    description: "For white, heather gray, and other light apparel or backgrounds.",
    src: "/brand/sponsor-mark-black-print.svg",
    surface: "bg-[#d1d5db]",
  },
  {
    name: "Full-color sponsor mark",
    description: "Transparent artwork for digital use or color-capable printing.",
    src: "/brand/sponsor-mark-color-print.svg",
    surface: "bg-[#0d1224]",
  },
  {
    name: "Full-color mark on navy",
    description: "A self-contained version with the navy background included.",
    src: "/brand/sponsor-mark-color-on-dark-print.svg",
    surface: "bg-[#0d1224]",
  },
];

const sponsorBadges = [
  {
    name: "White sponsor badge",
    description: "For black, navy, and other dark apparel or backgrounds.",
    src: "/brand/sponsor-badge-light-print.svg",
    surface: "bg-[#171717]",
  },
  {
    name: "Black sponsor badge",
    description: "For white, heather gray, and other light apparel or backgrounds.",
    src: "/brand/sponsor-badge-black-print.svg",
    surface: "bg-[#d1d5db]",
  },
  {
    name: "Full-color sponsor badge",
    description: "Transparent artwork for digital use or color-capable printing.",
    src: "/brand/sponsor-badge-color-print.svg",
    surface: "bg-[#0d1224]",
  },
  {
    name: "Full-color badge on navy",
    description: "A self-contained version with the navy background included.",
    src: "/brand/sponsor-badge-color-on-dark-print.svg",
    surface: "bg-[#0d1224]",
  },
];

const presentationLockups = [
  {
    name: "Horizontal descriptor lockup",
    description: "For wide digital placements where the descriptor remains readable.",
    src: "/brand/sponsor-lockup-on-dark-print.svg",
    width: 760,
    height: 180,
    variants: [
      ["White SVG", "/brand/sponsor-lockup-white-print.svg"],
      ["Black SVG", "/brand/sponsor-lockup-black-print.svg"],
      ["Color on navy SVG", "/brand/sponsor-lockup-on-dark-print.svg"],
    ],
  },
  {
    name: "Stacked descriptor lockup",
    description: "For larger, centered presentation placements.",
    src: "/brand/sponsor-lockup-stacked-on-dark-print.svg",
    width: 560,
    height: 220,
    variants: [
      ["White SVG", "/brand/sponsor-lockup-stacked-white-print.svg"],
      ["Black SVG", "/brand/sponsor-lockup-stacked-black-print.svg"],
      ["Color on navy SVG", "/brand/sponsor-lockup-stacked-on-dark-print.svg"],
    ],
  },
];

const downloadClasses =
  "inline-flex min-h-11 items-center justify-center rounded-lg bg-[#16f2b3] px-5 py-2.5 font-mono text-sm font-bold text-[#0d1224] no-underline transition-colors hover:bg-[#6ff8cf] hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function BrandPage() {
  return (
    <div className="pb-24 pt-12 sm:pt-20">
      <header className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-[#16f2b3]">
          Official brand assets
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Put grndlvl in the right place.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#d3d8e8]">
          Printer-safe sponsor marks for apparel and team materials, plus
          full lockups for larger digital placements. All download files are
          outlined SVG vectors with no font dependency.
        </p>
      </header>

      <section className="mt-16" aria-labelledby="apparel-heading">
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-pink-400">
            Start here
          </p>
          <h2 id="apparel-heading" className="mt-3 text-3xl font-bold text-white">
            Apparel and sponsor marks
          </h2>
          <p className="mt-4 leading-7 text-[#d3d8e8]">
            Use these compact marks for jerseys, embroidery, screen printing,
            and sponsor grids. The horizontal mark is the default choice and
            fits wide sponsor strips. If the slot is square—or the logos around
            it are crests and circles—use the badge below instead.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {sponsorMarks.map((mark) => (
            <article
              key={mark.src}
              className="overflow-hidden rounded-2xl border border-[#293052] bg-[#11162a]"
            >
              <div
                className={`flex min-h-52 items-center justify-center p-8 ${mark.surface}`}
              >
                <Image
                  src={mark.src}
                  alt={`${mark.name} on its recommended background`}
                  width={482}
                  height={120}
                  className="h-auto w-full max-w-[25rem]"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{mark.name}</h3>
                <p className="mt-2 leading-6 text-[#d3d8e8]">{mark.description}</p>
                <a href={mark.src} download className={`${downloadClasses} mt-5`}>
                  Download {mark.name.toLowerCase()} (SVG)
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="badge-heading">
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-pink-400">
            Square slots
          </p>
          <h2 id="badge-heading" className="mt-3 text-3xl font-bold text-white">
            Sponsor badge
          </h2>
          <p className="mt-4 leading-7 text-[#d3d8e8]">
            The same <code className="font-mono text-[#16f2b3]">&gt;_</code>{" "}
            prompt glyph used by the site icon, set above the name. Reach for
            this when a sponsor grid is built around badge-shaped logos and a
            wide strip would read as the odd one out.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sponsorBadges.map((badge) => (
            <article
              key={badge.src}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#293052] bg-[#11162a]"
            >
              <div
                className={`flex items-center justify-center p-8 ${badge.surface}`}
              >
                <Image
                  src={badge.src}
                  alt={`${badge.name} on its recommended background`}
                  width={220}
                  height={220}
                  className="h-auto w-full max-w-[10rem]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-white">{badge.name}</h3>
                <p className="mt-2 flex-1 leading-6 text-[#d3d8e8]">
                  {badge.description}
                </p>
                <a
                  href={badge.src}
                  download
                  aria-label={`Download SVG for the ${badge.name.toLowerCase()}`}
                  className={`${downloadClasses} mt-5 w-full`}
                >
                  Download SVG
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="usage-heading">
        <div className="rounded-2xl border border-[#353951] bg-[#11162a] p-6 sm:p-8">
          <h2 id="usage-heading" className="text-3xl font-bold text-white">
            Usage essentials
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-lg font-bold text-[#16f2b3]">Do</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[#d3d8e8] marker:text-[#16f2b3]">
                <li>Use white artwork on dark garments.</li>
                <li>Use black artwork on light garments.</li>
                <li>Match the shape to the slot—strip or square.</li>
                <li>Preserve the original proportions and clear space.</li>
                <li>Ask the decorator for a physical proof before production.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-lg font-bold text-pink-400">Avoid</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[#d3d8e8] marker:text-pink-400">
                <li>Do not stretch, crop, rotate, or redraw the mark.</li>
                <li>Do not add outlines, shadows, gradients, or effects.</li>
                <li>Do not use the descriptor lockup at small apparel sizes.</li>
                <li>Do not substitute fonts or retype the wordmark.</li>
              </ul>
            </div>
          </div>
          <p className="mt-8 border-t border-[#353951] pt-6 text-sm leading-6 text-[#aeb6ce]">
            Suggested minimum width: 1.5 in (38 mm). Production constraints
            vary, especially for embroidery, so the decorator&apos;s sewn or printed
            proof takes precedence.
          </p>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="digital-heading">
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-pink-400">
            Larger placements
          </p>
          <h2 id="digital-heading" className="mt-3 text-3xl font-bold text-white">
            Presentation lockups
          </h2>
          <p className="mt-4 leading-7 text-[#d3d8e8]">
            These versions explain the work—Applied AI, software, and web—and
            are intended for presentations, headers, and other placements where
            the descriptor stays comfortably readable.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {presentationLockups.map((lockup) => (
            <article
              key={lockup.src}
              className="overflow-hidden rounded-2xl border border-[#293052] bg-[#11162a]"
            >
              <div className="flex min-h-60 items-center justify-center bg-[#0d1224] p-6">
                <Image
                  src={lockup.src}
                  alt={`${lockup.name} preview`}
                  width={lockup.width}
                  height={lockup.height}
                  className="h-auto w-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{lockup.name}</h3>
                <p className="mt-2 leading-6 text-[#d3d8e8]">
                  {lockup.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {lockup.variants.map(([label, href]) => (
                    <a key={href} href={href} download className={downloadClasses}>
                      Download {label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="mt-20 rounded-2xl border border-[#293052] bg-gradient-to-br from-[#11162a] to-[#171b35] p-6 sm:p-8"
        aria-labelledby="colors-heading"
      >
        <h2 id="colors-heading" className="text-3xl font-bold text-white">
          Brand colors
        </h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Navy", "#0d1224", "bg-[#0d1224]", "border-white/20"],
            ["Green", "#16f2b3", "bg-[#16f2b3]", "border-transparent"],
            ["Pink", "#ec4899", "bg-[#ec4899]", "border-transparent"],
            ["Slate", "#cbd5e1", "bg-[#cbd5e1]", "border-transparent"],
          ].map(([name, value, color, border]) => (
            <div key={value} className="rounded-xl border border-[#353951] bg-[#0d1224] p-4">
              <div
                className={`h-16 rounded-lg border ${color} ${border}`}
                aria-hidden="true"
              />
              <dt className="mt-3 font-bold text-white">{name}</dt>
              <dd className="mt-1 font-mono text-sm text-[#d3d8e8]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <aside className="mt-12 rounded-2xl border border-[#16f2b3]/40 bg-[#16f2b3]/5 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white">Not sure which file to send?</h2>
        <p className="mt-3 max-w-3xl leading-7 text-[#d3d8e8]">
          Send both compact apparel SVGs to the printer or team coordinator.
          They can choose the white or black artwork based on the garment color.
        </p>
      </aside>
    </div>
  );
}
