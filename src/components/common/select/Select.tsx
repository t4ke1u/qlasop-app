import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"
import classNames from "classnames"
import { ReactNode, forwardRef } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface SelectProps extends UseFormRegisterReturn {
  className?: string
  children?: ReactNode
  defaultValue?: string
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { className, children, name, onChange, required, disabled, defaultValue },
  ref,
) {
  return (
    <SelectPrimitive.Root
      name={name}
      onValueChange={(value) => onChange({ target: { name, value } })}
      required={required}
      disabled={disabled}
      defaultValue={defaultValue}
    >
      <SelectPrimitive.Trigger
        className={classNames(
          className,
          "inline-flex h-9 w-full items-center justify-between gap-2 rounded border-[1px] border-blue-500 p-2 text-sm text-gray-800 focus:border-2",
        )}
        ref={ref}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon className="text-blue-700">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="overflow-hidden rounded-md bg-white shadow-lg shadow-gray-700/30">
          <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white text-blue-700">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport className="p-2">{children}</SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-white text-blue-700">
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
})
