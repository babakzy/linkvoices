# Linkvoices Design System

This is the single source of truth for Linkvoices interface design. The system combines brutalist structure, Teenage Engineering utility, and a restrained Cold War editorial influence.

## Status

The design foundation is active. New work must use the tokens and components described here. Existing pages are being migrated incrementally and may still contain legacy utility combinations.

## Identity

Linkvoices should feel direct, mechanical, independent, and trustworthy.

- Use rigid grids, strong hierarchy, visible borders, and functional spacing.
- Prefer flat surfaces and solid colors.
- Let typography and structure create character.
- Use editorial imagery for atmosphere, not decorative UI effects.
- Do not imitate military software interfaces or add fake telemetry to ordinary product screens.

## Color

The interface has three approved surface treatments:

1. **White:** the default page and product surface.
2. **Spring wood:** a secondary surface for selected sections and grouped content.
3. **Cerulean blue:** a high-emphasis section surface. Text and icons must be white.

Core values:

- Ink: `#0A0A0A`
- White: `#FFFFFF`
- Spring wood: `spring-wood-100` / `#F2EEE2`
- Brand blue: `cerulean-blue-700` / `#0049F3`
- Dark brand blue: `cerulean-blue-900` / `#0D379B`

Rules:

- Text is ink on white and spring-wood surfaces.
- Text is white on brand-blue surfaces.
- Primary actions are solid ink, not blue.
- Blue identifies the brand, links, focus states, and selected high-emphasis surfaces.
- Status colors are semantic only. Do not use them as decoration.
- Do not use gradients, translucency, glows, or drop shadows.

Tokens live in `assets/css/main.css`.

## Typography

- **Satoshi:** headings, body copy, controls, and navigation.
- **IBM Plex Mono:** metadata, technical labels, short status text, and tabular values.

Use sentence case for headings and controls. Uppercase mono text is reserved for short labels, not paragraphs or every section heading.

Recommended hierarchy:

- Hero: `text-4xl md:text-6xl`, tight leading
- Page heading: `text-3xl md:text-5xl`
- Section heading: `text-2xl md:text-4xl`
- Body: `text-base`, relaxed leading, maximum `65ch`
- Metadata: `font-mono text-xs`

## Geometry and depth

- Controls and compact components use `rounded-ui` (`6px`).
- Large sections remain structural and should not appear as floating rounded cards.
- Use one-pixel borders and spacing to establish hierarchy.
- Never use box shadows.
- Avoid excessive card containers. Prefer sections, grid tracks, dividers, and negative space.

## Spacing and layout

- Use `UiContainer` for page width and horizontal padding.
- Use `UiSection` for approved surface and vertical-spacing combinations.
- Default content width is `max-w-7xl`; long-form reading is `max-w-3xl`.
- Marketing layouts can be asymmetric on desktop but must collapse to one column below `md`.
- Product layouts should favor predictable grids and visible grouping.

## Shared UI components

New shared components live in `components/ui/` and are auto-imported by Nuxt:

- `UiButton`: primary, secondary, blue, ghost, and destructive actions
- `UiInput`: labeled text fields with description and error states
- `UiTextarea`: labeled multiline fields
- `UiSelect`: labeled native select controls
- `UiCard`: flat bordered content grouping
- `UiBadge`: compact semantic labels
- `UiSpinner`: accessible loading state
- `UiContainer`: consistent page width
- `UiSection`: white, spring, or blue page sections

Example:

```vue
<UiSection tone="spring">
  <h2 class="text-3xl">Direct payments, clear records</h2>
  <p class="mt-4 max-w-prose">
    Create an invoice without adding another financial intermediary.
  </p>
  <UiButton class="mt-6" to="/login">
    Create invoice
  </UiButton>
</UiSection>
```

### Buttons

- Primary: solid ink with white text
- Secondary: white with an ink or neutral border
- Blue: reserved for a deliberate brand-emphasis action
- Ghost: quiet actions inside dense interfaces
- Destructive: destructive actions only

Buttons do not use shadows. Labels should be short and must not wrap on desktop.

### Forms

- Labels sit above fields.
- Placeholder text never replaces a label.
- Help text sits below the field.
- Error text is contextual and announced through `aria-describedby`.
- Brand blue is the standard focus color.

## Imagery

Product UI does not use decorative gradients or abstract blobs. Editorial and blog imagery uses a Cold War collage-poster language with retro print colors, archival subject matter, halftone texture, and technical overlays.

Follow `docs/IMAGE_STYLE_GUIDE.md` for image generation, prompt construction, aspect ratios, and exclusions.

## Motion

Motion is minimal and functional:

- Use short color transitions for hover and focus.
- Use a one-pixel active press on controls when helpful.
- Scroll motion must communicate a sequence or relationship.
- Respect `prefers-reduced-motion`.
- Do not use decorative parallax, autoplay carousels, particles, or continuous animation.

## Accessibility

- Meet WCAG AA contrast for text and controls.
- Keep visible focus indicators.
- Preserve semantic HTML and keyboard behavior.
- Do not communicate status through color alone.
- Generated images require useful alt text; decorative textures use empty alt text.

## Do

- Use white as the default surface.
- Use spring wood selectively to group a section.
- Use blue as a strong full-section brand moment.
- Use black buttons, crisp borders, and deliberate spacing.
- Use mono typography for real metadata and data.
- Use shared UI components before creating one-off patterns.

## Do not

- Add shadows, gradients, glass effects, or rounded floating panels.
- Use blue for every action.
- Put black text on blue.
- Mix multiple corner-radius systems.
- Add fake serial numbers, coordinates, or military labels as decoration.
- Reintroduce DaisyUI classes in new code.

## Migration note

`assets/css/main.css` contains temporary compatibility selectors for legacy DaisyUI class names. They exist only to keep unmigrated screens functional. Do not use `.btn`, `.input`, `.card`, `.loading`, or other legacy DaisyUI names in new work. Replace them with `Ui*` components as each page is migrated.
