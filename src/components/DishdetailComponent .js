import React, { Fragment } from 'react'
import { Card } from 'react-bootstrap'

// Return a <div> from the render() function. This <div> should use the Bootstrap row class to position
//  the content within the <div>. This div will display both the details of the dish in a Card and the list
//  of comments side-by-side for medium to extra large screens, but will stack them for xs and sm screens.

// The card should be enclosed inside a <div> appropriate Bootstrap column classes so that it occupies the
// entire 12 columns for the xs and sm screen sizes, and 5 columns for md screens and above. Also apply a
// class of m-1 to this div.

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
          <ul class='list-unstyled'>
            {arrayComments.map((comment) => (
              <li>
                <p>{comment.comment}</p>
                <p>
                  -- {comment.author}, {comment.date}
                </p>
              </li>
            ))}
          </ul>
        </Fragment>
      )}
    </div>
  )
}

const DishdetailComponent = (props) => {
  const { dish } = props
  console.log(dish)
  return dish ? (
    <div className='row mt-5'>
      <div className='col-sm-12 col-md-5 m-1'>{renderDish(dish)}</div>
      <div className='col-12 col-sm-12 col-md-5'>
        {renderComments(dish.comments)}
      </div>
    </div>
  ) : (
    <div></div>
  )
}

export default DishdetailComponent
