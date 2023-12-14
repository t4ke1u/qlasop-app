import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { SolveResult } from '@/models/solve/type'

export type SolveResultState = {
  solveResult?: SolveResult
  update: (solveResult: SolveResult) => void
}

export const useSolveResultStore = create<SolveResultState>()(
  persist(
    (set) => ({
      update: (solveResult: SolveResult) => set({ solveResult }),
    }),
    {
      name: 'solve-result',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
