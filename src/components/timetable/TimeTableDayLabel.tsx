import { useClientData } from "@/hooks/ClientDataContext"

type TimeTableDayLabelProps = {
  index: number
}

const TimeTableDayLabel = ({ index }: TimeTableDayLabelProps) => {
  const { clientData } = useClientData()
  const gridColStart = "col-start-" + String(index + 2)

  return (
    <div className={`row-start-1 ${gridColStart} p-1.5 text-center text-sm text-gray-600`}>
      {clientData.setting.dayLabels[index]}
    </div>
  )
}

export default TimeTableDayLabel
