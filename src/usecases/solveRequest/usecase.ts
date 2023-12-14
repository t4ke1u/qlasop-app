import { useMemo } from 'react'

import {
  useSolveRequestStore,
  type SolveRequestState,
} from '@/store/solveRequest/solveRequest.store'

import type { FreetimePeriods, RequiredCredits, SolverType } from '@/models/solve/type'

export const createSolveRequestUsecase = ({ store }: { store: SolveRequestState }) => ({
  updateFreetimePeriods: (freetimePeriods: FreetimePeriods) => {
    store.update({ ...store, freetimePeriods })
  },

  updateRequiredCredits: (requiredCredits: RequiredCredits) => {
    store.update({ ...store, requiredCredits })
  },

  updateSolverType: (solverType: SolverType) => {
    store.update({ ...store, solverType })
  },
})

export const useSolveRequestUsecase = () => {
  const store = useSolveRequestStore()

  return useMemo(() => createSolveRequestUsecase({ store }), [store])
}
