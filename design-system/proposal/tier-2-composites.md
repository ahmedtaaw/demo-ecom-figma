# Tier 2 — Composites

2–3 Tier 1 primitives composed into a reusable UI unit. No page logic, no domain assumptions, no Shopify-specific wiring. Each composite should be renderable in a Storybook story with static props.

---

## PriceDisplay

Composes: `Text` × 2–3

The single source of truth for rendering any price in the storefront — sale, standard, free, or subscription. Used on ProductCards, OrderLineItems, PlanLineItems, totals.

**Props:**

| Prop | Type | Notes |
|---|---|---|
| `currentPrice` | number \| null | Main price shown. `null` when free |
| `originalPrice` | number \| null | If set, renders with strikethrough |
| `free` | boolean | Renders "FREE" in `--color-success` instead of price |
| `currency` | string | Default: `'USD'` — formatted via `Intl.NumberFormat` |
| `size` | `sm \| md \| lg` | Scales both Text nodes proportionally |
| `layout` | `inline \| stacked` | `inline` = side by side (default), `stacked` = original above current |
| `subscriptionSuffix` | string \| null | e.g. `'/mo'` for plan pricing — appended to current price |
| `currentPriceColor` | `primary \| brand` | Default `primary` (near-black). Use `brand` (purple) inside OrderSummaryPanel. |
| `originalPriceColor` | `error \| muted` | Default `error` (red) on ProductCard. Use `muted` (gray) inside OrderSummaryPanel. |

**Internal composition:**

```
<PriceDisplay originalPrice={35.98} currentPrice={27.98}>
  <Text variant="price" color="error" strikethrough>$35.98</Text>
  <Text variant="price" color="primary">$27.98</Text>
</PriceDisplay>

<PriceDisplay free>
  <Text variant="price" color="success">FREE</Text>
</PriceDisplay>

<PriceDisplay currentPrice={9.99} subscriptionSuffix="/mo" originalPrice={12.99}>
  <Text variant="price" color="error" strikethrough>$12.99/mo</Text>
  <Text variant="price" color="primary">$9.99/mo</Text>
</PriceDisplay>
```

---

## QuantityStepper

Owns its own internal `<button>` elements. Does NOT compose from `Button` — the stepper's controls are borderless tap targets, not standalone buttons. Coupling to `Button` would bleed `Button` API changes (loading state, `as` prop, etc.) into the stepper unnecessarily.

The qty control used on ProductCards and OrderLineItems. Stateless — parent owns the value.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | number | — | Current quantity — controlled |
| `min` | number | `0` | Minus button disables at this value |
| `max` | number \| null | `null` | Plus button disables at this value |
| `size` | `sm \| md` | `md` | `sm` inside OrderSummaryPanel, `md` on ProductCard |
| `onChange` | `(next: number) => void` | — | |
| `disabled` | boolean | `false` | Disables both controls |

**Token consumption:**
- Container border: `1px solid --color-border-subtle`, `--radius-sm`
- Value text: `--type-body`, `--color-text-primary`
- Button (−/+): no fill, `--color-text-secondary`; disabled: `--color-text-muted`
- Size `sm` padding: `--space-1` vertical, `--space-2` horizontal
- Size `md` padding: `--space-2` vertical, `--space-3` horizontal

---

## OptionSelector

Composes: `Icon` (color circle indicator, optional) + `Text` (label)

Renamed from `ColorSwatch` — the component is domain-agnostic. It selects any variant attribute: color, size, material, finish. The color indicator is optional.

**Props:**

| Prop | Type | Notes |
|---|---|---|
| `options` | `{ label: string, color?: string, disabled?: boolean }[]` | `color` is optional hex — only rendered when present |
| `value` | string | Selected option label |
| `onChange` | `(label: string) => void` | |
| `label` | string \| null | Accessible group label (visually hidden) |

**Token consumption:**
- Item container: `1px solid --color-border-subtle`, `--radius-sm`
- Selected border: `2px solid --color-border-brand`
- Item padding: `--space-1` vertical, `--space-2` horizontal
- Gap between items: `--space-2`
- Color circle size: 12px, `--radius-full`

---

---

## LineItem

Composes: `Thumbnail` + `Text` × 2 + `QuantityStepper` + `PriceDisplay`

