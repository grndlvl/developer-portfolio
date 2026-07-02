import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

/**
 * WCAG 2.2 AA Accessibility Audit
 *
 * URL list is read from configs/a11y-urls.json — the single source of truth
 * shared with Pa11y and the audit shell script.
 *
 * A11Y_SCOPE selects which subset:
 *   - 'pr'   → small set for PR-time runs (Probo against $BUILD_DOMAIN)
 *   - 'full' → complete set for post-merge / weekly cron / local dev (default)
 */

const SCOPE = process.env.A11Y_SCOPE || 'full';

// A PAGES entry is either single-site (relative path, playwright baseURL applies)
// or multisite (absolute url + site label, from sites.config.js).
type PageEntry = {
  name: string;
  path?: string;
  url?: string;
  site?: string;
  siteLabel?: string;
};

// Multisite path: if sites.config.js is present (tests/a11y/sites.config.js, one
// level up from tests/), build absolute URLs across selected sites/targets.
// Otherwise fall back to the single-site a11y-urls.json behavior.
const sitesConfigPath = path.join(__dirname, '..', 'sites.config.js');
let PAGES: PageEntry[];
let MULTISITE = false;

if (fs.existsSync(sitesConfigPath)) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sitesConfig = require(sitesConfigPath);
    PAGES = sitesConfig.pagesFor(SCOPE) as PageEntry[];
  } catch (err) {
    // A present-but-broken sites.config.js must fail loud (not silently fall back
    // to single-site, which would test the wrong URLs). Match .pa11yci.cjs's message.
    throw new Error(
      `Found ${sitesConfigPath} but could not resolve URLs from it. ` +
      `Ensure sites.config.js and tests/a11y/configs/a11y-targets.json are valid. ` +
      `Original error: ${(err as Error).message}`
    );
  }
  const siteIds = new Set(PAGES.map((p) => p.site));
  MULTISITE = siteIds.size > 1;
} else {
  // TODO_URLS_CONFIG_PATH: adjust the relative path if the spec moves.
  // Default layout: spec at tests/a11y/tests/, config at tests/a11y/configs/ (one level up).
  const urlsConfigPath = path.join(__dirname, '..', 'configs', 'a11y-urls.json');
  let urlsConfig: Record<string, Array<{ name: string; path: string }>>;
  try {
    urlsConfig = JSON.parse(fs.readFileSync(urlsConfigPath, 'utf-8'));
  } catch (err) {
    throw new Error(
      `Could not read the URL list at ${urlsConfigPath}. ` +
      `Ensure tests/a11y/configs/a11y-urls.json exists and is valid JSON ` +
      `(adjust urlsConfigPath above if the spec lives elsewhere). ` +
      `Original error: ${(err as Error).message}`
    );
  }
  const scoped = urlsConfig[SCOPE];
  if (!scoped) {
    throw new Error(`Unknown A11Y_SCOPE='${SCOPE}'. Valid scopes: ${Object.keys(urlsConfig).filter(k => !k.startsWith('_')).join(', ')}`);
  }
  PAGES = scoped as PageEntry[];
}

// Where to navigate: absolute url in multisite mode, relative path otherwise.
function targetUrl(p: PageEntry): string {
  return p.url || p.path || '/';
}

// Test-title suffix that includes the site label only when more than one site.
function titleFor(p: PageEntry): string {
  const sitePart = MULTISITE && p.siteLabel ? `[${p.siteLabel}] ` : '';
  const loc = p.path || p.url || '';
  return `${sitePart}${p.name} (${loc})`;
}

const WCAG_TAGS = [
  'wcag2a', 'wcag2aa',
  'wcag21a', 'wcag21aa',
  'wcag22aa',
  'best-practice',
];

test.describe('WCAG 2.2 AA Compliance', () => {
  for (const page of PAGES) {
    test(`${titleFor(page)} has no WCAG 2.2 AA violations`, async ({ page: browserPage }) => {
      await browserPage.goto(targetUrl(page));
      await browserPage.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page: browserPage })
        .withTags(WCAG_TAGS)
        .analyze();

      for (const violation of results.violations) {
        console.log(`\n[${violation.impact}] ${violation.id}: ${violation.description}`);
        console.log(`  WCAG: ${violation.tags.filter(t => t.startsWith('wcag')).join(', ')}`);
        console.log(`  Help: ${violation.helpUrl}`);
        for (const node of violation.nodes.slice(0, 3)) {
          console.log(`  → ${node.target.join(' > ')}`);
        }
      }

      expect(results.violations).toEqual([]);
    });
  }
});

test.describe('WCAG 1.4.10 Reflow', () => {
  for (const page of PAGES) {
    test(`${titleFor(page)} has no horizontal scroll at 320px`, async ({ page: browserPage }) => {
      await browserPage.setViewportSize({ width: 320, height: 568 });
      await browserPage.goto(targetUrl(page));
      await browserPage.waitForLoadState('networkidle');

      const hasHorizontalScroll = await browserPage.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasHorizontalScroll).toBe(false);
    });
  }
});

test.describe('WCAG 2.3.3 Reduced Motion', () => {
  for (const page of PAGES) {
    test(`${titleFor(page)} respects prefers-reduced-motion`, async ({ page: browserPage }) => {
      await browserPage.emulateMedia({ reducedMotion: 'reduce' });
      await browserPage.goto(targetUrl(page));
      await browserPage.waitForLoadState('networkidle');

      const runningAnimations = await browserPage.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        let animating = 0;
        for (const el of allElements) {
          const style = window.getComputedStyle(el);
          if (
            style.animationName !== 'none' &&
            style.animationPlayState === 'running' &&
            style.animationDuration !== '0s'
          ) {
            animating++;
          }
        }
        return animating;
      });

      expect(runningAnimations).toBe(0);
    });
  }
});
