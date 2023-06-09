"use client"

import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { Dispatch, SetStateAction } from "react"

type Props = {
  cancel: () => void
  action: () => void
}

const TimeTableClassOverwriteAlertDialog = ({ cancel, action }: Props) => {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0  bg-black opacity-50" />
      <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[450px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg shadow-stone-500/30">
        <AlertDialog.Title className="mb-4 text-base font-medium text-gray-800">
          上書きしますか？
        </AlertDialog.Title>
        <AlertDialog.Description className="text-sm font-medium text-gray-400">
          保存する科目によって，既存の科目が消去させる可能性がありますが，それでも実行しますか？
        </AlertDialog.Description>
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="inline-flex h-9 items-center justify-center rounded bg-gray-100 px-5 py-1 text-sm font-medium leading-none text-gray-800 hover:bg-gray-200"
            onClick={cancel}
          >
            キャンセル
          </button>
          <AlertDialog.Action
            className="inline-flex h-9 items-center justify-center rounded bg-green-100 px-5 py-1 text-sm font-medium leading-none text-green-800 hover:bg-green-200"
            onClick={action}
          >
            実行
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  )
}

export default TimeTableClassOverwriteAlertDialog
