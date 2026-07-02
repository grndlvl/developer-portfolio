const fs = require('fs');
const path = require('path');

// Dynamically find Chrome binary from Puppeteer cache or Playwright installation.
// Avoids version mismatch errors between Pa11y's bundled Puppeteer and installed Chrome.
function findChromeBinary() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const cacheDir = process.env.PUPPETEER_CACHE_DIR || path.join(require('os').homedir(), '.cache', 'puppeteer');
  const chromeDir = path.join(cacheDir, 'chrome');
  if (fs.existsSync(chromeDir)) {
    const versions = fs.readdirSync(chromeDir).sort().reverse();
    for (const ver of versions) {
      const bin = path.join(chromeDir, ver, 'chrome-linux64', 'chrome');
      if (fs.existsSync(bin)) return bin;
    }
  }

  const pwCache = path.join(require('os').homedir(), '.cache', 'ms-playwright');
  if (fs.existsSync(pwCache)) {
    const dirs = fs.readdirSync(pwCache).filter(d => d.startsWith('chromium-')).sort().reverse();
    for (const dir of dirs) {
      const bin = path.join(pwCache, dir, 'chrome-linux', 'chrome');
      if (fs.existsSync(bin)) return bin;
    }
  }

  const systemPaths = ['/usr/bin/google-chrome-stable', '/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium'];
  for (const p of systemPaths) {
    if (fs.existsSync(p)) return p;
  }

  return undefined;
}

// BASE_URL: dev container default, overridden by env in CI.
// A11Y_SCOPE: 'pr' (subset for PR runs) or 'full' (post-merge, cron, local).
// A11Y_RUNNERS: comma-separated subset of 'axe,htmlcs'. Default both.
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const SCOPE = process.env.A11Y_SCOPE || 'full';
const RUNNERS = (process.env.A11Y_RUNNERS || 'axe,htmlcs').split(',').map(s => s.trim()).filter(Boolean);

const chromePath = findChromeBinary();

const config = {
  defaults: {
    standard: 'WCAG2AA',
    runners: RUNNERS,
    timeout: 30000,
    wait: 2000,
    chromeLaunchConfig: {
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    },
    ignore: [
      // axe / HTML_CodeSniffer cannot compute a contrast ratio when text sits
      // over a gradient or image background, and report every such case as a
      // "needs review" (incomplete) result — which pa11y surfaces at error
      // level. This design uses full-bleed hero/section SVGs and gradient
      // buttons/cards throughout, so all of these are false positives (verified
      // compliant by hand, e.g. teal #16f2b3 on #0d1224 ≈ 12.7:1). The
      // Playwright axe suite (violations-only) is the authoritative contrast
      // gate and passes with 0 violations. Remove this suppression if the
      // design moves to solid backgrounds behind text.
      'color-contrast',
      // HTML_CodeSniffer false positive: it reports "no title element" even
      // though both pages render a real, non-empty <title> in the SSR HTML
      // (verified with curl). Reproducible on the plain server-rendered page
      // with no client JS — an htmlcs quirk with Next.js App Router head
      // rendering, not a real defect.
      'WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl',
    ],
  },
  urls: [],
};

// Multisite path: if sites.config.js is present (tests/a11y/sites.config.js, one
// level up from configs/), it resolves absolute URLs across selected sites/targets.
// Otherwise fall back to the single-site a11y-urls.json + BASE_URL behavior.
const sitesConfigPath = path.join(__dirname, '..', 'sites.config.js');
let sitesConfig;
if (fs.existsSync(sitesConfigPath)) {
  try {
    sitesConfig = require(sitesConfigPath);
  } catch (err) {
    throw new Error(
      `Found ${sitesConfigPath} but could not load it. ` +
      `Ensure sites.config.js and tests/a11y/configs/a11y-targets.json are valid. ` +
      `Original error: ${err.message}`
    );
  }
}

if (sitesConfig) {
  config.urls = sitesConfig.urlsFor(SCOPE);
} else {
  const urlsConfigPath = path.join(__dirname, 'a11y-urls.json');
  let urlsConfig;
  try {
    urlsConfig = require(urlsConfigPath);
  } catch (err) {
    throw new Error(
      `Could not read the URL list at ${urlsConfigPath}. ` +
      `Ensure a11y-urls.json exists alongside this config and is valid JSON. ` +
      `Original error: ${err.message}`
    );
  }
  const pages = urlsConfig[SCOPE];
  if (!pages) {
    throw new Error(`Unknown A11Y_SCOPE='${SCOPE}'. Valid scopes: ${Object.keys(urlsConfig).filter(k => !k.startsWith('_')).join(', ')}`);
  }
  // Slash-safe join: tolerate a trailing slash on BASE_URL or a missing leading slash on path.
  const base = BASE_URL.replace(/\/+$/, '');
  config.urls = pages.map(p => `${base}${p.path.startsWith('/') ? p.path : '/' + p.path}`);
}

if (chromePath) {
  config.defaults.chromeLaunchConfig.executablePath = chromePath;
}

module.exports = config;
