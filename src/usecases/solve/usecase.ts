import { useMemo } from 'react'

import { useSolveRepository, type SolveRepository } from '@/repositories/solve/repository'

import type { SolveRequest } from '@/models/solve/type'
import type { SolveUsecaseResult } from '@/utils/result/solveUsecaseResult'

export const createSolveUsecase = ({ repository }: { repository: SolveRepository }) => ({
  async solveProblem(req: SolveRequest): Promise<SolveUsecaseResult> {
    try {
      const { solveResult } = await repository.solve(req)
      return { solveResult, status: 'success' }
    } catch (error) {
      return { status: 'error' }
    }
  },
})

export const useSolveUsecase = () => {
  const repository = useSolveRepository()

  return useMemo(() => createSolveUsecase({ repository }), [repository])
}
