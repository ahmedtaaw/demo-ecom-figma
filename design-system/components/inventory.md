# Component Inventory

All components classified by category, with props/variants and reuse scope.

---

## Category 1 — Core Commerce

These are the highest-frequency components. They appear on every step.

### ProductCard
**Scope:** Appears across all 4 configurator steps with variant differences.

| Prop | Type | Notes |
|---|---|---|
| `variant` | `camera \| sensor \| plan \| accessory` | Controls which sub-components render |
| `name` | string | Product title |
| `description` | string | Short body copy |
| `image` | string | Product image URL |
| `originalPrice` | number \| null | If set, renders with strikethrough |
| `currentPrice` | number | Active price |
| `quantity` | number | Current qty in builder |
| `colorOptions` | `ColorOption[]` \| null | Only on `camera` variant |
| `selectedColor` | string \| null | Selected color key |
| `saveBadge` | number \| null | Percentage — renders SaveBadge if set |
| `selected` | boolean | Drives border state |

**States:** `default`, `selected`, `zero-quantity`

---

### QuantityStepper
**Scope:** Inside ProductCard and OrderLineItem.

| Prop | Type | Notes |
|---|---|---|
| `value` | number | Current quantity |
| `min` | number | Default: 0 |
| `max` | number | Optional upper bound |
| `size` | `sm \| md` | `sm` inside OrderSummaryPanel, `md` on ProductCard |
| `onChange` | function | Callback |

**States:** `default`, `at-min` (minus button disabled), `at-max` (plus button disabled)

---

### OptionSelector
**Scope:** Inside ProductCard (`camera` variant only). Renamed from `ColorSwatchGroup` — domain-agnostic, works for any variant attribute.

| Prop | Type | Notes |
|---|---|---|
| `options` | `{ label: string, color?: string }[]` | e.g. White/Grey/Black. `color` is optional hex — only renders circle when present |
| `value` | string | Selected option label |
| `onChange` | function | Callback |

**States:** per option — `default`, `selected` (border highlight)

---

### SaveBadge
**Scope:** Absolute-positioned top-left of ProductCard.

| Prop | Type | Notes |
|---|---|---|
| `percentage` | number | e.g. `22` renders "Save 22%" |

---

### PriceDisplay
**Scope:** Bottom-right of ProductCard, inline in OrderLineItem.

| Prop | Type | Notes |
|---|---|---|
| `originalPrice` | number \| null | Renders with `text-decoration: line-through` + `--color-error` |
| `currentPrice` | number | Always shown in bold |
| `free` | boolean | Overrides currentPrice display with "FREE" in `--color-success` |

---

## Category 2 — Step Navigation

These form the backbone of the 4-step configurator flow.

### StepAccordion
**Scope:** Top-level page structure. One instance per step.

| Prop | Type | Notes |
|---|---|---|
| `stepNumber` | number | 1–4 |
| `stepTotal` | number | Always 4 |
| `icon` | ReactNode | Step-specific icon (camera, shield, sensor, lock) |
| `title` | string | "Choose your cameras" etc. |
| `status` | `inactive \| active \| completed` | Drives visual state |
| `selectionCount` | number \| null | Shows "X selected" badge when `completed` |
| `children` | ReactNode | Step content (ProductGrid + NextStepButton) |

**States:**
- `inactive` — locked appearance, grayed icon, chevron down, no background highlight
- `active` — expanded, full content visible, `--color-surface-page` background, chevron up
- `completed` — collapsed, shows "X selected" count, chevron toggles open/close

---

### StepProgressLabel
**Scope:** Above each StepAccordion header.

| Prop | Type | Notes |
|---|---|---|
| `current` | number | Current step number |
| `total` | number | Total steps |

Renders: `"STEP 1 OF 4"` — `--type-label-upper` style.

---

### NextStepButton
**Scope:** Bottom of each active step content area.

| Prop | Type | Notes |
|---|---|---|
| `nextStepLabel` | string | "Choose your plan", "Choose your sensors", etc. |
| `onClick` | function | Advances to next step |
| `disabled` | boolean | When step has no selections |

Visual: Ghost/outlined variant — `border: 2px solid --color-brand-primary`, `--radius-full`.

---

## Category 3 — Order Summary

These live exclusively inside `OrderSummaryPanel`.

### OrderSummaryPanel
**Scope:** Persistent right sidebar (tablet/desktop) or bottom section (mobile).

