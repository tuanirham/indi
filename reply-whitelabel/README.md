# Outreach — White-Label Sales Engagement UI

A fresh, brandable redesign inspired by the reply.la product category (AI sales
engagement: multichannel outreach, AI SDR, deliverability, lead database).
Built as **self-contained HTML + Tailwind (CDN)** — no build step, no
dependencies. Just open the files.

## Files

| File | What it is |
|------|------------|
| `index.html` | Marketing landing page (hero, features, how-it-works, showcase, testimonials, pricing, FAQ, CTA, footer) |
| `app.html` | In-app dashboard shell (sidebar, topbar, KPI cards, engagement chart, recent replies, campaigns table) |

Open `index.html` in any browser. "View live dashboard" / "Sign in" link to `app.html`.

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
