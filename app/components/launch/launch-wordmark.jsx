// @flow strict

import { TbRocket } from "react-icons/tb";

// Just the "Launch" product badge (rocket + label). Use where the parent
// grndlvl brand is already present (e.g. the /launch hero, directly under the
// navbar wordmark) so the full lockup isn't duplicated. Scales with font-size.
export function LaunchBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-[0.4em] rounded-md bg-[#16f2b3]/10 px-[0.6em] py-[0.25em] font-mono font-semibold uppercase tracking-[0.18em] text-[#16f2b3] ring-1 ring-inset ring-[#16f2b3]/30 ${className}`}
    >
      <TbRocket aria-hidden="true" className="-rotate-45" />
      Launch
    </span>
  );
}

// Full sub-brand lockup: the parent grndlvl wordmark (▸ glyph + name) plus the
// Launch badge. Use where the parent brand is NOT already adjacent (e.g. the
// homepage teaser). Everything scales with the parent font-size.
function LaunchWordmark({ className = "", as: Tag = "span" }) {
  return (
    <Tag
      className={`inline-flex items-center font-mono font-bold tracking-tight ${className}`}
    >
      <span aria-hidden="true" className="text-pink-500">
        ▸
      </span>
      <span className="ml-[0.4em] text-[#16f2b3]">grndlvl</span>
      <LaunchBadge className="ml-[0.5em] text-[0.7em]" />
    </Tag>
  );
}

export default LaunchWordmark;
