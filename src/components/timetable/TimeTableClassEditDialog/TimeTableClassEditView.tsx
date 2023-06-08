"use client"

import { TIMETABLE_DAYS } from "@/constants/timetable_days"
import { TimeTableClassModel } from "@/models/timetable/TimeTableClassModel"

type Props = {
  classData?: TimeTableClassModel
}

const TimeTableClassEditView = ({ classData }: Props) => {
  return (
    <>
      <fieldset className="flex items-center gap-5 py-1">
        <label className="w-14 text-right text-sm text-gray-500" htmlFor="subjectName">
          科目名
        </label>
        <input
          className="inline-block h-9 w-full flex-1 items-center rounded p-2 text-sm text-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0)] outline-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.3)] focus:shadow-blue-500"
          id="subjectName"
          defaultValue={classData?.class.subjectName}
          disabled
        />
      </fieldset>
      <fieldset className="flex items-center gap-5 py-1">
        <label className="w-14 text-right text-sm text-gray-500" htmlFor="day">
          時限
        </label>
        <input
          className="inline-block h-9 w-full flex-1 items-center rounded p-2 text-sm text-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0)] outline-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.3)] focus:shadow-blue-500"
          id="day"
          defaultValue={"火曜 1 - 2 限"}
          disabled
        />
      </fieldset>
      <fieldset className="flex items-center gap-5 py-1">
        <label className="w-14 text-right text-sm text-gray-500" htmlFor="teachers">
          教員
        </label>
        <input
          className="inline-block h-9 w-full flex-1 items-center rounded p-2 text-sm text-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0)] outline-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.3)] focus:shadow-blue-500"
          id="teachers"
          defaultValue={classData?.class.teachers}
          disabled
        />
      </fieldset>
      <fieldset className="flex items-center gap-5 py-1">
        <label className="w-14 text-right text-sm text-gray-500" htmlFor="teachers">
          学部
        </label>
        <input
          className="inline-block h-9 w-full flex-1 items-center rounded p-2 text-sm text-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0)] outline-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.3)] focus:shadow-blue-500"
          id="teachers"
          defaultValue={classData?.class.teachers}
          disabled
        />
      </fieldset>
      <fieldset className="flex items-center gap-5 py-1">
        <label className="w-14 text-right text-sm text-gray-500" htmlFor="teachers">
          科目区分
        </label>
        <input
          className="inline-block h-9 w-full flex-1 items-center rounded p-2 text-sm text-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0)] outline-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.3)] focus:shadow-blue-500"
          id="teachers"
          defaultValue={classData?.class.teachers}
          disabled
        />
      </fieldset>
      <fieldset className="flex items-center gap-5 py-1">
        <label className="w-14 text-right text-sm text-gray-500" htmlFor="teachers">
          単位数
        </label>
        <input
          className="inline-block h-9 w-full flex-1 items-center rounded p-2 text-sm text-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0)] outline-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.3)] focus:shadow-blue-500"
          id="teachers"
          defaultValue={classData?.class.teachers}
          disabled
        />
      </fieldset>
    </>
  )
}

export default TimeTableClassEditView
