# taste.md — Dev Patel Portfolio · Visual Style Guide for AI Image Generation

> **Purpose:** Paste this file (or any section of it) into ChatGPT, Nano Banana, Midjourney, Gemini, or any other AI image generator as a style brief. The images produced should feel at home as project cover art inside this portfolio.

---

## 1 · Mood & Concept

This portfolio belongs to **Dev Patel** — a machine-learning engineer and researcher whose work spans computer vision, geospatial intelligence, and generative AI. The visual identity is **editorial, restrained, and quietly confident** — closer to a Bauhaus design journal or a high-end tech magazine than a flashy SaaS landing page.

**Feeling to evoke:**
- Intellectual rigour without coldness
- Precision and craftsmanship
- Monochromatic depth punctuated by a single bold accent
- "Science meets art" — data visualised beautifully
- Calm confidence, not hype

**Anti-references (avoid):**
- Neon gradients, RGB gamer aesthetics
- Busy, cluttered compositions
- Cartoon or illustrative styles
- Oversaturated colours
- Futuristic "Matrix" green or purple cyberpunk

---

## 2 · Colour Palette

| Role | Hex | Description |
|---|---|---|
| **Background** | `#fafaf9` | Warm off-white (stone-50) — the canvas |
| **Surface** | `#f5f5f4` | Stone-100, cards and panels |
| **Primary text** | `#0c0a09` | Near-black, stone-950 |
| **Secondary text** | `#78716c` | Warm mid-grey, stone-500 |
| **Accent / Danger** | `#dc2626` | Red-600 — the *only* colour in the system |
| **Accent hover** | `#b91c1c` | Red-700 |
| **Border / Divider** | `#e7e5e4` | Stone-200, hairline lines |
| **Dark overlay** | `#000000` | Pure black used for type and icons |

**Colour grading rules for generated images:**
- Start from near-monochrome: desaturate the base scene to ~80–90%.
- Inject red (`#dc2626`) as a single accent — one object, one glow, one line, one label.
- No blues, no greens, no purples in the palette — they break the system.
- Shadows should lean warm (brown-black), not cool (blue-black).
- Highlights should be warm off-white (`#fafaf9`), never pure white.

---

## 3 · Typography (for image text elements)

| Font | Role | Personality |
|---|---|---|
| **Cormorant Garamond** | Display / headings | Elegant, high-contrast serif — editorial gravitas |
| **JetBrains Mono** | Body / labels / metadata | Geometric monospace — technical precision |

**Usage rules in imagery:**
- Headlines (project titles) → Cormorant Garamond, light weight (300), generous letter-spacing
- Kickers / status tags (e.g. `INTERNSHIP PROJECT`, `PUBLISHED`) → JetBrains Mono, all-caps, ultra-wide tracking (0.3em+)
- Numbers and metrics → JetBrains Mono bold, large size
- Avoid any rounded, friendly, or handwritten fonts

---

## 4 · Composition & Layout

- **Aspect ratios used in cards:** `3/4` (portrait), `4/5`, `1/1` (square), `16/9` (wide)
- Prefer **asymmetric, off-centre compositions** with deliberate negative space
- Think **editorial magazine spreads** — one dominant element, lots of breathing room
- **Grid logic:** Images often live in a masonry/bento grid — vary height to create rhythm
- Subtle **crop and bleed** at the edges; don't centre everything perfectly

**Composition reference phrases:**
> "Half the frame is empty. A single data visualisation or abstract geometric form occupies the other half."
> "Overhead blueprint view of [subject], desaturated, with red annotation lines."
> "Minimalist flat-lay: technical objects on a warm off-white linen surface."

---

## 5 · Image Treatment & Filters

These CSS rules define the exact photographic treatment used in the portfolio:

```css
filter: grayscale(100%);          /* Default — fully desaturated */
filter: grayscale(30%) blur(6px) brightness(0.7);  /* Hover state */
transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
transform: scale(1.12);  /* Gentle zoom on interaction */
```

