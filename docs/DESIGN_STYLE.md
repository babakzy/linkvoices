# Linkvoices Design Style

Teenage Engineering–inspired: warm paper surfaces, electric blue accents, flat utilitarian UI, schematic graphics. Applies to the landing, auth, dashboard, and invoice pages.

---

## Vibe

- **Warm + electric** — cream backgrounds (`spring-wood`) + cerulean blue for actions and emphasis
- **Functional over decorative** — flat colors, no glassmorphism, no stock photos
- **Schematic visuals** — thin-line SVG diagrams, geometric logo mark, dot-separated labels
- **Bold type, quiet chrome** — large headings; buttons and nav stay simple

Reference mood: Teenage Engineering, Braun/Dieter Rams, Japanese electronics packaging.

---

## Colors

Use Tailwind tokens from `tailwind.config.js`. Avoid random hex values.

| Role | Tokens |
|------|--------|
| Page background | `spring-wood-50` (global), `gray-50` (dashboard) |
| Surfaces / panels | `spring-wood-100`, `white` |
| Borders / dividers | `spring-wood-200`, `gray-200` |
| Primary action | `cerulean-blue-600` → hover `cerulean-blue-700` |
| Full-bleed sections | `cerulean-blue-700` |
| Headings (light bg) | `cerulean-blue-900` |
| Headings (blue bg) | `spring-wood-50` |
| Body text | `cerulean-blue-800`, `gray-600` |
| Success / error | `green-600`, `red-700` |

**Palette anchors:** `spring-wood-50` `#f9f7f1` · `cerulean-blue-600` `#0662ff` · `cerulean-blue-900` `#0d379b`

---

## Typography

| | |
|-|-|
| **Font** | Satoshi (headings + body), Play for some `h2` |
| **Icons** | Material Symbols Outlined |
| **Headings** | Bold, `capitalize` — not uppercase, not letter-spaced |
| **Scale** | Hero `text-4xl md:text-7xl` · sections `text-3xl md:text-5xl` · body `text-base md:text-lg` |

---

## Components

**Primary button** (landing, header, dashboard CTAs):

```
btn bg-cerulean-blue-600 hover:bg-cerulean-blue-700
border-cerulean-blue-700 text-cerulean-blue-50 font-semibold
shadow-md hover:shadow-lg transition-all duration-200
```

**Secondary / pill:** `bg-spring-wood-200 text-cerulean-blue-900 rounded-md`

**Cards:** `bg-white rounded-lg border border-gray-200 shadow-sm` (app) · `bg-spring-wood-50 rounded-xl p-7` (marketing)

**Layout:** `md:container md:mx-auto px-4` · generous vertical padding `py-16 md:py-32`

**Tables:** flat, minimal — header `bg-cerulean-blue-50`, rows `border-spring-wood-200`

**Logo:** `mainlogo.svg` only — navy square + star mark (`#102050`), don't recolor

---

## Graphics

- Custom SVG only — no photography
- Diagrams: 2px strokes, circles/nodes, radial lines (`hero-people.svg` style)
- Flat fills, no SVG gradients
- Low-contrast decorative SVGs behind text; diagrams carry meaning

Assets live in `assets/images/`.

---

## Motion

Scroll-driven only when it adds meaning (e.g. GSAP pin + scrub on landing). No autoplay carousels, particles, or decorative parallax.

---

## Do / Don't

**Do:** stick to `spring-wood-*` and `cerulean-blue-*` · flat solid backgrounds · tables and spec-style labels · SVG diagrams · Satoshi everywhere

**Don't:** gradient overlays · neon/glass effects · over-rounded corners (`rounded-3xl`) · stock imagery · heavy shadow stacks · random accent colors

---

## Key files

`tailwind.config.js` · `assets/scss/main.scss` · `components/Header.vue` · `components/Landing/*` · `LINKVOICES_UI_KIT.md` (dashboard detail)
