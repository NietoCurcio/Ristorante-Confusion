import React, { useEffect } from 'react'
import { Card, Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MenuComponent = (props) => {
  useEffect(() => {
    console.log('Life cycle Menu useEffect')
  }, [])

  const RenderMenuItem = ({ dish }) => {
    return (
      <Card>
        {/* prof 'onClick' as props approach - a function that call another arrow function passing arguments that calls onSelectedDishe using those arguments */}
        {/* mine approach - a function that calls onSelectedDishe passing arguments */}
        <Link to={`/menu/${dish.id}`}>
          <Card.Img variant="top" src={dish.image} alt={dish.name} />
          <Card.Body className="ml-5">
            <Card.Title>{dish.name}</Card.Title>
          </Card.Body>
        </Link>
      </Card>
    )
  }
  console.log(props)
  return (
    <div className="container mb-5">
      <div className="row">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Menu</Breadcrumb.Item>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        {props.dishes.map((dish, index) => {
          return (
            <div key={dish.id} className="col-12 col-md-6 mt-5">
              {/* React requires a key, to use that property when a item is added, updated or removed from the list */}
              <RenderMenuItem dish={dish} />
            </div>
          )
        })}
      </div>
      {console.log('Life cycle Menu render')}
    </div>
  )
}

export default MenuComponent
