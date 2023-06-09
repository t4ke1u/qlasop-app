"use client"

import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { Dispatch, SetStateAction, useState } from "react"

import TimeTableClassOverwriteAlertDialog from "../TimeTableClassOverwriteAlertDialog"
import TimeTableClassEditView from "./TimeTableClassEditView"
import { useClientData } from "@/hooks/ClientDataContext"
import { TimeTableCellModel } from "@/models/timetable/TimeTableCellModel"
import { ValidationClassModel, useClassEditForm } from "@/utils/useClassEditForm"

type Props = {
  cellData: TimeTableCellModel
  openInfo: [boolean, Dispatch<SetStateAction<boolean>>]
  openEdit: [boolean, Dispatch<SetStateAction<boolean>>]
}

const TimeTableClassEditDialog = ({ cellData, openInfo, openEdit }: Props) => {
  // Dialog 表示
  const [isOpenInfo, setOpenInfo] = openInfo
  const [isOpenEdit, setOpenEdit] = openEdit
  const [isOpenOverwrite, setOpenOverwrite] = useState(false)
  const handleOpenInfo = () => {
    setOpenEdit(false)
    setOpenInfo(true)
  }
  // Client Data
  const { clientData, rewriteTimeTableCell } = useClientData()
  // Form
  const { register, handleSubmit, errors, convertFromData } = useClassEditForm()

  const onSubmit = handleSubmit(async (data: ValidationClassModel) => {
    const newCellData = convertFromData(data, cellData)
    if (newCellData !== undefined) {
      const result = rewriteTimeTableCell(cellData, newCellData)
      if (result) {
        setOpenEdit(false)
      } else {
        setOpenOverwrite(true)
      }
    } else {
      setOpenEdit(false)
    }
  })

  const onSubmitForce = handleSubmit(async (data: ValidationClassModel) => {
    const newCellData = convertFromData(data, cellData)
    if (newCellData !== undefined) {
      const result = rewriteTimeTableCell(cellData, newCellData, true)
    }
    setOpenOverwrite(false)
    setOpenEdit(false)
  })

  return (
    <AlertDialog.Root open={isOpenEdit} onOpenChange={setOpenEdit}>
      {!isOpenOverwrite ? (
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0  bg-black opacity-50" />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[450px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg shadow-stone-500/30">
            <AlertDialog.Title className="mb-4 text-base font-medium text-gray-800">
              科目編集
            </AlertDialog.Title>
            <form id="class-edit-form" onSubmit={onSubmit}>
              <TimeTableClassEditView cellData={cellData} form={{ register, errors }} />

              <div className="mt-6 flex justify-end gap-2">
                <AlertDialog.Cancel
                  className="inline-flex h-9 items-center justify-center rounded bg-gray-100 px-5 py-1 text-sm font-medium leading-none text-gray-800 hover:bg-gray-200"
                  onClick={handleOpenInfo}
                >
                  キャンセル
                </AlertDialog.Cancel>
                <button
                  className="inline-flex h-9 items-center justify-center rounded bg-blue-100 px-5 py-1 text-sm font-medium leading-none text-blue-800 hover:bg-blue-200"
                  type="submit"
                >
                  保存
                </button>
              </div>
            </form>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      ) : (
        <TimeTableClassOverwriteAlertDialog
          cancel={() => setOpenOverwrite(false)}
          action={onSubmitForce}
        />
      )}
    </AlertDialog.Root>
  )
}

export default TimeTableClassEditDialog
