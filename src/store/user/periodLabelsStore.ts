import { create } from 'zustand'
import { UserPeriodLabel, UserPeriodLabels } from '@/models/user/type'

type PeriodLabelsState = {
  labels: UserPeriodLabels
  set: (key: number, time: UserPeriodLabel) => void
}

export const usePeriodLabelsStore = create<PeriodLabelsState>((set, get) => ({
  labels: [
    { startTime: '8:50', endTime: '10:30' },
    { startTime: '10:40', endTime: '12:20' },
    { startTime: '13:10', endTime: '14:50' },
    { startTime: '15:05', endTime: '16:45' },
    { startTime: '17:00', endTime: '18:40' },
    { startTime: '18:55', endTime: '20:35' },
    { startTime: '20:45', endTime: '21:35' },
  ],
  set: (key: number, time: UserPeriodLabel) => {
    const labels = get().labels
    labels[key] = time
    set({ labels })
  },
}))
