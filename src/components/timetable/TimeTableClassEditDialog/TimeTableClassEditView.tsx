"use client"

import { Control, FieldErrors, UseFormRegister } from "react-hook-form"

import { Select, SelectItem } from "@/components/common/select"
import { CATEGORIES } from "@/constants/categories"
import { FACULTIES } from "@/constants/faculties"
import { TIMETABLE_DAYS } from "@/constants/timetableDays"
import { useClientData } from "@/hooks/ClientDataContext"
import { TimeTableCellModel } from "@/models/timetable/TimeTableCellModel"
import { ValidationClassModel } from "@/utils/useClassEditForm"

type Props = {
  cellData?: TimeTableCellModel
  form: {
    register: UseFormRegister<ValidationClassModel>
    errors: FieldErrors<ValidationClassModel>
  }
}

const TimeTableClassEditView = ({ cellData, form: { register, errors } }: Props) => {
  // Client Data
  const { clientData } = useClientData()

  return (
    <>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">科目名</div>
        <input
          className="inline-block h-9 w-full flex-1 items-center rounded p-2 text-sm text-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0)] shadow-blue-500 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.3)]"
          defaultValue={cellData?.class.subjectName}
          {...register("subjectName")}
        />
      </div>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">曜日</div>
        <Select className="flex-1" defaultValue={`${cellData?.class.day}`} {...register("day")}>
          {Object.values(TIMETABLE_DAYS.jp).map((day, index) => {
            return (
              <SelectItem key={index} value={`${index}`}>
                {day}
              </SelectItem>
            )
          })}
        </Select>
      </div>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">時限</div>
        <div className="flex flex-1 items-center gap-2">
          <Select {...register("startPeriod")} defaultValue={`${cellData?.class.startPeriod}`}>
            {clientData.setting.periodLabels.map(({ period, startTime, endTime }, index) => {
              return <SelectItem key={index} value={`${index}`}>{`${period} 限`}</SelectItem>
            })}
          </Select>
          <div>〜</div>
          <Select {...register("endPeriod")} defaultValue={`${cellData?.class.endPeriod}`}>
            {clientData.setting.periodLabels.map(({ period, startTime, endTime }, index) => {
              return <SelectItem key={index} value={`${index}`}>{`${period} 限`}</SelectItem>
            })}
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">教員</div>
        <input
          className="inline-block h-9 w-full flex-1 items-center rounded p-2 text-sm text-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0)] shadow-blue-500 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.3)]"
          {...register("teachers")}
          defaultValue={cellData?.class.teachers}
        />
      </div>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">学部</div>
        <Select
          className="flex-1"
          {...register("faculty")}
          defaultValue={`${cellData?.class.faculty}`}
        >
          {Object.keys(FACULTIES).map((value) => {
            return (
              <SelectItem key={value} value={value}>
                {FACULTIES[Number(value)]}
              </SelectItem>
            )
          })}
        </Select>
      </div>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">科目区分</div>
        <Select
          className="flex-1"
          {...register("category")}
          defaultValue={`${cellData?.class.category}`}
        >
          {Object.keys(CATEGORIES).map((value) => {
            return (
              <SelectItem key={value} value={value}>
                {CATEGORIES[Number(value)]}
              </SelectItem>
            )
          })}
        </Select>
      </div>
      <div className="flex items-center gap-5 py-1">
        <div className="w-14 text-right text-sm text-gray-500">単位数</div>
        <Select className="flex-1" {...register("unit")} defaultValue={`${cellData?.class.unit}`}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
            return (
              <SelectItem key={value} value={`${value}`}>
                {value}
              </SelectItem>
            )
          })}
        </Select>
      </div>
    </>
  )
}

export default TimeTableClassEditView
