import React from 'react'
import { Card } from 'react-bootstrap'
import Loading from './LoadingComponent'

// <Card.Title>, <Card.Subtitle>, and <Card.Text> inside the <Card.Body
const RenderCard = ({ item, isLoading, errMessage }) => {
  if (isLoading) {
    return <Loading />
  } else if (errMessage) {
    return <h4>{erroMessage}</h4>
  } else {
    return (
      <Card>
        <Card.Img variant="top" src={item.image} alt={item.name} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          {item.designation ? (
            <Card.Subtitle>{item.designation}</Card.Subtitle>
          ) : null}
          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

const HomeComponent = ({
  dish,
  leader,
  promotion,
  dishesLoading,
  dishesErrMess,
}) => {
  return (
    <div className="container">
      <div className="row align items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={dish}
            isLoading={dishesLoading}
            errMessage={dishesErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={promotion} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={leader} />
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
