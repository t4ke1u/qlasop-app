import { useEffect, useState } from 'react'

import { useSolveResultStore } from '@/store/solveResult/solveResult.store'

import type { SolveResult } from '@/models/solve/type'

export const useSolveResult = () => {
  const store = useSolveResultStore()

  const [solveResult, setSolveResult] = useState<SolveResult | undefined>()
  useEffect(() => setSolveResult(store.solveResult), [store])

  return { solveResult }
}
