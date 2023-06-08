"use client"

import { FACULTY } from "@/constants/faculty"
import { TIMETABLE_DAYS } from "@/constants/timetable_days"
import { TimeTableClassModel } from "@/models/timetable/TimeTableClassModel"

type Props = {
  classData: TimeTableClassModel
}

const TimeTableClassInfoView = ({ classData }: Props) => {
  return (
    <>
      <div className="flex items-center gap-5 py-1">
        <label className="w-14 text-right text-xs text-gray-500" htmlFor="subjectName">
          科目名
        </label>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {classData.class.subjectName}
        </div>
      </div>
      <div className="flex items-center gap-5 py-1">
        <label className="w-14 text-right text-sm text-gray-500" htmlFor="subjectName">
          時限
        </label>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {classData.class.startPeriod === classData.class.endPeriod
            ? `${TIMETABLE_DAYS.jp[classData.class.day]} ${classData.class.startPeriod + 1} 限`
            : `${TIMETABLE_DAYS.jp[classData.class.day]} ${classData.class.startPeriod + 1} - ${
                classData.class.endPeriod + 1
              } 限`}
        </div>
      </div>
      <div className="flex items-center gap-5 py-1">
        <label className="w-14 text-right text-sm text-gray-500" htmlFor="subjectName">
          教員
        </label>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {classData.class.teachers}
        </div>
      </div>
      <div className="flex items-center gap-5 py-1">
        <label className="w-14 text-right text-sm text-gray-500" htmlFor="subjectName">
          学部
        </label>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {FACULTY[classData.class.faculty]}
        </div>
      </div>
      <div className="flex items-center gap-5 py-1">
        <label className="w-14 text-right text-sm text-gray-500" htmlFor="subjectName">
          科目区分
        </label>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {classData.class.category}
        </div>
      </div>
      <div className="flex items-center gap-5 py-1">
        <label className="w-14 text-right text-sm text-gray-500" htmlFor="subjectName">
          単位数
        </label>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {classData.class.unit}
        </div>
      </div>
    </>
  )
}

export default TimeTableClassInfoView
