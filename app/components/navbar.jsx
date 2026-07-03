// @flow strict
"use client";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useState } from "react";
import { TbMenu2, TbX } from "react-icons/tb";

const navLinks = [
  { href: "/#ai-expertise", label: "AI Expertise" },
  { href: "/#selected-impact", label: "Impact" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/launch", label: "Launch" },
  { href: "/links", label: "Links" },
];

function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith('/links')) {
    return null;
  }

  return (
    <nav className="relative bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            aria-label="grndlvl — home"
            className="font-mono text-2xl font-bold tracking-tight text-[#16f2b3] sm:text-3xl">
            <span aria-hidden="true" className="text-pink-500">▸ </span>grndlvl
          </Link>
        </div>

        <ul className="hidden lg:flex lg:items-center lg:space-x-1">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block whitespace-nowrap px-3 py-3 text-sm uppercase text-white no-underline transition-colors duration-300 hover:text-pink-500 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-white transition-colors hover:text-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
        >
          {open ? (
            <TbX size={26} aria-hidden="true" />
          ) : (
            <TbMenu2 size={26} aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <ul
          id="mobile-menu"
          className="absolute left-0 right-0 top-full z-50 flex flex-col gap-1 rounded-2xl border border-[#293052] bg-[#0d1224]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur lg:hidden"
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm uppercase text-white no-underline transition-colors hover:bg-white/5 hover:text-pink-500 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
