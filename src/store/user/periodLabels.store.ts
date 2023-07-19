import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { DEFAULT_PERIOD_LABELS, UserPeriodLabel, UserPeriodLabels } from '@/models/user/type'

type PeriodLabelsState = {
  labels: UserPeriodLabels
  update: (index: number, time: UserPeriodLabel) => void
}

export const usePeriodLabels = create<PeriodLabelsState>()(
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
