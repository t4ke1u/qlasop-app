"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, useState } from "react"

import TimeTableClassEditView from "./TimeTableClassEditView"
import TimeTableClassInfoView from "./TimeTableClassInfoView"
import CustomDialog from "@/components/common/CustomDialog"
import { TIMETABLE_DAYS } from "@/constants/timetable_days"
import { TimeTableClassModel } from "@/models/timetable/TimeTableClassModel"

type Props = {
  time: { day: number; startPeriod: number; endPeriod: number }
  classData?: TimeTableClassModel
  showEdit: boolean
  setShowEdit: Dispatch<SetStateAction<boolean>>
}
const TimeTableClassDialog = ({ time, classData, showEdit, setShowEdit }: Props) => {
  return (
    <CustomDialog>
      <Dialog.Title className="mb-4 text-base font-medium text-gray-800">
        {showEdit ? "科目編集中" : "科目情報"}
      </Dialog.Title>
      {showEdit ? (
        <>
          <TimeTableClassEditView classData={classData} />
          <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
            <button
              className="inline-flex h-9 w-16 items-center justify-center rounded bg-blue-100 p-1 text-sm font-medium leading-none text-blue-800 hover:bg-blue-200"
              onClick={() => setShowEdit(false)}
            >
              保存
            </button>
          </div>
        </>
      ) : (
        <>
          {classData === undefined ? (
            <>
              <Dialog.Description className="text-sm font-medium text-gray-400">
                {`${TIMETABLE_DAYS.jp[time.day]} ${time.startPeriod + 1} 限には科目がありません`}
              </Dialog.Description>
            </>
          ) : (
            <>
              <TimeTableClassInfoView classData={classData!} />
              <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
                <button
                  className="inline-flex h-9 w-16 items-center justify-center rounded bg-violet-100 p-1 text-sm font-medium leading-none text-violet-800 hover:bg-violet-200"
                  onClick={() => setShowEdit(true)}
                >
                  編集
                </button>
              </div>
            </>
          )}
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
    </CustomDialog>
  )
}

export default TimeTableClassDialog
