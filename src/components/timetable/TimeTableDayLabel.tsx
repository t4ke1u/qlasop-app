import { TIMETABLE_DAYS } from "@/constants/timetable_days"

type TimeTableDayLabelProps = {
  index: number
}

const TimeTableDayLabel = ({ index }: TimeTableDayLabelProps) => {
  const gridColStart = "col-start-" + String(index + 2)

  return (
    <div className={`row-start-1 ${gridColStart} p-1.5 text-center text-sm text-gray-600`}>
      {TIMETABLE_DAYS.en[index]}
    </div>
  )
}

export default TimeTableDayLabel
