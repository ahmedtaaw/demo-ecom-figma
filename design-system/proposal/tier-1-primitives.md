# Tier 1 — Primitives

Indivisible atoms. No child components. Every prop maps to a token. These are the only components that touch raw token values directly.

---

## Button

The single interactive CTA primitive. Covers every button variant in the design.

**Variants observed in Figma:**
- `primary` — filled, `--color-brand-primary` bg, white text, `--radius-full` → "Checkout"
- `ghost` — transparent bg, `2px solid --color-brand-primary` border, brand text → "Next: Choose your plan"
- `link` — no border, no bg, underlined text → "Save my system for later"

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `primary \| ghost \| link` | `primary` | Drives all visual differentiation |
| `size` | `sm \| md \| lg` | `md` | `lg` = full-width CTAs, `sm` = compact inline actions |
| `fullWidth` | boolean | `false` | `true` for all CTA contexts in this design |
| `disabled` | boolean | `false` | Reduces opacity, blocks interaction |
| `loading` | boolean | `false` | Replaces label with spinner, blocks interaction |
| `as` | `button \| a` | `button` | Allows rendering as anchor for navigation |
| `children` | ReactNode | — | Label content |

**Token consumption:**

| CSS Property | Token |
|---|---|
| `background` (primary) | `--color-brand-primary` |
| `background` (hover) | `--color-brand-primary-hover` |
| `color` (primary) | `--color-text-on-primary` |
| `border` (ghost) | `2px solid --color-brand-primary` |
| `color` (ghost) | `--color-text-brand` |
| `background` (ghost hover) | `--color-brand-primary-subtle` |
| `border-radius` | `--radius-full` |
| `padding` (md) | `--space-3` vertical, `--space-6` horizontal |
| `padding` (lg) | `--space-4` vertical, `--space-8` horizontal |
| `font` | `--type-heading-3` weight, `--font-family-base` |

---

## Badge

A compact non-interactive label. Not a button. Not a tag you can remove.

**Variants observed in Figma:**
- `brand` — purple bg, white text → "Save 22%"
- `success` — teal/green → "FREE" (as inline replacement), trust indicators
- `neutral` — light bg, muted text → selection count
- `promo` — subtle purple bg, brand text, pill shape → "as low as $19/mo" (previously `Chip`)

**Note:** `Chip` has been merged into `Badge`. The distinction between "status signal" and "value callout" was too subtle to be team-safe. Shape handles the visual difference.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `brand \| success \| neutral \| promo` | `neutral` | |
| `shape` | `rounded \| pill` | `rounded` | `rounded` = `--radius-xs`, `pill` = `--radius-full` |
| `size` | `sm \| md` | `sm` | `sm` for inline badges, `md` for prominent labels |
| `children` | ReactNode | — | Label text |

**Token consumption:**

| Variant | Background | Text Color | Default Shape |
|---|---|---|---|
| `brand` | `--color-brand-primary` | `--color-text-on-primary` | `rounded` |
| `success` | `--color-success` (at 15% opacity) | `--color-success` | `rounded` |
| `neutral` | `--color-border-subtle` | `--color-text-secondary` | `rounded` |
| `promo` | `--color-brand-primary-subtle` | `--color-text-brand` | `pill` |

---

---

## Icon

A thin wrapper for SVG icons. Provides consistent sizing, color inheritance, and accessible labeling.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `name` | string | — | Key into the icon sprite/registry |
| `size` | `sm \| md \| lg` | `md` | `sm`=16px, `md`=20px, `lg`=24px |
| `color` | string (CSS var) | `currentColor` | Pass token value directly |
| `label` | string \| null | `null` | `aria-label` when icon is standalone; `null` when decorative |

**Sizes observed in Figma:**
- 16px — inline icons in color swatches, step header icons
- 20px — plan icon (Cam Unlimited shield), shipping icon
- 24px — step accordion leading icons

---

## Text

A typography primitive. Replaces raw `<p>`, `<span>`, `<h1>–<h6>` with a token-driven component.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `as` | HTML tag | inferred from `variant` | Override semantic element without changing visual style |
| `variant` | `display \| heading-1 \| heading-2 \| heading-3 \| label-upper \| body \| caption \| price` | `body` | Maps directly to `--type-*` tokens. No `link` variant — links use `Button variant="link"` or a raw `<a>` |
| `color` | `primary \| body \| secondary \| muted \| brand \| success \| error \| on-primary` | `body` | Maps to `--color-text-*` tokens |
| `strikethrough` | boolean | `false` | `text-decoration: line-through` — used for original prices |
| `truncate` | boolean | `false` | Single-line overflow ellipsis |
| `children` | ReactNode | — | |

**Variant → token map:**

| Variant | Token | Default `as` |
|---|---|---|
| `display` | `--type-display` | `h1` |
| `heading-1` | `--type-heading-1` | `h2` |
| `heading-2` | `--type-heading-2` | `h3` |
| `heading-3` | `--type-heading-3` | `h4` |
| `label-upper` | `--type-label-upper` | `span` |
| `body` | `--type-body` | `p` |
| `caption` | `--type-caption` | `span` |
| `price` | `--type-price-current` | `span` |
| ~~`link`~~ | — | Removed — use `Button variant="link"` for interactive links, raw `<a>` for inline text |

---

## Divider

A horizontal rule with an optional inline label.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | string \| null | `null` | When set, renders an uppercase section label alongside the rule |
| `spacing` | `sm \| md` | `md` | Vertical margin above/below |

**Token consumption:**
- Rule color: `--color-border-subtle`
- Label style: `--type-label-upper`, `--color-text-secondary`
- Spacing `md`: `--space-4` top + bottom
- Spacing `sm`: `--space-2` top + bottom

---

## Thumbnail

A fixed-ratio image container for product images. Handles loading, fallback, and alt text.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `src` | string | — | Image URL |
| `alt` | string | — | Required for accessibility |
| `size` | `xs \| sm \| md \| lg` | `md` | `xs`=32px, `sm`=48px, `md`=64px, `lg`=96px |
| `ratio` | `square \| portrait \| landscape` | `square` | Aspect ratio of the container |
| `objectFit` | `contain \| cover` | `contain` | Product images use `contain` against white bg |

**Background:** `--color-surface-card` (white) — products photograph against white.

---

## Summary

| Primitive | Replaces (page-specific) |
|---|---|
| `Button` | `CheckoutButton`, `NextStepButton`, `SaveForLaterLink` |
| `Badge` | `SaveBadge`, `FreeBadge`, `MonthlyPriceChip` (via `promo` variant) |
| `Icon` | All inline SVG usages |
| `Text` | All typography nodes, `SavingsBanner`, `StepProgressLabel` |
| `Divider` | `SectionDivider`, `SectionLabel` |
| `Thumbnail` | `ProductImage` |
| `Card` | All card/panel containers *(moved from Tier 2 — composes nothing)* |
