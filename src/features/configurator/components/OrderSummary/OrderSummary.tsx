import { Badge, Button, Divider, PriceDisplay, Text } from '@/design-system'
import { useBuilderState } from '@/features/configurator/state'
import { formatCurrency } from '@/utils'
import { ReviewPanel } from '../ReviewPanel'

const INSTALLMENT_MONTHS = 12

export function OrderSummary() {
  const { totals } = useBuilderState()
  const hasSelection = totals.selectedCount > 0

  return (
    <aside
      aria-label="Order summary"
      className="flex flex-col gap-4 rounded-lg bg-surface-panel p-6 shadow-panel"
    >
      <div className="flex flex-col gap-1">
        <Text variant="label-upper" color="secondary">
          Review
        </Text>
        <Text variant="heading-1">Your security system</Text>
        <Text variant="body" color="secondary">
          Review your personalized protection system designed to keep what matters most safe.
        </Text>
      </div>

      <Divider />
      <ReviewPanel />
      <Divider />

      <div className="flex items-center justify-between gap-3">
        <Text variant="label-upper" color="secondary">
          Total
        </Text>
        <div className="flex flex-col items-end gap-1">
          {hasSelection && (
            <Badge variant="promo">
              as low as {formatCurrency(totals.total / INSTALLMENT_MONTHS)}/mo
            </Badge>
          )}
          <PriceDisplay
            size="lg"
            originalPrice={totals.savings > 0 ? totals.subtotal : null}
            currentPrice={totals.total}
            originalColor="muted"
            currentColor="brand"
          />
        </div>
      </div>

      {totals.savings > 0 && (
        <Text variant="body" color="success" className="text-center">
          Congrats! You&apos;re saving {formatCurrency(totals.savings)} on your security bundle!
        </Text>
      )}

      <Button variant="primary" size="lg" fullWidth disabled={!hasSelection}>
        Checkout
      </Button>
      <Button variant="link" size="sm" className="self-center">
        Save my system for later
      </Button>

      <Text variant="caption" color="secondary" className="text-center">
        30-day hassle-free returns · 100% satisfaction guarantee
      </Text>
    </aside>
  )
}