A single row in a list — the universal cart/order line item pattern. Works in the order summary, a cart drawer, a mini-cart, or a checkout page.

**Props:**

| Prop | Type | Notes |
|---|---|---|
| `thumbnail` | `{ src: string, alt: string }` | |
| `name` | string | Product name |
| `meta` | string \| null | Optional subtitle — variant info, SKU |
| `quantity` | number | |
| `onQuantityChange` | `(next: number) => void \| null` | `null` = read-only (no stepper rendered) |
| `originalPrice` | number \| null | |
| `currentPrice` | number | |
| `free` | boolean | Triggers `PriceDisplay` free state |
| `size` | `sm \| md` | `sm` for compact order summary, `md` for cart page |

**Layout (horizontal flex):**
```
[Thumbnail] [Name + Meta (flex-grow)] [QuantityStepper] [PriceDisplay]
```

**Token consumption:**
- Row padding: `--space-3` top/bottom, `--space-4` left/right
- Gap between columns: `--space-3`
- Bottom border: `1px solid --color-border-subtle` (between rows)

---

## Accordion

Composes: `Icon` (chevron) + `Text` (header) + any `children`

A generic expand/collapse container. Has no knowledge of steps, selection counts, or configurator state. Those concerns belong to the feature layer.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `heading` | ReactNode | — | Accordion trigger label |
| `leadingIcon` | ReactNode \| null | `null` | Icon to the left of the heading |
| `trailingContent` | ReactNode \| null | `null` | Slot for badges, counts, or any node to the right of heading |
| `defaultOpen` | boolean | `false` | Uncontrolled initial state |
| `open` | boolean \| null | `null` | Controlled open state |
| `onToggle` | `(open: boolean) => void` | — | |
| `disabled` | boolean | `false` | Prevents opening |
| `children` | ReactNode | — | Expanded content |

**Token consumption:**
- Header padding: `--space-4` vertical, `--space-6` horizontal
- Chevron icon: `Icon` size `sm`, `--color-brand-primary`
- Chevron transitions: `transform: rotate(180deg)` when open
- Container border-bottom: `1px solid --color-border-subtle`
- Expanded background: **not set here** — set by the feature layer wrapping the Accordion

**Why no background on the Accordion itself:**  
The `active` step background (`--color-surface-page`) is a feature-layer concern. The Accordion primitive doesn't know it's a step.

---

---

## Composite Summary

| Composite | Primitives Used | Replaces (feature-specific) |
|---|---|---|
| `PriceDisplay` | `Text` | All price nodes in cards and order summary |
| `QuantityStepper` | internal `<button>` + `Text` | `QuantityStepper` (old) |
| `OptionSelector` | `Icon` (optional), `Text` | `ColorSwatchGroup` — now domain-agnostic |
| `LineItem` | `Thumbnail`, `Text`, `QuantityStepper`, `PriceDisplay` | `OrderLineItem`, `PlanLineItem`, `ShippingLineItem` |
| `Accordion` | `Icon`, `Text` | `StepAccordion` (without step logic) |

**Removed from Tier 2:**
- `Card` → promoted to Tier 1 (composes nothing)
- `SectionLabel` → deleted, covered by `Divider label` prop (Tier 1)
- `Chip` → merged into `Badge` as `variant="promo"` (Tier 1)

---

## Composition Example — ProductCard (feature layer)

To illustrate how the design system is consumed, not defined here:

```
// Feature layer — not part of the design system
<Card variant={selected ? 'selected' : 'default'} padding="md">
  <Badge variant="brand">Save {discount}%</Badge>       {/* Tier 1 */}
  <Thumbnail src={image} alt={name} size="lg" />         {/* Tier 1 */}
  <Text variant="heading-3">{name}</Text>                {/* Tier 1 */}
  <Text variant="body" color="secondary">{description}</Text>
  <Text variant="link" as="a" href={learnMoreUrl}>Learn More</Text>
  <OptionSelector options={colors} value={selectedColor} onChange={...} />    {/* Tier 2 */}
  <QuantityStepper value={qty} onChange={...} />         {/* Tier 2 */}
  <PriceDisplay originalPrice={original} currentPrice={current} />  {/* Tier 2 */}
</Card>
```

No new component. Nine lines of design system usage.
