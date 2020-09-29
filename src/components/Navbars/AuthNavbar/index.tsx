import React, { useState } from 'react'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'

import {
  Collapse,
  Navbar,
  NavItem,
  Nav,
  Container
} from 'reactstrap'

const AuthNavbar = () => {
  const [collapseOpen, setCollapseOpen] = useState(false)
  const [color, setColor] = useState('navbar-transparent')

  // this function opens and closes the collapse on small devices
  // it also adds navbar-transparent class to the navbar when closed
  // ad bg-white when opened
  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen)

    if (!collapseOpen) {
      setColor('bg-white')
    } else {
      setColor('navbar-transparent')
    }
  }

  return (
    <Navbar
      className={classnames('navbar-absolute fixed-top', color)}
      expand="lg"
    >
      <Container>
        <button
          aria-controls="navigation-index"
          aria-expanded={false}
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-toggle="collapse"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </button>
        <Collapse
          isOpen={collapseOpen}
          className="justify-content-end"
          navbar
        >
          <Nav navbar>
            <NavItem>
              <NavLink to="/auth/register" className="nav-link">
                <i className="nc-icon nc-book-bookmark" />
                  Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/auth/login" className="nav-link">
                <i className="nc-icon nc-tap-01" />
                  Login
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

export default AuthNavbar
