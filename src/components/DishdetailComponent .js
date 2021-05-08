import React, { Fragment, useEffect, useState } from 'react'
import {
  Card,
  ListGroup,
  Breadcrumb,
  Form,
  Modal,
  Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loading from './LoadingComponent'
import { baseUrl } from '../shared/baseURL'

const RenderDish = ({ dish, favorite, postFavorite }) => {
  return (
    <Card>
      <Card.Img variant="top" src={dish.image} alt={dish.name} />
      <Card.ImgOverlay>
        <Button
          outline
          color="primary"
          onClick={() =>
            favorite ? console.log('Already favorite') : postFavorite(dish._id)
          }
        >
          {favorite ? (
            <span className="fa fa-heart"></span>
          ) : (
            <span className="fa fa-heart-o"></span>
          )}
        </Button>
      </Card.ImgOverlay>
      <Card.Body>
        <Card.Title>{dish.name}</Card.Title>
        <Card.Text>{dish.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

const minLength = (length) => (value) => value && value.length >= length
const maxLength = (length) => (value) => !value || value.length <= length

// note that I chose to use the new react hooks in function components
const CommentForm = (props) => {
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({
    rating: 0,
    comment: '',
  })
  const handleSubmit = (event) => {
    event.preventDefault()
    props.postComment(props.dishId, form.rating, form.comment)
    modalToggle()
  }

  const handleChange = (event) => {
    console.log(event.target)
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    console.log('Effect life cycle method comment form')
  }, [modal])

  const modalToggle = () => {
    setModal(!modal)
  }

  return (
    <Fragment>
      {console.log('Render life cycle method comment form')}
      <Button variant="primary" className="inline my-2" onClick={modalToggle}>
        <i className="fa fa-pencil"></i> Submit Comment
      </Button>
      <Modal show={modal} onHide={modalToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <LocalForm onSubmit={(values) => handleSubmit(values)}> */}
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Label htmlFor="rating">Rating</Form.Label>
            <Form.Control
              as="select"
              name="rating"
              defaultValue="5"
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
            <Form.Label htmlFor="comment">Comment</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Comment here..."
              name="comment"
              onChange={handleChange}
            />

            <Button className="mt-2" type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

const RenderComments = ({ arrayComments, postComment, dishId }) => {
  return (
    <div>
      <Fragment>
        <h4>Comments</h4>
        <ListGroup className="list-unstyled" variant="flush">
          {arrayComments.map((comment) => (
            <ListGroup.Item key={comment._id}>
              <p>{comment.comment}</p>
              <p>
                -- {comment.author.firstname} {comment.author.lastname},{' '}
                {new Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                }).format(
                  new Date(Date.parse(comment.updatedAt.toDate()))
                )}{' '}
              </p>
            </ListGroup.Item>
          ))}

          <CommentForm dishId={dishId} postComment={postComment} />
        </ListGroup>
      </Fragment>
    </div>
  )
}

const DishdetailComponent = (props) => {
  const { dish, comments, postComment } = props

  useEffect(() => {
    console.log('Life Cycle DishDetail useEffect')
  }, [dish])
  // if our component re-render and the argument here "[dish]" is the same, React skip the effect
  // https://reactjs.org/docs/hooks-effect.html
  // according to react documentations:
  // "you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined"

  // console.log(dish)
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    )
  }
  return dish ? (
    <div className="container">
      {console.log('Life Cycle DishDetail render')}
      <div className="row">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/menu">Menu</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{dish.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-12 col-md-5 m-1">
          <RenderDish
            dish={dish}
            favorite={props.favorite}
            postFavorite={props.postFavorite}
          />
        </div>
        <div className="col-12 col-sm-12 col-md-5">
          <RenderComments
            arrayComments={comments}
            postComment={postComment}
            dishId={dish._id}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>{console.log('Life Cycle DishDetail render')}</div>
  )
}

export default DishdetailComponent
