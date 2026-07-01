// @flow strict
"use client";
import { usePathname } from 'next/navigation';
import Link from "next/link";


function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith('/links')) {
    return null;
  }
  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            aria-label="grndlvl — home"
            className="font-mono text-[#16f2b3] text-3xl font-bold tracking-tight">
            <span aria-hidden="true" className="text-pink-500">▸ </span>grndlvl
          </Link>
        </div>

        <ul className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100" id="navbar-default">
          <li>
            <Link className="block px-4 py-3 no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="/#ai-expertise">
              <span className="text-sm text-white transition-colors duration-300 hover:text-pink-500">AI EXPERTISE</span>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-3 no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="/#selected-impact">
              <span className="text-sm text-white transition-colors duration-300 hover:text-pink-500">IMPACT</span>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-3 no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="/#about">
              <span className="text-sm text-white transition-colors duration-300 hover:text-pink-500">ABOUT</span>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-3 no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="/#experience"><span className="text-sm text-white transition-colors duration-300 hover:text-pink-500">EXPERIENCE</span></Link>
          </li>
          <li>
            <Link className="block px-4 py-3 no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="/#skills"><span className="text-sm text-white transition-colors duration-300 hover:text-pink-500">SKILLS</span></Link>
          </li>
          <li>
            <Link
              className="block px-4 py-3 no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="/#education"
            >
              <span className="text-sm text-white transition-colors duration-300 hover:text-pink-500">
                EDUCATION
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-3 no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="/links"
            >
              <span className="text-sm text-white transition-colors duration-300 hover:text-pink-500">
                LINKS
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
