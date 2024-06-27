// Updated code
interface ButtonProps {
  onClick: () => void // Add the onClick prop
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className="bg-purple-700 text-white font-bold text-sm py-2 px-4 w-fit rounded-lg"
    >
      Iniciar Ruta
    </button>
  )
}
