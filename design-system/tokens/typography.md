# Design Tokens — Typography

**Font Family:** Inter (geometric sans-serif). Single family across all UI elements.  
All sizes are in `px` — convert to `rem` (base 16px) for implementation.

---

## Type Scale

| Token | Size | rem | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| `--type-display` | 28–32px | 1.75–2rem | 800 | 1.1 | 0 | Hero heading — "Let's get started!" |
| `--type-heading-1` | 22–24px | 1.375–1.5rem | 700 | 1.2 | 0 | Section heading — "Your security system" |
| `--type-heading-2` | 20–22px | 1.25–1.375rem | 700 | 1.25 | 0 | Step title — "Choose your cameras" |
| `--type-heading-3` | 14–16px | 0.875–1rem | 600 | 1.3 | 0 | Product card title — "Wyze Cam v4" |
| `--type-label-upper` | 10–11px | 0.625–0.6875rem | 500–600 | 1.4 | 0.08em | Section labels — "CAMERAS", "SENSORS", "STEP 1 OF 4" |
| `--type-body` | 13–14px | 0.8125–0.875rem | 400 | 1.5 | 0 | Product descriptions, order item names |
| `--type-price-current` | 14–16px | 0.875–1rem | 700 | 1 | 0 | Active price — "$27.98" |
| `--type-price-original` | 13–14px | 0.8125–0.875rem | 400 | 1 | 0 | Strikethrough price — "$35.98" |
| `--type-caption` | 11–12px | 0.6875–0.75rem | 600–700 | 1.3 | 0 | Monthly chip — "as low as $19.19/mo" |
| `--type-link` | 13px | 0.8125rem | 400 | 1.5 | 0 | Inline links — "Learn More" |

---

## Special Treatments

| Element | Rules |
|---|---|
| Section labels (`CAMERAS`, `SENSORS`, `STEP X OF 4`) | `text-transform: uppercase`, `letter-spacing: 0.08em`, `color: --color-text-secondary` |
| Strikethrough price | `text-decoration: line-through`, `color: --color-error` |
| Current / sale price | `font-weight: 700`, `color: --color-text-primary` |
| "FREE" badge text | `font-weight: 700`, `color: --color-success` |
| Inline links | `color: --color-text-brand`, `text-decoration: none` → `underline` on hover |
| "Save my system for later" | `text-decoration: underline`, `color: --color-text-secondary` — low-priority ghost action |
| "Congrats! You're saving…" | `color: --color-savings`, weight 500–600 |

---

## Font Stack

```
--font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## Notes

- No serif or monospace fonts appear anywhere in the design.
- All caps labels (`--type-label-upper`) are purely visual — underlying text is sentence-case in the source for accessibility.
- Price pairs (original + current) are always rendered side-by-side with a space gap, not stacked vertically.
