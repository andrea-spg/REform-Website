# REform — Recovery Network Website (v2)

An open-source hardware Recovery Network site that helps users intercept discarded domestic appliances and rebuild their components into circular DIY outcomes.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — REform wordmark, intro copy, Guide Catalogue (6 cards), "Why is this alternative better?" dropdowns, Contact section |
| `files.html` | Files — Three collapsible dropdowns (CAD Models · Laser-Cut Files · Arduino Code), each listing all 6 guides |
| `learn.html` | Learn More — Four video carousels + LCA tool (Read More dropdown) + external resources |

## Visual assets

All branding assets in `assets/images/` were extracted from your uploaded design mockups, not redrawn:

- `logo.png` — circular brush logo from the top-left header
- `reform_wordmark.png` — the brushstroke "RE" + black "form" wordmark
- `hairdryer_cover.png`, `juicer_cover.png`, `blender_cover.png`, `toaster_cover.png`, `airfryer_cover.png`, `toothbrush_cover.png` — all six guide covers as you designed them
- `curves_bottom.png` — the layered green curves footer

If you ever want to update these, replace the file in `assets/images/` keeping the same filename — no code changes needed.

## How the "fake catalogue" works

Only the **Hair Dryer** is active. Hovering the card reveals a **Download PDF** button that downloads your real guide. The other five cards show "Coming Soon" overlays. On the Files page, those rows are styled as "Locked" and trigger the same toast notification when clicked.

## Swapping in your updated PDF later

When you finish your guide, **replace one file**:

```
assets/files/REform_HairDryer_Guide.pdf
```

The current PDF is your in-progress draft. Keep the same filename and everything continues working — no code changes needed.

## Fonts

- **Display:** Outfit (closest free Google Fonts analogue to Canva's "Now" — same geometric semi-rounded sans-serif feel)
- **Body:** Montserrat

Both are loaded from Google Fonts via the CSS `@import` at the top of `assets/css/styles.css`.

## Navigation

The header is laid out as:

```
[Logo]                              HOME  FILES  LEARN MORE  ····  CONTACT
```

- HOME, FILES, LEARN MORE are clustered together
- CONTACT is pushed to the far right corner (via `<span class="nav__spacer">`)
- The current page's button is transparent with sage-400 text (no pill)
- Hover state darkens to sage-500 + white text; pressed state turns light mint

## LCA Tool (Learn More page)

The "Read More" dropdown labeled **Life Cycle Assessment — REform Ventilator vs Market Desktop Fan** opens a full LCA comparing your Hair Dryer build (recovered motor + toggle + new ESP32) against a real market alternative: the **Honeywell HT-900 TurboForce desktop fan** (a typical €22, 1.1 kg, 15 cm desktop fan available across European retailers).

The analysis includes:

- **Functional unit** — 1 desktop fan, 2 h/day × 90 days/year × 4 years
- **Side-by-side comparison cards** showing price, mass, virgin material %, manufacturing origin, repairability score, and end-of-life behaviour
- **6 animated bar charts** comparing embodied CO₂, virgin material %, transport distance, cost, assembly time, and landfill %
- **5-stage lifecycle table** following the ISO 14040 cradle-to-grave boundary (Raw Materials → Manufacturing → Distribution → Use → End of Life)
- **Conclusions callout** in dark sage summarising the headline findings

The chart bars animate when the dropdown is first opened — they slide from 0% to their target width with a smooth easing curve.

## "Why is this alternative better?" dropdowns (Home page)

Six independent dropdowns sit below the Guide Catalogue, one per appliance. They give a short pricing comparison and explain what's reused from the original appliance. The Hair Dryer one links directly to the LCA tool (`learn.html#lca`). Multiple can be open at once.

## Carousels (Learn More page)

Four video carousels with horizontal scroll + ⟨ ⟩ arrow controls:

1. **Disassembly & Repair** — hair dryer anatomy, safe disassembly, motor salvaging, switches, e-waste identification, plus an iFixit Braun teardown link
2. **Electronics & ESP32** — ESP32 series, Arduino basics, motor control, soldering, schematics, MOSFET drivers, PWM
3. **CAD Modelling & 3D Printing** — SolidWorks, Fusion 360, enclosure design for salvaged parts, slicing & supports, print settings, snap-fits, laser-cutting, DXF workflow
4. **Business & Circular Economy** *(new)* — BlueCity Rotterdam tour, Charles Eisenstein at BlueCity, Ellen MacArthur Foundation videos, Restart Project, Precious Plastic

All video IDs were verified against current YouTube listings — the broken links from the previous iteration have been replaced.

## Running locally

It's static HTML/CSS/JS — no build step. Either:

```bash
# Option 1: just double-click index.html
open index.html

# Option 2: serve via Python so the YouTube thumbnail images load cleanly
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Drop the whole folder onto any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages). No environment variables, no backend.

## File tree

```
reform/
├── index.html
├── files.html
├── learn.html
├── README.md
└── assets/
    ├── css/styles.css
    ├── js/script.js
    ├── images/
    │   ├── logo.png
    │   ├── reform_wordmark.png
    │   ├── hairdryer_cover.png
    │   ├── juicer_cover.png
    │   ├── blender_cover.png
    │   ├── toaster_cover.png
    │   ├── airfryer_cover.png
    │   ├── toothbrush_cover.png
    │   └── curves_bottom.png
    └── files/
        └── REform_HairDryer_Guide.pdf
```
