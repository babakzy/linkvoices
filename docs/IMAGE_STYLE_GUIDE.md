# Linkvoices AI Image Style Guide

Use this guide for blog thumbnails, social cards, article illustrations, and editorial campaign images. It does not apply to product UI, diagrams that explain a real workflow, or the Linkvoices logo.

## Visual direction

The image identity is a **Cold War collage poster with retro print colors**.

The result should feel like an archival political-technology publication reconstructed for a modern independent internet project:

- documentary photography or realistic photographic source material
- bold cut-paper composition
- screen-print and risograph ink behavior
- coarse halftone dots, photocopy grain, and imperfect registration
- geometric blocks and restrained technical markings
- urgent editorial tension without looking like a movie poster

The style may reference historical print production. It must not reproduce a real government agency, political party, extremist symbol, military insignia, or identifiable propaganda poster.

## Palette

Use two or three image colors plus paper and ink. The interface palette remains separate.

Primary anchors:

- Carbon ink: `#0A0A0A`
- Paper white: `#F4F2EA`
- Linkvoices blue: `#0049F3`

Optional retro print colors:

- Signal red: `#C7352D`
- Muted mustard: `#C49A32`
- Field olive: `#72754E`
- Faded cyan: `#5E9EA3`

Rules:

- Include Linkvoices blue in most hero or thumbnail images.
- Use at most one optional retro color per image.
- Keep saturation print-like and slightly weathered.
- Do not use gradients, neon, glossy 3D rendering, or cyberpunk lighting.

## Composition

- Build one dominant focal subject.
- Use asymmetric placement and strong cropped shapes.
- Reserve a quiet area when editorial text will be added later.
- Use diagonals, circles, stamps, map fragments, or signal lines only when they support the topic.
- Let some elements run beyond the frame, like a physical poster crop.
- Keep small technical marks sparse. They should organize the image, not simulate fake intelligence data.

Preferred source motifs:

- hands, faces, radios, printing presses, cables, satellites, locks, documents, border crossings, maps, terminals, and civic architecture
- analog communication equipment and early computer hardware
- real-world payment, speech, privacy, and coordination scenarios

Avoid:

- glowing coins, floating crypto logos, hooded hackers, Matrix code, blue holograms, corporate handshake stock photography, and generic futuristic cities
- legible AI-generated body text
- flags or uniforms unless the article directly requires them
- weapons, combat, or surveillance imagery used only for drama

## Texture

The final image should look mechanically printed:

- coarse halftone at 45 degrees
- visible paper grain
- photocopier contrast
- slightly misregistered color layers
- torn or sharply cut collage edges
- selective one-bit or duotone treatment

Texture must not make the focal subject unreadable at thumbnail size.

## Type in images

Generate images without important text. AI image models frequently produce broken lettering.

Add headlines, issue labels, or the Linkvoices wordmark afterward in the design tool:

- Satoshi Semibold for titles
- IBM Plex Mono Medium for short labels
- ink or white text, depending on contrast
- no drop shadows, bevels, outlines, or curved type

Do not place the logo inside the generation prompt. Add the official asset afterward.

## Standard formats

- Blog thumbnail and Open Graph: `1200 × 630`, safe focal area centered within `1080 × 560`
- Article hero: `1600 × 900`
- Square social image: `1200 × 1200`
- Inline editorial image: `1600 × 1200`

Generate at the final aspect ratio. Do not crop a portrait composition into a wide thumbnail.

## Prompt template

Use this structure:

```text
[SUBJECT AND ACTION], editorial Cold War-era collage poster reconstructed for a modern digital-rights publication, realistic archival photography cut into bold asymmetric paper shapes, screen-printed in carbon black and Linkvoices cobalt blue with [OPTIONAL RETRO COLOR], coarse halftone dots, photocopy grain, imperfect ink registration, matte paper texture, strong single focal point, clear negative space on [LEFT OR RIGHT] for a headline, flat print lighting, no text, [ASPECT RATIO]
```

Negative prompt:

```text
no gradients, no neon, no glossy 3D, no cyberpunk, no glowing cryptocurrency coins, no hooded hacker, no Matrix code, no corporate stock-photo look, no readable text, no logos, no flags, no military insignia, no weapons, no AI interface overlays
```

## Example prompts

### Digital freedom

```text
A person opening a heavy mechanical lock around a bundle of communication cables, editorial Cold War-era collage poster reconstructed for a modern digital-rights publication, realistic archival photography cut into bold asymmetric paper shapes, screen-printed in carbon black and Linkvoices cobalt blue with signal red, coarse halftone dots, photocopy grain, imperfect ink registration, matte paper texture, strong single focal point, clear negative space on the left for a headline, flat print lighting, no text, 16:9
```

### Censorship-resistant payments

```text
Two hands passing a paper invoice across a fragmented border map while a radio signal crosses the frame, editorial Cold War-era collage poster reconstructed for a modern independent-payments publication, realistic archival photography cut into bold asymmetric paper shapes, screen-printed in carbon black and Linkvoices cobalt blue with muted mustard, coarse halftone dots, photocopy grain, imperfect ink registration, matte paper texture, strong single focal point, clear negative space on the right for a headline, flat print lighting, no text, 16:9
```

## Selection checklist

Before publishing, confirm:

- The subject is clear at 320 pixels wide.
- The image communicates the article topic without its headline.
- Blue is consistent with Linkvoices.
- There are no accidental symbols, broken letters, extra fingers, or malformed faces.
- Texture feels printed but does not obscure meaning.
- The crop works in the required format.
- Any overlaid title passes contrast requirements.
- Alt text describes the content and purpose, not the visual style.
