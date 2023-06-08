"use client"

import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { Dispatch, SetStateAction } from "react"

import TimeTableClassEditView from "./TimeTableClassEditView"
import { TimeTableClassModel } from "@/models/timetable/TimeTableClassModel"

type Props = {
  classData?: TimeTableClassModel
  openInfo: [boolean, Dispatch<SetStateAction<boolean>>]
  openEdit: [boolean, Dispatch<SetStateAction<boolean>>]
}

const TimeTableClassEditDialog = ({ classData, openInfo, openEdit }: Props) => {
  const [isOpenInfo, setOpenInfo] = openInfo
  const [isOpenEdit, setOpenEdit] = openEdit
  const handleOpenInfo = () => {
    setOpenEdit(false)
    setOpenInfo(true)
  }

  return (
    <AlertDialog.Root open={isOpenEdit} onOpenChange={setOpenEdit}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0  bg-black opacity-50" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[450px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg shadow-stone-500/30">
          <AlertDialog.Title className="mb-4 text-base font-medium text-red-500">
            科目編集
          </AlertDialog.Title>
          <TimeTableClassEditView classData={classData!} />
          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Cancel
              className="inline-flex h-9 items-center justify-center rounded bg-gray-100 px-5 py-1 text-sm font-medium leading-none text-gray-800 hover:bg-gray-200"
              onClick={handleOpenInfo}
            >
              キャンセル
            </AlertDialog.Cancel>
            <AlertDialog.Action className="inline-flex h-9 items-center justify-center rounded bg-blue-100 px-5 py-1 text-sm font-medium leading-none text-blue-800 hover:bg-blue-200">
              保存
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default TimeTableClassEditDialog
