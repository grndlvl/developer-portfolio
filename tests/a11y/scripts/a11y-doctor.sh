#!/usr/bin/env bash
# a11y-doctor — self-check for the tests/a11y harness.
# Verifies canonical files exist, Node/shell files parse, the root shim is
# executable, and the URL source-of-truth is valid with no leftover TODOs.

set -uo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
FAIL=0

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
A11Y_ROOT="$(dirname "$SCRIPT_DIR")"
REPO_ROOT="$(dirname "$(dirname "$A11Y_ROOT")")"

pass() { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}!${NC} $1"; }
err()  { echo -e "${RED}✗${NC} $1"; FAIL=1; }

check_file() { [ -f "$1" ] && pass "exists: ${1#$REPO_ROOT/}" || err "missing: ${1#$REPO_ROOT/}"; }

echo "── Harness files ──"
check_file "$A11Y_ROOT/.a11y-setup.yml"
check_file "$A11Y_ROOT/.nvmrc"
check_file "$A11Y_ROOT/configs/a11y-urls.json"
check_file "$A11Y_ROOT/configs/.pa11yci.cjs"
check_file "$A11Y_ROOT/configs/.stylelintrc.a11y.json"
check_file "$A11Y_ROOT/configs/.lintstagedrc.json"
check_file "$A11Y_ROOT/playwright.config.ts"
check_file "$A11Y_ROOT/tests/wcag-audit.spec.ts"
check_file "$A11Y_ROOT/scripts/a11y-audit.sh"
check_file "$A11Y_ROOT/scripts/claude-a11y-review.sh"
check_file "$REPO_ROOT/scripts/a11y-audit.sh"

echo "── Root shim ──"
if [ -x "$REPO_ROOT/scripts/a11y-audit.sh" ]; then pass "scripts/a11y-audit.sh is executable"; else err "scripts/a11y-audit.sh not executable (chmod +x)"; fi

echo "── Shell syntax ──"
for s in "$A11Y_ROOT/scripts/a11y-audit.sh" "$A11Y_ROOT/scripts/a11y-doctor.sh" "$A11Y_ROOT/scripts/claude-a11y-review.sh" "$REPO_ROOT/scripts/a11y-audit.sh"; do
  if bash -n "$s" 2>/dev/null; then pass "bash -n ${s#$REPO_ROOT/}"; else err "syntax error: ${s#$REPO_ROOT/}"; fi
done

echo "── Node syntax ──"
if node --check "$A11Y_ROOT/configs/.pa11yci.cjs" 2>/dev/null; then pass "node --check .pa11yci.cjs"; else err "syntax error: .pa11yci.cjs"; fi

echo "── URL source of truth ──"
URLS_JSON="$A11Y_ROOT/configs/a11y-urls.json"
if node -e '
  const c = require(process.argv[1]);
  for (const scope of ["pr","full"]) {
    if (!Array.isArray(c[scope]) || c[scope].length === 0) { console.error("empty scope: "+scope); process.exit(1); }
    for (const p of c[scope]) {
      if (!p.path || /TODO_/.test(p.path) || /TODO_/.test(p.name||"")) { console.error("TODO/invalid entry in "+scope); process.exit(1); }
    }
  }
' "$URLS_JSON" 2>/dev/null; then pass "a11y-urls.json valid (pr + full populated, no TODOs)"; else err "a11y-urls.json invalid or contains TODO entries"; fi

echo ""
if [ "$FAIL" -eq 0 ]; then echo -e "${GREEN}a11y-doctor: all checks passed${NC}"; else echo -e "${RED}a11y-doctor: failures found (see above)${NC}"; fi
exit $FAIL
