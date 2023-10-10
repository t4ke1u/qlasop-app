import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { DEFAULT_PERIOD_LABELS } from '@/models/user/type'

import type { UserPeriodLabel, UserPeriodLabels } from '@/models/user/type'

export type PeriodLabelsState = {
  labels: UserPeriodLabels
  update: (index: number, time: UserPeriodLabel) => void
}

export const usePeriodLabelsStore = create<PeriodLabelsState>()(
  persist(
    (set, get) => ({
      labels: DEFAULT_PERIOD_LABELS,

      update: (index: number, time: UserPeriodLabel) => {
        const labels = get().labels
        labels[index] = time
        set({ labels })
      },
    }),
    { name: 'user-period-labels', storage: createJSONStorage(() => sessionStorage) },
  ),
)
