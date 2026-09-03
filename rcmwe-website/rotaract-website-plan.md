# RCMWE — "Dawn of Impact" Website Prototype · Plan

## Intent

Build a **complete, cinematic prototype website** for a Rotaract club, fusing two inspiration
directions the user supplied:

1. **Orbit poster** — full-viewport dark poster (`#161616`), monumental serif wordmark with a
   white + pink-gradient split (`#ffc5dc → #fd86db`), organic mouse morph-reveal canvas trail,
   choreographed entrance, frosted mobile sheet menu.
2. **Velorah hero** — fullscreen looping video backdrop, liquid-glass navigation, cinematic
   typography (Instrument Serif display + Inter body), muted-gray secondary copy.

The site must feel like an award-site homepage *and* work as a complete club website: real
content, working navigation across screens, filters, modals, forms, and mobile behavior — not a
single static screenshot.

---

## Source materials (verified in workspace)

| Asset | Location | Use |
|---|---|---|
| Club fact sheet | `/Users/fenqinyang/Documents/Website design/rcmwe-details.md` | **Authoritative content source** (name, RID 3141, charter June 2016, theme, 12 real projects with dates + impact numbers) |
| Vectorized club logo | `…/FreeSample-Vectorizer-io-733748667_….svg` (1069×1069; fills `#8e2e1f`, `#e44f21`, near-blacks) | Copy to `assets/logo.svg`; brand mark in nav/footer |
| Orbit poster spec | user message | Interaction + layout grammar donor (morph trail constants, entrance table, easings, mobile menu) |
| Velorah hero spec | user message | Hero treatment donor (video bg, liquid glass, Instrument Serif/Inter, tracking-tight H1) |

**Content note:** The linked fact sheet documents **Rotaract Club of Mumbai Western Elite
(RCMWE)** — District 3141, sponsored by Rotary Club of Mumbai Western Elite, Club ID 213639,
chartered **June 2016**, theme **"Dawn of Impact: Be the Dawn. Make the Impact."**
The brief said "Rotaract Club of Bombay West." → flagged as open question Q1 below; plan assumes
the documented RCMWE identity since all real content belongs to it.

### Verified real data available (no fabrication needed)

- Mission line, tagline, Join + Instagram link slots.
- 12 projects across 4 pillars, each with date, one-line brief, quantified impact:
  - *Community & Social Welfare:* Aarey Youth & Child Welfare Drive (90+ students, 112 kits,
    99 meal boxes), Freedom Bins (100+ dustbins), Baaghbaan senior outreach (30+ seniors),
    Empowerment for Specially Abled (50+ students), Digital ID & Legal Rights drives
    (35 drivers, 25 DigiLocker onboards).
  - *Environment & Climate:* Mega Plantation Drive 2.0 (100+ saplings), Saviorthon 10K at
    Bandra Fort.
  - *Entrepreneurship & Fundraising:* Muskaan Exhibition Stall (800+ footfall, ₹11,000 raised),
    Seva Mahotsav digital promotion (50K+ reach).
  - *Fellowship, Sports & Wellness:* Game Night House Championship launch (18 members, 4 houses),
    Turf Wars (24 members), Pranic Healing session (18 participants).

---

## Brand & visual direction (locked)

**Concept — "Dawn of Impact":** midnight-navy stage where a dawn gradient breaks through.
Orbit's dark-poster grammar carries the layout; the pink→dawn gradient and RCMWE's rust/orange
logo tones supply color; Velorah supplies hero chrome and type pairing.

### Tokens (`:root`, OKLch core + brand hexes)

```css
--bg:        oklch(0.17 0.028 262);   /* deep midnight navy (fuses #161616 + hsl(201 100% 13%)) */
--surface:   oklch(0.215 0.032 262);
--fg:        oklch(0.965 0.006 90);   /* warm white */
--muted:     oklch(0.72 0.02 255);    /* gray-blue secondary text */
--border:    oklch(0.31 0.025 262);
--accent-a:  #ffc5dc;                 /* dawn rose (from Orbit gradient) */
--accent-b:  #fd86db;                 /* deep pink (gradient end) */
--ember:     #e44f21;                 /* logo orange — tiny highlights only */
--grad-dawn: linear-gradient(180deg, #ffc5dc 0%, #fd86db 58%, #e44f21 130%);
--orb-reveal: cubic-bezier(.16, 1, .3, 1);   /* kept verbatim */
--orb-soft:   cubic-bezier(.25, .8, .28, 1); /* kept verbatim */
```

