"use client"

import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

export const CheckBox = ({ ...props }: Checkbox.CheckboxProps) => {
  return (
    <Checkbox.Root
      {...props}
      className="flex h-6 w-6 items-center justify-center rounded bg-white outline outline-1 outline-gray-300 hover:bg-blue-100"
    >
      <Checkbox.Indicator className="text-blue-600">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
