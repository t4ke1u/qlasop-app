import { useClientData } from "@/hooks/ClientDataContext"

type TimeTableDayLabelProps = {
  index: number
}

const TimeTableDayLabel = ({ index }: TimeTableDayLabelProps) => {
  const { clientData } = useClientData()

  return (
    <div className={`row-start-1 col-start-${index + 2} p-1.5 text-center text-sm text-gray-600`}>
      {clientData.setting.dayLabels[index]}
    </div>
  )
}

export default TimeTableDayLabel
