import React from "react";

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
          <Nav.Link href="#home">Dashboard</Nav.Link>
          <Nav.Link href="#features">My Activities</Nav.Link>
          <Nav.Link href="#pricing">Profile</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link href="#home">Register</Nav.Link>
          <Nav.Link href="#features">Login</Nav.Link>
          <Nav.Link href="#pricing">Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
