import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'

const MenuComponent = (props) => {
  useEffect(() => {
    console.log('Life cycle Menu useEffect')
  }, [])

  const menu = props.dishes
  return (
    <div className='container mb-5'>
      <div className='row'>
        {menu.map((dish, index) => {
          return (
            <div key={dish.id} className='col-12 col-md-6 mt-5'>
              {/* React requires a key, to use that property when a item is added, updated or removed from the list */}
              <Card onClick={(e) => props.onClick(e, dish.id)}>
                {/* prof approach - a function that call another arrow function passing arguments that calls onSelectedDishe using those arguments */}
                {/* mine approach - a function that calls onSelectedDishe passing arguments */}
                <Card.Img variant='top' src={dish.image} alt={dish.name} />
                <Card.Body className='ml-5'>
                  <Card.Title>{dish.name}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
      {console.log('Life cycle Menu render')}
    </div>
  )
}

export default MenuComponent
