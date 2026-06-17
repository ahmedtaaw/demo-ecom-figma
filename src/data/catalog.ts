import type { Bundle, Category, Plan, Product, Variant } from '@/types'
import categoriesJson from './categories.json'
import productsJson from './products.json'
import variantsJson from './variants.json'
import plansJson from './plans.json'
import bundleJson from './bundle.json'

/**
 * Typed access to the normalized local catalog. Entities are flat collections
 * linked by id (variant → product → category); the default bundle references
 * variant ids only. Swap these JSON sources for a Shopify storefront fetch
 * without changing the shapes below.
 */
export const categories = categoriesJson as Category[]
export const products = productsJson as Product[]
export const variants = variantsJson as Variant[]
export const plans = plansJson as Plan[]
export const defaultBundle = bundleJson as Bundle
