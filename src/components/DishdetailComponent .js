import React, { Fragment, useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const renderDish = (dish) => {
  return (
    <Card>
      <Card.Img variant='top' src={dish.image} alt={dish.name} />
      <Card.Body>
        <Card.Title>{dish.name}</Card.Title>
        <Card.Text>{dish.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

const renderComments = (arrayComments) => {
  return (
    <div>
      {arrayComments && (
        <Fragment>
          <h4>Comments</h4>
          <ListGroup className='list-unstyled' variant='flush'>
            {arrayComments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                <p>{comment.comment}</p>
                <p>
                  -- {comment.author},{' '}
                  {new Intl.DateTimeFormat('pt-BR', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  }).format(new Date(comment.date))}
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Fragment>
      )}
    </div>
  )
}

const DishdetailComponent = (props) => {
  const { dish } = props

  useEffect(() => {
    console.log('Life Cycle DishDetail useEffect')
  }, [dish])
  // if our component re-render and the argument here "[dish]" is the same, React skip the effect
  // https://reactjs.org/docs/hooks-effect.html
  // according to react documentations:
  // "you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined"

  // console.log(dish)
  return dish ? (
    <div className='container'>
      {console.log('Life Cycle DishDetail render')}
      <div className='row mt-5'>
        <div className='col-sm-12 col-md-5 m-1'>{renderDish(dish)}</div>
        <div className='col-12 col-sm-12 col-md-5'>
          {renderComments(dish.comments)}
        </div>
      </div>
    </div>
  ) : (
    <div>{console.log('Life Cycle DishDetail render')}</div>
  )
}

export default DishdetailComponent
