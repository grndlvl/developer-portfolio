---
title: "Accessibility audit failing on production"
labels: a11y, regression, automation
assignees: TODO_ASSIGNEE
---

The scheduled accessibility audit against the production site is failing.

**Latest run:** {{ env.WORKFLOW_URL }}
**Triggered by:** `{{ env.TRIGGER }}`

## Triage

1. Open the workflow run and download the `a11y-audit-results` artifact.
2. Identify whether the failure is:
   - A real regression — file a Jira ticket and link it in a comment on this issue.
   - A transient flake (timeout, hosting hiccup, CDN blip) — close this issue; it will reopen automatically on the next failure.
3. If multiple consecutive runs fail, treat it as a real regression even if individual failures look transient.

This issue is automatically reopened/updated by `.github/workflows/a11y-audit.yml` on each failed cron / push run. Manual issues are welcome — they just won't be auto-updated.