Rules: single accent system (dawn gradient) ≤ 2 uses per viewport; `--ember` only for micro
highlights (live badge dot, active filter underline). Hover states shift L by ±0.06–0.12 or swap
fg+bg together; never dim text toward `--muted`.

### Typography

- **Display:** Instrument Serif (400, incl. italic accents) — giant wordmarks, section titles.
- **Body/UI:** Inter 400/500 — paragraphs, nav, forms.
- **Mono:** JetBrains Mono (or ui-monospace fallback) — eyebrows, dates, numerals, labels.
- Display sizes via `clamp()`; H1 tracking ≈ `-0.02em` per Velorah spec.

### Signature imagery

Halftone/pixel-art sun-over-sea artwork (two colorways for the morph-reveal), echoing the Orbit
lily mechanic but native to the club's identity. All images generated locally into `assets/` —
no external hotlinks except none; fonts via Google Fonts `<link>`.

---

## Site architecture

Multi-file prototype (project metadata: one file per screen, `index.html` = launcher/overview).
Shared chrome (glass nav + footer + tokens) duplicated per self-contained page; each page
targets ≤ ~1,000 lines.

```
index.html      → launcher / overview hub (links every screen)
home.html       → cinematic poster hero + scrolling home sections
about.html      → story, mission, timeline, Rotary family, BOD
impact.html     → all 12 projects: filters + detail modals
events.html     → calendar/timeline view, upcoming vs past filter
people.html     → board grid + fellowship culture (houses)
join.html       → membership pitch + validated form + FAQ
assets/logo.svg, assets/*.png (generated art)
```

### Screen-by-screen

1. **index — Launcher/Overview** · Dark hub: logo mark, "Dawn of Impact" title, one-line intro,
   card list linking all six screens (each card = screen name + purpose + mono index number).
   Minimal, fast, elegant — the prototype's front door.
2. **home — Poster hero** *(signature screen)* · Full-viewport, no-scroll first paint:
   - Glass nav: logo mark + links (About / Impact / Events / People) + white pill CTA "Join Us".
   - Giant serif wordmark **DAWN OF IMPACT** split-colored ("DAWN" solid white, "OF IMPACT"
     dawn-gradient clip-text; oversized O optical treatment optional).
   - Halftone sun-over-sea subject right-of-center, overlapping the wordmark's tail.
   - Corner microcopy (real lines): left "Every young leader, / rising before the city wakes."
     right "Less noise. / More impact."
   - Scroll cue → sections below fold: ticker marquee (real impact numbers), mission strip,
     stats band (count-up: 90+ · 112 · 99 · 100+ · ₹11,000 · 50K+), three featured project
     cards, pillar grid, events teaser, join CTA band, footer.
3. **about** · Charter story (June 2016 → today vertical timeline), mission/vision pair, Rotary
   family diagram (Rotary parent → RCMWE → RID 3141), values row. BOD preview links to People.
4. **impact** · Filter chips (All / four pillars); responsive card grid; click → modal with
   brief + quantified impact (all figures from fact sheet). Counts update live.
5. **events** · Vertical timeline grouped by month (Jul/Aug 2026 real events); status chips;
   Upcoming/Past toggle (relative to today); event detail modal reuse.
6. **people** · BOD grid — TODO Q3 (names/photos pending); house championship strip (4 houses,
   from Game Night record); fellowship gallery placeholders marked honest.
7. **join** · "Be the Dawn" pitch, benefits checklist, validated demo form (inline errors +
   success state, clearly labeled local-only), FAQ accordion, Instagram/Join link slots.

---

## Signature interactions (ported from inspiration specs)

### A. Morph-reveal trail — home hero (implement faithfully)

Constants kept exactly: `TRAIL_MAX_POINTS 60 · TRAIL_HEAD_R 140 · TRAIL_NOISE_AMP 44 ·
TRAIL_BLOB_PTS 24 · TRAIL_FADE_SPEED 0.92 · TRAIL_SAMPLE_DIST 8`.

Architecture: two layers over the subject image stack — hidden offscreen canvas sized to the
artwork box; per frame `mask-image: url(canvas.toDataURL())`. Front (night) layer punched with
`destination-out` blobs; reveal (dawn) layer painted white-on-clear so only the trail shows.
Head radius lerps `0.14` in / `0.04` out; sample every 8px; decay `alpha *= .92, r *= .995`;
`drawMorphBlob` = 24 points, 3-wave sine/cos noise `(×0.45, ×0.30, ×0.25)` scaled by `44·(r/140)`,
closed path via midpoint quadratic curves. Listeners on `.stage` only; leave-stage lerps shut.
Mobile/no-hover fallback: slow autonomous reveal loop along a Lissajous path.

