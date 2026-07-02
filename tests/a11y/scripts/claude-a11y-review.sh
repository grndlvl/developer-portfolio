#!/usr/bin/env bash
# Claude Code Accessibility Review
#
# Uses the Claude Code CLI to perform AI-powered WCAG 2.2 AA review. The wrapper
# gathers context (changed files, live-browser evidence, or machine artifacts),
# invokes `claude -p`, and writes the Markdown report itself. Claude is NEVER
# asked to write files — it returns Markdown on stdout.
#
# Non-interactive mode uses `claude -p`. In local Claude auth mode it bills via
# your local session; in CI/API mode it bills via ANTHROPIC_API_KEY. See the
# Anthropic Agent SDK / non-interactive billing docs for cost behavior.
#
# Usage:
#   bash claude-a11y-review.sh --review-scope changed [--base-ref REF] [--output FILE]
#   bash claude-a11y-review.sh --review-scope staged [--output FILE]
#   bash claude-a11y-review.sh --review-scope full [--output FILE]
#   bash claude-a11y-review.sh --review-scope browser-artifacts [--output FILE]
#   bash claude-a11y-review.sh --review-scope browser [--site ID|--sites CSV] [--claude-url-limit N|all]
#
# Aliases: --changed-files→changed, --staged-files→staged, --release→full,
#          --live-browser→browser, --browser-report→browser-artifacts.

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

MODE=""
OUTPUT=""
SITES_ARG=""
URL_LIMIT="5"
BASE_REF="HEAD"

while [[ $# -gt 0 ]]; do
  case $1 in
    --review-scope) MODE="$2"; shift 2 ;;
    --review-scope=*) MODE="${1#--review-scope=}"; shift ;;
    --changed-files) MODE="changed"; shift ;;
    --staged-files) MODE="staged"; shift ;;
    --release) MODE="full"; shift ;;
    --live-browser) MODE="browser"; shift ;;
    --browser-report) MODE="browser-artifacts"; shift ;;
    --site) SITES_ARG="$2"; shift 2 ;;
    --site=*) SITES_ARG="${1#--site=}"; shift ;;
    --sites) SITES_ARG="$2"; shift 2 ;;
    --sites=*) SITES_ARG="${1#--sites=}"; shift ;;
    --claude-url-limit) URL_LIMIT="$2"; shift 2 ;;
    --claude-url-limit=*) URL_LIMIT="${1#--claude-url-limit=}"; shift ;;
    --output) OUTPUT="$2"; shift 2 ;;
    --output=*) OUTPUT="${1#--output=}"; shift ;;
    --base-ref) BASE_REF="$2"; shift 2 ;;
    --base-ref=*) BASE_REF="${1#--base-ref=}"; shift ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done

if [ -z "$MODE" ]; then
  echo "Usage: bash claude-a11y-review.sh --review-scope <changed|staged|full|browser|browser-artifacts> [--site ID|--sites CSV] [--claude-url-limit N|all] [--base-ref REF] [--output FILE]" >&2
  exit 1
fi

case "$MODE" in
  changed|staged|full|browser|browser-artifacts) ;;
  *) echo "Invalid --review-scope='$MODE'. Valid: changed, staged, full, browser, browser-artifacts." >&2; exit 1 ;;
esac

# ── Preconditions ──────────────────────────────────────────────
if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
  echo -e "${RED}Error: ANTHROPIC_API_KEY environment variable is not set.${NC}" >&2
  echo "Set it in your shell or CI environment to use Claude AI review." >&2
  exit 1
fi

if ! command -v claude &> /dev/null; then
  echo -e "${RED}Error: 'claude' CLI not found.${NC}" >&2
  echo "Install Claude Code: https://docs.anthropic.com/en/docs/claude-code/overview" >&2
  exit 1
fi

# ── Locations ──────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
A11Y_ROOT="$(dirname "$SCRIPT_DIR")"          # tests/a11y
SITES_CONFIG="$A11Y_ROOT/sites.config.js"
URLS_JSON="$A11Y_ROOT/configs/a11y-urls.json"
REPORTS_DIR="$A11Y_ROOT/reports"
EVIDENCE_DIR="$REPORTS_DIR/evidence"
mkdir -p "$REPORTS_DIR"

