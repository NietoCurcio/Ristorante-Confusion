import { Navbar } from 'react-bootstrap'
import MenuComponent from './components/MenuComponent'
// import 'App.css'
// Note that to use the className, we have to import the file
import { DISHES } from './shared/dishes'
import { useState } from 'react'

function App() {
  const [dishes, setDishes] = useState(DISHES)

  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>Restorante Con Fusion</Navbar.Brand>
      </Navbar>
      <MenuComponent dishes={dishes} />
    </div>
  )
}

export default App
