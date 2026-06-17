import { BuilderProvider, BundleStep, OrderSummary, steps, useBuilderDispatch } from '@/features/configurator'

function BundleBuilder() {
  const dispatch = useBuilderDispatch()

  return (
    <main className="min-h-dvh bg-surface-page">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-8 tablet:flex-row tablet:px-8 desktop:px-12">
        <div className="min-w-0 flex-1">
          <div className="flex flex-col">
            {steps.map((step, index) => {
              const next = steps[index + 1]
              return (
                <BundleStep
                  key={step.id}
                  step={step}
                  index={index + 1}
                  total={steps.length}
                  nextLabel={next ? `Next: ${next.title}` : undefined}
                  // Single-open accordion: opening the next step collapses the current one.
                  onNext={next ? () => dispatch({ type: 'TOGGLE_STEP', stepId: next.id }) : undefined}
                />
              )
            })}
          </div>
        </div>

        <div className="tablet:w-[340px] tablet:shrink-0 desktop:w-[380px]">
          <div className="tablet:sticky tablet:top-4">
            <OrderSummary />
          </div>
        </div>
      </div>
    </main>
  )
}

export function BundleBuilderPage() {
  const firstStep = steps[0]
  return (
    <BuilderProvider initialSteps={firstStep ? { [firstStep.id]: 'expanded' } : {}}>
      <BundleBuilder />
    </BuilderProvider>
  )
}