# ── Skill context block ────────────────────────────────────────
# Prefer ~/.claude/ copies in local auth mode; fall back to project-vendored
# .claude/ so the review is reproducible in CI and for every developer.
build_skills_block() {
  local block=""
  local rel
  for rel in \
    "skills/accessibility-standards/SKILL.md" \
    "skills/a11y-critic/SKILL.md"; do
    local local_path="$HOME/.claude/$rel"
    local project_path=".claude/$rel"
    local chosen=""
    if [ -f "$local_path" ]; then chosen="$local_path"; elif [ -f "$project_path" ]; then chosen="$project_path"; fi
    if [ -n "$chosen" ]; then
      block+=$'\n\n=== '"$rel"$' ===\n'
      block+="$(cat "$chosen")"
    fi
  done
  # Any vendored meta a11y skills under .claude/a11y-skills/ (project first, then home).
  local skills_dir=""
  if [ -d ".claude/a11y-skills" ]; then skills_dir=".claude/a11y-skills"; elif [ -d "$HOME/.claude/a11y-skills" ]; then skills_dir="$HOME/.claude/a11y-skills"; fi
  if [ -n "$skills_dir" ]; then
    local f
    while IFS= read -r f; do
      block+=$'\n\n=== '"$f"$' ===\n'
      block+="$(cat "$f")"
    done < <(find "$skills_dir" -type f \( -name '*.md' -o -name '*.txt' \) | sort)
  fi
  printf '%s' "$block"
}

SKILLS_BLOCK="$(build_skills_block)"
SKILLS_PREAMBLE=""
if [ -n "$SKILLS_BLOCK" ]; then
  SKILLS_PREAMBLE="Apply the following Zivtech accessibility standards and review skills as your rubric:
$SKILLS_BLOCK

────────────────────────────────────────────
"
fi

# Run claude and write Markdown to a report file (never let claude write files).
run_claude_to_file() {
  local prompt="$1"
  local outfile="$2"
  if claude -p "$prompt" > "$outfile"; then
    echo -e "${GREEN}Review written to $outfile${NC}"
    return 0
  else
    echo -e "${RED}Claude review failed.${NC}" >&2
    return 1
  fi
}

# ── Code scopes: changed / staged ──────────────────────────────
collect_diff_files() {
  local diff_cmd="$1"
  # Array + quoted expansion so the shell never glob-expands these against the
  # CWD before git sees them — they must reach git as literal pathspecs.
  local -a patterns=('*.jsx' '*.tsx' '*.js' '*.ts' '*.twig' '*.css' '*.scss' '*.html' '*.php' '*.vue' '*.svelte')
  local collected=""
  local pattern files
  for pattern in "${patterns[@]}"; do
    files=$(eval "$diff_cmd -- '$pattern'" 2>/dev/null || true)
    if [ -n "$files" ]; then
      collected="$collected $files"
    fi
  done
  printf '%s' "$collected"
}

code_review() {
  local files="$1"
  local label="$2"
  local outfile="$3"

  local prompt="${SKILLS_PREAMBLE}Review these $label files for WCAG 2.2 Level AA accessibility issues. Focus on:
- ARIA correctness and completeness
- Alt text quality (not just presence)
- Heading hierarchy
- Form labels and error messages
- Focus management for dynamic content
- Touch targets (24x24 minimum)
- Keyboard equivalents for mouse interactions
- Color contrast indicators

Files to review:
$files

For each issue found, report:
1. File and line number
2. WCAG success criterion violated
3. Severity (critical/serious/moderate/minor)
4. Specific fix recommendation

Output as markdown."

  run_claude_to_file "$prompt" "$outfile"
}

if [ "$MODE" = "changed" ] || [ "$MODE" = "staged" ]; then
  if [ "$MODE" = "changed" ]; then
    echo -e "${BLUE}Running changed-files accessibility review (base: $BASE_REF)...${NC}"
    DIFF_CMD="git diff --name-only --diff-filter=ACMR $BASE_REF"
    LABEL="changed"
    DEFAULT_OUT="a11y-pr-review.md"
  else
    echo -e "${BLUE}Running staged-files accessibility review...${NC}"
    DIFF_CMD="git diff --cached --name-only --diff-filter=ACMR"
    LABEL="staged"
    DEFAULT_OUT="a11y-staged-review.md"
  fi

  CHANGED_FILES="$(collect_diff_files "$DIFF_CMD")"
  if [ -z "${CHANGED_FILES// /}" ]; then
    echo -e "${GREEN}No $LABEL frontend files to review.${NC}"
    exit 0
  fi

  OUTPUT="${OUTPUT:-$DEFAULT_OUT}"
  code_review "$CHANGED_FILES" "$LABEL" "$OUTPUT"
  exit $?
