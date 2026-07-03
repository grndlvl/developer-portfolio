// @flow strict

import Image from "next/image";

// Browser-window chrome that echoes the homepage hero's code-editor card, used
// to frame real launch-site screenshots.
export function BrowserFrame({ src, alt, label, width, height, priority = false, className = "" }) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-[#293164] bg-[#0a0d27]/90 shadow-2xl shadow-violet-950/40 ${className}`}
    >
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600" />
      <div className="flex items-center gap-3 border-b border-indigo-900/80 px-4 py-3">
        <div className="flex gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-green-300" />
        </div>
        {label && (
          <span className="truncate rounded-md bg-white/5 px-3 py-1 font-mono text-xs text-gray-400">
            {label}
          </span>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-full"
      />
    </figure>
  );
}

// Phone bezel that frames a mobile screenshot -- pairs with BrowserFrame to
// show the same site responsive across devices.
export function PhoneFrame({ src, alt, width, height, className = "" }) {
  return (
    <figure
      className={`overflow-hidden rounded-[1.75rem] border-4 border-[#1b2140] bg-[#0a0d27] p-1 shadow-2xl shadow-black/50 ${className}`}
    >
      <div className="overflow-hidden rounded-[1.4rem]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
        />
      </div>
    </figure>
  );
}
