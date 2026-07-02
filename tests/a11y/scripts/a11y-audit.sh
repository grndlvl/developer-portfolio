#!/usr/bin/env bash
# Accessibility audit runner — the single entrypoint used by Lando/DDEV, Probo, and GitHub Actions.
#
# Usage:
#   bash a11y-audit.sh                                      # Full audit (lint + axe + pa11y, full URL set)
#   bash a11y-audit.sh --scope=pr --tools=axe --no-lint     # PR-scope axe only (what Probo runs)
#   bash a11y-audit.sh --scope=full --tools=axe,pa11y       # Full crawl (what the GH Actions cron runs)
#   bash a11y-audit.sh --lint-only                          # Linting only
#   bash a11y-audit.sh --claude                             # Full audit + Claude AI review
#   bash a11y-audit.sh --claude-only --claude-scope changed # Only the Claude review pass
#   bash a11y-audit.sh --target=dev2 --site=example         # Multisite slice on dev2
#   bash a11y-audit.sh --url http://localhost:3000          # Override base URL
#
# Flags:
#   --scope=pr|full         Which URL set to test (read from configs/a11y-urls.json). Default: full.
#   --tools=axe[,pa11y]     Which rendered-page tools to run. Default: axe,pa11y.
#   --lint-only             Run only the linting layer; skip rendered-page tests.
#   --no-lint               Skip the linting layer; run only rendered-page tests.
#   --claude                Add the Claude Code AI review pass at the end.
#   --claude-only           Run ONLY the Claude review pass (skips lint, axe, pa11y).
#   --claude-scope SCOPE    changed|staged|full|browser|browser-artifacts. Default: changed.
#   --claude-url-limit N    Max representative URLs per site for live browser review (N or 'all').
#   --target ENV            Environment key (local/dev2/prod/...) → exported as TARGET_ENV.
#   --site ID               Restrict multisite audits to one site id (multisite-only).
#   --sites IDS             Restrict multisite audits to a CSV of site ids (multisite-only).
#   --url URL               Override BASE_URL for Pa11y/Playwright (single-site path).
#
# --target/--site/--sites require the multisite harness (tests/a11y/sites.config.js +
# tests/a11y/configs/a11y-targets.json). Without it, --target only sets TARGET_ENV and
# BASE_URL/--url drives the single-site path; --site/--sites is an error.

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

SCOPE="${A11Y_SCOPE:-full}"
TOOLS="axe,pa11y"
LINT_ONLY=false
NO_LINT=false
RUN_CLAUDE=false
CLAUDE_ONLY=false
CLAUDE_SCOPE=""
CLAUDE_URL_LIMIT=""
TARGET_ARG=""
SITES_ARG=""
URL_OVERRIDE=""
RESULTS=()
EXIT_CODE=0

while [[ $# -gt 0 ]]; do
  case $1 in
    --scope=*) SCOPE="${1#--scope=}"; shift ;;
    --scope) SCOPE="$2"; shift 2 ;;
    --tools=*) TOOLS="${1#--tools=}"; shift ;;
    --tools) TOOLS="$2"; shift 2 ;;
    --lint-only) LINT_ONLY=true; shift ;;
    --no-lint) NO_LINT=true; shift ;;
    --claude) RUN_CLAUDE=true; shift ;;
    --claude-only) CLAUDE_ONLY=true; RUN_CLAUDE=true; shift ;;
    --claude-scope=*) CLAUDE_SCOPE="${1#--claude-scope=}"; shift ;;
    --claude-scope) CLAUDE_SCOPE="$2"; shift 2 ;;
    --claude-url-limit=*) CLAUDE_URL_LIMIT="${1#--claude-url-limit=}"; shift ;;
    --claude-url-limit) CLAUDE_URL_LIMIT="$2"; shift 2 ;;
    --target=*) TARGET_ARG="${1#--target=}"; shift ;;
    --target) TARGET_ARG="$2"; shift 2 ;;
    --site=*) SITES_ARG="${1#--site=}"; shift ;;
    --site) SITES_ARG="$2"; shift 2 ;;
    --sites=*) SITES_ARG="${1#--sites=}"; shift ;;
    --sites) SITES_ARG="$2"; shift 2 ;;
    --url=*) URL_OVERRIDE="${1#--url=}"; shift ;;
    --url) URL_OVERRIDE="$2"; shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# Resolve the harness root (parent of this script's dir): tests/a11y/.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
