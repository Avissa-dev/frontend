import { Input } from './components/Input'
import { FaRegCircleDot, FaLocationDot } from 'react-icons/fa6'

function App() {
  return (
    <div>
      <h3 className=" font-montserrat font-bold text-lg tracking-widest">
        ORIGEN
      </h3>
      <Input text={'Desde'} Icon={FaRegCircleDot} />
      <h3 className=" font-montserrat font-bold text-lg tracking-widest">
        DESTINO
      </h3>
      <Input text={'Hasta'} Icon={FaLocationDot} />
    </div>
  )
}

export default App
