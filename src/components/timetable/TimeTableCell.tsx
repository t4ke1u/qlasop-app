"use client"

import { gray } from "@radix-ui/colors"

import TimeTableClassDialog from "./dialog/TimeTableClassDialog"
import { TimeTableCellModel } from "@/models/timetable/TimeTableCellModel"

type Props = {
  time: {
    day: number
    startPeriod: number
    endPeriod: number
  }
  cellData?: TimeTableCellModel
}

const TimeTableCell = ({ time, cellData }: Props) => {
  const { day, startPeriod, endPeriod } = time
  const color: string = cellData === undefined ? "gray" : cellData.color

  return (
    <TimeTableClassDialog time={time} cellData={cellData}>
      <button
        className="rounded-lg outline outline-1 transition-all hover:scale-95"
        style={{
          gridColumnStart: day + 2,
          gridRow: `${startPeriod + 2} / ${endPeriod + 3}`,
          backgroundColor: cellData === undefined ? gray.gray3 : gray.gray5,
          outlineColor: cellData === undefined ? gray.gray5 : gray.gray7,
        }}
      >
        <div className="place-self-center text-sm" style={{ color: gray.gray11 }}>
          {cellData?.class.subjectName}
        </div>
      </button>
    </TimeTableClassDialog>
  )
}

export default TimeTableCell
