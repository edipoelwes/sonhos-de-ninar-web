import React, { useState } from 'react'
import classnames from 'classnames'
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from 'reactstrap'
import { FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../../hooks/AuthContext'
interface AdminNavbarProps {
  sidebarOpen?: boolean
  handleMiniClick(): void
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ handleMiniClick, sidebarOpen }) => {
  const [collapseOpen, setCollapseOpen] = useState(false)
  const [color, setColor] = useState('bg-white')

  const { signOut } = useAuth()

  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open')
  }

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
    <>
      <Navbar
        className={classnames('navbar-absolute fixed-top', color)}
        expand="lg"
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-minimize">
              <Button
                className="btn-icon btn-round"
                color="default"
                id="minimizeSidebar"
                onClick={handleMiniClick}
              >
                <i className="nc-icon nc-minimal-right text-center visible-on-sidebar-mini" />
                <i className="nc-icon nc-minimal-left text-center visible-on-sidebar-regular" />
              </Button>
            </div>
            <div
              className={classnames('navbar-toggle', {
                toggled: sidebarOpen
              })}
            >
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleSidebar}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
          </div>
          <button
            aria-controls="navigation-index"
            aria-expanded={collapseOpen}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            // data-target="#navigation"
            data-toggle="collapse"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse
            className="justify-content-end"
            navbar
            isOpen={collapseOpen}
          >
            <Nav navbar>
              <UncontrolledDropdown className="btn-rotate" nav>
                <DropdownToggle
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  id="navbarDropdownMenuLink"
                  nav
                >
                  <i className="nc-icon nc-bell-55" />
                  <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu
                  persist
                  aria-labelledby="navbarDropdownMenuLink"
                  right
                >
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                      Action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                      Another action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                      Something else here
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink
                  className="btn-rotate"
                  onClick={() => signOut()}
                >
                  <FiLogOut />
                  <p>
                    <span className="d-lg-none d-md-block">logout</span>
                  </p>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default AdminNavbar