fi

# ── full: cross-page release review ────────────────────────────
if [ "$MODE" = "full" ]; then
  echo -e "${BLUE}Running release-level accessibility review...${NC}"
  OUTPUT="${OUTPUT:-a11y-release-review.md}"

  PROMPT="${SKILLS_PREAMBLE}Perform a release-level WCAG 2.2 Level AA accessibility review. Focus on cross-page issues:
- Navigation consistency across page templates (3.2.3)
- Consistent identification of same functions across pages (3.2.4)
- Multiple ways to reach each page — nav, search, sitemap (2.4.5)
- Skip-to-content link on every page
- Heading structure consistency across templates
- Multi-step forms not re-asking for previously entered info (3.3.7)
- Auth flows not requiring cognitive function tests (3.3.8)
- Help mechanism in same relative position across pages (3.2.6)
- DOM order matching visual order across layouts

Review the project's template files and page components for these cross-cutting concerns.

For each issue found, report:
1. Affected files/templates
2. WCAG success criterion violated
3. Severity (critical/serious/moderate/minor)
4. Specific fix recommendation

Output as markdown."

  run_claude_to_file "$PROMPT" "$OUTPUT"
  exit $?
fi

# ── browser-artifacts: triage machine evidence only ────────────
if [ "$MODE" = "browser-artifacts" ]; then
  echo -e "${BLUE}Running artifact triage (machine evidence only)...${NC}"
  OUTPUT="${OUTPUT:-a11y-artifact-review.md}"

  ARTIFACTS=""
  for dir in "$REPORTS_DIR" "test-results" "$A11Y_ROOT/reports"; do
    [ -d "$dir" ] || continue
    while IFS= read -r f; do
      ARTIFACTS="$ARTIFACTS"$'\n'"$f"
    done < <(find "$dir" -type f \( -name '*.json' -o -name '*axe*' -o -name '*pa11y*' -o -name '*.xml' \) 2>/dev/null | sort -u)
  done
  # Any stray axe/pa11y json output at the repo root.
  while IFS= read -r f; do
    ARTIFACTS="$ARTIFACTS"$'\n'"$f"
  done < <(find . -maxdepth 3 -type f \( -name '*axe*.json' -o -name '*pa11y*.json' \) 2>/dev/null | sort -u)

  # De-dupe and drop empties.
  ARTIFACTS="$(printf '%s\n' "$ARTIFACTS" | grep -v '^$' | sort -u || true)"

  if [ -z "$ARTIFACTS" ]; then
    echo -e "${YELLOW}No audit artifacts found to triage${NC}"
    exit 0
  fi

  ARTIFACT_CONTENT=""
  while IFS= read -r f; do
    [ -f "$f" ] || continue
    ARTIFACT_CONTENT+=$'\n\n=== '"$f"$' ===\n'
    ARTIFACT_CONTENT+="$(head -c 200000 "$f")"
  done < <(printf '%s\n' "$ARTIFACTS")

  URL_CACHE=""
  if [ -f "$URLS_JSON" ]; then
    URL_CACHE=$'\n\n=== a11y-urls.json ===\n'"$(cat "$URLS_JSON")"
  fi

  PROMPT="${SKILLS_PREAMBLE}You are triaging MACHINE-GENERATED accessibility audit artifacts (axe-core and Pa11y output) plus the URL cache. You did NOT inspect live pages and you have NO browser access in this review. State this explicitly at the top of your report: 'This review covers machine-generated audit artifacts only, not live pages.'

Group the findings into:
1. Root causes (shared components/templates likely responsible for clusters of violations)
2. Priorities (critical/serious/moderate/minor by WCAG impact)
3. Jira-ready remediation items (title, affected URLs/selectors, WCAG SC, suggested fix, estimate hint)

Do NOT invent issues beyond what the artifacts show.

