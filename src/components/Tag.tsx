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
    <div className={`${color} rounded-lg py-1 px-2 flex flex-wrap w-fit items-center justify-center`}>
      {Icon && <Icon className="text-white text-2xl " />}
      {Text === undefined ? null : (
        <p className="text-sm text-white font-bold p-2">{Text}</p>
      )}
    </div>
  )
}
