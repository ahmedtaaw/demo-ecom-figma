# Design Tokens — Colors

Extracted via pixel sampling across all 3 Figma screens.  
Purple (`#4d2fd1`) is the sole interactive hue. Teal (`#0aa187`) is semantic-only.

---

## Brand / Primary

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-brand-primary` | `#4d2fd1` | rgb(77, 47, 209) | Buttons, active borders, badges, selected state, chevron icons |
| `--color-brand-primary-hover` | `#3d22b0` | rgb(61, 34, 176) | Button hover — ~10% darkened |
| `--color-brand-primary-light` | `#826dde` | rgb(130, 109, 222) | Secondary icons, muted accents, step header icons |
| `--color-brand-primary-tint` | `#edf4ff` | rgb(237, 244, 255) | Page background, expanded step container background |
| `--color-brand-primary-subtle` | `#e6effd` | rgb(230, 239, 253) | Hover surface, monthly price chip background |

---

## Semantic

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-success` | `#0aa187` | rgb(10, 161, 135) | "FREE" label, trust badge, Cam Unlimited icon, shipping icon |
| `--color-error` | `#d8382a` | rgb(216, 56, 42) | Strikethrough/original price in sale context only |
| ~~`--color-savings`~~ | — | — | **Removed** — duplicate of `--color-success`. Use `--color-success` for savings text. |

---

## Text

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-text-primary` | `#0a0c0f` | rgb(10, 12, 15) | Headings, product names, current prices on ProductCard |
| `--color-text-secondary` | `#6e7782` | rgb(110, 119, 130) | Product descriptions, secondary labels |
| `--color-text-muted` | `#a8b1bc` | rgb(168, 177, 188) | Disabled states, placeholders |
| `--color-text-brand` | `#4d2fd1` | rgb(77, 47, 209) | Inline links ("Learn More", "Cam Unlimited", "Save my system for later") |
| `--color-text-on-primary` | `#ffffff` | rgb(255, 255, 255) | Text on brand-primary filled surfaces (buttons, badges) |

---

## Surfaces

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-surface-page` | `#edf4ff` | rgb(237, 244, 255) | Global page background and active step background |
| `--color-surface-card` | `#ffffff` | rgb(255, 255, 255) | Product cards, order summary row backgrounds |
| `--color-surface-panel` | `#f2f7ff` | rgb(242, 247, 255) | Order summary sticky panel on tablet/desktop |

---

## Borders & Dividers

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-border-default` | `#cdd6dd` | rgb(205, 214, 221) | Default product card borders, row separators |
| `--color-border-subtle` | `#e7e9ed` | rgb(231, 233, 237) | Section dividers, stepper control borders, quantity control borders |
| `--color-border-brand` | `#4d2fd1` | rgb(77, 47, 209) | Selected product card border (`2px`) |

---

## Color Hierarchy Rules

- **Interactive / Selected:** always `--color-brand-primary`
- **Free / Savings / Trust:** always `--color-success`
- **Sale price (original, crossed out) on ProductCard:** `--color-error` (red — aggressive discount signal)
- **Sale price (original, crossed out) in OrderSummaryPanel:** `--color-text-muted` (gray — subtle, not alarming in a review context)
- **Current price on ProductCard:** `--color-text-primary` (near-black)
- **Current price in OrderSummaryPanel:** `--color-brand-primary` (purple — reinforces brand-discounted value)
- **Backgrounds layer:** page (`#edf4ff`) → panel (`#f2f7ff`) → card (`#ffffff`)
- **No dark mode tokens** — design is light-only
