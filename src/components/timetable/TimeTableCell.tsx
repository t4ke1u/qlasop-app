"use client"

import { gray } from "@radix-ui/colors"
import { useState } from "react"

import TimeTableClassEditDialog from "./TimeTableClassEditDialog"
import TimeTableClassInfoDialog from "./TimeTableClassInfoDialog"
import { TimeTableCellModel } from "@/models/timetable/TimeTableCellModel"

type Props = {
  day: number
  startPeriod: number
  endPeriod: number
  cellData?: TimeTableCellModel
}

const TimeTableCell = ({ day, startPeriod, endPeriod, cellData }: Props) => {
  const color: string = cellData === undefined ? "gray" : cellData.color
  const [isOpenInfo, setOpenInfo] = useState(false)
  const [isOpenEdit, setOpenEdit] = useState(false)

  return (
    <>
      <button
        className="rounded-lg outline outline-1 transition-all hover:scale-95"
        style={{
          gridColumnStart: day + 2,
          gridRow: `${startPeriod + 2} / ${endPeriod + 3}`,
          backgroundColor: cellData === undefined ? gray.gray3 : gray.gray5,
          outlineColor: cellData === undefined ? gray.gray5 : gray.gray7,
        }}
        onClick={() => setOpenInfo(true)}
      >
        <div className="place-self-center text-sm" style={{ color: gray.gray11 }}>
          {cellData?.class.subjectName}
        </div>
      </button>
      <TimeTableClassInfoDialog
        time={{ day, startPeriod, endPeriod }}
        cellData={cellData}
        openInfo={[isOpenInfo, setOpenInfo]}
        openEdit={[isOpenEdit, setOpenEdit]}
      />
      <TimeTableClassEditDialog
        cellData={cellData}
        openInfo={[isOpenInfo, setOpenInfo]}
        openEdit={[isOpenEdit, setOpenEdit]}
      />
    </>
  )
}

export default TimeTableCell