**Apply this to AI-generated images:**
- **Default state:** Full greyscale or near-greyscale. Think silver-gelatin darkroom print.
- **Active/featured state:** Slight desaturation (30% grey), softly blurred, slightly darkened — like a photo behind frosted glass with red text overlaid.
- Red accent elements (icons, borders, status pills) should remain fully saturated even if the background is greyscale.

---

## 6 · Project-Specific Image Briefs

Use the following prompts as starting points. Append the global style rules from sections 2–5 to each.

---

### GeoRoadMetrics
**Domain:** Geospatial ML · NielsenIQ Internship · Road condition classification

**Image concept:**
> Aerial satellite-style map of a European city (Berlin or Amsterdam), desaturated to greyscale. Road network overlaid with thin, precise vector lines. A small cluster of road segments glows in deep red (`#dc2626`) indicating "Poor" condition zones. Cartographic annotation style. Grid overlay subtle. Feels like a scientific map from a technical journal.

**Keywords:** aerial cartography, road network, geospatial data, blueprint, technical map, topographic lines, urban grid, precision, greyscale with red annotation

---

### NextStep AI
**Domain:** AI career planning platform · Full-stack · LLMs

**Image concept:**
> Abstract career tree or decision-flow diagram rendered in clean, minimal lines on a warm off-white background. Nodes are simple circles; edges are hairline paths. One branch or node is highlighted in red. Feels like a whiteboard sketch cleaned up by a designer. No human figures. Pure data structure aesthetic.

**Keywords:** decision tree, career graph, flow diagram, node network, minimalist infographic, editorial, monochrome, React Flow inspired

---

### Brain Tumor Detection (YOLOv12)
**Domain:** Medical imaging · Computer vision · IEEE research

**Image concept:**
> A single MRI brain scan slice rendered in greyscale. Precise bounding-box annotations drawn over the scan in red — thin, sharp rectangles with small corner handles. One annotation label in JetBrains Mono style text. Clean white margins around the scan. Clinical, precise, peer-reviewed journal aesthetic.

**Keywords:** MRI scan, medical imaging, bounding box, annotation, clinical, grayscale, brain, object detection, scientific, IEEE paper figure

---

### Wingman AI
**Domain:** Desktop AI assistant · Electron · Multimodal

**Image concept:**
> A dark glass overlay panel (glassmorphism in greyscale) floating above a blurred, dark desktop environment. The panel shows a clean text input and a subtle AI response area. Global hotkey symbol subtly visible. Minimal, almost invisible — like a ghost app triggered mid-session.

**Keywords:** overlay UI, desktop assistant, glass panel, dark mode, minimal, hotkey, ghost interface, frosted glass, ambient AI

---

### OMR Marks Automation
**Domain:** Computer vision · Classical CV · Bubble-sheet grading

**Image concept:**
> Top-down photograph of a standardised answer sheet (bubble form) on a warm off-white surface. Canny edge lines and contour outlines rendered in precise red overlays. Some bubbles have fill indicators. Perspective slightly tilted, as if captured mid-rectification. Feels like a computer-vision pipeline diagram.

**Keywords:** answer sheet, bubble form, contour detection, homography, optical mark recognition, overhead shot, scanning, precision, editorial

---

### Math Note AI
**Domain:** Multimodal math solver · Canvas · LLM

**Image concept:**
> Close-up of a handwritten mathematical equation on a slightly warm white canvas. Clean LaTeX typeset answer appears beside it in a contrasting monospace font (red). Minimal whitespace. Pen tip visible at the edge. Feels like a high-end stationery brand meets scientific computing.

**Keywords:** handwriting, math equation, LaTeX, canvas, equation solver, pen and paper, editorial, monospace, formula, scientific

---

### Fake News Detection
**Domain:** NLP · Machine learning · Text classification

**Image concept:**
> Two stacked newspaper clipping fragments — heavily desaturated, aged texture. One headline has a thin red "FAKE" stamp overlay (typeset, not cartoon). Confusion matrix grid lines visible faintly in the background. Diagnostic, analytical tone. Like a fact-checker's desk photograph.

**Keywords:** newspaper, NLP, text, classification, disinformation, fact-check, editorial, greyscale, stamp, analytical

