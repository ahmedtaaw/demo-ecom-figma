import { getCategoryProducts } from '@/data'
import { Accordion, Badge, Button, Text } from '@/design-system'
import { useBuilderDispatch, useBuilderState } from '@/features/configurator/state'
import type { StepConfig } from '../../steps'
import { ProductCard } from '../ProductCard'

export interface BundleStepProps {
  step: StepConfig
  index: number
  total: number
  nextLabel?: string
  onNext?: () => void
}

export function BundleStep({ step, index, total, nextLabel, onNext }: BundleStepProps) {
  const { state } = useBuilderState()
  const dispatch = useBuilderDispatch()

  const products = getCategoryProducts(step.categoryId)
  const isOpen = state.steps[step.id] === 'expanded'
  const selectedCount = products.filter(
    (product) => (state.items[product.id]?.quantity ?? 0) > 0,
  ).length

  return (
    <section className="border-b border-border-subtle">
      <Text variant="label-upper" color="secondary" className="block px-6 pt-4">
        Step {index} of {total}
      </Text>
      <Accordion
        open={isOpen}
        onToggle={() => dispatch({ type: 'TOGGLE_STEP', stepId: step.id })}
        heading={
          <Text as="span" variant="heading-2">
            {step.title}
          </Text>
        }
        trailingContent={
          selectedCount > 0 ? <Badge variant="neutral">{selectedCount} selected</Badge> : null
        }
      >
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} productId={product.id} />
          ))}
        </div>
        {nextLabel && (
          <Button variant="ghost" fullWidth className="mt-6" onClick={onNext}>
            {nextLabel}
          </Button>
        )}
      </Accordion>
    </section>
  )
}
