"use client"

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
      className={`rounded-lg bg-gray-100 outline outline-1 outline-gray-200 transition-all hover:scale-95`}
      style={{ gridColumnStart: day + 2, gridRow: `${startPeriod + 2} / ${endPeriod + 3}` }}
    >
      <div className="place-self-center text-sm">{data?.class.subjectName}</div>
    </button>
  )
}

export default TimeTableCell
