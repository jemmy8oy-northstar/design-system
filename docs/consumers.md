# Consumers — who uses which theme, at which rung

The register of every app that depends on this design system, and the process
for adding one. Without this, "which apps are on the new tokens?" is answered by
grepping ten repos.

**Rule: the PR that adopts (or upgrades) the design system in an app also edits
the table below, in the same PR.** A consumer that isn't in the table doesn't
exist as far as this repo is concerned — it will be missed by every future token
change.

## Register

| App | Theme | Mode | Rung | Version | Adopted | Notes |
| --- | ----- | ---- | ---- | ------- | ------- | ----- |
| _(showcase — this repo)_ | all | both | L3 | `main` | 2026-08-09 | Not an app; the visual review surface. Always on `main`, by construction. |

No product app has adopted yet. Planned order (claude-code-bot#53): **snip-it →
balenthiran.co.uk → web-template → the rest**, one at a time, each merged before
the next starts.

## The adoption ladder

Adopt the lowest rung that solves the app's problem. Most apps should stop at L1.

| Rung | What the app takes | What it keeps | Good for |
| ---- | ------------------ | ------------- | -------- |
| **L1 — tokens** | `tokens.css` only. The app's own CSS stops hardcoding colours/spacing/radii and reads semantic roles (`var(--color-primary)`). | All its own components and layout. | Almost everything. An app that just wants to stop looking like a different product. |
| **L2 — primitives** | L1 + the React components (`Button`, `Card`, `Badge`, `Input`), replacing its own equivalents. | Its layout, page chrome, app-specific components. | Apps with hand-rolled buttons/inputs that keep drifting. |
| **L3 — chrome** | L2 + shared page-level structure (nav, page shell) once such components exist. | Only genuinely app-specific screens. | Apps that should feel like the *same* product, not siblings. |

L3 has nothing to consume yet — no chrome components exist. Don't invent them
until two apps actually need the same one.

### Why L1 is the default

The three token layers (primitives → semantic roles → themes) mean an L1
consumer never names a colour. When the identity changes — a new accent, a new
type scale, a whole new theme — the app re-skins by re-vendoring one file, with
no code change. An app that hardcodes `#6366f1` has to be hunted through by
hand. That is the entire value on offer, and it is available without taking a
single component.

## How to adopt (L1)

`dist/` is gitignored, and the package is not published to a registry yet
(see Distribution), so today L1 means **vendoring a generated file**:

```bash
git clone https://github.com/jemmy8oy-northstar/design-system
cd design-system && npm ci && npm run build       # writes dist/tokens.css
cp dist/tokens.css <app>/src/styles/design-tokens.css
```

Then in the app:

1. Import `design-tokens.css` **before** the app's own stylesheets, so app CSS
   can override deliberately and the cascade order is intentional.
2. Put `data-theme="…"` (and `data-mode="light|dark"`) on a root element. The
   stylesheet is scoped to `[data-theme]` and does nothing until you do — it
   cannot restyle an app by accident.
3. Load the fonts the tokens name (Nunito / Plus Jakarta Sans for `casual`).
   The library names families; it does not ship or load faces.
4. Replace hardcoded values in the app's CSS with semantic roles. This is the
   actual work, and it is the part worth reviewing.
5. Record the app in the register above, in the same PR.

Record the design-system commit SHA in the `Version` column, and note the vendor
path in the app's own README so the next person knows the file is generated and
must not be hand-edited.

### Upgrading a consumer

Re-run the build, re-copy, review the diff of the vendored file. Because
consumers pin by SHA in the register, a token change here does not silently
reach any app — every consumer is upgraded by an explicit PR. That is the
intended trade-off while distribution is manual: slower to roll out, impossible
to break an app without a review.

## Distribution

| Stage | Mechanism | Trigger |
| ----- | --------- | ------- |
| **now** | Vendored `dist/tokens.css`, pinned by SHA in the register | — |
| next | Publish to GitHub Packages; consumers `npm install` and pin a version | **the third consumer** |

Two consumers do not justify a package feed and its auth setup; three do,
because by then manual re-vendoring costs more than publishing. Revisit at that
point, not before.

An alternative worth considering if vendoring proves annoying sooner: commit
`dist/tokens.css` to the repo so consumers can fetch it directly by raw URL.
That trades a checked-in build artefact (and the risk it goes stale against
`src/tokens/`) for a one-command update. Not done yet — a decision for whoever
hits the friction first.

## Themes

| Theme | Voice | Default mode | Status |
| ----- | ----- | ------------ | ------ |
| `casual` | Warm, friendly, calm-productive. Warm sand neutrals, soft shadows, rounded. | light | complete |
| `studio` | Tool voice — cool graphite, hairlines, tight geometry, technical type. Same coral/teal accents. | **dark** | complete (PR #3) |
| `professional` | Restrained indigo on cool slate. | light | stub — proves the swap, not finished |

`studio` is dark-first: its bare `[data-theme='studio']` block *is* the dark
theme and `[data-mode='light']` is the opt-out. Every other theme is the other
way round. A consumer that renders a theme without setting `data-mode` gets that
theme's default, which is the intended behaviour, not a bug to normalise away.

Adding a theme is one file filling the role contract in
`src/tokens/semantic.css`, plus one import in `src/tokens/index.css`. No
component changes, and every L1 consumer inherits it. A theme may also override
the shape and type roles (`--radius-*`, `--font-ui`/`-heading`/`-numeric`) —
geometry and type are most of what separates one theme's voice from another's.

**A consumer picks exactly one theme.** If an app wants a role value the theme
doesn't provide, that is a gap in the role contract — fix it here so every
consumer gets it, rather than overriding the variable locally. A local override
is a fork of the design system with none of the benefits.
