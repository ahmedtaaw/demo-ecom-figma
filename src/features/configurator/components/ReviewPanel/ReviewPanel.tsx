import { plans } from '@/data'
import { LineItem, PriceDisplay, Text } from '@/design-system'
import { selectSections, useBuilderDispatch, useBuilderState } from '@/features/configurator/state'
import { ReviewSection } from '../ReviewSection'

// Flat-rate shipping shown as a free perk — not a catalog product.
const SHIPPING_PRICE = 5.99

export function ReviewPanel() {
  const { state } = useBuilderState()
  const dispatch = useBuilderDispatch()
  const sections = selectSections(state)
  const plan = state.planId ? plans.find((entry) => entry.id === state.planId) : null

  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => (
        <ReviewSection key={section.categoryId} label={section.label}>
          {section.lines.map((line) => (
            <LineItem
              key={line.productId}
              thumbnail={{ src: line.product.image, alt: line.product.name }}
              name={line.product.name}
              meta={line.variant.label === 'Default' ? null : line.variant.label}
              quantity={line.quantity}
              onQuantityChange={(quantity) =>
                dispatch({ type: 'SET_QUANTITY', productId: line.productId, quantity })
              }
              originalPrice={line.variant.originalPrice}
              currentPrice={line.variant.currentPrice}
              free={line.variant.currentPrice === 0}
            />
          ))}
        </ReviewSection>
      ))}

      {plan && (
        <ReviewSection label="Plan">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="flex items-center gap-2">
              <img src="/icons/cam-unlimited.svg" alt="" aria-hidden className="size-6 shrink-0" />
              <Text variant="body" color="brand">
                {plan.name}
              </Text>
            </span>
            <PriceDisplay
              originalPrice={plan.originalMonthlyPrice}
              currentPrice={plan.currentMonthlyPrice}
              originalColor="muted"
              subscriptionSuffix="/mo"
            />
          </div>
        </ReviewSection>
      )}

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="flex items-center gap-2">
          <img src="/icons/fast-shipping.svg" alt="" aria-hidden className="size-6 shrink-0" />
          <Text variant="body">Fast Shipping</Text>
        </span>
        <PriceDisplay originalPrice={SHIPPING_PRICE} currentPrice={0} free originalColor="muted" />
      </div>
    </div>
  )
}
