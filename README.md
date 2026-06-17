# demo-ecom-figma

A design system specification reverse-engineered from a Figma design for a **Wyze-style security-system bundle configurator** — a multi-step storefront flow (choose cameras → plan → sensors → extra protection) with a live order summary and checkout.

This repository contains the **specification and architecture proposal**, not an implementation. Every token, component, and layout rule is extracted from the source Figma screens in [`design-system/media/`](design-system/media/).

## What's inside

```
design-system/
├── tokens/        Design tokens — the visual contract
├── components/    Component inventory and states
├── layout/        Layout patterns and breakpoints
├── proposal/      Component architecture proposal
└── media/         Figma source screens and review captures
```

### `tokens/` — the visual contract
The foundational values every component consumes. Components reference tokens, never raw hex or arbitrary px.

| File | Contents |
|---|---|
| [`colors.md`](design-system/tokens/colors.md) | Brand purple (`#4d2fd1`) as the sole interactive hue, teal (`#0aa187`) as semantic-only, text/surface/border scales |
| [`typography.md`](design-system/tokens/typography.md) | Inter type scale — display through caption, price treatments |
| [`spacing.md`](design-system/tokens/spacing.md) | 4px-based spacing scale with per-component applications |
| [`shadows.md`](design-system/tokens/shadows.md) | Shadow-light system — depth via background layering, not deep shadows |
| [`border-radius.md`](design-system/tokens/border-radius.md) | Radius scale, including pill-shaped CTAs |

### `components/` — inventory and states
| File | Contents |
|---|---|
| [`inventory.md`](design-system/components/inventory.md) | Every component classified by category, with props and reuse scope |
| [`states.md`](design-system/components/states.md) | All interactive states observed across the Figma screens |

### `layout/` — structure and responsiveness
| File | Contents |
|---|---|
| [`patterns.md`](design-system/layout/patterns.md) | Page shell, two-column split, order-summary layout, surface layering |
| [`breakpoints.md`](design-system/layout/breakpoints.md) | Mobile / tablet / desktop breakpoints with mobile-first CSS strategy |

### `proposal/` — component architecture
A refined proposal for *how* to build the system: ship the smallest set of composable primitives rather than page-specific components.

| File | Contents |
|---|---|
| [`overview.md`](design-system/proposal/overview.md) | Philosophy, guiding constraints, and the two-tier model |
| [`tier-1-primitives.md`](design-system/proposal/tier-1-primitives.md) | Atoms — `Button`, `Badge`, `Icon`, `Text`, `Divider`, `Thumbnail`, `Card` |
| [`tier-2-composites.md`](design-system/proposal/tier-2-composites.md) | Molecules — `PriceDisplay`, `QuantityStepper`, `OptionSelector`, `LineItem`, `Accordion` |
| [`scope-boundaries.md`](design-system/proposal/scope-boundaries.md) | What belongs in the design system vs. the feature layer |
| [`state-architecture.md`](design-system/proposal/state-architecture.md) | Single-source-of-truth builder state shared by cards and the order summary |

### `media/` — Figma source
The visual source of truth: Figma exports (`figma_*.png`, `Frontend Test Figma.pdf`) and annotated review captures (`review_*.png`) backing every spec above.

## Core principles

1. **Tokens are the contract** — swapping a theme is a token-file change, not a component change.
2. **Two tiers only** — indivisible primitives and small composites; page-specific UI is assembled in the feature layer.
3. **Variants over duplication** — one `Button` with a `variant` prop, not three button components.
4. **Single source of truth for state** — cards and the order summary read from one `builderState`, never their own.
