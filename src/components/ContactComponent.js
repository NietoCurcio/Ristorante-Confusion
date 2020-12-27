import React, { useState, useEffect } from 'react'
import { Breadcrumb, Form, Button, Col, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ContactComponent = () => {
  // I'm using React useState Hook
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    telNum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: '',
    touched: {
      firstName: false,
      lastName: false,
      telNum: false,
      email: false,
    },
  })
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    telNum: '',
    email: '',
  })

  const handleChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    setState({ ...state, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(JSON.stringify(state))
  }

  const handleBur = (field) => (evt) => {
    setState({
      ...state,
      touched: { ...state.touched, [field]: true },
    })
  }

  const validate = (firstName, lastName, telNum, email) => {
    const errors = {
      firstName: '',
      lastName: '',
      telNum: '',
      email: '',
    }

    if (state.touched.firstName && firstName.length < 3) {
      errors.firstName =
        'First Name should be greater than or equal 3 characters'
    } else if (state.touched.firstName && firstName.length > 15) {
      errors.firstName = 'First Name should be less than or equal 15 characters'
    }

    if (state.touched.lastName && lastName.length < 3) {
      errors.lastName = 'Last Name should be greater than or equal 3 characters'
    } else if (state.touched.lastName && lastName.length > 15) {
      errors.lastName = 'Last Name should be less than or equal 15 characters'
    }

    const reg = /^\d+$/
    if (state.touched.telNum && !reg.test(telNum)) {
      errors.telNum = 'Tel. Number should be contain only numbers'
    }

    if (
      state.touched.email &&
      (email.indexOf('.') <= 0 || email.indexOf('@') <= 0)
    ) {
      errors.email = 'Invalid Email'
    }

    setErrors(errors)
  }

  // We want that validade runs at every time the component update
  // notice that mount or updated is always called in the render method as well as useEffect
  // So according react documents, we can think useEffect runs after render (combining, didMount and didUpdated)
  // So we can do this here
  // the second argument is when we would like to run, or what state we are concerned about being updated
  useEffect(() => {
    validate(state.firstName, state.lastName, state.telNum, state.email)
  }, [state])

  return (
    <div className='container'>
      <div className='row'>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/home'>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Contact Us</Breadcrumb.Item>
        </Breadcrumb>
        <div className='col-12'>
          <h3>Contact Us</h3>
          <hr />
        </div>
      </div>
      <div className='row row-content'>
        <div className='col-12'>
          <h3>Location Information</h3>
        </div>
        <div className='col-12 col-sm-4 offset-sm-1'>
          <h5>Our Address</h5>
          <address>
            121, Clear Water Bay Road
            <br />
            Clear Water Bay, Kowloon
            <br />
            HONG KONG
            <br />
            <i className='fa fa-phone'></i>: +852 1234 5678
            <br />
            <i className='fa fa-fax'></i>: +852 8765 4321
            <br />
            <i className='fa fa-envelope'></i>:{' '}
            <a href='mailto:confusion@food.net'>confusion@food.net</a>
          </address>
        </div>
        <div className='col-12 col-sm-6 offset-sm-1'>
          <h5>Map of our Location</h5>
        </div>
        <div className='col-12 col-sm-11 offset-sm-1'>
          <div className='btn-group' role='group'>
            <a
              role='button'
              className='btn btn-primary'
              href='tel:+85212345678'
            >
              <i className='fa fa-phone'></i> Call
            </a>
            <a
              role='button'
              href='https://www.skype.com/en/'
              className='btn btn-info'
            >
              <i className='fa fa-skype'></i> Skype
            </a>
            <a
              role='button'
              className='btn btn-success'
              href='mailto:confusion@food.net'
            >
              <i className='fa fa-envelope-o'></i> Email
            </a>
          </div>
        </div>
      </div>
      <div className='row row-content'>
        <div className='col-12'>
          <h3>Send Us Your Feedback</h3>
        </div>
        <div className='col-12 col-md-9'>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Group>
              <Form.Row className='mb-4'>
                <Form.Label column lg={2} htmlFor='firstName'>
                  First Name
                </Form.Label>
                <Col>
                  <Form.Control
                    type='text'
                    value={state.firstName}
                    id='firstName'
                    name='firstName'
                    isValid={errors.firstName === '' && state.touched.firstName}
                    isInvalid={errors.firstName !== ''}
                    placeholder='First Name'
                    onChange={(e) => handleChange(e)}
                    onBlur={handleBur('firstName')}
                  />
                  <Alert
                    show={errors.firstName}
                    transition
                    className='mt-2'
                    variant='danger'
                  >
                    {errors.firstName}
                  </Alert>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Row className='mb-4'>
                <Form.Label column lg={2} htmlFor='lastName'>
                  Last Name
                </Form.Label>
                <Col>
                  <Form.Control
                    type='text'
                    value={state.lastName}
                    id='lastName'
                    name='lastName'
                    isValid={errors.lastName === '' && state.touched.lastName}
                    isInvalid={errors.lastName !== ''}
                    placeholder='Last Name'
                    onChange={(e) => handleChange(e)}
                    onBlur={handleBur('lastName')}
                  />
                  <Alert
                    show={errors.lastName}
                    transition
                    className='mt-2'
                    variant='danger'
                  >
                    {errors.lastName}
                  </Alert>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Row className='mb-4'>
                <Form.Label column lg={2} htmlFor='telNum'>
                  Contact Tel.
                </Form.Label>
                <Col>
                  <Form.Control
                    type='tel'
                    value={state.telNum}
                    id='telNum'
                    name='telNum'
                    isValid={errors.telNum === '' && state.touched.telNum}
                    isInvalid={errors.telNum !== ''}
                    placeholder='Telephone Number'
                    onChange={(e) => handleChange(e)}
                    onBlur={handleBur('telNum')}
                  />
                  <Alert
                    show={errors.telNum}
                    transition
                    className='mt-2'
                    variant='danger'
                  >
                    {errors.telNum}
                  </Alert>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Row className='mb-4'>
                <Form.Label column lg={2} htmlFor='email'>
                  Email
                </Form.Label>
                <Col>
                  <Form.Control
                    type='email'
                    value={state.email}
                    id='email'
                    name='email'
                    isValid={errors.email === '' && state.touched.email}
                    isInvalid={errors.email !== ''}
                    placeholder='Email Address'
                    onChange={(e) => handleChange(e)}
                    onBlur={handleBur('email')}
                  />
                  <Alert
                    show={errors.email}
                    transition
                    className='mt-2'
                    variant='danger'
                  >
                    {errors.email}
                  </Alert>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Row className='mb-4'>
              <Col md={{ size: 6, offset: 2 }}>
                <Form.Group className='mt-4' controlId='mayContact'>
                  <Form.Check
                    type='checkbox'
                    name='agree'
                    label='May we contact you?'
                    checked={state.agree}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <Form.Group controlId='selectContact'>
                  <Form.Control
                    as='select'
                    name='contactType'
                    value={state.contactType}
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Tel.</option>
                    <option>Email</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Group>
              <Form.Row className='mb-4'>
                <Form.Label column lg={2} htmlFor='message'>
                  Your Feedback
                </Form.Label>
                <Col>
                  <Form.Control
                    as='textarea'
                    value={state.message}
                    id='message'
                    name='message'
                    rows={12}
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Row>
                <Col lg={2}></Col>
                <Col>
                  <Button type='submit' variant='primary'>
                    Send Feedback
                  </Button>
                </Col>
              </Form.Row>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ContactComponent
