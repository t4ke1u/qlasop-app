import { useMemo } from 'react'

import { useTrialProjectStore, type TrialProjectState } from '@/store/trialProject'

import type { Cell, PeriodLabel } from '@/models/trialProject/type'

export const createTrialProjectUsecase = ({ store }: { store: TrialProjectState }) => {
  const updateTrialProject = store.update

  // 時間が重なるセルを探索する関数
  const getOverlapCells = (cell: Cell): Array<Cell> => {
    const storedCells = store.cells
    const overlapedCells: Array<Cell> = []
    for (const storedCell of storedCells) {
      if (
        // 重なるかどうかを判定
        storedCell.day === cell.day &&
        !(storedCell.startPeriod > cell.endPeriod || storedCell.endPeriod < cell.startPeriod)
      ) {
        overlapedCells.push(storedCell)
      }
    }
    return overlapedCells
  }

  // セルを追加する関数
  const createCell = (cell: Cell, force: boolean = false): boolean => {
    const overlapedCells = getOverlapCells(cell)
    // 上書きを許可しない場合
    if (overlapedCells.length > 0 && !force) {
      return false
    }
    // 上書きを許可する場合 -> 追加処理
    const newCells = store.cells.filter((cell) => !overlapedCells.includes(cell))
    newCells.push(cell)
    store.update({ ...store, cells: newCells })
    return true
  }

  // セルを削除する関数
  const deleteCell = (cell: Cell): boolean => {
    // セルを含まない場合
    if (!store.cells.includes(cell)) {
      return false
    }
    // セルを含む場合 -> 削除処理
    store.update({ ...store, cells: store.cells.filter((storedCell) => storedCell !== cell) })
    return true
  }

  const updateCell = (oldCell: Cell, newCell: Cell, force: boolean = false): boolean => {
    // セルを含まない場合
    if (!store.cells.includes(oldCell)) {
      return false
    }
    // 重複しているセルを探索
    const storedCells = store.cells.filter((storedCell) => storedCell !== oldCell)
    const overlapedCells: Array<Cell> = []
    for (const storedCell of storedCells) {
      if (
        storedCell.day === newCell.day &&
        !(storedCell.startPeriod > newCell.endPeriod || storedCell.endPeriod < newCell.startPeriod)
      ) {
        overlapedCells.push(storedCell)
      }
    }
    // 上書きを許可しない場合
    if (overlapedCells.length > 0 && !force) {
      return false
    }
    // 上書きを許可する場合 -> 追加処理
    const newCells = storedCells.filter((storedCell) => !overlapedCells.includes(storedCell))
    newCells.push(newCell)
    store.update({ ...store, cells: newCells })
    return true
  }

  const updatePeriodLabel = (periodLabel: PeriodLabel) => {
    if (store.periodLabels.findIndex((p) => p.index === periodLabel.index) === -1) {
      return false
    } else {
      const newPeriodLabels = store.periodLabels.filter((p) => p.index !== periodLabel.index)
      newPeriodLabels.push(periodLabel)
      store.update({ ...store, periodLabels: newPeriodLabels })
      return true
    }
  }

  return { createCell, deleteCell, updateCell, updatePeriodLabel, updateTrialProject }
}

export const useTrialProjectUsecase = () => {
  const store = useTrialProjectStore()

  return useMemo(() => createTrialProjectUsecase({ store }), [store])
}
