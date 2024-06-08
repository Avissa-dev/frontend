import { Input } from './components/Input'
import { FaRegCircleDot, FaLocationDot } from 'react-icons/fa6'

function App() {
  return (
    <div>
      <Input text={'Desde'} Icon={FaRegCircleDot} />
      <Input text={'Hasta'} Icon={FaLocationDot} />
    </div>
  )
}

export default App
