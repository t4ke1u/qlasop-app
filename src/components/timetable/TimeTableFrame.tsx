"use client"

import { ReactElement, useEffect, useState } from "react"
import TimeTableCell from "./TimeTableCell"
import TimeTableDayLabel from "./TimeTableDayLabel"
import TimeTablePeriodLabel from "./TimeTablePeriodLabel"
import { TIMETABLE_DAYS } from "@/constants/timetableDays"
import { useClientData } from "@/hooks/ClientDataContext"

const TimeTableFrame = () => {
  const { clientData } = useClientData()
  const [cells, setCells] = useState<Array<ReactElement>>([])

  useEffect(() => {
    const filledPeriods: Array<string> = []
    const cells: Array<ReactElement> = []
    clientData.cells.map((value) => {
      cells.push(
        <TimeTableCell
          key={`${value.class.day}-${value.class.startPeriod}-${value.class.subjectName}`}
          day={value.class.day}
          startPeriod={value.class.startPeriod}
          endPeriod={value.class.endPeriod}
          cellData={value}
        />,
      )
      for (let i = value.class.startPeriod; i <= value.class.endPeriod; i++) {
        filledPeriods.push(`${value.class.day}-${i}`)
      }
    })
    for (let i = 0; i < Object.keys(TIMETABLE_DAYS.jp).length; i++) {
      for (let j = 0; j < clientData.setting.periodLabels.length; j++) {
        if (!filledPeriods.includes(`${i}-${j}`)) {
          cells.push(<TimeTableCell key={`${i}-${j}`} day={i} startPeriod={j} endPeriod={j} />)
        }
      }
    }
    setCells(cells)
  }, [clientData])

  return (
    <div className="grid grid-cols-[0.5fr_repeat(6,_1fr)] grid-rows-[auto_repeat(7,_minmax(100px,auto))] gap-1">
      <div className="col-start-1 row-start-1" />
      {/* 時間割ラベル */}
      {clientData.setting.periodLabels.map((value, index) => {
        return <TimeTablePeriodLabel key={index} index={index} />
      })}
      {/* 曜日ラベル */}
      {Object.values(TIMETABLE_DAYS.en).map((value, index) => {
        return <TimeTableDayLabel key={index} index={index} />
      })}
      {/* 科目セル */}
      {cells}
    </div>
  )
}

export default TimeTableFrame
