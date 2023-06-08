import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"
import { ReactNode, forwardRef } from "react"

interface SelectProps extends SelectPrimitive.SelectProps {
  className?: string
  children?: ReactNode
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        className="inline-flex h-9 w-full items-center rounded border-[1px] border-blue-500 p-2 text-sm text-gray-800 focus:border-2"
        ref={ref}
      >
        <SelectPrimitive.Value className="" placeholder={props.defaultValue} />
        <SelectPrimitive.Icon>
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content>
          <SelectPrimitive.ScrollUpButton>
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton>
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
})
