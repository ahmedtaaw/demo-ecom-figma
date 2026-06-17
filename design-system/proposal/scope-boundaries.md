# Scope Boundaries

Defines what belongs in the design system and what belongs in the feature layer. This boundary is the most important architectural decision in any component library.

---

## The Rule

> A component belongs in the design system if it can be used on **any page, in any Shopify storefront, without modification**.

If a component requires knowledge of:
- A specific page's state machine (steps, flow)
- Shopify cart/product/metafield data structures
- Business logic (savings calculation, bundle pricing)
- A specific layout context (sticky sidebar, full-width mobile)

...it belongs in the **feature layer**, assembled from design system primitives.

---

## Decision Table

| Component | In Design System? | Rationale |
|---|---|---|
| `Button` | Yes | Universal interactive primitive |
| `Badge` | Yes | Universal status label |
| `Chip` | Yes | Universal value callout |
| `Icon` | Yes | Universal SVG wrapper |
| `Text` | Yes | Universal typography primitive |
| `Divider` | Yes | Universal layout separator |
| `Thumbnail` | Yes | Universal image container |
| `PriceDisplay` | Yes | Universal e-commerce primitive — every storefront shows prices |
| `QuantityStepper` | Yes | Universal cart primitive — every storefront has qty controls |
| `OptionSelector` | Yes | Universal variant selection — color, size, material, finish |
| `Card` | Yes | Universal surface container |
| `LineItem` | Yes | Universal cart row — works in cart page, mini-cart, order summary, checkout |
| `Accordion` | Yes | Universal expand/collapse — works for FAQs, filters, steps, product details |
| `SectionLabel` | Yes | Universal content grouping — works in any list or panel |
| `StepAccordion` | **No** | Encodes 4-step flow state; step numbers, completion logic are app concerns |
| `OrderSummaryPanel` | **No** | Page layout shell; assembled from `Card` + `LineItem` + `Divider` |
| `ProductCard` | **No** | Domain composition; assembled from `Card` + `Badge` + `Thumbnail` + `OptionSelector` + `QuantityStepper` + `PriceDisplay` + `Text` |
| `CheckoutButton` | **No** | `Button variant="primary" size="lg" fullWidth` — nothing new |
| `NextStepButton` | **No** | `Button variant="ghost" size="md" fullWidth` — nothing new |
| `SaveForLaterLink` | **No** | `Button variant="link" size="sm"` — nothing new |
| `SavingsBanner` | **No** | `Text variant="body" color="success"` — nothing new |
| `MonthlyPriceChip` | **No** | `Chip variant="brand"` with content — nothing new |
| `SaveBadge` | **No** | `Badge variant="brand"` with "Save X%" content — nothing new |
| `FreeBadge` | **No** | `PriceDisplay free` prop — handled internally |
| `SelectionCountBadge` | **No** | `Badge variant="neutral"` with count content — nothing new |
| `TrustBadge` | **No** | Decorative brand asset, not a reusable UI component |
| `ReturnPolicyBlock` | **No** | `Icon` + `Text` × 2 — nothing new, content-specific |
| `PlanLineItem` | **No** | `LineItem` with `Text color="brand"` for name — variant of existing composite |
| `ShippingLineItem` | **No** | `LineItem` with specific icon and free state — variant of existing composite |
| `ProductGrid` | **No** | CSS grid layout — not a component, a layout utility class |
| `OrderSectionGroup` | **No** | `SectionLabel` + `LineItem[]` — a feature-layer list render, not a primitive |

---

## The Composability Test

Before adding any component to the design system, ask:

1. **Can it be rendered in Storybook with only static props?**  
   If it needs a Shopify API call or a Redux store to render, it's a feature component.

2. **Would it be useful in a different storefront (e.g. apparel, supplements, furniture)?**  
   If the answer is "only for this security camera configurator", it's a feature component.

3. **Does adding it require a new token, or does it just consume existing tokens in a new arrangement?**  
   New arrangement = feature layer. New token = potentially design system.

4. **Is it a `Button` with extra props, or genuinely new behavior?**  
   If it's just a `Button` with a specific `variant` and `fullWidth`, it's not a new component.

---

## Feature Layer Assembly Pattern

Feature components live alongside their page/feature, not in the design system package:

```
src/
  design-system/          ← published package, versioned
    primitives/
      Button/
      Badge/
      ...
    composites/
      PriceDisplay/
      QuantityStepper/
      ...

  features/
    configurator/         ← feature layer, consumes design system
      components/
        ProductCard/
        StepAccordion/
        OrderSummaryPanel/
      state/
      hooks/
```

This separation means the design system can be versioned, tested, and reused independently. The configurator feature can evolve without touching the design system.

---

## Token Extension Pattern

If a feature needs a visual treatment not covered by existing tokens, the right path is:

1. **Add the token to the token file** — not to the component.
2. **Consume the new token via the existing primitive's `color` or `variant` prop** — not a new component.
3. **Only create a new Tier 1 primitive** if the visual pattern is genuinely new behavior (new interaction, new layout constraint), not just a new color combination.

Example: If a future step needed a `warning` badge (amber background), the right move is adding `--color-warning` to the token file and adding `variant="warning"` to `Badge` — not creating a `WarningBadge` component.
