"use client"

import { CATEGORIES } from "@/constants/categories"
import { FACULTIES } from "@/constants/faculties"
import { TIMETABLE_DAYS } from "@/constants/timetableDays"
import { TimeTableCellModel } from "@/models/timetable/TimeTableCellModel"

type Props = {
  cellData: TimeTableCellModel
}

const TimeTableClassInfoView = ({ cellData }: Props) => {
  return (
    <>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">科目名</div>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {cellData.class.subjectName}
        </div>
      </div>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">曜日</div>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {TIMETABLE_DAYS.jp[cellData.class.day]}
        </div>
      </div>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">時限</div>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {cellData.class.startPeriod === cellData.class.endPeriod
            ? `${cellData.class.startPeriod + 1} 限`
            : `${cellData.class.startPeriod + 1} - ${cellData.class.endPeriod + 1} 限`}
        </div>
      </div>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">教員</div>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {cellData.class.teachers}
        </div>
      </div>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">学部</div>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {FACULTIES[cellData.class.faculty]}
        </div>
      </div>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">科目区分</div>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {CATEGORIES[cellData.class.category]}
        </div>
      </div>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">単位数</div>
        <div className="inline-block h-9 w-full flex-1 items-center p-2 text-sm text-gray-800">
          {cellData.class.unit}
        </div>
      </div>
    </>
  )
}

export default TimeTableClassInfoView
