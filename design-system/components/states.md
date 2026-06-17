# Component States

All interactive states observed across the 3 Figma screens.

---

## ProductCard

| State | Visual Treatment |
|---|---|
| `default` | `border: 1px solid --color-border-default`, `--shadow-card`, normal content |
| `selected` | `border: 2px solid --color-border-brand` (`#4d2fd1`), same shadow (no upgrade) |
| `zero-quantity` | Qty shows `0`, minus button disabled. No border change. Price shown without stepper active emphasis |
| `hover` | Border transitions to `--color-border-brand` at reduced opacity (implied — not explicitly shown but standard pattern) |

---

## QuantityStepper

| State | Visual Treatment |
|---|---|
| `default` | Both buttons enabled, neutral border `--color-border-subtle` |
| `at-min` (value = 0 or min) | Minus (`−`) button: reduced opacity or `--color-text-muted`, not clickable |
| `at-max` | Plus (`+`) button: reduced opacity, not clickable |
| `focused` | Border shifts to `--color-border-brand` (standard focus ring) |

---

## StepAccordion

| State | Visual Treatment |
|---|---|
| `collapsed` | Default state. Icon in `--color-brand-primary-light`, chevron (▼) pointing down, content hidden. If selections exist: shows "X selected ▼" as `Text + Icon` (not a badge) in `--color-brand-primary`, right-aligned. |
| `expanded` | Full content visible, container background `--color-surface-page` (`#edf4ff`), step icon in `--color-brand-primary`, chevron (▲) pointing up. |

**Note:** An "inactive/locked" state (grayed, non-interactive) is NOT observed in the Figma. All 4 steps appear togglable on mobile. Whether steps should be locked until prior steps are complete is an interaction/product decision — not a visual state designed here. Confirm with product before implementing.

---

## OptionSelector

| State | Visual Treatment |
|---|---|
| `default` | Pill container with label, color circle, light border |
| `selected` | Border upgrades to `--color-border-brand`, slight background tint |
| `out-of-stock` | Not shown in design — handle with opacity reduction (implied) |

---

## PriceDisplay

| State | Visual Treatment |
|---|---|
| `normal` (no sale) | Single price in `--color-text-primary`, `--type-price-current` |
| `on-sale` | Original price: `--color-error` + `text-decoration: line-through`. Current price: `--color-text-primary`, bold |
| `free` | "FREE" text in `--color-success`, replaces numeric price entirely |

---

## CheckoutButton

| State | Visual Treatment |
|---|---|
| `default` | `--color-brand-primary` background, white text, full-width, `--radius-full` |
| `hover` | `--color-brand-primary-hover` (`#3d22b0`) background |
| `disabled` | Reduced opacity (~40%), not clickable |
| `loading` | Spinner replaces text (implied — not shown in static design) |

---

## NextStepButton (Ghost)

| State | Visual Treatment |
|---|---|
| `default` | Transparent background, `border: 2px solid --color-brand-primary`, `--color-text-brand` text |
| `hover` | `--color-brand-primary-subtle` background fill |
| `disabled` | Shown only when step has zero selections |

---

## LearnMoreLink

| State | Visual Treatment |
|---|---|
| `default` | `--color-text-brand`, no underline |
| `hover` | `text-decoration: underline` |
| `visited` | No distinct visited state visible in design |

---

## OrderLineItem

| State | Visual Treatment |
|---|---|
| `in-cart` | Normal render — thumbnail, name, qty stepper, price |
| `free` | Price column shows `FreeBadge` ("FREE" in `--color-success`) |
| `removed` | Item disappears from list (quantity reduced to 0) |

---

## ShippingLineItem

| State | Visual Treatment |
|---|---|
| `paid` | Original price `$5.99` in strikethrough + `--color-error` |
| `free` | "FREE" replaces price in `--color-success` |

---

## SavingsBanner

| Condition | Visibility |
|---|---|
| `savingsAmount > 0` | Shown — green text |
| `savingsAmount === 0` | Hidden entirely |

---

## StepProgressLabel ("STEP X OF 4")

| State | Notes |
|---|---|
| Active step | Full opacity |
| Inactive step | Reduced opacity or `--color-text-muted` |
