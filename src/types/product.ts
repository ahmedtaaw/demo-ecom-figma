/**
 * Domain types for the configurator catalog.
 *
 * Derived from /design-system/components/inventory.md. These describe the shape
 * of product/plan data the data layer provides; they carry no behaviour.
 */

export type ProductCategory = 'camera' | 'sensor' | 'accessory' | 'plan'

export interface ColorOption {
  label: string
  /** Optional swatch hex — only rendered when present. */
  color?: string
}

export interface Product {
  id: string
  category: ProductCategory
  name: string
  description: string
  image: string
  originalPrice: number | null
  currentPrice: number
  colorOptions?: ColorOption[]
  /** Discount percentage, e.g. 22 renders "Save 22%". */
  saveBadge?: number | null
}

export interface Plan {
  id: string
  name: string
  originalMonthlyPrice: number
  currentMonthlyPrice: number
}
