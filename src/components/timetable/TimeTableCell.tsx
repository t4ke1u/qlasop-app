"use client"

import { gray } from "@radix-ui/colors"
import { useState } from "react"

import TimeTableClassEditDialog from "./TimeTableClassEditDialog"
import TimeTableClassInfoDialog from "./TimeTableClassInfoDialog"
import { TimeTableClassModel } from "@/models/timetable/TimeTableClassModel"

type Props = {
  day: number
  startPeriod: number
  endPeriod: number
  classData?: TimeTableClassModel
}

const TimeTableCell = ({ day, startPeriod, endPeriod, classData }: Props) => {
  const color: string = classData === undefined ? "gray" : classData.color
  const [isOpenInfo, setOpenInfo] = useState(false)
  const [isOpenEdit, setOpenEdit] = useState(false)

  return (
    <>
      <button
        className="rounded-lg outline outline-1 transition-all hover:scale-95"
        style={{
          gridColumnStart: day + 2,
          gridRow: `${startPeriod + 2} / ${endPeriod + 3}`,
          backgroundColor: classData === undefined ? gray.gray3 : gray.gray5,
          outlineColor: classData === undefined ? gray.gray5 : gray.gray7,
        }}
        onClick={() => setOpenInfo(true)}
      >
        <div className="place-self-center text-sm" style={{ color: gray.gray11 }}>
          {classData?.class.subjectName}
        </div>
      </button>
      <TimeTableClassInfoDialog
        time={{ day, startPeriod, endPeriod }}
        classData={classData}
        openInfo={[isOpenInfo, setOpenInfo]}
        openEdit={[isOpenEdit, setOpenEdit]}
      />
      <TimeTableClassEditDialog
        classData={classData}
        openInfo={[isOpenInfo, setOpenInfo]}
        openEdit={[isOpenEdit, setOpenEdit]}
      />
    </>
  )
}

export default TimeTableCell
