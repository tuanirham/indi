# Outreach — White-Label Sales Engagement UI

A fresh, brandable redesign inspired by the reply.la product category (AI sales
engagement: multichannel outreach, AI SDR, deliverability, lead database).
Built as **self-contained HTML + a precompiled Tailwind `styles.css`** — no CDN,
no runtime dependencies, works fully offline. Just open the files.

## Files

| File | What it is |
|------|------------|
| `index.html` | Marketing landing page (hero, features, how-it-works, showcase, testimonials, pricing, FAQ, CTA, footer) |
| `app.html` | In-app dashboard shell (sidebar, topbar, KPI cards, engagement chart, recent replies, campaigns table) |
| `styles.css` | Precompiled Tailwind — already built, no CDN needed |
| `tailwind.config.js`, `input.css` | Build source, only needed if you add new classes |
| `screenshots/` | Rendered previews (light/dark, desktop/mobile) |

## How to view

Pick whichever is easiest:

1. **Double-click `index.html`** — opens directly in your browser (no server needed).
   "View live dashboard" / "Sign in" link through to `app.html`.
2. **Local server** (nicer for clean URLs):
   ```bash
   cd reply-whitelabel
   python3 -m http.server 8000     # then open http://localhost:8000
   ```
3. **Preview the screenshots** in `screenshots/` without opening anything.

> Only Google Fonts loads from the network (for Plus Jakarta Sans); everything
> else is local. With no internet it falls back to a system sans-serif.

## How to rebrand (the whole point)

Everything visual is driven by **design tokens** in the `:root` block at the top
of each file's `<style>`. To make it your own, edit those values in **both**
`index.html` and `app.html` (kept identical on purpose):

```css
:root {
  --brand:         79 70 229;   /* primary brand color — RGB channels */
  --brand-strong: 124 58 237;   /* gradient end color */
  --brand-fg:     255 255 255;  /* text on brand */
  /* neutrals, semantic colors, radius, font... */
}
```

- Colors are **space-separated RGB channels** (not `#hex`) so Tailwind can apply
  opacity, e.g. `bg-brand/10`. Convert your hex to `R G B` (e.g. `#4F46E5` → `79 70 229`).
- Swap `--brand` + `--brand-strong` and the entire UI — buttons, gradients,
  charts, badges, focus rings — follows automatically.
- Change `--font-sans` and update the Google Fonts `<link>` to restyle typography.
- Replace the word **"Outreach"** and the logo `<svg>` (the paper-plane mark) with your brand.

### Dark mode
Already built in. A `.dark` class on `<html>` swaps the token values. The toggle
in the header persists the choice to `localStorage` and respects the OS setting.

### Rebuilding `styles.css`
Only needed if you add Tailwind classes that aren't already used. Requires Node:
```bash
npm i -D tailwindcss@3
npx tailwindcss -c tailwind.config.js -i input.css -o styles.css --minify
```
Token (color/font) changes do **not** require a rebuild — they're CSS variables
applied at runtime.

## Design system (auto-generated)

Generated with the `ui-ux-pro-max` skill for the "AI sales engagement / B2B SaaS"
product type:

- **Style:** Enterprise SaaS — professional, trustworthy, polished
- **Palette:** Navy/slate foundation + indigo→violet brand accent
- **Typography:** Plus Jakarta Sans
- **Effects:** brand gradient CTAs, soft colored shadows, 12–14px radius, spring press states

## Accessibility & quality

- WCAG-minded contrast, visible focus rings, skip link, semantic landmarks
- Keyboard-navigable, `aria-label`s on icon-only buttons, real `<label>`s on inputs
- SVG icons only (no emoji), `prefers-reduced-motion` respected
- Responsive: 375 / 768 / 1024 / 1440, mobile sidebar with backdrop, tabular numbers for data