Artifacts:
$ARTIFACT_CONTENT
$URL_CACHE

Output as markdown."

  run_claude_to_file "$PROMPT" "$OUTPUT"
  exit $?
fi

# ── browser: live rendered-page review with evidence capture ───
if [ "$MODE" = "browser" ]; then
  echo -e "${BLUE}Running live-browser accessibility review...${NC}"

  # Fail fast if Playwright/Chromium cannot launch in this runtime.
  echo -e "${BLUE}Checking Playwright/Chromium availability...${NC}"
  if ! node -e "
    const { chromium } = require('@playwright/test');
    (async () => {
      const b = await chromium.launch({ args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage'] });
      await b.close();
    })().catch((e) => { console.error(e && e.message ? e.message : e); process.exit(1); });
  "; then
    echo -e "${RED}Playwright/Chromium cannot launch in this runtime. Aborting live browser review.${NC}" >&2
    echo "Install browsers with: npx playwright install --with-deps chromium" >&2
    exit 1
  fi

  # Determine the sites/URLs to visit. Multisite via sites.config.js; otherwise
  # a single default site driven by BASE_URL + a11y-urls.json (full set, capped).
  SITE_PLAN_JSON=""
  if [ -f "$SITES_CONFIG" ]; then
    [ -n "$SITES_ARG" ] && export A11Y_SITES="$SITES_ARG"
    SITE_PLAN_JSON="$(node -e "
      const cfg = require('$SITES_CONFIG');
      const limit = '$URL_LIMIT';
      const plan = cfg.sites().map((s) => ({
        id: s.id,
        label: s.label || s.id,
        pages: cfg.representativePages(s.id, limit),
      }));
      process.stdout.write(JSON.stringify(plan));
    ")"
  else
    if [ -z "${BASE_URL:-}" ]; then
      echo -e "${RED}No sites.config.js and BASE_URL is unset. Set BASE_URL for the single-site live review.${NC}" >&2
      exit 1
    fi
    if [ ! -f "$URLS_JSON" ]; then
      echo -e "${RED}No sites.config.js and no $URLS_JSON. Cannot determine URLs for live review.${NC}" >&2
      exit 1
    fi
    SITE_PLAN_JSON="$(BASE_URL="$BASE_URL" URL_LIMIT="$URL_LIMIT" node -e "
      const fs = require('fs');
      const data = JSON.parse(fs.readFileSync('$URLS_JSON','utf-8'));
      const base = process.env.BASE_URL.replace(/\/+\$/,'');
      const limit = process.env.URL_LIMIT === 'all' ? Infinity : (Number(process.env.URL_LIMIT) > 0 ? Number(process.env.URL_LIMIT) : 5);
      const full = data.full || [];
      const pages = full.slice(0, limit === Infinity ? undefined : limit).map((e) => ({
        name: e.name, path: e.path, url: base + (e.path.startsWith('/') ? e.path : '/' + e.path),
      }));
      process.stdout.write(JSON.stringify([{ id: 'default', label: 'Site', pages }]));
    ")"
  fi

  if [ -z "$SITE_PLAN_JSON" ] || [ "$SITE_PLAN_JSON" = "[]" ]; then
    echo -e "${RED}No sites/URLs resolved for live browser review.${NC}" >&2
    exit 1
  fi

  # Fail-fast: any per-site failure below exits non-zero immediately. If every
  # site's review succeeds, we fall through to exit 0.
  SITE_IDS="$(printf '%s' "$SITE_PLAN_JSON" | node -e "
    let s=''; process.stdin.on('data', d => s+=d); process.stdin.on('end', () => {
      JSON.parse(s).forEach(site => console.log(site.id));
    });
  ")"

  while IFS= read -r SITE_ID; do
    [ -n "$SITE_ID" ] || continue
    SITE_EVIDENCE_DIR="$EVIDENCE_DIR/$SITE_ID"
    mkdir -p "$SITE_EVIDENCE_DIR"

    echo -e "${BLUE}Capturing live evidence for site '$SITE_ID'...${NC}"

    # Inline Playwright + axe-core capture: screenshot, DOM snapshot, axe JSON per URL.
    if ! SITE_PLAN_JSON="$SITE_PLAN_JSON" SITE_ID="$SITE_ID" EVIDENCE_DIR="$SITE_EVIDENCE_DIR" node <<'NODE'
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default || require('@axe-core/playwright');

(async () => {
  const plan = JSON.parse(process.env.SITE_PLAN_JSON);
  const siteId = process.env.SITE_ID;
  const evidenceDir = process.env.EVIDENCE_DIR;
  const site = plan.find((s) => s.id === siteId);
  if (!site || !site.pages || site.pages.length === 0) {
    console.error(`No pages to capture for site ${siteId}`);
    process.exit(2);
  }

  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const context = await browser.newContext();
  let captured = 0;

  for (let i = 0; i < site.pages.length; i++) {
    const p = site.pages[i];
    const slug = (p.name || `page-${i}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `page-${i}`;
    const page = await context.newPage();
    try {
      // 'load' (not 'networkidle') — marketing sites with chat widgets/ads/websockets
      // often never reach network idle, which would falsely fail otherwise-fine pages.
      await page.goto(p.url, { waitUntil: 'load', timeout: 45000 });
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(evidenceDir, `${slug}.png`), fullPage: true });
      const html = await page.content();
      fs.writeFileSync(path.join(evidenceDir, `${slug}.html`), html);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      fs.writeFileSync(
        path.join(evidenceDir, `${slug}.axe.json`),
        JSON.stringify({ name: p.name, url: p.url, violations: results.violations }, null, 2)
      );
      captured++;
      console.error(`  captured ${p.url}`);
    } catch (err) {
      console.error(`  FAILED ${p.url}: ${err && err.message ? err.message : err}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  if (captured === 0) {
    console.error('No evidence captured for any URL.');
    process.exit(3);
  }
})().catch((e) => { console.error(e && e.message ? e.message : e); process.exit(1); });
NODE
    then
      echo -e "${RED}Live evidence capture failed for site '$SITE_ID'. Failing the stage.${NC}" >&2
      exit 1
    fi

    # Confirm evidence actually landed on disk.
    if [ -z "$(find "$SITE_EVIDENCE_DIR" -type f 2>/dev/null)" ]; then
      echo -e "${RED}No evidence files produced for site '$SITE_ID'. Failing the stage.${NC}" >&2
      exit 1
    fi

    # Assemble evidence for the prompt: axe JSON + DOM snapshots, plus screenshot paths.
    EVIDENCE_TEXT=""
    while IFS= read -r f; do
      EVIDENCE_TEXT+=$'\n\n=== '"$f"$' ===\n'
      EVIDENCE_TEXT+="$(head -c 120000 "$f")"
    done < <(find "$SITE_EVIDENCE_DIR" -type f \( -name '*.axe.json' -o -name '*.html' \) | sort)

    SCREENSHOT_LIST="$(find "$SITE_EVIDENCE_DIR" -type f -name '*.png' | sort)"

    SITE_OUTPUT="a11y-browser-review-$SITE_ID.md"
    PROMPT="${SKILLS_PREAMBLE}You are reviewing LIVE rendered-page accessibility evidence captured by Playwright + axe-core for site '$SITE_ID'. Evidence files (axe JSON results, DOM/HTML snapshots) are included below; screenshots were also captured at these paths:
$SCREENSHOT_LIST

Perform a WCAG 2.2 Level AA review grounded in this live evidence. For each issue:
1. URL and selector
2. WCAG success criterion violated
3. Severity (critical/serious/moderate/minor)
4. Specific fix recommendation

Captured live evidence:
$EVIDENCE_TEXT

Output as markdown. If you were given no usable live evidence, respond with exactly: NO LIVE BROWSER EVIDENCE"

    if ! claude -p "$PROMPT" > "$SITE_OUTPUT"; then
      echo -e "${RED}Claude review failed for site '$SITE_ID'.${NC}" >&2
      exit 1
    fi

    if grep -q "NO LIVE BROWSER EVIDENCE" "$SITE_OUTPUT"; then
      echo -e "${RED}Claude reported NO LIVE BROWSER EVIDENCE for site '$SITE_ID'. Failing the stage.${NC}" >&2
      exit 1
    fi

    echo -e "${GREEN}Live browser review for '$SITE_ID' written to $SITE_OUTPUT${NC}"
  done <<< "$SITE_IDS"

  exit 0
fi
