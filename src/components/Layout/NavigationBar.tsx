import React from "react";

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import './NavigationBar.css'

function NavigationBar() {
  return (
    <Navbar id="navigationBar" variant="dark">
      <Container>
        <Navbar.Brand href="#home">CU Assemble</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="#">My Activities</Nav.Link>
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="#">Profile</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/createprofile">Register</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="#logout">Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
