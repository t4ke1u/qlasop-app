"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { ReactNode, useState } from "react"

import TimeTableClassOverwriteAlertDialog from "./alert/TimeTableClassOverwriteAlertDialog"
import { Select, SelectItem } from "@/components/common/select"
import { CATEGORIES } from "@/constants/categories"
import { TIMETABLE_DAYS } from "@/constants/days"
import { FACULTIES } from "@/constants/faculties"
import { useClientData } from "@/hooks/ClientDataContext"
import { TimeTableDialogCellModel } from "@/models/timetable/TimeTableDialogCellModel"
import { ValidationClassModel, useClassEditForm } from "@/utils/useClassEditForm"

type Props = {
  children: ReactNode
  cellData?: TimeTableDialogCellModel
}

const TimeTableClassAddDialog = ({ children, cellData }: Props) => {
  // Open
  const [isOpen, setOpen] = useState(false)
  // Alert
  const [showAlert, setShowAlert] = useState(false)
  // Client Data
  const { clientData, addTimeTableCell } = useClientData()
  // Form
  const { register, handleSubmit, convertFromData } = useClassEditForm()

  const onSubmit = handleSubmit(async (data: ValidationClassModel) => {
    const newCellData = convertFromData(data, cellData)
    if (newCellData !== undefined) {
      const result = addTimeTableCell(newCellData)
      if (!result) {
        setShowAlert(true)
      } else {
        setOpen(false)
      }
    } else {
      setOpen(false)
    }
  })

  const onSubmitForce = handleSubmit(async (data: ValidationClassModel) => {
    const newCellData = convertFromData(data, cellData)
    if (newCellData !== undefined) {
      const result = addTimeTableCell(newCellData, true)
    }
  })

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0  bg-black opacity-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[450px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg shadow-stone-500/30">
          <Dialog.Title className="mb-4 text-base font-medium text-gray-800">科目追加</Dialog.Title>
          <form id="class-edit-form" onSubmit={onSubmit}>
            <div className="flex items-center gap-5 py-1">
              <div className="w-14 text-right text-sm text-gray-500">科目名</div>
              <input
                className="inline-block h-9 w-full flex-1 items-center rounded p-2 text-sm text-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0)] shadow-blue-500 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.3)]"
                defaultValue={cellData?.class?.subjectName}
                {...register("subjectName")}
              />
            </div>
            <div className="flex items-center gap-5 py-1">
              <div className="w-14 text-right text-sm text-gray-500">曜日</div>
              <Select
                className="flex-1"
                defaultValue={`${cellData?.class?.day}`}
                {...register("day")}
              >
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
                <Select
                  {...register("startPeriod")}
                  defaultValue={`${cellData?.class?.startPeriod}`}
                >
                  {clientData.setting.periodLabels.map(({ period }, index) => {
                    return <SelectItem key={index} value={`${index}`}>{`${period} 限`}</SelectItem>
                  })}
                </Select>
                <div>〜</div>
                <Select {...register("endPeriod")} defaultValue={`${cellData?.class?.endPeriod}`}>
                  {clientData.setting.periodLabels.map(({ period }, index) => {
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
                defaultValue={cellData?.class?.teachers}
              />
            </div>
            <div className="flex items-center gap-5 py-1">
              <div className="w-14 text-right text-sm text-gray-500">学部</div>
              <Select
                className="flex-1"
                {...register("faculty")}
                defaultValue={`${cellData?.class?.faculty}`}
              >
                {Object.keys(FACULTIES.jp).map((value) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {FACULTIES.jp[Number(value)]}
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
                defaultValue={`${cellData?.class?.category}`}
              >
                {Object.keys(CATEGORIES.jp).map((value) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {CATEGORIES.jp[Number(value)]}
                    </SelectItem>
                  )
                })}
              </Select>
            </div>
            <div className="flex items-center gap-5 py-1">
              <div className="w-14 text-right text-sm text-gray-500">単位数</div>
              <Select
                className="flex-1"
                {...register("unit")}
                defaultValue={`${cellData?.class?.unit}`}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
                  return (
                    <SelectItem key={value} value={`${value}`}>
                      {value}
                    </SelectItem>
                  )
                })}
              </Select>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Dialog.Close className="inline-flex h-9 items-center justify-center rounded bg-gray-100 px-5 py-1 text-sm font-medium leading-none text-gray-800 hover:bg-gray-200">
                キャンセル
              </Dialog.Close>
              <button
                className="inline-flex h-9 items-center justify-center rounded bg-blue-100 px-5 py-1 text-sm font-medium leading-none text-blue-800 hover:bg-blue-200"
                type="submit"
              >
                保存
              </button>
            </div>
          </form>
          <TimeTableClassOverwriteAlertDialog
            open={showAlert}
            onOpenChange={setShowAlert}
            action={onSubmitForce}
            cancel={() => setShowAlert(false)}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default TimeTableClassAddDialog
