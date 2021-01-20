import React from 'react'
import { Card } from 'react-bootstrap'
import Loading from './LoadingComponent'
import { baseUrl } from '../shared/baseURL'
import { FadeTransform } from 'react-animation-components'

// <Card.Title>, <Card.Subtitle>, and <Card.Text> inside the <Card.Body
const RenderCard = ({ item, isLoading, errMessage }) => {
  if (isLoading) {
    return <Loading />
  } else if (errMessage) {
    return <h4>{errMessage}</h4>
  } else {
    return (
      <FadeTransform
        in
        transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}
      >
        <Card>
          <Card.Img variant="top" src={baseUrl + item.image} alt={item.name} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            {item.designation ? (
              <Card.Subtitle>{item.designation}</Card.Subtitle>
            ) : null}
            <Card.Text>{item.description}</Card.Text>
          </Card.Body>
        </Card>
      </FadeTransform>
    )
  }
}

const HomeComponent = ({
  dish,
  leader,
  promotion,
  dishesLoading,
  dishesErrMess,
  promosLoading,
  promosErrMess,
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
          <RenderCard
            item={promotion}
            isLoading={promosLoading}
            errMessage={promosErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={leader} />
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
