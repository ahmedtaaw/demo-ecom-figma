/**
 * Configurator builder state contract.
 *
 * Mirrors /design-system/proposal/state-architecture.md — the single source of
 * truth the ProductCard, OrderSummaryPanel, and StepAccordion all read from.
 * This is feature-scoped state, so it lives with the configurator (not in the
 * global types layer). Types only; the reducer/store is added alongside.
 */
import type { Product, Plan } from '@/types'

export interface ItemPrice {
  original: number
  current: number
}

export interface BuilderItem {
  productId: Product['id']
  quantity: number
  selectedColor: string | null
  price: ItemPrice
}

export type StepStatus = 'collapsed' | 'expanded'

export interface BuilderState {
  items: Record<string, BuilderItem>
  planId: Plan['id'] | null
  stepStatus: Record<string, StepStatus>
}

export type BuilderAction =
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'SET_COLOR'; productId: string; color: string }
  | { type: 'SET_PLAN'; planId: string | null }
  | { type: 'TOGGLE_STEP'; stepId: string }
