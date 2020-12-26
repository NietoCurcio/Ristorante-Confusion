import React, { useState } from 'react'
import { Jumbotron, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const HeaderComponent = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <>
      {/* https://react-bootstrap.github.io/components/navbar/ */}
      <Navbar className='navbar-dark' variant='dark' expand='md'>
        <Navbar.Toggle onClick={handleToggle} />
        <Navbar.Brand className='mr-auto' href='/'>
          <img
            src='/assets/images/logo.png'
            height='30'
            width='41'
            alt='Ristorante Con Fusion'
          />
        </Navbar.Brand>
        <Navbar.Collapse isOpen={toggle}>
          <Nav>
            <Nav.Link>
              <NavLink className='nav-link' to='/home'>
                <i className='fa fa-home fa-lg'></i> Home
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink className='nav-link' to='/aboutus'>
                <i className='fa fa-info fa-lg'></i> About Us
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink className='nav-link' to='/menu'>
                <i className='fa fa-list fa-lg'></i> Menu
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink className='nav-link' to='/contactus'>
                <i className='fa fa-address-card fa-lg'></i> Contact Us
              </NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Jumbotron>
        <div className='container'>
          <div className='row row-header'>
            <div className='col-12 col-sm-6'>
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
    </>
  )
}

export default HeaderComponent