Sub-components it composes:
- `OrderSectionGroup` (multiple)
- `OrderTotals`
- `SavingsBanner`
- `MonthlyChip`
- `CheckoutButton`
- `SaveForLaterLink`

---

### OrderSectionGroup
**Scope:** Inside OrderSummaryPanel. Renders a labeled group of line items.

| Prop | Type | Notes |
|---|---|---|
| `label` | `'CAMERAS' \| 'SENSORS' \| 'ACCESSORIES' \| 'PLAN'` | Section header |
| `items` | `OrderLineItem[]` | Array of line items |

---

### OrderLineItem
**Scope:** Inside OrderSectionGroup.

| Prop | Type | Notes |
|---|---|---|
| `thumbnail` | string | Product image |
| `name` | string | Product name |
| `quantity` | number | Editable via QuantityStepper (size `sm`) |
| `originalPrice` | number \| null | |
| `currentPrice` | number | |
| `free` | boolean | Shows "FREE" via PriceDisplay |

---

### PlanLineItem
**Scope:** Special variant of OrderLineItem for subscription plans. Inside OrderSectionGroup (`PLAN`).

| Prop | Type | Notes |
|---|---|---|
| `icon` | ReactNode | Teal shield icon |
| `name` | string | "Cam Unlimited" — rendered in `--color-text-brand` |
| `originalMonthlyPrice` | number | Strikethrough monthly rate |
| `currentMonthlyPrice` | number | Active monthly rate |

---

### ShippingLineItem
**Scope:** Below OrderSectionGroup list, above totals.

| Prop | Type | Notes |
|---|---|---|
| `icon` | ReactNode | Teal delivery truck icon |
| `label` | string | "Fast Shipping" |
| `originalPrice` | number \| null | "$5.99" strikethrough |
| `free` | boolean | Shows "FREE" |

---

### OrderTotals
**Scope:** Bottom of OrderSummaryPanel, above CTA.

| Prop | Type | Notes |
|---|---|---|
| `originalTotal` | number | Strikethrough total — "$238.81" |
| `currentTotal` | number | Bold large total — "$187.89" |
| `monthlyEstimate` | number \| null | Renders MonthlyChip if set |

---

### MonthlyChip
**Scope:** Inside OrderTotals, above the total line.

| Prop | Type | Notes |
|---|---|---|
| `amount` | number | Monthly payment amount |

Visual: `--color-brand-primary-subtle` background, `--color-text-brand` text, `--radius-full`, `--type-caption`.

---

### SavingsBanner
**Scope:** Between OrderTotals and CheckoutButton.

| Prop | Type | Notes |
|---|---|---|
| `savingsAmount` | number | "Congrats! You're saving $50.92 on your security bundle!" |

Visual: `--color-savings` text, centered, `--type-body` weight 500–600.

---

## Category 4 — Trust & Conversion

### CheckoutButton
**Scope:** Bottom of OrderSummaryPanel.

| Prop | Type | Notes |
|---|---|---|
| `onClick` | function | Proceed to checkout |
| `disabled` | boolean | When no items selected |
| `loading` | boolean | Mid-submission state |

Visual: Full-width, `--color-brand-primary` fill, white text, `--radius-full`, `--type-heading-3` weight.

---

### SaveForLaterLink
**Scope:** Below CheckoutButton.

Visual: Underlined text link, `--color-text-secondary`, low visual weight. Secondary action.

---

### TrustBadge
**Scope:** Order summary panel — beside ReturnPolicyBlock on desktop, above totals on mobile.

Visual: Circular stamp graphic, "100% Wyze satisfaction guarantee". Decorative — not interactive.

---

### ReturnPolicyBlock
**Scope:** Order summary panel on desktop.

| Prop | Type | Notes |
|---|---|---|
| `heading` | string | "30-day hassle-free returns" |
| `body` | string | Policy copy |

Visual: Icon + heading (`--type-heading-3`) + body (`--type-body`).

---

## Category 5 — Primitives / Atoms

These are the smallest building blocks, shared across multiple categories.

| Component | Description |
|---|---|
| `SectionDivider` | `label` prop (uppercase) + `1px border-top` in `--color-border-subtle` |
| `ProductImage` | Fixed-ratio container with white/transparent background |
| `IconLabel` | 16–20px icon + label text — used in step accordion headers |
| `LearnMoreLink` | Inline `<a>`, `--color-text-brand`, `--type-link` |
| `FreeBadge` | "FREE" text node — `--color-success`, `--type-price-current` weight |
| `SelectionCountBadge` | "X selected" count shown on completed StepAccordion |
