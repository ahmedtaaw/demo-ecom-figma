import { variants } from '@/data'
import type { Variant, VariantId } from '@/types'
import type { BuilderState } from './types'

const variantById = new Map<VariantId, Variant>(variants.map((variant) => [variant.id, variant]))

const roundCents = (value: number) => Math.round(value * 100) / 100

export interface BuilderTotals {
  /** List-price sum across selected items (the struck-through subtotal). */
  subtotal: number
  /** Payable sum at current prices. */
  total: number
  /** Money off list price (subtotal − total). */
  discount: number
  /** Headline savings — equal to the discount. */
  savings: number
  /** Number of distinct products with a quantity greater than zero. */
  selectedCount: number
}

/**
 * Derives all monetary figures and counts from raw state on demand. Nothing
 * computed here is ever written back into state.
 */
export function selectTotals(state: BuilderState): BuilderTotals {
  let subtotal = 0
  let total = 0
  let selectedCount = 0

  for (const item of Object.values(state.items)) {
    if (item.quantity <= 0) continue
    const variant = variantById.get(item.variantId)
    if (!variant) continue

    const current = variant.currentPrice
    const original = variant.originalPrice ?? current
    subtotal += original * item.quantity
    total += current * item.quantity
    selectedCount += 1
  }

  const roundedSubtotal = roundCents(subtotal)
  const roundedTotal = roundCents(total)
  const discount = roundCents(roundedSubtotal - roundedTotal)

  return {
    subtotal: roundedSubtotal,
    total: roundedTotal,
    discount,
    savings: discount,
    selectedCount,
  }
}
