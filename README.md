# @jemmy8oy-northstar/design-system

A small, themeable React component library for the Northstar apps. One set of
components, many swappable themes — so every app shares an identity without
sharing a copy-pasted stylesheet.

> **Status:** first slice (v0.1). Tokens + casual theme + four primitives
> (Button, Card, Badge, Input) + a live showcase. Built to grow, not final.

## Why it exists

Baking a design language into each app's scaffold means fixes have to be hand-
ported and the apps drift. This library is the single source of truth every
frontend _depends on_ instead — bump the version, roll the change everywhere.
It lives in its own repo and is built as a library so it can be updated
independently (a published "feed" via GitHub Packages can come later; not
needed yet).

## The idea: three token layers

```
primitives  →  semantic roles  →  components
(raw scales)   (what things mean)   (only ever read roles)
--coral-500    --color-primary      .ds-button { background: var(--color-primary) }
```

- **Primitives** (`src/tokens/primitives.css`) — fixed colour ramps, spacing,
  radii, type, motion. Theme-independent.
- **Semantic roles** (`src/tokens/semantic.css`) — `--color-primary`,
  `--color-surface`, `--color-text`, … what a colour _means_.
- **Themes** (`src/tokens/themes/*.css`) — map primitives onto the roles. A
  theme is just a different set of role values under a `[data-theme="…"]`
  selector, with a `[data-mode="dark"]` override.
- **Components** reference **only** semantic roles — never a primitive. That's
  the whole trick: change the active theme and everything re-skins, untouched.

> **The one hard rule:** the day a component hardcodes a colour, theme-ability
> is broken.

## Themes

| Theme          | Voice                                   | Status                 |
| -------------- | --------------------------------------- | ---------------------- |
| `casual`       | Warm, friendly, calm-productive — the everyday-apps voice (holiday / vocab / habits). Coral primary, teal for positive/streaks, sand-tinted neutrals, gentle elevation, no glass. | **first theme** (light + dark) |
| `professional` | Restrained indigo on cool slate.        | stub, proves the swap  |

Adding a theme = one new file filling the [colour-role contract](src/tokens/semantic.css)
+ one import. No component changes.

## Usage

```tsx
import '@jemmy8oy-northstar/design-system/styles.css';
import { Button, Card, Badge, Input } from '@jemmy8oy-northstar/design-system';

function App() {
  return (
    // Put the theme + mode on a root element; everything inside re-skins.
    <div data-theme="casual" data-mode="light">
      <Card>
        <h3>Daily streak</h3>
        <Badge tone="success">12 days</Badge>
        <Button variant="primary">Log today</Button>
      </Card>
    </div>
  );
}
```

Fonts: the tokens reference **Nunito** (display) and **Plus Jakarta Sans**
(text). Load them however the app already loads fonts (the showcase uses Google
Fonts); the library only names the families.

## Components (v0.1)

| Component | Key props                                                    |
| --------- | ------------------------------------------------------------ |
| `Button`  | `variant` primary/secondary/ghost/danger, `size`, `fullWidth`|
| `Card`    | `elevation` flat/raised, `interactive`, `padded`             |
| `Badge`   | `tone` neutral/primary/success/danger/warning, `pill`        |
| `Input`   | `size`, `invalid` (sets `aria-invalid`)                      |

All are typed, forward refs where it matters, and ship an on-brand
`:focus-visible` ring. More primitives (Textarea, Select, Checkbox/Switch,
Alert, Modal, FormField…) are backlog — build on demand, don't ship what
nothing consumes.

## Develop

```bash
npm install
npm run dev        # showcase at http://localhost:5183 — every component, both themes
npm run build      # build the library to dist/ (+ type declarations)
npm run lint
npm run test:e2e   # Playwright screenshots — see e2e/README.md
```

The **showcase** (`npm run dev`) is the visual review surface: a theme picker,
a light/dark toggle, and every component rendered. `?theme=&mode=` in the URL
selects a combination (used by the screenshot tests).

## Avoiding the "AI-built" look

This system deliberately steers away from the generated-SaaS defaults: no
indigo→violet gradient, no glassmorphism/glow, a single confident warm accent
with a genuinely neutral (warm-grey) ramp, one elevation system used
meaningfully, and a rounded-humanist display face for personality. The identity
is a _decision_, not an average — redirect it by editing the casual theme's
role values.
