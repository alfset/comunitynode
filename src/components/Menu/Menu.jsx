import React, { useState } from 'react';
import { data } from '../../constants';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FiMenu } from 'react-icons/fi';
import logo from '../../assets/logo.png'; 
import './Menu.css';

const Menu = () => {
  const [expanded, setExpanded] = useState(false);

  // Close menu when clicking a nav link
  const handleNavClick = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      className="navbar-custom"
      expanded={expanded}
      onToggle={setExpanded}
      collapseOnSelect
      sticky="top"
    >
      <Container className="navbar-container">
        <Navbar.Brand href="#home" className="navbar-brand" onClick={handleNavClick}>
          <img src={logo} alt="Community Node Logo" className="navbar-logo" />
          Community Node
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-toggler">
          <FiMenu className="navbar-toggler-icon" />
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav" className="navbar-collapse">
          <Nav className="navbar-nav mx-auto">
            {data.Menu.filter(item => item.text === 'Co Finance').map((item, index) => (
              <Nav.Link
                key={index}
                href={item.link}
                className="nav-link"
                onClick={handleNavClick}
              >
                {item.text}
              </Nav.Link>
            ))}
          </Nav>
          <div className="d-lg-none navbar-nav">
            <Nav.Link as="div" className="nav-link btn-explorer">
              <Button
                variant="outline-primary"
                href="#explorer"
                onClick={handleNavClick}
                className="w-100"
              >
                Explorer
              </Button>
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
