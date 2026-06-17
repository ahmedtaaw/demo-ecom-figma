# State Architecture — Builder State (P0 Fix)

## The Problem

`ProductCard` and `OrderSummaryPanel` both display quantity and price for the same items. If each manages its own state, they diverge. User increments quantity on a card — the panel doesn't update. User removes an item in the panel — the card still shows it selected.

This is a **P0** bug surface, not a UI polish issue.

---

## The Fix — Single Source of Truth

One `builderState` object. Both components are **consumers** — they never own state. Only the state layer writes; components read and dispatch.

```
builderState
  └── items: Record<productId, BuilderItem>
        ├── quantity: number
        ├── selectedColor: string | null
        └── price: { original: number, current: number }
  └── planId: string | null
  └── stepStatus: Record<stepId, 'collapsed' | 'expanded'>
```

`ProductCard` reads `items[productId].quantity` and `items[productId].selectedColor`.  
`OrderSummaryPanel` reads the full `items` map and derives totals from it.  
Both dispatch the same actions — neither computes state independently.

---

## State Shape

```ts
type BuilderItem = {
  productId: string
  quantity: number
  selectedColor: string | null
  price: {
    original: number
    current: number
  }
}

type BuilderState = {
  items: Record<string, BuilderItem>
  planId: string | null
  stepStatus: Record<string, 'collapsed' | 'expanded'>
}
```

---

## Actions

| Action | Triggered by | Effect |
|---|---|---|
| `SET_QUANTITY` | `QuantityStepper` on either card or panel | Updates `items[productId].quantity` |
| `SET_COLOR` | `OptionSelector` on `ProductCard` | Updates `items[productId].selectedColor` |
| `SET_PLAN` | Plan selection in Step 2 | Updates `planId` |
| `TOGGLE_STEP` | `Accordion` header click | Flips `stepStatus[stepId]` |

No action updates both the card and the panel separately. One action — one state update — both components re-render from the same source.

---

## Derived Values (never stored)

These are computed from state, never written into it:

| Value | Computed from |
|---|---|
| `selectedItems` | `Object.values(items).filter(i => i.quantity > 0)` |
| `subtotal` | `sum(item.price.current * item.quantity)` |
| `originalTotal` | `sum(item.price.original * item.quantity)` |
| `totalSavings` | `originalTotal - subtotal` |
| `monthlyEstimate` | `subtotal / installmentMonths` |
| `stepSelectionCount(stepId)` | count of items with `quantity > 0` belonging to that step |

Computing totals at render time from a single items map guarantees the panel total and the card quantities are always in sync.

---

## Component Boundaries

```
[builderState]
     │
     ├── ProductCard (reads items[id].quantity + selectedColor, dispatches SET_QUANTITY / SET_COLOR)
     │
     ├── OrderSummaryPanel (reads all items + planId, renders LineItems + derived totals)
     │
     └── StepAccordion (reads stepStatus[id] + stepSelectionCount(id), dispatches TOGGLE_STEP)
```

**Rule:** No component derives totals or counts from props passed down from a parent. They all read from the same state layer.

---

## Implementation Options

This document is implementation-agnostic. The state layer can be:

| Option | When to use |
|---|---|
| React Context + `useReducer` | Simple, no extra dependencies, sufficient for this scope |
| Zustand | Preferred if the store needs to be accessed outside React tree (e.g. Shopify cart sync) |
| Shopify Cart API | If the bundle maps directly to Shopify line items and cart state replaces builder state |

The state shape above is valid for all three. Pick based on the Shopify integration requirement.

---

## What This Is NOT

This document describes the **builder/configurator state** — what the user is building before checkout.

It is not:
- Shopify cart state (that lives in the Shopify storefront API after checkout begins)
- Server state (no fetching, no caching)
- Component state (no `useState` inside individual cards or the panel)
