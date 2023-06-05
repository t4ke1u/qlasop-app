"use client"

import TimeTableDayLabel from "./TimeTableDayLabel"
import TimeTablePeriodLabel from "./TimeTablePeriodLabel"
import { useClientData } from "@/hooks/ClientDataContext"

const TimeTableFrame = () => {
  const { clientData } = useClientData()

  return (
    <>
      <div className="grid auto-rows-auto grid-cols-[0.5fr_repeat(6,_1fr)] gap-1">
        <div className="col-start-1 row-start-1" />
        {/* 曜日ラベル */}
        {clientData.setting.dayLabels.map((day, index) => {
          return <TimeTableDayLabel key={index} index={index} />
        })}
        {/* 時間割ラベル */}
        {clientData.setting.periodLabels.map((period, index) => {
          return <TimeTablePeriodLabel key={index} index={index} />
        })}
        {/* 1列目 */}
      </div>
    </>
  )
}

export default TimeTableFrame
