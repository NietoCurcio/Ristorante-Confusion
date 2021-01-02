import React, { useState, useRef } from 'react';
import { Jumbotron, Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const HeaderComponent = () => {
  const [state, setState] = useState({
    toggle: false,
    isModalOpen: false,
  });

  const handleToggle = () => {
    setState({ ...state, toggle: !state.toggle });
  };

  const toggleModal = () => {
    setState({ ...state, isModalOpen: !state.isModalOpen });
  };

  const username = useRef(null);
  const password = useRef(null);
  const checked = useRef(null);

  const handleLogin = (event) => {
    event.preventDefault();
    toggleModal();
    // console.log(username.current);
    // console.log(event.target[0]);
    window.alert(
      'Username: ' +
        username.current.value +
        ' Password: ' +
        password.current.value +
        ' Remember ' +
        checked.current.checked
    );
  };

  return (
    <>
      {/* https://react-bootstrap.github.io/components/navbar/ */}
      <Navbar className="navbar-dark" variant="dark" expand="md">
        <Navbar.Toggle onClick={handleToggle} />
        <Navbar.Brand className="mr-auto" href="/">
          <img
            src="/assets/images/logo.png"
            height="30"
            width="41"
            alt="Ristorante Con Fusion"
          />
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link>
              <NavLink className="nav-link" to="/home">
                <i className="fa fa-home fa-lg"></i> Home
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink className="nav-link" to="/aboutus">
                <i className="fa fa-info fa-lg"></i> About Us
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink className="nav-link" to="/menu">
                <i className="fa fa-list fa-lg"></i> Menu
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink className="nav-link" to="/contactus">
                <i className="fa fa-address-card fa-lg"></i> Contact Us
              </NavLink>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link>
              <Button variant="outline-primary" onClick={toggleModal}>
                <i className="fa fa-sign-in fas"></i> Login
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Jumbotron style={{ borderRadius: '0' }}>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Ristorante Con Fusion</h1>
              <p>
                We take inspiration from the world's best cuisines, and create a
                unique fusion experience. Our lipsmaking creating will tickle
                your culinary senses!
              </p>
            </div>
          </div>
        </div>
      </Jumbotron>
      <Modal show={state.isModalOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                id="username"
                name="username"
                ref={username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                ref={password}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                name="remember"
                label="Remember me"
                ref={checked}
              />
            </Form.Group>
            <Button type="submit" value="submit" className="bg-primary">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default HeaderComponent;
