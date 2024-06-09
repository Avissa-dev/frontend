export const Tag = ({
  Icon,
  Text,
  Color
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  Text?: string
  Color?: string
}) => {
  const color = Color === undefined ? 'bg-amber-500' : Color

  return (
    <div className={`${color} rounded-lg w-fit py-1 px-2 flex`}>
      {Icon && <Icon className="text-white" />}
      {Text === undefined ? null : (
        <p className="text-xs text-white font-bold pl-2">{Text}</p>
      )}
    </div>
  )
}
