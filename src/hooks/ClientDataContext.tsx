"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

import { ClassModel } from "@/models/ClassModel"
import { ClientDataModel } from "@/models/ClientDataModel"
import { TimeTableCellModel } from "@/models/timetable/TimeTableCellModel"

type ClientDataContextProps = {
  clientData: ClientDataModel
  setClientData: Dispatch<SetStateAction<ClientDataModel>>
  checkOverWrite: (classData: ClassModel) => Array<TimeTableCellModel>
  addTimeTableCell: (cellData: TimeTableCellModel, force?: boolean) => boolean
  rewriteTimeTableCell: (
    oldCell: TimeTableCellModel,
    newCell: TimeTableCellModel,
    force?: boolean,
  ) => boolean
  deleteTimeTableCell: (cellData: TimeTableCellModel) => boolean
}

const ClientDataContext = createContext<ClientDataContextProps>({} as ClientDataContextProps)

type ClientDataProviderProps = {
  initialClientData: ClientDataModel
  children: ReactNode
}

const ClientDataProvider = ({ initialClientData, children }: ClientDataProviderProps) => {
  // データ
  const [clientData, setClientData] = useState<ClientDataModel>(initialClientData)

  // タイムテーブルに授業を追加
  const checkOverWrite = (classData: ClassModel): Array<TimeTableCellModel> => {
    const list: Array<TimeTableCellModel> = []
    setClientData((prev) => {
      prev.cells.map((cellData) => {
        if (
          cellData.class.day === classData.day &&
          ((cellData.class.startPeriod <= classData.startPeriod &&
            classData.startPeriod <= cellData.class.endPeriod) ||
            (cellData.class.startPeriod <= classData.endPeriod &&
              classData.endPeriod <= cellData.class.endPeriod))
        ) {
          list.push(cellData)
        }
      })
      return prev
    })
    return list
  }

  const addTimeTableCell = (cellData: TimeTableCellModel, force: boolean = false): boolean => {
    const clashList = checkOverWrite(cellData.class)
    if (clashList.length !== 0 && !force) {
      return false
    } else {
      setClientData((prev) => {
        const newCells = prev.cells.filter((cell) => {
          return !clashList.includes(cell)
        })
        newCells.push(cellData)
        const { cells: oldCells, ...rest } = clientData
        return { cells: newCells, ...rest }
      })
      return true
    }
  }

  const deleteTimeTableCell = (cellData: TimeTableCellModel): boolean => {
    let result: boolean = false
    setClientData((prev) => {
      const { cells: oldCells, ...rest } = prev
      if (!oldCells.includes(cellData)) {
        result = false
        return prev
      } else {
        const newCells = oldCells.filter((cell) => {
          return !(cell == cellData)
        })
        result = true
        return { cells: newCells, ...rest }
      }
    })
    return result
  }

  const rewriteTimeTableCell = (
    oldCell: TimeTableCellModel,
    newCell: TimeTableCellModel,
    force: boolean = false,
  ): boolean => {
    let result: boolean = false
    const clashList: Array<TimeTableCellModel> = []
    setClientData((prev) => {
      const { cells: oldCells, ...rest } = prev
      // oldCell を含む場合
      if (!oldCells.includes(oldCell)) {
        result = false
        return prev
      }
      const deletedList = prev.cells.filter((cell) => {
        return !(cell == oldCell)
      })
      for (let i = newCell.class.startPeriod; i <= newCell.class.endPeriod; i++) {
        deletedList.map((cellData) => {
          if (
            cellData.class.day === newCell.class.day &&
            ((cellData.class.startPeriod <= newCell.class.startPeriod &&
              newCell.class.startPeriod <= cellData.class.endPeriod) ||
              (cellData.class.startPeriod <= newCell.class.endPeriod &&
                newCell.class.endPeriod <= cellData.class.endPeriod))
          ) {
            clashList.push(cellData)
          }
        })
      }
      // 上書きを許可しない場合
      if (clashList.length !== 0 && !force) {
        result = false
        return prev
      }
      const newCells = deletedList.filter((cell) => {
        return !clashList.includes(cell)
      })
      newCells.push(newCell)
      result = false
      return { cells: newCells, ...rest }
    })
    return result
  }

  const value: ClientDataContextProps = {
    clientData,
    setClientData,
    checkOverWrite,
    addTimeTableCell,
    deleteTimeTableCell,
    rewriteTimeTableCell,
  }

  return <ClientDataContext.Provider value={value}>{children}</ClientDataContext.Provider>
}

const useClientData = () => useContext(ClientDataContext)

export { ClientDataProvider, useClientData }
