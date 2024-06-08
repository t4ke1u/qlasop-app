import { useMemo } from 'react'

import type { SolveRequest, SolveResponse, SolveResult } from '@/models/solve/type'

export const createSolveRepository = () => ({
  async solve(body: SolveRequest): Promise<SolveResponse> {
    const solveResult: SolveResult = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((r) => r.json())
    return { solveResult }
  },
})

export const useSolveRepository = () => {
  return useMemo(() => createSolveRepository(), [])
}

export type SolveRepository = ReturnType<typeof createSolveRepository>
