import { ReactNode } from "react"

// Updated code
interface ButtonProps {
  onClick: () => void // Add the onClick prop
  text: string | ReactNode // Add the text prop
  color: string  // Add the color prop
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${props.color} text-white font-bold text-sm py-2 px-4 w-fit rounded-lg`}
    >
     {props.text} 
    </button>
  )
}
