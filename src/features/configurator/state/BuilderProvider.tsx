import { type ReactNode, useMemo, useReducer } from 'react'
import {
  BuilderDispatchContext,
  BuilderStateContext,
  type BuilderStateValue,
} from './builderContext'
import { builderReducer, createInitialState } from './reducer'
import { selectTotals } from './selectors'

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(builderReducer, undefined, createInitialState)
  const totals = useMemo(() => selectTotals(state), [state])
  const stateValue = useMemo<BuilderStateValue>(() => ({ state, totals }), [state, totals])

  return (
    <BuilderDispatchContext.Provider value={dispatch}>
      <BuilderStateContext.Provider value={stateValue}>{children}</BuilderStateContext.Provider>
    </BuilderDispatchContext.Provider>
  )
}
