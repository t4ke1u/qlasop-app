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
  removeTimeTableCell: (cellData: TimeTableCellModel) => boolean
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
    clientData.cells.map((cellData) => {
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
    return list
  }

  const addTimeTableCell = (cellData: TimeTableCellModel, force: boolean = false): boolean => {
    const clashList = checkOverWrite(cellData.class)
    if (clashList.length !== 0 && !force) {
      return false
    } else {
      const newCells = clientData.cells.filter((cell) => {
        return !clashList.includes(cell)
      })
      newCells.push(cellData)
      const { cells: oldCells, ...rest } = clientData
      setClientData({ cells: newCells, ...rest })
      return true
    }
  }

  const removeTimeTableCell = (cellData: TimeTableCellModel): boolean => {
    const { cells: oldCells, ...rest } = clientData
    if (!oldCells.includes(cellData)) {
      return false
    } else {
      const newCells = oldCells.filter((cell) => {
        return !(cell == cellData)
      })
      setClientData({ cells: newCells, ...rest })
      return true
    }
  }

  const rewriteTimeTableCell = (
    oldCell: TimeTableCellModel,
    newCell: TimeTableCellModel,
    force: boolean = false,
  ): boolean => {
    const removedList = clientData.cells.filter((cell) => {
      return !(cell == oldCell)
    })
    const clashList: Array<TimeTableCellModel> = []
    for (let i = newCell.class.startPeriod; i <= newCell.class.endPeriod; i++) {
      removedList.map((cellData) => {
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

    if (clashList.length !== 0 && !force) {
      return false
    } else {
      const newCells = removedList.filter((cell) => {
        return !clashList.includes(cell)
      })
      newCells.push(newCell)
      const { cells: oldCells, ...rest } = clientData
      setClientData({ cells: newCells, ...rest })
      return true
    }
  }

  const value: ClientDataContextProps = {
    clientData,
    setClientData,
    checkOverWrite,
    addTimeTableCell,
    removeTimeTableCell,
    rewriteTimeTableCell,
  }

  return <ClientDataContext.Provider value={value}>{children}</ClientDataContext.Provider>
}

const useClientData = () => useContext(ClientDataContext)

export { ClientDataProvider, useClientData }
