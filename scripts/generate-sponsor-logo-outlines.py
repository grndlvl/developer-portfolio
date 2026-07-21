#!/usr/bin/env python3
"""Generate printer-safe sponsor logos with all lettering converted to paths."""

from pathlib import Path
import re
import subprocess
import tempfile


ROOT = Path(__file__).resolve().parents[1]
BRAND_DIR = ROOT / "public" / "brand"
FONT = "JetBrains Mono Nerd Font Bold"
DESCRIPTOR = "APPLIED AI · SOFTWARE · WEB"


def outlined_text(text, size, color, spacing, x, y, prefix):
    """Return a nested SVG whose glyphs are paths rather than live text."""
    with tempfile.NamedTemporaryFile(suffix=".svg") as output:
        command = [
            "pango-view",
            "--no-display",
            "--pixels",
            f"--font={FONT} {size}",
            f"--foreground={color}",
            "--background=transparent",
            "--margin=0",
        ]
        if spacing:
            command.extend(
                [
                    "--markup",
                    f"--text=<span letter_spacing=\"{spacing * 1024}\">{text}</span>",
                ]
            )
        else:
            command.append(f"--text={text}")
        command.append(f"--output={output.name}")
        subprocess.run(command, check=True)
        svg = Path(output.name).read_text()

    svg = re.sub(r"<\?xml[^>]+>\s*", "", svg)
    svg = svg.replace("glyph-0-", f"{prefix}-glyph-")
    svg = svg.replace("<svg ", f'<svg x="{x}" y="{y}" ', 1)
    return svg.strip()


def build_logo(filename, *, stacked, ink, background=None, full_color=False):
    width, height = (560, 220) if stacked else (760, 180)
    if stacked:
        caret = "M64 42 L88 66 L64 90"
        caret_color = "#ec4899" if full_color else ink
        word_color = "#16f2b3" if full_color else ink
        word_x, word_y = 120, 14
        cursor = '<rect x="486" y="38" width="26" height="56" rx="2"'
        divider = '<line x1="64" y1="124" x2="512" y2="124"'
        descriptor_size, descriptor_spacing = 23, 3
        descriptor_width = 467
        descriptor_x, descriptor_y = (width - descriptor_width) / 2, 139
    else:
        caret = "M30 38 L54 62 L30 86"
        caret_color = "#ec4899" if full_color else ink
        word_color = "#16f2b3" if full_color else ink
        word_x, word_y = 86, 14
        cursor = '<rect x="452" y="34" width="26" height="56" rx="2"'
        divider = '<line x1="30" y1="116" x2="478" y2="116"'
        descriptor_size, descriptor_spacing = 25, 4
        descriptor_x, descriptor_y = 30, 121

    detail_color = "#cbd5e1" if full_color else ink
    divider_color = "#64748b" if full_color else ink
    word = outlined_text("grndlvl", 72, word_color, 0, word_x, word_y, "word")
    descriptor = outlined_text(
        DESCRIPTOR,
        descriptor_size,
        detail_color,
        descriptor_spacing,
        descriptor_x,
        descriptor_y,
        "descriptor",
    )
    background_rect = (
        f'  <rect width="{width}" height="{height}" fill="{background}"/>\n'
        if background
        else ""
    )
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">grndlvl — Applied AI, Software, Web</title>
  <desc id="desc">A printer-safe grndlvl sponsor logo with outlined lettering.</desc>
{background_rect}  <path d="{caret}" fill="none" stroke="{caret_color}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  {cursor} fill="{word_color}"/>
  {divider} stroke="{divider_color}" stroke-width="2"/>
  {word}
  {descriptor}
</svg>
'''
    (BRAND_DIR / filename).write_text(svg)


def build_sponsor_mark(filename, ink):
    """Build the compact one-color mark intended for apparel and sponsor grids."""
    width, height = 482, 120
    word = outlined_text("grndlvl", 72, ink, 0, 70, 12, "word")
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">grndlvl</title>
  <desc id="desc">A compact, printer-safe grndlvl sponsor mark with outlined lettering.</desc>
  <path d="M24 36 L48 60 L24 84" fill="none" stroke="{ink}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  {word}
  <rect x="436" y="32" width="26" height="56" rx="2" fill="{ink}"/>
</svg>
'''
    (BRAND_DIR / filename).write_text(svg)


def build_color_sponsor_mark(filename, background=None):
    """Build the compact sponsor mark in the primary brand colors."""
    width, height = 482, 120
    word = outlined_text("grndlvl", 72, "#16f2b3", 0, 70, 12, "word")
    background_rect = (
        f'  <rect width="{width}" height="{height}" fill="{background}"/>\n'
        if background
        else ""
    )
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">grndlvl</title>
  <desc id="desc">A compact, full-color grndlvl sponsor mark with outlined lettering.</desc>
{background_rect}  <path d="M24 36 L48 60 L24 84" fill="none" stroke="#ec4899" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  {word}
  <rect x="436" y="32" width="26" height="56" rx="2" fill="#16f2b3"/>
</svg>
'''
    (BRAND_DIR / filename).write_text(svg)


def main():
    variants = [
        ("sponsor-lockup-print.svg", False, "#cbd5e1", None, True),
        ("sponsor-lockup-light-print.svg", False, "#ffffff", None, False),
        ("sponsor-lockup-dark-print.svg", False, "#0d1224", None, False),
        ("sponsor-lockup-on-dark-print.svg", False, "#cbd5e1", "#0d1224", True),
        ("sponsor-lockup-stacked-print.svg", True, "#cbd5e1", None, True),
        ("sponsor-lockup-stacked-light-print.svg", True, "#ffffff", None, False),
        ("sponsor-lockup-stacked-dark-print.svg", True, "#0d1224", None, False),
        ("sponsor-lockup-stacked-on-dark-print.svg", True, "#cbd5e1", "#0d1224", True),
    ]
    for filename, stacked, ink, background, full_color in variants:
        build_logo(
            filename,
            stacked=stacked,
            ink=ink,
            background=background,
            full_color=full_color,
        )
    build_sponsor_mark("sponsor-mark-light-print.svg", "#ffffff")
    build_sponsor_mark("sponsor-mark-dark-print.svg", "#0d1224")
    build_sponsor_mark("sponsor-mark-black-print.svg", "#000000")
    build_color_sponsor_mark("sponsor-mark-color-print.svg")
    build_color_sponsor_mark("sponsor-mark-color-on-dark-print.svg", "#0d1224")

    build_logo(
        "sponsor-lockup-white-print.svg",
        stacked=False,
        ink="#ffffff",
    )
    build_logo(
        "sponsor-lockup-black-print.svg",
        stacked=False,
        ink="#000000",
    )
    build_logo(
        "sponsor-lockup-stacked-white-print.svg",
        stacked=True,
        ink="#ffffff",
    )
    build_logo(
        "sponsor-lockup-stacked-black-print.svg",
        stacked=True,
        ink="#000000",
    )


if __name__ == "__main__":
    main()