A11Y_ROOT="$(dirname "$SCRIPT_DIR")"

# Multisite if either the sites config module or the targets JSON exists.
if [ -f "$A11Y_ROOT/sites.config.js" ] || [ -f "$A11Y_ROOT/configs/a11y-targets.json" ]; then
  MULTISITE=true
else
  MULTISITE=false
fi

# --target sets TARGET_ENV for the JS config layer.
if [ -n "$TARGET_ARG" ]; then
  export TARGET_ENV="$TARGET_ARG"
  if [ "$MULTISITE" = false ]; then
    echo -e "${YELLOW}Note: no tests/a11y/configs/a11y-targets.json found; --target only sets TARGET_ENV.${NC}" >&2
    echo -e "${YELLOW}      The single-site harness uses BASE_URL/--url to choose the target.${NC}" >&2
  fi
fi

# --site/--sites restricts multisite audits; it is an error without the multisite harness.
if [ -n "$SITES_ARG" ]; then
  if [ "$MULTISITE" = true ]; then
    export A11Y_SITES="$SITES_ARG"
  else
    echo "--site/--sites is multisite-only; this project uses the single-site harness (a11y-urls.json). Add tests/a11y/configs/a11y-targets.json + tests/a11y/sites.config.js to enable multisite." >&2
    exit 1
  fi
fi

# Inherited BASE_URL flows through to Pa11y/Playwright by default.
# --url overrides it.
if [ -n "$URL_OVERRIDE" ]; then
  export BASE_URL="$URL_OVERRIDE"
fi

if [[ "$SCOPE" != "pr" && "$SCOPE" != "full" ]]; then
  echo "Invalid --scope='$SCOPE'. Valid: pr, full." >&2
  exit 1
fi

RUN_AXE=false
RUN_PA11Y=false
IFS=',' read -ra TOOL_LIST <<< "$TOOLS"
for t in "${TOOL_LIST[@]}"; do
  t="${t// /}"  # tolerate spaces around commas, e.g. --tools='axe, pa11y'
  case "$t" in
    axe) RUN_AXE=true ;;
    pa11y) RUN_PA11Y=true ;;
    *) echo "Invalid tool in --tools: '$t'. Valid: axe, pa11y." >&2; exit 1 ;;
  esac
done

export A11Y_SCOPE="$SCOPE"

log_step() {
  echo ""
  echo -e "${BLUE}${BOLD}━━━ $1 ━━━${NC}"
}

record_result() {
  RESULTS+=("$1|$2")
}

echo -e "${BOLD}Accessibility audit${NC} — scope=${SCOPE}, tools=${TOOLS}, lint=$([ "$NO_LINT" = true ] && echo skip || echo on)$([ "$LINT_ONLY" = true ] && echo " (lint-only)")"

# ══════════════════════════════════════════
# Layer 1: Linting
# ══════════════════════════════════════════

if [ "$NO_LINT" = false ] && [ "$CLAUDE_ONLY" = false ]; then
  log_step "Layer 1: ESLint jsx-a11y"
  # TODO_ESLINT_CMD: Customize ESLint command for your project
  # --no-error-on-unmatched-pattern: themes/projects with no JS files should pass, not fail
  # --max-warnings 0: match the a11y-lint.yml PR gate so local and CI verdicts agree
  if ESLINT_USE_FLAT_CONFIG=false npx eslint --config .eslintrc.json --no-error-on-unmatched-pattern --max-warnings 0 "app/**/*.{js,jsx}" "utils/**/*.{js,jsx}"; then
    record_result "ESLint jsx-a11y" "PASS"
  else
    record_result "ESLint jsx-a11y" "FAIL"
    EXIT_CODE=1
  fi

  log_step "Layer 1: Stylelint a11y"
  # TODO_STYLELINT_CMD: Customize Stylelint command for your project
  if npx stylelint --allow-empty-input --config tests/a11y/configs/.stylelintrc.a11y.json "app/**/*.{css,scss}" "styles/**/*.{css,scss}"; then
    record_result "Stylelint a11y" "PASS"
  else
    record_result "Stylelint a11y" "FAIL"
    EXIT_CODE=1
  fi

