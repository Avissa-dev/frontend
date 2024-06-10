import { FaLocationDot, FaRegCircleDot } from 'react-icons/fa6'
import { Button } from './Button'
import { Input } from './Input'
import { ResultCard } from './ResultCard'

export const Sidebar = () => {
  return (
    <div className="w-1/4 h-screen p-4 flex flex-col">
      <h1 className="font-montserrat font-black text-2xl text-center mt-4">
        Ubícate con Avissa
      </h1>
      <h3 className="font-montserrat font-bold text-sm mt-5 mb-1 tracking-widest">
        ORIGEN
      </h3>
      <Input text={'Desde'} Icon={FaRegCircleDot} />
      <h3 className=" font-montserrat font-bold text-sm mt-5 mb-1 tracking-widest">
        DESTINO
      </h3>
      <Input text={'Hasta'} Icon={FaLocationDot} />
      <div className="self-center mt-6">
        <Button />
      </div>
      <h3 className=" font-montserrat font-bold text-sm mt-5 mb-1 tracking-widest">
        RESULTADOS
      </h3>
      <div className="mt-6">
        <ResultCard />
        <ResultCard />
        <ResultCard />
      </div>
    </div>
  )
}
