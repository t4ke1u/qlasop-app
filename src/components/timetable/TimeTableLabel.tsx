type TimeTableLabelProps = {
  period: string
  startTime: string
  endTime: string
}

const TimeTableLabel = ({ period, startTime, endTime }: TimeTableLabelProps) => {
  return (
    <button className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-1.5 outline outline-1 outline-gray-200 transition-all hover:scale-95">
      <div className="text-xs font-medium text-gray-600">{startTime}</div>
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300">
        <div className="text-xs font-bold">{period}</div>
      </div>
      <div className="text-xs font-medium text-gray-600">{endTime}</div>
    </button>
  )
}

export default TimeTableLabel