fi

if [ "$LINT_ONLY" = true ]; then
  log_step "Results (lint-only mode)"
else
  # ══════════════════════════════════════════
  # Layer 3: Rendered Page Testing
  # ══════════════════════════════════════════

  if [ "$RUN_AXE" = true ] && [ "$CLAUDE_ONLY" = false ]; then
    log_step "Layer 3: Playwright + axe-core (scope=$SCOPE)"
    # tests/a11y/playwright.config.ts: Path to playwright.a11y.config.ts
    if npx playwright test --config=tests/a11y/playwright.config.ts; then
      record_result "Playwright axe-core" "PASS"
    else
      record_result "Playwright axe-core" "FAIL"
      EXIT_CODE=1
    fi
  fi

  if [ "$RUN_PA11Y" = true ] && [ "$CLAUDE_ONLY" = false ]; then
    log_step "Layer 3: Pa11y-CI (scope=$SCOPE)"
    # tests/a11y/configs/.pa11yci.cjs: Path to .pa11yci.cjs
    if npx pa11y-ci --config tests/a11y/configs/.pa11yci.cjs; then
      record_result "Pa11y-CI" "PASS"
    else
      record_result "Pa11y-CI" "FAIL"
      EXIT_CODE=1
    fi
  fi

  # ══════════════════════════════════════════
  # Layer 4: Claude AI Review (optional)
  # ══════════════════════════════════════════

  if [ "$RUN_CLAUDE" = true ]; then
    log_step "Layer 4: Claude Code AI Review"
    if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
      echo -e "${YELLOW}Skipping Claude review — ANTHROPIC_API_KEY not set${NC}"
      record_result "Claude AI Review" "SKIP"
    else
      # Build the claude-a11y-review.sh invocation from the selected scope.
      claude_scope="${CLAUDE_SCOPE:-changed}"
      claude_args=(--review-scope "$claude_scope")
      [ -n "$SITES_ARG" ] && claude_args+=(--sites "$SITES_ARG")
      [ -n "$CLAUDE_URL_LIMIT" ] && claude_args+=(--claude-url-limit "$CLAUDE_URL_LIMIT")

      case "$claude_scope" in
        changed) CLAUDE_OUTPUT="a11y-pr-review.md" ;;
        staged) CLAUDE_OUTPUT="a11y-staged-review.md" ;;
        full) CLAUDE_OUTPUT="a11y-release-review.md" ;;
        browser) CLAUDE_OUTPUT="" ;;  # live browser writes one report PER SITE (a11y-browser-review-<site>.md); let it name them
        browser-artifacts) CLAUDE_OUTPUT="a11y-artifact-review.md" ;;
        *) echo "Invalid --claude-scope='$claude_scope'. Valid: changed, staged, full, browser, browser-artifacts." >&2; exit 1 ;;
      esac
      # Only pin --output for single-report scopes; browser scope self-names per site.
      [ -n "$CLAUDE_OUTPUT" ] && claude_args+=(--output "$CLAUDE_OUTPUT")

      # tests/a11y/scripts/claude-a11y-review.sh: Path to claude-a11y-review.sh
      if bash tests/a11y/scripts/claude-a11y-review.sh "${claude_args[@]}"; then
        record_result "Claude AI Review" "PASS"
      else
        record_result "Claude AI Review" "FAIL"
        EXIT_CODE=1
      fi
    fi
  fi

  log_step "Results"
fi

# ══════════════════════════════════════════
# Summary
# ══════════════════════════════════════════

echo ""
printf "${BOLD}%-25s %s${NC}\n" "Check" "Status"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for result in "${RESULTS[@]}"; do
  name=$(echo "$result" | cut -d'|' -f1)
  status=$(echo "$result" | cut -d'|' -f2)
  case $status in
    PASS) color=$GREEN ;;
    FAIL) color=$RED ;;
    SKIP) color=$YELLOW ;;
    *) color=$NC ;;
  esac
  printf "%-25s ${color}%s${NC}\n" "$name" "$status"
done
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

exit $EXIT_CODE
