import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { DEFAULT_PERIODS } from '@/constants/project'

import type { TrialProject } from '@/models/trialProject/type'

export type TrialProjectState = TrialProject & {
  update: (trialProject: TrialProject) => void
}

export const useTrialProjectStore = create<TrialProjectState>()(
  persist(
    (set) => ({
      cells: [],
      periodLabels: DEFAULT_PERIODS,
      staged: [],

      update: (trialProject) => set({ ...trialProject }),
    }),
    { name: 'trial-project', storage: createJSONStorage(() => sessionStorage) },
  ),
)
