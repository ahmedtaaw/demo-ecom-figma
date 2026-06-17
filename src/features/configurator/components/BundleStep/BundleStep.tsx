import { type ReactNode } from 'react'
import { getCategoryProducts } from '@/data'
import { Accordion, Button, Icon, Text } from '@/design-system'
import { useBuilderDispatch, useBuilderState } from '@/features/configurator/state'
import type { StepConfig } from '../../steps'
import { ProductCard } from '../ProductCard'

const stepIcons: Record<string, ReactNode> = {
  cameras: (
    <>
      <path
        d="M4 8.5A1.5 1.5 0 0 1 5.5 7H8l1.2-1.8h5.6L16 7h2.5A1.5 1.5 0 0 1 20 8.5V17a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17V8.5Z"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth={1.8} />
    </>
  ),
  sensors: (
    <>
      <path d="M4.5 13a7.5 7.5 0 0 1 15 0" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M8 13a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
      <circle cx="12" cy="13" r="1.2" fill="currentColor" />
    </>
  ),
  accessories: (
    <path
      d="M12 3.5l7 2.8v5c0 4.2-3 7.3-7 8.2-4-.9-7-4-7-8.2v-5l7-2.8Z"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  ),
}

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
        leadingIcon={
          <Icon size="lg" className="text-text-secondary">
            {stepIcons[step.categoryId]}
          </Icon>
        }
        heading={
          <Text as="span" variant="heading-2">
            {step.title}
          </Text>
        }
        trailingContent={
          selectedCount > 0 ? (
            <Text as="span" variant="body" color="brand">
              {selectedCount} selected
            </Text>
          ) : null
        }
      >
        <div className="grid grid-cols-1 gap-4 desktop:grid-cols-2 desktop:gap-6">
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
