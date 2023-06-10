"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { ReactNode, useState } from "react"

import TimeTableClassAddView from "./view/TimeTableClassAddView"
import TimeTableClassEditView from "./view/TimeTableClassEditView"
import TimeTableClassInfoView from "./view/TimeTableClassInfoView"
import { TimeTableCellModel } from "@/models/timetable/TimeTableCellModel"

export type TimeTableViewType = "info" | "edit" | "add"

type Props = {
  children: ReactNode
  time: {
    day: number
    startPeriod: number
    endPeriod: number
  }
  cellData?: TimeTableCellModel
}

const TimeTableClassDialog = ({ children, time, cellData }: Props) => {
  const [view, setView] = useState<TimeTableViewType>("info")

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0  bg-black opacity-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[450px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg shadow-stone-500/30">
          {view === "info" && (
            <TimeTableClassInfoView time={time} cellData={cellData} setView={setView} />
          )}
          {view === "edit" && <TimeTableClassEditView cellData={cellData!} setView={setView} />}
          {view === "add" && (
            <TimeTableClassAddView cellData={{ class: { ...time } }} setView={setView} />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default TimeTableClassDialog