### B. Entrance choreography (once, `.anim` on `<html>`)

Pure-CSS keyframes while `.anim`; JS removes it after last animation (+6000ms safety); never
replays; `prefers-reduced-motion` → whole-stage 280ms fade only.

| Element | Anim | Dur | Delay |
|---|---|---|---|
| brand mark | quiet rise | 620ms | 100ms |
| nav items ×4 | dim fade | 550ms | 180/225/270/315ms |
| pill CTA | quiet | 620ms | 340ms |
| wordmark inner | mask rise `118%→0` | 1150ms | 300ms |
| artwork subject | rise + fade (no scale) | 1150ms | 660ms |
| both corners | corner rise | 720ms | 980ms (same) |

Wordmask keeps `overflow:hidden` + padding/negative-margin trick during animation. Never animate
transform on elements carrying optical `scaleX`.

### C. Chrome & micro-interactions

- Liquid-glass sticky nav (`backdrop-filter: blur(18px) saturate(1.4)`), active-link state,
  hover = border/lightness shift (never text graying).
- Mobile: circular burger → frosted sheet, scrim button z-order 9/10/12, Escape close +
  Tab-trap + inert background when closed.
- Ticker marquee (pausable, reduced-motion static), count-up stats on intersect,
  IntersectionObserver reveal staggers (`data-reveal`), filter chips animate grid,
  modals = native `<dialog>` semantics w/ focus return, FAQ accordion, form validation with
  paired-color error/success states.

---

## Media generation plan (`media generate --surface image`)

| File | Prompt direction | Aspect |
|---|---|---|
| `assets/dawn-hero-night.png` | Pixel-art halftone sun half-risen over stylized Art-Deco sea waves, monochrome indigo/steel palette, transparent background, crisp dithered shading | tall 4:5 |
| `assets/dawn-hero-reveal.png` | Identical composition/pixel grid, recolored dawn palette (rose `#ffc5dc` → pink `#fd86db` → ember rim light) | tall 4:5 |
| `assets/grain-sea.png` | Wide halftone Arabian Sea horizon at first light, ultra-dark, for about/join backdrops (low contrast, behind scrims) | 16:9 |

Fallback if generation unavailable: CSS/SVG halftone sun built from radial-gradients (still
filled shapes, no empty outlines). No photos of real beneficiaries will be fabricated; people
sections stay typographic until the user supplies photos (Q3).

---

## Responsive & accessibility gates

- Breakpoints verified: 360/390/430/600/768/820/1024/1366/1440/1920 — no horizontal scroll.
- Poster hero recomposes under `(max-aspect-ratio: 4/5)`: centered smaller subject
  (`min(55dvh, 110vw)`), wrapped corner copy, burger replaces inline nav.
- Touch targets ≥ 44px; body text ≥ 16px; display ≥ clamp floors.
- Contrast pairs checked in default/hover/active/disabled/focus-visible (≥ 4.5:1 text,
  ≥ 3:1 large/icons); disabled is the only allowed contrast drop.
- `data-od-id` on every section, nav item group, card, modal trigger, form field group.

---

## Acceptance checks (P0)

- [ ] Launcher links resolve to all six screens; no dead links anywhere.
- [ ] Home paints full-viewport poster with zero scroll-jump on load; entrance plays once.
- [ ] Morph trail matches constants above; punches night layer + paints dawn layer;
      wordmark stays readable through transparent petals/waves.
- [ ] All 12 projects present with exact dates/figures from the fact sheet; no invented stats.
- [ ] Filters, modals, accordion, toggle, form validation all function (keyboard included).
- [ ] Mobile sheet traps focus; Escape closes; background inert.
- [ ] Reduced-motion honored globally (trail disabled → static crossfade).
- [ ] Each page self-contained, ≤ ~1,000 lines, no leftover placeholders/TODO stubs visible.

## Open questions (do not block build)

- **Q1 — Club name:** brief says "Bombay West"; source doc says **Mumbai Western Elite (RCMWE)**.
  Building as RCMWE unless corrected (one-line token swap later either way).
- **Q2 — Video hero:** use generated stills + CSS dawn aurora (default, reliable) or generate a
  short looping video for the backdrop?
- **Q3 — People content:** BOD names/roles/photos and Instagram handle are `#` placeholders
  pending user input.
- **Q4 — Join form:** demo-only (default) or wire to a real endpoint/Google Form URL?

---

## Next step

Review/edit this plan (tick any answers into Open questions). Then hand off to Design mode —
generation can start immediately from this document: shared tokens + chrome → `home.html`
poster hero with morph-reveal → remaining screens → media generation → P0 sweep across
360–1920px.
