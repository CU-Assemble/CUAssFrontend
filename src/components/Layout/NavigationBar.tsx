import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectIsLoggedIn, setIsLoggedIn, setJwt, clearStatus } from "../../features/user/userSlice";

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import './NavigationBar.css'

function NavigationBar() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    dispatch(setIsLoggedIn(false));
    dispatch(setJwt(''));
    dispatch(clearStatus());
  }

  return (
    <Navbar id="navigationBar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">CU Assemble</Navbar.Brand>
        <Nav className="me-auto">
          {isLoggedIn && <Nav.Link as={Link} to="#">My Activities</Nav.Link>}
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          {isLoggedIn && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
          {isLoggedIn && <Nav.Link as={Link} to="/createactivity">New Activity</Nav.Link>}
        </Nav>
        <Nav className="ms-auto">
          {!isLoggedIn && <Nav.Link as={Link} to="/createprofile">Register</Nav.Link>}
          {!isLoggedIn && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
          {isLoggedIn && <Nav.Link as={Link} to="/" onClick={logoutHandler}>Logout</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
