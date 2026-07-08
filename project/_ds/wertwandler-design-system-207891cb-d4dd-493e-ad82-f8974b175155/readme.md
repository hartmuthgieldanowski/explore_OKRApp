# Wertwandler Design System

## Company Context

**Wertwandler** is a Swiss consulting and coaching network based in Switzerland, specializing in organizational development, agile transformation, Kanban, leadership coaching, team dynamics, and facilitation. The tagline is *"Kultiviere den Wandel und wandle die Kultur"* (Cultivate change and transform the culture).

The company is a "Wertschöpfungsnetzwerk" (value-creation network) of ~10 coaches with diverse backgrounds — united by a shared methodology rooted in ORSC, Kanban, Lean, Flight Levels, and systemic coaching.

**Website:** https://www.wertwandler.ch  
**Related properties:** wertwandler.academy, iterationzero.works, agilereflection.ch, laladay.ch

### Sources

- **PPTX proposal deck** (`uploads/Wertwandler_CSB_Proposal.pptx`) — 9-slide client proposal for Centro Sanitario Bregaglia; primary source for slide styling, typography, and color usage.
- **Logo files** — Multiple variants in `assets/`: full logo with wordmark, symbol-only (LogoWW_006), white-on-dark variant.
- **Illustrations** — Hand-drawn line art set in `assets/illustrations/` covering business scenarios (coffee meetings, presentations, confusion, global reach, superhero poses).
- **Website** — WordPress-based at wertwandler.ch.

---

## CONTENT FUNDAMENTALS

### Tone & Voice
- **Language:** German (Swiss German context, written in standard Hochdeutsch)
- **Address:** Informal "du" form — always. Never "Sie." Direct, personal, peer-to-peer.
- **Tone:** Warm but direct. Not corporate. No buzzword padding. Say what you mean.
- **Sentence structure:** Short, punchy sentences. Fragments are welcome. Periods for emphasis: "Klein anfangen. Konkret."
- **Rhetoric:** Uses rhetorical mirroring — quoting the client's own words back to them. Builds trust through demonstrated listening.
- **Casing:** Sentence case for headings and body. ALL CAPS only in the logo wordmark "WERTWANDLER" and subtitle "TEAM KANBAN ORGANISATION."
- **Emoji:** Minimal. Used sparingly on the website (📅 ✉️ 📄) for functional UI markers only — never decorative.
- **Punctuation:** Uses em-dashes (—) heavily for asides and emphasis. Interpunct (·) as a separator between items (e.g. "Wertwandler · Hartmuth Gieldanowski").
- **Numbers:** Swiss format with apostrophe as thousands separator: CHF 12'000. Prices always include "exkl. MwSt." when relevant.
- **Vibe:** A senior coach sitting across from you at a coffee table — not a sales team presenting to a boardroom.

### Copy Examples
- "Verbindung schaffen. Unternehmergeist verankern."
- "Es sind nicht vier Probleme. Es ist ein System."
- "Wir machen uns überflüssig — das ist unser Ziel."
- "Kein Commitment ausser dem ersten Schritt."
- "Klein anfangen. Konkret."

---

## VISUAL FOUNDATIONS

### Colors
- **Primary accent:** Orange `#FC971C` — the defining brand color. Used for highlights, links, accent dots, interactive elements.
- **Dark background:** `#1A1A1A` — the dominant slide background. Creates a premium, focused feel.
- **Foreground on dark:** White `#FFFFFF` for headings, `#BBBBBB` for body text, `#595959` for metadata/footnotes.
- **Light surfaces:** White `#FFFFFF` with `#F7F7F7` subtle backgrounds.
- **No gradients.** Flat, solid fills only. The brand is anti-gradient.

### Typography
- **Display / Headings:** Cambria (serif), bold. Used at 42px on slides. Conveys authority and permanence.
- **Body:** Calibri (sans-serif), regular weight. Clean and readable.
- **Google Fonts substitutes:** Source Serif 4 (for Cambria) and Source Sans 3 (for Calibri). Flagged as approximations.
- **Hierarchy is achieved through size and weight, not color variation.** Headings are large and bold; body is smaller and regular weight. Both typically in the same color.
- **Line height:** 110% for headings (tight), ~150% for body.

### Spacing
- **Generous whitespace.** Slides are spacious — content occupies roughly 60% of the available area.
- **Left-aligned.** Almost everything is left-aligned. Center alignment is rare, used only for standalone quotes.
- **Consistent margins.** Slide content starts at ~68px from left edge on a 1920-wide canvas.

