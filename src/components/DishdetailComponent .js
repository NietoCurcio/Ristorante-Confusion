import React, { Fragment, useEffect, useState } from 'react'
import {
  Card,
  ListGroup,
  Breadcrumb,
  Form,
  Modal,
  Button,
} from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Link } from 'react-router-dom'
import Loading from './LoadingComponent'
import { baseUrl } from '../shared/baseURL'

const RenderDish = ({ dish }) => {
  return (
    <Card>
      <Card.Img variant="top" src={baseUrl + dish.image} alt={dish.name} />
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

  const handleSubmit = (values) => {
    props.postComment(
      props.dishId,
      values.rating,
      values.author,
      values.comment
    )
    modalToggle()
  }

  const modalToggle = () => {
    setModal(!modal)
  }

  return (
    <Fragment>
      <Button variant="primary" className="inline my-2" onClick={modalToggle}>
        <i className="fa fa-pencil"></i> Submit Comment
      </Button>
      <Modal show={modal} onHide={modalToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LocalForm onSubmit={(values) => handleSubmit(values)}>
            <Form.Label htmlFor="rating">Rating</Form.Label>
            {/* eslint-disable-next-line */}
            <Control.select
              model=".rating"
              className="form-control"
              name="rating"
              id="rating"
              defaultValue="5"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Control.select>
            <Form.Label htmlFor="author">Your Name</Form.Label>
            {/* eslint-disable-next-line */}
            <Control.text
              model=".author"
              className="form-control"
              id="author"
              name="author"
              placeholder="Your Name"
              validators={{
                minLength: minLength(3),
                maxLength: maxLength(15),
              }}
            />
            <Errors
              className="text-danger"
              model=".author"
              show="touched"
              messages={{
                minLength: 'Must be greater than 2 characters\n',
                maxLength: 'Must be 15 characters or less',
              }}
            />
            <Form.Label htmlFor="comment">Comment</Form.Label>
            {/* eslint-disable-next-line */}
            <Control.textarea
              model=".comment"
              className="form-control"
              id="comment"
              name="comment"
              rows={6}
            />
            <Button className="mt-2" type="submit" variant="primary">
              Submit
            </Button>
          </LocalForm>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

const RenderComments = ({ arrayComments, postComment, dishId }) => {
  return (
    <div>
      {arrayComments && (
        <Fragment>
          <h4>Comments</h4>
          <ListGroup className="list-unstyled" variant="flush">
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
            <CommentForm dishId={dishId} postComment={postComment} />
          </ListGroup>
        </Fragment>
      )}
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
          <RenderDish dish={dish} />
        </div>
        <div className="col-12 col-sm-12 col-md-5">
          <RenderComments
            arrayComments={comments}
            postComment={postComment}
            dishId={dish.id}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>{console.log('Life Cycle DishDetail render')}</div>
  )
}

export default DishdetailComponent
