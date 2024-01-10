import { useMemo } from 'react'

import { useSolveResultStore, type SolveResultState } from '@/store/solveResult/solveResult.store'

import type { SolveResult } from '@/models/solve/type'

export const createSolveResultUsecase = ({ store }: { store: SolveResultState }) => ({
  updateSolveResult: (solveResult: SolveResult) => {
    store.update(solveResult)
  },
})

export const useSolveResultUsecase = () => {
  const store = useSolveResultStore()

  return useMemo(() => createSolveResultUsecase({ store }), [store])
}
