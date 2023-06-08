import * as Dialog from "@radix-ui/react-dialog"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
}

const CustomDialog = ({ children }: Props) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0  bg-black opacity-50" />
      <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[450px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg shadow-stone-500/30">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default CustomDialog
