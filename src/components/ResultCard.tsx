import { FaBus } from 'react-icons/fa6'
import { Tag } from './Tag'
import { LiaWalkingSolid } from 'react-icons/lia'
import { FaArrowAltCircleRight } from 'react-icons/fa'

export const ResultCard = () => {
  return (
    <div className="flex flex-wrap items-center w-full p-4 border-t-2 border-gray-400">
      <div className="flex flex-wrap gap-4 w-4/5">
        <Tag Text={'M-121'} Icon={FaBus} />
        <Tag Color={'bg-blue-500'} Icon={LiaWalkingSolid} />
        <Tag Text={'M-121'} Icon={FaBus} />
        <Tag Text={'M-133'} Icon={FaBus} />
        <Tag Color={'bg-blue-500'} Icon={LiaWalkingSolid} />
        <Tag Color={'bg-blue-500'} Icon={LiaWalkingSolid} />
      </div>
      <div className="flex items-center justify-center ml-auto w-1/5">
        <FaArrowAltCircleRight className="text-black text-2xl" />
      </div>
    </div>
  )
}
