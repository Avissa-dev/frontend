export const Input = ({
  text,
  Icon
}: {
  text: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}) => {
  return (
    <div className="relative flex items-center">
      {Icon && <Icon className="absolute left-2.5 text-black" />}
      <input
        type="text"
        className="w-full border-2 border-gray-300 rounded-xl pl-8 text-xs pr-2 py-2"
        placeholder={text}
      />
    </div>
  )
}
