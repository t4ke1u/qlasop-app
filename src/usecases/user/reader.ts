import { useEffect, useState } from 'react'

import { DEFAULT_PERIOD_LABELS, UserPeriodLabel } from '@/models/user/type'
import { useCellsStore, usePeriodLabelsStore } from '@/store/user'

// Cells
export const useCells = () => ({
  cells: useCellsStore((state) => state.cells),
})

// PeriodLabels
export const usePeriodLabels = () => ({
  labels: usePeriodLabelsStore((state) => state.labels),
})

export const usePeriodLabel = (index: number) => {
  const store = usePeriodLabelsStore()
  const [label, setLabel] = useState<UserPeriodLabel>(DEFAULT_PERIOD_LABELS[index])
  useEffect(() => setLabel(store.labels[index]), [store, index])

  return { label }
}
