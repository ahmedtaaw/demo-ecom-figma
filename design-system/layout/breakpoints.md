# Breakpoints

3 distinct layouts observed across the 3 Figma screens.

---

## Breakpoint Definitions

| Name | Range | Figma Screen |
|---|---|---|
| `bp-mobile` | 0 – 767px | Page 1 (~390px) |
| `bp-tablet` | 768px – 1279px | Page 2 (~768px) |
| `bp-desktop` | 1280px+ | Page 3 (~1280px) |

---

## What Changes Per Breakpoint

### Mobile → Tablet (768px)
| Element | Mobile | Tablet |
|---|---|---|
| Page layout | Single column | Two-column (main + sticky sidebar) |
| OrderSummaryPanel | Inline, bottom of page | Sticky right sidebar |
| ProductGrid | 1–2 columns | 2 columns |
| Step container padding | `--space-4` | `--space-6` |
| Page horizontal padding | `--space-4` | `--space-8` |
| TrustBadge + ReturnPolicy | Stacked | Side-by-side in sidebar |

### Tablet → Desktop (1280px)
| Element | Tablet | Desktop |
|---|---|---|
| ProductGrid | 2 columns | 4–5 columns (horizontal row) |
| Card inner padding | `--space-4` | `--space-6` |
| Column gap (main/sidebar) | `--space-6` | `--space-8` |
| Max content width | Full minus padding | ~1280px, centered |

---

## Layout Strategy (Mobile-First)

```
/* Mobile base */
.page-layout { display: block; }
.order-summary { /* inline, static position */ }
.product-grid { grid-template-columns: repeat(2, 1fr); }

/* Tablet */
@media (min-width: 768px) {
  .page-layout { display: grid; grid-template-columns: 62fr 38fr; gap: var(--space-6); }
  .order-summary { position: sticky; top: var(--space-4); }
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1280px) {
  .page-layout { grid-template-columns: 65fr 35fr; gap: var(--space-8); max-width: 1280px; margin: 0 auto; }
  .product-grid { grid-template-columns: repeat(5, 1fr); }
}
```

---

## Notes

- No breakpoint between mobile and 768px is visible in the design. A 480px intermediate breakpoint may be needed in implementation for mid-size phones but is not designed.
- The desktop product grid showing 5 cards in a row implies either a 5-column grid or a horizontally scrollable row — the design does not show overflow behavior explicitly.
- The sidebar `min-height` should match the viewport height to stay sticky through the full scroll without detaching.
