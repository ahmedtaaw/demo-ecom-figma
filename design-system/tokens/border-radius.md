# Design Tokens — Border Radius

---

## Scale

| Token | Value | Usage |
|---|---|---|
| `--radius-xs` | 4px | Save badge pill ("Save 22%"), section label chips |
| `--radius-sm` | 6–8px | Quantity stepper buttons, color swatch pill containers, input controls |
| `--radius-md` | 12px | Product cards (default and selected) |
| `--radius-lg` | 16px | Order summary panel, active step container |
| `--radius-full` | 9999px | "Next: Choose your plan" ghost button, color variant swatch circles, trust badge, monthly price chip |

---

## Applied Per Component

| Component | Radius Token |
|---|---|
| ProductCard | `--radius-md` (12px) |
| SaveBadge | `--radius-xs` (4px) |
| QuantityStepper (container) | `--radius-sm` (8px) |
| QuantityStepper (buttons) | `--radius-sm` (8px) |
| OptionSelector (individual circle) | `--radius-full` |
| OptionSelector (pill container) | `--radius-sm` (6px) |
| CheckoutButton | `--radius-lg` (16px) — NOT pill, wide button with large radius |
| NextStepButton (ghost) | `--radius-full` — pill-shaped, narrower button |
| OrderSummaryPanel | `--radius-lg` (16px) |
| MonthlyPriceChip | `--radius-full` |
| TrustBadge | `--radius-full` |
| StepAccordion (expanded) | `--radius-lg` (16px) |

---

## Notes

- CTA buttons use `--radius-full` (pill shape), not just large-radius — this is a deliberate Wyze brand choice.
- Cards use `--radius-md` consistently across all step types.
- No square (0px) corners appear in any interactive element.
