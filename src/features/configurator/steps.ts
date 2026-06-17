import type { CategoryId } from '@/types'

/** Declarative configuration for one configurator step (the flow, not the UI). */
export interface StepConfig {
  id: string
  title: string
  categoryId: CategoryId
}

export const steps: StepConfig[] = [
  { id: 'cameras', title: 'Choose your cameras', categoryId: 'cameras' },
  { id: 'sensors', title: 'Choose your sensors', categoryId: 'sensors' },
  { id: 'accessories', title: 'Add extra protection', categoryId: 'accessories' },
]
