import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { SolveRequestCache } from '@/models/solve/type'

export type SolveRequestState = SolveRequestCache & {
  update: (solveRequestCache: SolveRequestCache) => void
}

export const useSolveRequestStore = create<SolveRequestState>()(
  persist(
    (set) => ({
      freetimePeriods: [],
      requiredCredits: [],
      solverType: 'AMPLIFY_AE',

      update: (solveRequestCache: SolveRequestCache) => set({ ...solveRequestCache }),
    }),
    {
      name: 'solve-request',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
