import { ReactNode } from "react"
import TimeTableCell from "./TimeTableCell"
import TimeTableLabel from "./TimeTableLabel"

type TimeTableProps = {
  children: ReactNode
}

const TimeTableFrame = () => {
  const days: Array<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <>
      <div className="grid grid-cols-[0.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1.5fr] gap-1">
        <br />
        {/* 曜日 */}
        {days.map((day) => {
          return (
            <div key={day} className="p-1.5 text-center text-sm text-gray-600">
              {day}
            </div>
          )
        })}
        {/* 1列目 */}
        <TimeTableLabel period="1" startTime="8:50" endTime="10:30" />
        <TimeTableCell />
        <TimeTableCell />
        <TimeTableCell />
        <TimeTableCell />
        <TimeTableCell />
        <TimeTableCell />
        {/* 2列目 */}
        <TimeTableLabel period="2" startTime="10:40" endTime="12:20" />
        <TimeTableCell />
      </div>
    </>
  )
}

export default TimeTableFrame
