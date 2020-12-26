import { Navbar } from 'react-bootstrap'
import Menu from './MenuComponent'
import Dishdetail from './DishdetailComponent '
import { DISHES } from '../shared/dishes'
import { useState } from 'react'

function Main() {
  const [dishes, setDishes] = useState(DISHES)
  const [selectedDishe, setSelectedDishe] = useState(null)

  const onDishSelected = (event, dishId) => {
    // console.log(event.target)
    // console.log(dishId)
    setSelectedDishe(dishId)
  }

  return (
    <div>
      <Navbar bg='primary' variant='dark'>
        <Navbar.Brand href='#home'>Restorante Con Fusion</Navbar.Brand>
      </Navbar>
      <Menu dishes={dishes} onClick={onDishSelected} />
      <Dishdetail dish={dishes.find((dish) => dish.id === selectedDishe)} />
    </div>
  )
}

export default Main
