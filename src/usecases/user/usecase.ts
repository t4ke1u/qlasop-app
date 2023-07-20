import { useMemo } from 'react'

import { useCellsStore } from '@/store/user'
import { CellsState } from '@/store/user/cells.store'
import { PeriodLabelsState, usePeriodLabelsStore } from '@/store/user/periodLabels.store'

// Cells
export const createCellsUsecase = ({ store }: { store: CellsState }) => ({
  createCell: store.create,
  deleteCell: store.delete,
  updateCell: store.update,
})

export const useCellsUsecase = () => {
  const store = useCellsStore()

  return useMemo(() => createCellsUsecase({ store }), [store])
}

// PeriodLabels
export const createPeriodLabelsUsecase = ({ store }: { store: PeriodLabelsState }) => ({
  updatePeriodLabel: store.update,
})

export const usePeriodLabelsUsecase = () => {
  const store = usePeriodLabelsStore()

  return useMemo(() => createPeriodLabelsUsecase({ store }), [store])
}
