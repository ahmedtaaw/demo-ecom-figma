# Layout Patterns

---

## Page Shell

```
[Page background: --color-surface-page (#edf4ff)]
  └─ [Content wrapper: max-width ~1280px, centered, horizontal padding --space-12]
       ├─ [Main column: steps + product grid]
       └─ [Sidebar column: OrderSummaryPanel — sticky]
```

The main/sidebar split is a CSS Grid or Flexbox two-column layout. The sidebar does not exist as a column on mobile — it becomes an inline section at the bottom of the page.

---

## Two-Column Split (Tablet / Desktop)

| | Tablet (768px–1279px) | Desktop (1280px+) |
|---|---|---|
| Main column | ~62% width | ~65% width |
| Sidebar | ~38% width | ~35% width |
| Gap | `--space-6` (24px) | `--space-8` (32px) |
| Sidebar behavior | Sticky, full viewport height | Sticky, full viewport height |

---

## Step Container

Each `StepAccordion` renders a container block that:
- Has `border-bottom: 1px solid --color-border-subtle` separating steps
- In `active` state: background `--color-surface-page`, `--radius-lg` (16px), inner padding `--space-6`
- In `inactive` / `completed` state: no background, flat appearance

```
[StepProgressLabel — "STEP X OF 4"]
[StepAccordion header — icon + title + selection count + chevron]
[StepAccordion content — ProductGrid + NextStepButton]  ← visible when active only
```

---

## Product Grid

The grid adapts per breakpoint:

| Breakpoint | Columns | Gap |
|---|---|---|
| Mobile (< 768px) | 1 or 2 columns | `--space-4` (16px) |
| Tablet (768px–1279px) | 2 columns | `--space-4` (16px) |
| Desktop (≥ 1280px) | 4–5 columns (horizontal scroll row or wider grid) | `--space-6` (24px) |

On desktop, the product grid in Step 1 shows 5 cards in a single horizontal row — suggesting a scroll container or a 5-column auto-fit grid rather than wrapping rows.

---

## Order Summary Panel

### Mobile
- Not a sidebar — inline block at the bottom of the page
- Background: `--color-surface-panel` (`#f2f7ff`), `--radius-lg`, padding `--space-4`
- Order: line items → totals → savings banner → checkout CTA

### Tablet / Desktop
- Sticky right sidebar — `position: sticky; top: --space-4`
- Background: `--color-surface-panel` with `--shadow-panel`
- Same content order as mobile

---

## Order Summary Inner Layout

```
[Panel header — "REVIEW" label + "Your security system" heading]
[Body copy — description]
[Divider]
[OrderSectionGroup: CAMERAS]
  [OrderLineItem × n]
[OrderSectionGroup: SENSORS]
  [OrderLineItem × n]
[OrderSectionGroup: ACCESSORIES]
  [OrderLineItem × n]
[OrderSectionGroup: PLAN]
  [PlanLineItem]
  [ShippingLineItem]
[Divider]
[TrustBadge + ReturnPolicyBlock]  ← desktop only, side-by-side
[MonthlyChip]
[OrderTotals — strikethrough + current total]
[SavingsBanner]
[CheckoutButton]
[SaveForLaterLink]
```

---

## Mobile Page Layout (< 768px)

Single-column, full viewport width. All 4 steps stack vertically as accordions:

```
[Page: background #edf4ff]
  [Step 1 — Choose your cameras (active)]
    [ProductGrid: 2-col]
    [NextStepButton]
  [Step 2 — Choose your plan (collapsed)]
  [Step 3 — Choose your sensors (collapsed)]
  [Step 4 — Add extra protection (collapsed)]
  [OrderSummaryPanel — inline, full width]
    [line items...]
    [totals + checkout]
```

---

## Surface Layering Model

```
Layer 0 — Page:   #edf4ff  (no shadow, full-bleed)
Layer 1 — Panel:  #f2f7ff  (shadow-panel, rounded)
Layer 2 — Card:   #ffffff  (shadow-card, rounded)
Layer 3 — Badge:  #4d2fd1  (flat, no shadow)
```

Depth is communicated by background-color shift (layers 0→1) and subtle shadow (layers 1→2). No deep shadows anywhere.