---

### Smart Building Energy ML
**Domain:** Regression · Building physics · Flask API

**Image concept:**
> Architectural blueprint of a building floor plan, desaturated, on a warm off-white background. Heat-map gradient (grey to red) overlaid on certain rooms to indicate energy load. Minimalist technical drawing style. Grid paper texture subtle in background.

**Keywords:** architecture blueprint, floor plan, heat map, energy efficiency, technical drawing, regression, building, engineering, red gradient

---

### Flight Price Prediction
**Domain:** Time-series · Random Forest · Streamlit

**Image concept:**
> A clean line chart on a warm off-white background — a single winding price curve in near-black, with a red dashed forecast line extending forward. X-axis shows dates, Y-axis shows price in Indian Rupees (₹). Minimalist, financial-report style. No grid lines except hairline.

**Keywords:** line chart, time series, forecast, price curve, financial graph, minimalist, data visualisation, editorial, rupee

---

### Skin Tone Classification
**Domain:** CNN · Deep learning · Open source

**Image concept:**
> A gradient strip of five distinct warm skin tone swatches arranged horizontally on a warm off-white background. Each swatch is a perfect rounded rectangle. Below each swatch: a monospace label (e.g. "Class 3"). Clinical colour-swatch aesthetic — like a paint company's premium catalogue page.

**Keywords:** colour swatch, skin tone, classification, gradient strip, clinical, minimalist, Pantone-inspired, CNN, deep learning

---

### StratifyAi
**Domain:** Agentic AI · Local-first · Desktop · Strategy

**Image concept:**
> Three parallel vertical reasoning tracks visualised as thin column diagrams, side by side on a warm off-white canvas. Each column has small node circles connected by hairline vertical lines. One column has a red accent node. Represents three simultaneous reasoning paths. Abstract, diagrammatic.

**Keywords:** parallel reasoning, agentic AI, flowchart columns, decision paths, abstract diagram, local AI, strategy, editorial, Electron

---

### Historical Price Forecasting
**Domain:** Time-series · 20-year analysis · Anomaly detection

**Image concept:**
> A long, narrow time-series chart spanning a wide horizontal canvas. The line fluctuates across 20 years. Specific anomaly points (outliers) are circled in red. The chart has no decorative elements — just the data line, axis, and red annotations. Feels like a Bloomberg terminal printout in editorial style.

**Keywords:** time series, 20 years, anomaly detection, outlier, financial data, editorial chart, Bloomberg, line chart, greyscale, minimal

---

## 7 · Universal Prompt Suffix

Append this to **every** image generation prompt to lock in the style:

```
Style: editorial, monochromatic, minimalist. Colour palette: warm off-white (#fafaf9) background,
near-black (#0c0a09) primary elements, red (#dc2626) as the single accent colour only.
Fonts (if text appears): Cormorant Garamond for display text, JetBrains Mono for labels and data.
Photography treatment: desaturate to greyscale or near-greyscale. Sharp lines, precise geometry.
No neon, no gradients, no blues or greens, no rounded playful shapes.
Aspect ratio: [choose from 3:4 / 4:5 / 1:1 / 16:9 as appropriate].
Mood: quiet confidence, intellectual rigour, peer-reviewed journal meets premium design studio.
```

---

## 8 · Quick Reference Card

| Attribute | Value |
|---|---|
| Background | Warm off-white `#fafaf9` |
| Accent colour | Red `#dc2626` (only one) |
| Text / lines | Near-black `#0c0a09` |
| Filter | Greyscale → desaturated on active |
| Display font | Cormorant Garamond (serif, elegant) |
| Label font | JetBrains Mono (monospace, technical) |
| Mood | Editorial · Restrained · Precise |
| Avoid | Neon · Gradients · Cyberpunk · Clutter |
| Card ratios | 3:4 · 4:5 · 1:1 · 16:9 |
| Texture | Warm linen / matte paper — never glossy |

---

*Generated for Dev Patel Portfolio — Machine Learning & AI*
*Last updated: October 2026*
