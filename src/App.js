import { Navbar } from 'react-bootstrap'
import MenuComponent from './components/MenuComponent'
import 'App.css'

function App() {
  return (
    <div className='App'>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>Restorante Con Fusion</Navbar.Brand>
      </Navbar>
      <MenuComponent />
    </div>
  )
}

export default App
