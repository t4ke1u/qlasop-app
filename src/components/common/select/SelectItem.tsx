import { CheckIcon } from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"
import classNames from "classnames"
import { ReactNode, forwardRef } from "react"

interface SelectItemProps extends SelectPrimitive.SelectItemProps {
  className?: string
  value: string
  children?: ReactNode
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { className, children, ...props },
  forwardedRef,
) {
  return (
    <SelectPrimitive.Item
      className={classNames(
        className,
        "relative flex h-6 select-none items-center rounded px-6 py-2 text-xs text-blue-700 data-[highlighted]:bg-blue-400 data-[highlighted]:text-white data-[highlighted]:outline-none md:text-sm",
      )}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
})
