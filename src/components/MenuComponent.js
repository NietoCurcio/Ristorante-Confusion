import React, { useState } from 'react'
import { Card } from 'react-bootstrap'

const MenuComponent = (props) => {
  const [selectedDish, setSelectedDishe] = useState({})

  const onDishSelected = (e, dish) => {
    setSelectedDishe(dish)
  }

  const renderDish = (dish) => {
    if (dish) {
      return (
        <Card>
          <Card.Img variant='top' src={dish.image} alt={dish.name} />
          <Card.Body>
            <Card.Title>{dish.name}</Card.Title>
            <Card.Text>{dish.description}</Card.Text>
          </Card.Body>
        </Card>
      )
    } else {
      return <div></div>
    }
  }

  const menu = props.dishes
  return (
    <div className='container'>
      <div className='row'>
        {menu.map((dish, index) => {
          return (
            <div key={dish.id} className='col-4'>
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
      <div className='row'>{renderDish(selectedDish)}</div>
    </div>
  )
}

export default MenuComponent
