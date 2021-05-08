import React from 'react'
import {
  Breadcrumb,
  Button,
  Col,
  Row,
  Form as FormBoostrap,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { Control, Form, Errors } from 'react-redux-form'

const required = (value) => value && value.length
const maxLength = (length) => (value) => !value || value.length <= length
// !value || because maxLength can be empty
const minLength = (length) => (value) => value && value.length >= length
const isNumber = (value) => !isNaN(Number(value))
const validEmail = (value) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)

const ContactComponent = (props) => {
  const handleSubmit = (values) => {
    props.postFeedback(values).then((result) => alert(result))
    props.resetFeedbackForm()
  }

  // const validate = useCallback(
  //   (firstName, lastName, telNum, email) => {
  //     const errors = {
  //       firstName: '',
  //       lastName: '',
  //       telNum: '',
  //       email: '',
  //     }

  //     if (state.touched.firstName && firstName.length < 3) {
  //       errors.firstName =
  //         'First Name should be greater than or equal 3 characters'
  //     } else if (state.touched.firstName && firstName.length > 15) {
  //       errors.firstName =
  //         'First Name should be less than or equal 15 characters'
  //     }

  //     if (state.touched.lastName && lastName.length < 3) {
  //       errors.lastName =
  //         'Last Name should be greater than or equal 3 characters'
  //     } else if (state.touched.lastName && lastName.length > 15) {
  //       errors.lastName = 'Last Name should be less than or equal 15 characters'
  //     }

  //     const reg = /^\d+$/
  //     if (state.touched.telNum && !reg.test(telNum)) {
  //       errors.telNum = 'Tel. Number should be contain only numbers'
  //     }

  //     if (
  //       state.touched.email &&
  //       (email.indexOf('.') <= 0 || email.indexOf('@') <= 0)
  //     ) {
  //       errors.email = 'Invalid Email'
  //     }

  //     setErrors(errors)
  //   },
  //   [state]
  // )

  // We want that validade runs at every time the component update
  // notice that mount or updated is always called in the render method as well as useEffect
  // So according react documents, we can think useEffect runs after render (combining, didMount and didUpdated)
  // So we can do this here
  // the second argument is when we would like to run, or what state we are concerned about being updated
  // useEffect(() => {
  // console.log('Component rendered, run after render (yes mount and update)')
  // validate(state.firstName, state.lastName, state.telNum, state.email)

  // Notice that when we render our component, the reference of validade will be different
  // So because validade is a dependency (external call) in our effect, we have 3 approachs:
  // 1 - put validade in the callback, so we get useEffect(validade(...)), so isn't a dependency
  // 2 - declare validade within the effect, so isn't a dependecy
  // 3 - wrap the validate function in useCallback hook, is a dependecy, but only creates a new reference if the dependecies of the validade function changed
  // otherwise, same input, same output, nothings has changed

  // If don't we got the error:
  // "The 'validate' function makes the dependencies of useEffect Hook (at line 96) change on every render. Move it inside the useEffect callback. Alternatively, wrap the definition of 'validate' in its own useCallback() Hook  react-hooks/exhaustive-deps"
  // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook

  // Here is the dependencies of our effect
  // So notice that if the function was declared inside here, it's not a dependency
  // Or if we do not want to track changes on the state, and only run at MOUNTING the component (not updating), put an empty array []
  // because the values (dependencies) will be always the same, (there's no state or props to track)

  // Notice the flow when the component is updated typing something in the form
  // state update -> render Component (return or render method) -> useEffect (after render) ->
  // dependency of validade (state, in useCallback changed), so validate changed its reference (dependency of useEffect),
  // dependency state has changed as well, so we run the effect -> validate update errors state -> render Component -> useEffect doesnt' run
  // because validate hasn't changed its dependency (state) so do not change its reference, and the state doesn't have changed as well
  // summary: stateUpdate -> render -> useEffect (dependencies updates)  -> stateUpdate -> render (finish, useEffect's dependecies hasn't changed)
  // }, [validate, state])

  return (
    <div className="container">
      {/* {console.log('Render Method')} */}
      <div className="row">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Contact Us</Breadcrumb.Item>
        </Breadcrumb>
        <div className="col-12">
          <h3>Contact Us</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Location Information</h3>
        </div>
        <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Our Address</h5>
          <address>
            121, Clear Water Bay Road
            <br />
            Clear Water Bay, Kowloon
            <br />
            HONG KONG
            <br />
            <i className="fa fa-phone"></i>: +852 1234 5678
            <br />
            <i className="fa fa-fax"></i>: +852 8765 4321
            <br />
            <i className="fa fa-envelope"></i>:{' '}
            <a href="mailto:confusion@food.net">confusion@food.net</a>
          </address>
        </div>
        <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Map of our Location</h5>
        </div>
        <div className="col-12 col-sm-11 offset-sm-1">
          <div className="btn-group" role="group">
            <a
              role="button"
              className="btn btn-primary"
              href="tel:+85212345678"
            >
              <i className="fa fa-phone"></i> Call
            </a>
            <a
              role="button"
              href="https://www.skype.com/en/"
              className="btn btn-info"
            >
              <i className="fa fa-skype"></i> Skype
            </a>
            <a
              role="button"
              className="btn btn-success"
              href="mailto:confusion@food.net"
            >
              <i className="fa fa-envelope-o"></i> Email
            </a>
          </div>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Send Us Your Feedback</h3>
        </div>
        <div className="col-12 col-md-9">
          {/* <Form model="feedback" onSubmit={(values) => handleSubmit(values)}> */}
          <Row className="mb-4 form-group">
            <FormBoostrap.Label column lg={2} htmlFor="firstName">
              First Name
            </FormBoostrap.Label>
            <Col>
              {/* eslint-disable-next-line */}
              {/* <Control.text
                  model=".firstName"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                  // value={state.firstName}
                  // isValid={errors.firstName === '' && state.touched.firstName}
                  // isInvalid={errors.firstName !== ''}
                  // onChange={(e) => handleChange(e)}
                  // onBlur={handleBur('firstName')}
                /> */}
              {/* <Errors
                className="text-danger"
                model=".firstName"
                show="touched"
                messages={{
                  required: 'Required\n',
                  minLength: 'Must be greater than 2 characters\n',
                  maxLength: 'Must be 15 characters or less',
                }}
              /> */}
              {/* <Alert
                    show={errors.firstName}
                    transition
                    className="mt-2"
                    variant="danger"
                  >
                    {errors.firstName}
                  </Alert> */}
            </Col>
          </Row>

          <Row className="mb-4 form-group">
            <FormBoostrap.Label column lg={2} htmlFor="lastName">
              Last Name
            </FormBoostrap.Label>
            <Col>
              {/* eslint-disable-next-line */}
              {/* <Control.text
                  model=".lastName"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                /> */}
              {/* <Errors
                className="text-danger"
                model=".lastName"
                show="touched"
                messages={{
                  required: 'Required\n',
                  minLength: 'Must be greater than 2 characters\n',
                  maxLength: 'Must be 15 characters or less',
                }}
              /> */}
            </Col>
          </Row>

          <Row className="mb-4 form-group">
            <FormBoostrap.Label column lg={2} htmlFor="telNum">
              Contact Tel.
            </FormBoostrap.Label>
            <Col>
              {/* eslint-disable-next-line */}
              {/* <Control.text
                  model=".telNum"
                  className="form-control"
                  id="telNum"
                  name="telNum"
                  placeholder="Telephone Number"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                    isNumber,
                  }}
                /> */}
            </Col>
            {/* <Errors
              className="text-danger"
              model=".telNum"
              show="touched"
              messages={{
                required: 'Required\n',
                minLength: 'Must be greater than 2 numbers\n',
                maxLength: 'Must be 15 numbers or less\n',
                isNumber: 'Must be a number',
              }}
            /> */}
          </Row>

          <Row className="mb-4 form-group">
            <FormBoostrap.Label column lg={2} htmlFor="email">
              Email
            </FormBoostrap.Label>
            <Col>
              {/* eslint-disable-next-line */}
              {/* <Control.text
                  model=".email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  className="form-control"
                  validators={{
                    required,
                    validEmail,
                  }}
                /> */}
              {/* <Errors
                  className="text-danger"
                  model=".email"
                  show="touched"
                  messages={{
                    required: 'Required\n',
                    validEmail: 'Invalid Email Address',
                  }}
                /> */}
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={{ size: 6, offset: 2 }} className="mt-3">
              <div className="form-check">
                {/* eslint-disable-next-line */}
                {/* <Control.checkbox
                    model=".agree"
                    className="form-check-input"
                    name="agree"
                    id="agree"
                    label="May we contact you?"
                  /> */}
                <FormBoostrap.Label htmlFor="agree">
                  <strong>May we contact you?</strong>
                </FormBoostrap.Label>
              </div>
            </Col>
            <Col md={{ size: 3, offset: 1 }} className="mt-2">
              {/* eslint-disable-next-line */}
              {/* <Control.select
                  model=".contactType"
                  className="form-control"
                  name="contactType"
                >
                  <option>Tel.</option>
                  <option>Email</option>
                </Control.select> */}
            </Col>
          </Row>

          <Row className="mb-4 form-group">
            <FormBoostrap.Label column lg={2} htmlFor="message">
              Your Feedback
            </FormBoostrap.Label>
            <Col>
              {/* eslint-disable-next-line */}
              {/* <Control.textarea
                  model=".message"
                  className="form-control"
                  id="message"
                  name="message"
                  rows={12}
                /> */}
            </Col>
          </Row>

          <Row className="form-group">
            <Col lg={2}></Col>
            <Col>
              <Button type="submit" variant="primary">
                Send Feedback
              </Button>
            </Col>
          </Row>
          {/* </Form> */}
        </div>
      </div>
    </div>
  )
}

export default ContactComponent
