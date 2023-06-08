"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

import CustomDialog from "@/components/common/CustomDialog"
import { TIMETABLE_DAYS } from "@/constants/timetable_days"
import { TimeTableClassModel } from "@/models/timetable/TimeTableClassModel"

type Props = {
  day: number
  startPeriod: number
  endPeriod: number
  classData?: TimeTableClassModel
}

const TimeTableClassEditView = ({ day, startPeriod, endPeriod, classData }: Props) => {
  return (
    <>
      <fieldset className="flex items-center gap-5 py-2">
        <label className="text-sm text-gray-500 md:w-20 md:text-right" htmlFor="subjectName">
          科目名
        </label>
        <input
          className="inline-block h-9 w-full flex-1 items-center rounded p-2 text-sm text-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0)] outline-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.3)] focus:shadow-blue-500"
          id="subjectName"
          defaultValue={"むかしむかしあるところにおじいさんとおばあさんが"}
          disabled
        />
      </fieldset>
      <fieldset className="flex flex-col items-start gap-5 py-2 md:flex-row md:items-center">
        <label className="w-20 text-sm text-gray-500 md:text-right" htmlFor="subjectName">
          科目名
        </label>
        <input
          className="inline-block h-9 w-full flex-1 items-center rounded p-2 text-sm text-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0)] outline-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.3)] focus:shadow-blue-500"
          id="subjectName"
          defaultValue={classData?.class.subjectName}
          disabled
        />
      </fieldset>
      <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
        <Dialog.Close asChild>
          <button className="Button green">Save changes</button>
        </Dialog.Close>
      </div>
    </>
  )
}

export default TimeTableClassEditView
