"use client"
import { gray } from "@radix-ui/colors"

import { TimeTableClassModel } from "@/models/timetable/TimeTableClassModel"

type TimeTableCellProps = {
  day: number
  startPeriod: number
  endPeriod: number
  data?: TimeTableClassModel
}

const TimeTableCell = ({ day, startPeriod, endPeriod, data }: TimeTableCellProps) => {
  const color: string = data === undefined ? "gray" : data.color

  return (
    <button
      className={`rounded-lg outline outline-1 transition-all hover:scale-95`}
      style={{
        gridColumnStart: day + 2,
        gridRow: `${startPeriod + 2} / ${endPeriod + 3}`,
        backgroundColor: data === undefined ? gray.gray3 : gray.gray5,
        outlineColor: data === undefined ? gray.gray5 : gray.gray7,
      }}
    >
      <div className="place-self-center text-sm" style={{ color: gray.gray11 }}>
        {data?.class.subjectName}
      </div>
    </button>
  )
}

export default TimeTableCell
