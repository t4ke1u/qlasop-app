"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction } from "react"

import TimeTableClassInfoView from "./TimeTableClassInfoView"
import { TIMETABLE_DAYS } from "@/constants/timetable_days"
import { TimeTableClassModel } from "@/models/timetable/TimeTableClassModel"

type Props = {
  time: { day: number; startPeriod: number; endPeriod: number }
  classData?: TimeTableClassModel
  openInfo: [boolean, Dispatch<SetStateAction<boolean>>]
  openEdit: [boolean, Dispatch<SetStateAction<boolean>>]
}

const TimeTableClassInfoDialog = ({ time, classData, openInfo, openEdit }: Props) => {
  const [isOpenInfo, setOpenInfo] = openInfo
  const [isOpenEdit, setOpenEdit] = openEdit
  const handleOpenEdit = () => {
    setOpenInfo(false)
    setOpenEdit(true)
  }

  return (
    <Dialog.Root open={isOpenInfo} onOpenChange={setOpenInfo}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0  bg-black opacity-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[450px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg shadow-stone-500/30">
          <Dialog.Title className="mb-4 text-base font-medium text-gray-800">科目情報</Dialog.Title>
          {classData === undefined ? (
            <>
              <Dialog.Description className="text-sm font-medium text-gray-400">
                {`${TIMETABLE_DAYS.jp[time.day]} ${time.startPeriod + 1} 限には科目がありません`}
              </Dialog.Description>
            </>
          ) : (
            <>
              <TimeTableClassInfoView classData={classData!} />
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="inline-flex h-9 items-center justify-center rounded bg-violet-100 px-5 py-1 text-sm font-medium leading-none text-violet-800 hover:bg-violet-200"
                  onClick={handleOpenEdit}
                >
                  編集
                </button>
              </div>
            </>
          )}
          <Dialog.Close asChild>
            <button
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-200"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default TimeTableClassInfoDialog
