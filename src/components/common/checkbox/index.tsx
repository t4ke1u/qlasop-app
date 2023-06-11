"use client"

import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

export const CheckBox = ({ ...props }: Checkbox.CheckboxProps) => {
  return (
    <Checkbox.Root
      {...props}
      className="flex min-h-[24px] min-w-[24px] items-center justify-center rounded-sm bg-white outline outline-1 outline-gray-300 hover:bg-gray-50 data-[state=checked]:bg-gray-500 "
    >
      <Checkbox.Indicator className="text-white">
        <CheckIcon className="h-6 w-6" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
