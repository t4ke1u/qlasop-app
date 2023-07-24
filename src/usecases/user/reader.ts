import { useEffect, useState } from 'react'

import { DEFAULT_PERIOD_LABELS, UserCell, UserPeriodLabel } from '@/models/user/type'
import { useCellsStore, usePeriodLabelsStore } from '@/store/user'

// Cells
export const useCells = () => {
  const store = useCellsStore()
  const [cells, setCells] = useState<Array<UserCell>>([])
  useEffect(() => setCells(store.cells), [store])

  return { cells }
}

// PeriodLabels
export const usePeriodLabel = (index: number) => {
  const store = usePeriodLabelsStore()
  const [label, setLabel] = useState<UserPeriodLabel>(DEFAULT_PERIOD_LABELS[index])
  useEffect(() => setLabel(store.labels[index]), [store, index])

  return { label }
}
