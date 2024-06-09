import { FaBus, FaLocationDot, FaRegCircleDot } from 'react-icons/fa6'
import { Button } from './Button'
import { Input } from './Input'
import { Tag } from './Tag'
import { LiaWalkingSolid } from 'react-icons/lia'

export const Sidebar = () => {
  return (
    <div className="bg-slate-200 w-1/6 h-screen p-4 flex flex-col">
      <h1 className="font-montserrat font-black text-xl text-center mt-4">
        Ubícate con Avissa
      </h1>
      <h3 className="font-montserrat font-bold text-xs mt-5 mb-1 tracking-widest">
        ORIGEN
      </h3>
      <Input text={'Desde'} Icon={FaRegCircleDot} />
      <h3 className=" font-montserrat font-bold text-xs mt-5 mb-1 tracking-widest">
        DESTINO
      </h3>
      <Input text={'Hasta'} Icon={FaLocationDot} />
      <div className="self-center mt-6">
        <Button />
      </div>
      <Tag Icon={FaBus} Text={'M-131'} />
      <Tag Color={'bg-blue-500'} Icon={LiaWalkingSolid} />
    </div>
  )
}
