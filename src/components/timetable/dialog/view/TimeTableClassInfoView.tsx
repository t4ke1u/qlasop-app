"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon, TrashIcon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, useState } from "react"

import { TimeTableViewType } from "../TimeTableClassDialog"
import TimeTableClassDeleteAlertDialog from "../alert/TimeTableClassDeleteAlertDialog"
import { CATEGORIES } from "@/constants/categories"
import { FACULTIES } from "@/constants/faculties"
import { TIMETABLE_DAYS } from "@/constants/days"
import { useClientData } from "@/hooks/ClientDataContext"
import { TimeTableCellModel } from "@/models/timetable/TimeTableCellModel"

type Props = {
  time: { day: number; startPeriod: number; endPeriod: number }
  cellData?: TimeTableCellModel
  setView: Dispatch<SetStateAction<TimeTableViewType>>
}

const TimeTableClassInfoView = ({ time, cellData, setView }: Props) => {
  // Alert
  const [showAlert, setShowAlert] = useState(false)
  // Client Data
  const { deleteTimeTableCell } = useClientData()

  return (
    <>
      <Dialog.Title className="mb-4 text-base font-medium text-gray-800">科目情報</Dialog.Title>
      {/* 科目情報がある場合 */}
      {cellData !== undefined && (
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
          <div className="mt-6 flex justify-between gap-2">
            <button
              className="inline-flex h-9 items-center justify-center rounded bg-red-100 px-3 py-1 text-sm font-medium leading-none text-red-800 hover:bg-red-200"
              onClick={() => setShowAlert(true)}
            >
              <TrashIcon />
            </button>
            <button
              className="inline-flex h-9 items-center justify-center rounded bg-violet-100 px-5 py-1 text-sm font-medium leading-none text-violet-800 hover:bg-violet-200"
              onClick={() => setView("edit")}
            >
              編集
            </button>
          </div>
          <TimeTableClassDeleteAlertDialog
            open={showAlert}
            onOpenChange={setShowAlert}
            action={() => {
              deleteTimeTableCell(cellData!)
              setShowAlert(false)
            }}
            cancel={() => setShowAlert(false)}
          />
        </>
      )}
      {/* 科目情報が無い場合 */}
      {cellData === undefined && (
        <>
          <Dialog.Description className="text-sm font-medium text-gray-400">
            {`${TIMETABLE_DAYS.jp[time.day]} ${time.startPeriod + 1} 限には科目がありません`}
          </Dialog.Description>
          <div className="mt-4 flex flex-col items-center gap-4 p-8">
            <button
              className="inline-flex h-9 items-center justify-center rounded bg-violet-100 px-5 py-1 text-sm font-medium leading-none text-violet-800 hover:bg-violet-200"
              onClick={() => setView("add")}
            >
              {`${TIMETABLE_DAYS.jp[time.day]} ${time.startPeriod + 1} 限に科目を追加する`}
            </button>
          </div>
        </>
      )}
      {/* 閉じるボタン */}
      <Dialog.Close asChild>
        <button
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-200"
          aria-label="Close"
        >
          <Cross2Icon />
        </button>
      </Dialog.Close>
    </>
  )
}

export default TimeTableClassInfoView
