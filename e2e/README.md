# Showcase e2e / screenshots

Playwright tests that drive the showcase page (`npm run dev`) at every
theme × mode combination, assert the system renders, and capture full-page
screenshots into `e2e/screenshots/` for visual review.

## Run locally

```bash
npm install
npx playwright install chromium   # first time only
npm run test:e2e
```

Screenshots land in `e2e/screenshots/`:

- `showcase-casual-light.png`
- `showcase-casual-dark.png`
- `showcase-professional-light.png`
- `showcase-professional-dark.png`

`e2e/screenshots/` is gitignored — they're build artifacts, not source.

## CI (for James to add — the bot has no `workflows` permission)

A workflow that installs deps + the chromium browser, runs `npm run test:e2e`,
and uploads `e2e/screenshots/` as an artifact so the four theme renders are
viewable per-PR:

```yaml
name: e2e
on: [pull_request]
jobs:
  screenshots:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: showcase-screenshots
          path: e2e/screenshots/
```

> The autonomous bot can compile + type-check these tests but cannot run a
> browser in its sandbox (no X/graphics libs), so the actual screenshots are
> produced by this CI job or a local run.
