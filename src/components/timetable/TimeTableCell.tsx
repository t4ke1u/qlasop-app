"use client"

import { gray } from "@radix-ui/colors"
import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"

import TimeTableClassDialog from "./dialogs/TimeTableClassDialog"
import { TimeTableClassModel } from "@/models/timetable/TimeTableClassModel"

type Props = {
  day: number
  startPeriod: number
  endPeriod: number
  classData?: TimeTableClassModel
}

const TimeTableCell = ({ day, startPeriod, endPeriod, classData }: Props) => {
  const color: string = classData === undefined ? "gray" : classData.color
  const [isOpen, setOpen] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const setConfirmEdit = (isOpen: boolean) => {
    if (!isOpen && showEdit) {
      setShowEdit(false)
    }
    setOpen(isOpen)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setConfirmEdit}>
      <Dialog.Trigger
        className="rounded-lg outline outline-1 transition-all hover:scale-95"
        style={{
          gridColumnStart: day + 2,
          gridRow: `${startPeriod + 2} / ${endPeriod + 3}`,
          backgroundColor: classData === undefined ? gray.gray3 : gray.gray5,
          outlineColor: classData === undefined ? gray.gray5 : gray.gray7,
        }}
      >
        <div className="place-self-center text-sm" style={{ color: gray.gray11 }}>
          {classData?.class.subjectName}
        </div>
      </Dialog.Trigger>
      <TimeTableClassDialog
        time={{ day, startPeriod, endPeriod }}
        classData={classData}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
      />
    </Dialog.Root>
  )
}

export default TimeTableCell
