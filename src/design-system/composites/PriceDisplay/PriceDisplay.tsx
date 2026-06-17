import { Text } from '@/design-system/primitives'
import { cn, formatCurrency } from '@/utils'

type PriceSize = 'sm' | 'md' | 'lg'

export type PriceDisplayProps = {
  currentPrice?: number | null
  originalPrice?: number | null
  /** Renders "FREE" instead of a price. */
  free?: boolean
  currency?: string
  size?: PriceSize
  layout?: 'inline' | 'stacked'
  /** Appended to each price, e.g. "/mo". */
  subscriptionSuffix?: string | null
  currentColor?: 'primary' | 'brand'
  originalColor?: 'error' | 'muted'
  className?: string
}

// Bold tokens for the current price; lighter tokens for the struck-through original.
const currentVariant = { sm: 'price', md: 'heading-2', lg: 'heading-1' } as const
const originalVariant = { sm: 'caption', md: 'body', lg: 'body' } as const

export function PriceDisplay({
  currentPrice = null,
  originalPrice = null,
  free = false,
  currency = 'USD',
  size = 'sm',
  layout = 'inline',
  subscriptionSuffix = null,
  currentColor = 'primary',
  originalColor = 'error',
  className,
}: PriceDisplayProps) {
  const wrapper = cn(
    'inline-flex',
    layout === 'stacked' ? 'flex-col items-start' : 'flex-row items-baseline gap-2',
    className,
  )

  const format = (value: number) => `${formatCurrency(value, currency)}${subscriptionSuffix ?? ''}`

  if (free) {
    return (
      <span className={wrapper}>
        <Text as="span" variant={currentVariant[size]} color="success">
          FREE
        </Text>
      </span>
    )
  }

  return (
    <span className={wrapper}>
      {originalPrice != null && (
        <Text as="span" variant={originalVariant[size]} color={originalColor} strikethrough>
          <span className="sr-only">Original price </span>
          {format(originalPrice)}
        </Text>
      )}
      {currentPrice != null && (
        <Text as="span" variant={currentVariant[size]} color={currentColor}>
          {originalPrice != null && <span className="sr-only">Now </span>}
          {format(currentPrice)}
        </Text>
      )}
    </span>
  )
}
