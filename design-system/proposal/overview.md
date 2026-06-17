# Minimal Design System Proposal

**Philosophy:** Ship the smallest set of composable primitives that covers every UI pattern in this storefront — and every Shopify storefront we might build next.

---

## Guiding Constraints

1. **No page-specific components.** `StepAccordion`, `OrderSummaryPanel`, `ProductGrid` are page compositions — they are assembled from primitives at the feature layer, not defined here.

2. **Every component works in isolation.** No component should require knowledge of the configurator flow, cart state, or Shopify context to render.

3. **Tokens are the contract.** Components consume tokens, never raw hex values or arbitrary px. Swapping a theme is a token file change, not a component change.

4. **Variants over duplication.** A `Button` with a `variant` prop replaces `PrimaryButton`, `GhostButton`, and `LinkButton` as separate components.

5. **Composability over completeness.** A `Card` + `LineItem` + `QuantityStepper` inside a feature component is better than a monolithic `OrderSummaryPanel` primitive.

---

## Two-Tier Model

```
Tier 1 — Primitives (Atoms)
  Indivisible. No child components. Pure token consumers.
  Button / Badge / Chip / Icon / Text / Divider / Thumbnail

Tier 2 — Composites (Molecules)
  2–3 primitives combined. No page logic.
  PriceDisplay / QuantityStepper / OptionSelector / LineItem / Accordion
```

Feature-level components (configurator steps, cart drawer, product page) are assembled **from** these two tiers. They live in the feature layer, not the design system.

---

## What Is Explicitly Out of Scope

These are feature compositions, not design system primitives:

| Excluded Component | Why |
|---|---|
| `StepAccordion` | Encodes 4-step configurator logic — uses `Accordion` + `Badge` + `Icon` instead |
| `OrderSummaryPanel` | Page-layout shell — assembled from `Card` + `LineItem` + `SectionLabel` |
| `ProductCard` | Domain-specific — assembled from `Card` + `PriceDisplay` + `OptionSelector` + `Badge` |
| `CheckoutButton` | Just a `Button` with `variant="primary"` and `size="lg"` |
| `NextStepButton` | Just a `Button` with `variant="ghost"` |
| `SavingsBanner` | Just a `Text` with `color="success"` |
| `TrustBadge` | Decorative asset — not a design system component |
| `ReturnPolicyBlock` | Content block — assembled from `Icon` + `Text` |
| `MonthlyChip` | Just a `Chip` with specific props |
| `SaveBadge` | Just a `Badge` with `variant="brand"` |

---

## File Index

- [Tier 1 — Primitives](tier-1-primitives.md)
- [Tier 2 — Composites](tier-2-composites.md)
- [Scope Boundaries](scope-boundaries.md)
