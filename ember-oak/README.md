# Ember & Oak Roasting Co. — Business Website

A complete, production-ready website for a fictional small-batch specialty coffee
roastery in Kuala Lumpur. Built with plain HTML/CSS/JS — no framework, no build
step, fully self-contained (fonts self-hosted, all artwork is inline SVG, zero
external requests).

## Pages

| Page | File | Highlights |
|------|------|-----------|
| Home | `index.html` | Hero with illustrated art + floating proof chips, press strip, bestsellers, process, stats, subscription band, testimonials, locations teaser, newsletter |
| Shop | `shop.html` | 9 products, live category filters, price sorting, roast-level meters, tasting-note chips, add-to-bag with persistent cart badge + toast |
| Subscriptions | `subscriptions.html` | 3 pricing tiers with featured plan, how-it-works, accessible FAQ accordion, gift CTA |
| Our Story | `about.html` | Illustrated roaster art, timeline, values, team, transparency stats |
| Visit | `visit.html` | Two locations with stylised SVG maps, hours tables, classes with pricing |
| Contact | `contact.html` | Fully validated form (inline errors on blur, focus management, success state), contact channels, wholesale info |

## Design system

Generated with the **UI/UX Pro Max** skill (`--design-system` engine):

- **Style** — warm editorial craft: cream + espresso + amber (F&B palette,
  WCAG-adjusted), soft shadows, 16–24px radii
- **Typography** — Playfair Display (display serif) / Inter (body), both
  self-hosted variable woff2 with `font-display: swap` and preloads
- **Tokens** — semantic CSS variables for color, an 8px spacing rhythm, a
  consistent elevation scale, and shared motion durations/easing
- **Landing pattern** — Feature-Rich Showcase (hero → features → social proof →
  repeated CTA)

## UX & accessibility checklist

- Skip links, visible `:focus-visible` rings, `aria-current` nav state,
  labelled icon-only buttons, `aria-live` toasts and error regions
- 4.5:1+ text contrast in light and dark sections
- 44px+ touch targets; mobile drawer nav with scrim, Escape close, and focus
  return
- `prefers-reduced-motion` disables reveals and transitions
- No horizontal overflow at 375px (verified with Playwright); responsive at
  375 / 768 / 1024 / 1440
- SVG icons throughout (no emoji icons); `text-wrap: balance` headings;
  tabular numerals for prices

## Run it

Any static server works:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Screenshots

Rendered previews (desktop + 375px mobile) live in `screenshots/`.
