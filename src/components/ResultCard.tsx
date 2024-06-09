import { FaBus } from 'react-icons/fa6'
import { Tag } from './Tag'
import { LiaWalkingSolid } from 'react-icons/lia'
import { FaArrowAltCircleRight } from 'react-icons/fa'

export const ResultCard = () => {
  return (
    <div className="flex items-center w-full p-4 border-t-2 border-gray-400">
      <div className="flex flex-grow gap-4">
        <Tag Text={'M-131'} Icon={FaBus} />
        <Tag Color={'bg-blue-500'} Icon={LiaWalkingSolid} />
        <Tag Text={'M-133'} Icon={FaBus} />
      </div>
      <div className="flex justify-end">
        <FaArrowAltCircleRight className="text-black text-2xl" />
      </div>
    </div>
  )
}
