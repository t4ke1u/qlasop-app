import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { UserCell } from '@/models/user/type'

export type CellsState = {
  cells: Array<UserCell>
  create: (cell: UserCell, force?: boolean) => boolean,
  delete: (cell: UserCell) => boolean,
  getOverlapCells: (cell: UserCell) => Array<UserCell>,
  set: (cells: Array<UserCell>) => void,
  update: (oldCell: UserCell, newCell: UserCell, force?: boolean) => boolean
}

export const useCellsStore = create<CellsState>()(
  persist(
    (set, get) => ({
      // 変数: セルの配列
      cells: [
        {
          clientMemo: 'サンプルメモ',
          color: 'gray',
          creditCategory: '専門必修',
          credits: 2,
          day: 1,
          endPeriod: 2,
          instructor: '戸川 望',
          startPeriod: 1,
          title: '電子回路',
        },
      ],

      
      
// セルを追加する関数
create: (cell: UserCell, force: boolean = false): boolean => {
        const overlapedCells = get().getOverlapCells(cell)
        // 上書きを許可しない場合
        if (overlapedCells.length > 0 && !force) {
          return false
        }
        // 上書きを許可する場合 -> 追加処理
        const newCells = get().cells.filter((cell) => !overlapedCells.includes(cell))
        newCells.push(cell)
        set({ cells: newCells })
        return true
      },

      
      


// セルを削除する関数
delete: (cell: UserCell): boolean => {
        // セルを含まない場合
        if (!get().cells.includes(cell)) {
          return false
        }
        // セルを含む場合 -> 削除処理
        set((state) => ({
          cells: state.cells.filter((storedCell) => storedCell !== cell),
        }))
        return true
      },

      
      

// 時間が重なるセルを探索する関数
getOverlapCells: (cell: UserCell): Array<UserCell> => {
        const storedCells = get().cells
        const overlapedCells: Array<UserCell> = []
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
      },

      
      // セルを初期化する関数
set: (cells: Array<UserCell>) => set({ cells }),

      // セルを編集する関数
      update: (oldCell: UserCell, newCell: UserCell, force: boolean = false): boolean => {
        // セルを含まない場合
        if (!get().cells.includes(oldCell)) {
          return false
        }
        // 重複しているセルを探索
        const storedCells = get().cells.filter((storedCell) => storedCell !== oldCell)
        const overlapedCells: Array<UserCell> = []
        for (const storedCell of storedCells) {
          if (
            storedCell.day === newCell.day &&
            !(
              storedCell.startPeriod > newCell.endPeriod ||
              storedCell.endPeriod < newCell.startPeriod
            )
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
        set({ cells: newCells })
        return true
      },
    }),
    { name: 'user-cells', storage: createJSONStorage(() => sessionStorage) },
  ),
)
