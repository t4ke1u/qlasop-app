import type { SolveResult } from '@/models/solve/type'

type Status = 'success' | 'error'

export type SolveUsecaseResult = {
  solveResult?: SolveResult
  status: Status
}
