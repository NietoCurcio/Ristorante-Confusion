import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Media, Button } from 'react-bootstrap'
import Loading from './LoadingComponent'

function RenderMenuItem({ dish, deleteFavorite }) {
  return (
    <Media as="li">
      <img className="align-self-start mr-3" src={dish.image} alt={dish.name} />
      <Media.Body>
        <h3>{dish.name}</h3>
        <p>{dish.description}</p>
        <Button outline color="danger" onClick={() => deleteFavorite(dish._id)}>
          <span className="fa fa-times"></span>
        </Button>
      </Media.Body>
    </Media>
  )
}

const Favorites = (props) => {
  if (props.favorites.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  } else if (props.favorites.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.favorites.errMess}</h4>
        </div>
      </div>
    )
  } else if (props.favorites.favorites) {
    const favorites = props.favorites.favorites.dishes.map((dishId) => {
      let dish = props.dishes.dishes.filter((dish) => dish._id === dishId)[0]
      return (
        <div key={dish._id} className="col-12 mt-5">
          <RenderMenuItem dish={dish} deleteFavorite={props.deleteFavorite} />
        </div>
      )
    })

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>My Favorites</Breadcrumb.Item>
          </Breadcrumb>
          <div className="col-12">
            <h3>My Favorites</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <Media list>{favorites}</Media>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container">
        <div className="row">
          <h4>You have no favorites</h4>
        </div>
      </div>
    )
  }
}

export default Favorites