### Backgrounds
- Dark (#1A1A1A) is the default for presentations.
- White is the default for web/documents.
- No background images, patterns, or textures. No gradients.
- Illustrations are placed as standalone figures, never as backgrounds.

### Animation & Motion
- No animations in presentations. Static slides.
- Web: subtle hover transitions only (opacity, color). No bounces, springs, or elaborate entrances.
- Easing: ease-out for reveals, ease-in-out for state changes.

### Hover & Interactive States
- Hover: opacity reduction (0.8) or color shift to orange.
- Active/pressed: slightly darker orange `#E07A00`.
- Focus: orange outline or underline, no box-shadow glow.
- Disabled: 40% opacity of the default state.

### Borders & Shadows
- Minimal borders. Used functionally to separate content, never decoratively.
- Shadows are extremely subtle when used — mostly on cards for light backgrounds.
- No inner shadows. No glowing effects.
- Border color: `#D9D9D9` on light, `#3A3A3A` on dark.

### Corner Radii
- Predominantly square (0 radius). The brand aesthetic is angular and direct.
- Small radius (2–4px) for interactive elements (buttons, inputs) to soften edges minimally.
- No large rounded corners. No pill shapes except for occasional badges.

### Cards
- Light mode: white surface, subtle shadow (`0 2px 8px rgba(0,0,0,0.08)`), minimal or no border.
- Dark mode: `#2A2A2A` surface, no shadow, optional thin border `#3A3A3A`.
- No colored left-border accents. No gradient fills.

### Layout Patterns
- **Grid-based.** 2-3 column grids for content organization.
- **Orange dot markers** — small filled circles (`#FC971C`, ~10px diameter) used as section/list markers instead of traditional bullets.
- **Slide numbers** in bottom-right corner, light gray, small (11px).
- **Interpunct separators** (·) between inline items.

### Imagery
- **Hand-drawn illustrations** are the signature visual element. Black line art with gray shadows on white backgrounds. Some have orange accent fills (globe, speaker figure).
- **Style:** Loose, gestural, editorial-illustration feel. Not polished or corporate. Deliberately imperfect.
- **Photography:** Minimal. Team photos on the website are the only photographic content.
- **Color temperature of imagery:** Neutral to warm. No cool-toned or desaturated filters.

---

## ICONOGRAPHY

Wertwandler does not use a formal icon system. The brand relies on:

1. **Hand-drawn illustrations** for conceptual communication (see `assets/illustrations/`).
2. **Minimal functional icons** on the website — likely from the WordPress theme's built-in set.
3. **No icon font or SVG sprite sheet** in the provided materials.
4. **Emoji** used very sparingly — only for functional navigation markers (📅 ✉️ 📄), never decoratively.
5. **Unicode characters:** Interpunct (·) used as a separator. Em-dash (—) for asides.

For UI components that need icons, use [Lucide](https://lucide.dev) icons (thin stroke weight matches the hand-drawn illustration style). Link from CDN: `https://unpkg.com/lucide-static/font/lucide.css`

### Illustration Inventory
All in `assets/illustrations/`:
- `table-coffee.png` — coffee table scene (meetings, conversations)
- `woman-coffee.png` — professional woman with coffee (casual professionalism)
- `confused.png` — figure with question marks (problems, uncertainty)
- `evolution.png` — figure celebrating with money (success, value creation)
- `globe.png` — hand-drawn globe with orange land masses (global reach, international)
- `orange-speaker.png` — orange figure with speech bubble and heart hands (communication, empathy)
- `presenter.png` — standing figure (presentations, facilitation)
- `superhero-female.png` — female superhero pose (empowerment)
- `superhero-male.png` — male superhero pose (empowerment)

---

## Logo Usage

### Variants Available
| File | Description | Use |
|------|-------------|-----|
| `assets/logo.png` | Full logo — symbol + "WERTWANDLER" + tagline | Default, light backgrounds |
| `assets/logo-small.png` | Compact full logo | Smaller placements |
| `assets/LogoWW_006.png` | Symbol only (orange circle with nodes) | Favicons, avatars, compact spaces |
| `assets/logo-white.png` | White symbol for dark backgrounds | Slides, dark sections |

### Rules
- Never distort or recolor the logo.
- On dark backgrounds, use the white variant.
- Minimum clear space: 1× the height of the circle symbol on all sides.
- The wordmark "WERTWANDLER" is set in a condensed typeface; do not recreate it in a different font.

---

## Project Index

```
styles.css                    — Root CSS entry (imports only)
tokens/
  colors.css                  — Color custom properties
  typography.css              — Font stacks, sizes, weights
  spacing.css                 — Spacing scale, radii, shadows
assets/
  logo.png, logo-small.png    — Full logos for light backgrounds
  LogoWW_006.png              — Symbol only
  logo-white.png              — White symbol for dark backgrounds
  illustrations/              — Hand-drawn brand illustrations
components/
  core/                       — Button, Badge, Card, Input, etc.
guidelines/
  colors/                     — Color specimen cards
  typography/                 — Type specimen cards
  brand/                      — Logo and illustration cards
  spacing/                    — Spacing and layout cards
templates/
  proposal-deck/              — Slide deck template
readme.md                     — This file
SKILL.md                      — Agent skill definition
```
