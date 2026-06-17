# Design Tokens — Shadows

The design is **shadow-light**. Visual hierarchy is achieved through background color layering and borders rather than deep drop shadows.

---

## Scale

| Token | Value | Usage |
|---|---|---|
| `--shadow-card` | `0 1px 4px rgba(0, 0, 0, 0.07)` | Default (unselected) product card |
| `--shadow-panel` | `0 2px 12px rgba(0, 0, 0, 0.06)` | Order summary sticky panel |
| `--shadow-none` | `none` | Badges, chips, step headers — all flat |

---

## Selection State — Border, Not Shadow

Selected product cards do **not** use a shadow upgrade. They use a border swap:

| State | Rule |
|---|---|
| Default card | `border: 1px solid var(--color-border-default)` + `--shadow-card` |
| Selected card | `border: 2px solid var(--color-border-brand)` + `--shadow-card` (unchanged) |

This is intentional — the border provides a crisp selection signal without adding depth, consistent with Wyze's flat-leaning visual language.

---

## Surface Depth Model

```
Layer 0 — Page background:   #edf4ff  (no shadow)
Layer 1 — Panel background:  #f2f7ff  (--shadow-panel)
Layer 2 — Card background:   #ffffff  (--shadow-card)
Layer 3 — Badges/chips:      #4d2fd1  (no shadow, flat)
```

Background color shift handles depth perception at layers 0→1.  
Shadow handles depth perception at layers 1→2.  
No shadow at layer 3 — badges float on visual color contrast alone.
