import { Sidebar } from './components/Sidebar'
import { Map } from './components/Map'
import 'leaflet/dist/leaflet.css'

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <Map />
    </div>
  )
}

export default App
