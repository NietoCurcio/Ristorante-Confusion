import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import Dishdetail from './DishdetailComponent '

const MenuComponent = (props) => {
  const [selectedDish, setSelectedDishe] = useState(null)

  const onDishSelected = (e, dish) => {
    setSelectedDishe(dish)
  }

  useEffect(() => {
    console.log('Life cycle useEffect')
  }, [])

  const menu = props.dishes
  return (
    <div className='container mb-5'>
      <div className='row'>
        {menu.map((dish, index) => {
          return (
            <div key={dish.id} className='col-12 col-md-6 mt-5'>
              {/* React requires a key, to use that property when a item is added, updated or removed from the list */}
              <Card onClick={(e) => onDishSelected(e, dish)}>
                <Card.Img variant='top' src={dish.image} alt={dish.name} />
                <Card.Body className='ml-5'>
                  <Card.Title>{dish.name}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
      <Dishdetail dish={selectedDish} />
      {console.log('Life cycle render')}
    </div>
  )
}

export default MenuComponent
