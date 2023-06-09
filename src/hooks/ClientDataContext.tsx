"use client"
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

import { ClassModel } from "@/models/ClassModel"
import { ClientDataModel } from "@/models/ClientDataModel"
import { TimeTableCellModel } from "@/models/timetable/TimeTableCellModel"

type ClientDataContextProps = {
  clientData: ClientDataModel
  setClientData: Dispatch<SetStateAction<ClientDataModel>>
  checkClassExit: (day: number, period: number) => Array<TimeTableCellModel>
  checkOverWrite: (classData: ClassModel) => Array<TimeTableCellModel>
  addTimeTableCell: (cellData: TimeTableCellModel, force?: boolean) => boolean
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
  const checkClassExit = (day: number, period: number): Array<TimeTableCellModel> => {
    const list: Array<TimeTableCellModel> = []
    clientData.cells.map((cellData) => {
      if (
        cellData.class.day === day &&
        cellData.class.startPeriod <= period &&
        cellData.class.endPeriod >= period
      ) {
        list.push(cellData)
      }
    })
    return list
  }

  const checkOverWrite = (classData: ClassModel): Array<TimeTableCellModel> => {
    const list: Array<TimeTableCellModel> = []
    for (let i = classData.startPeriod; i <= classData.endPeriod; i++) {
      list.push(...checkClassExit(classData.day, i))
    }
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

  const value: ClientDataContextProps = {
    clientData,
    setClientData,
    checkClassExit,
    checkOverWrite,
    addTimeTableCell,
    removeTimeTableCell,
  }

  return <ClientDataContext.Provider value={value}>{children}</ClientDataContext.Provider>
}

const useClientData = () => useContext(ClientDataContext)

export { ClientDataProvider, useClientData }
