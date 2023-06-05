"use client"

import { useClientData } from "@/hooks/ClientDataContext"

type TimeTablePeriodLabelProps = {
  index: number
}

const TimeTablePeriodLabel = ({ index }: TimeTablePeriodLabelProps) => {
  const { clientData } = useClientData()
  const label = clientData.setting.periodLabels[index]

  return (
    <button
      className={`row-start-${
        index + 2
      } col-start-1 flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-1.5 outline outline-1 outline-gray-200 transition-all hover:scale-95`}
    >
      <div className="text-xs font-medium text-gray-600">{label.startTime}</div>
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300">
        <div className="text-xs font-bold">{label.period}</div>
      </div>
      <div className="text-xs font-medium text-gray-600">{label.endTime}</div>
    </button>
  )
}

export default TimeTablePeriodLabel
