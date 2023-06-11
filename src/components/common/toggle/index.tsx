import { ReactNode, useState } from "react"

type Props = {
  children: ReactNode
  toggleOn?: () => void
  toggleOff?: () => void
}

const Toggle = ({ children, toggleOn, toggleOff }: Props) => {
  const [isPressed, setPressed] = useState(false)
  const onClick = () => {
    if (isPressed) {
      if (toggleOff !== undefined) {
        toggleOff!()
      }
      setPressed(false)
    } else {
      if (toggleOn !== undefined) {
        toggleOn!()
      }
      setPressed(true)
    }
  }

  return (
    <button
      className={
        isPressed
          ? "rounded bg-blue-500 px-4 py-1 text-xs text-white"
          : "rounded bg-white px-4 py-1 text-xs text-blue-500 outline outline-1 outline-blue-500"
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Toggle
