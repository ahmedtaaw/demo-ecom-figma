# Design Tokens — Spacing Scale

**Base unit:** 4px  
**System:** Multiples of 4. No arbitrary values appear anywhere in the design.

---

## Scale

| Token | Value | rem | Common Usage |
|---|---|---|---|
| `--space-1` | 4px | 0.25rem | Icon-to-label gap, badge inner padding (vertical) |
| `--space-2` | 8px | 0.5rem | Color swatch gap, tight row gaps, badge inner padding (horizontal) |
| `--space-3` | 12px | 0.75rem | Quantity stepper padding, pill/badge padding, color swatch row gap |
| `--space-4` | 16px | 1rem | Card inner padding, row vertical padding, input padding |
| `--space-5` | 20px | 1.25rem | Gap between product name and color swatches within a card |
| `--space-6` | 24px | 1.5rem | Card padding (desktop), gap between cards in grid |
| `--space-8` | 32px | 2rem | Section-to-section vertical gap within a step |
| `--space-10` | 40px | 2.5rem | Step accordion vertical padding (top/bottom) |
| `--space-12` | 48px | 3rem | Top-level page horizontal padding on desktop |

---

## Applied Spacing Examples

### ProductCard
- Outer padding: `--space-4` (16px) all sides on mobile, `--space-6` (24px) on desktop
- Product image bottom margin: `--space-4` (16px)
- Title → description gap: `--space-2` (8px)
- Description → color swatches gap: `--space-3` (12px)
- Color swatches → qty/price row gap: `--space-4` (16px)
- Swatch item gap: `--space-2` (8px)

### OrderSummaryPanel
- Section group gap (CAMERAS → SENSORS): `--space-4` (16px)
- Line item row padding: `--space-3` (12px) top/bottom, `--space-4` (16px) left/right
- Panel padding: `--space-4` (16px) on mobile, `--space-6` (24px) on desktop

### StepAccordion
- Header padding: `--space-4` (16px) vertical, `--space-6` (24px) horizontal
- Step label → step title gap: `--space-1` (4px)
- Content area inner padding: `--space-6` (24px)

### QuantityStepper
- Button padding: `--space-2` (8px) horizontal, `--space-1` (4px) vertical
- Button-to-number gap: `--space-2` (8px)

### Grid
- Card gap (column): `--space-4` (16px) on tablet, `--space-6` (24px) on desktop
- Card gap (row): `--space-4` (16px)
