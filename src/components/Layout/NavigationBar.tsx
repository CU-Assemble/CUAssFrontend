import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectIsLoggedIn,
  setIsLoggedIn,
  setJwt,
  clearStatus,
} from "../../features/user/userSlice";
import { useTranslation } from 'react-i18next';

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";

import "./NavigationBar.css";

function NavigationBar() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation('translation');

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setIsLoggedIn(false));
    dispatch(setJwt(""));
    dispatch(clearStatus());
  };

  return (
    <Navbar id="navigationBar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          CU Assemble 
        </Navbar.Brand>
        <Nav className="me-auto">
          {isLoggedIn && (
            <Nav.Link as={Link} to="/myactivities">
              {t("My Activities")}
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/dashboard">
            {t("Dashboard")}
          </Nav.Link>
          {isLoggedIn && (
            <Nav.Link as={Link} to="/profile">
              {t("Profile")}
            </Nav.Link>
          )}
          {isLoggedIn && (
            <Nav.Link as={Link} to="/createactivity">
              {t("New Activity")}
            </Nav.Link>
          )}
        </Nav>
        <Nav className="ms-auto">
          {!isLoggedIn && (
            <Nav.Link as={Link} to="/createprofile">
              {t("Register")}
            </Nav.Link>
          )}
          {!isLoggedIn && (
            <Nav.Link as={Link} to="/login">
              {t("Login")}
            </Nav.Link>
          )}
          {isLoggedIn && (
            <Nav.Link as={Link} to="/" onClick={logoutHandler}>
              {t("Logout")}
            </Nav.Link>
          )}
          <NavDropdown title={i18n.language === "en"? "🇬🇧": "🇹🇭"} id="nav-dropdown">
            <NavDropdown.Item eventKey="en" onClick={() => i18n.changeLanguage('en')}>🇬🇧 English</NavDropdown.Item>
            <NavDropdown.Item eventKey="th" onClick={() => i18n.changeLanguage('th')}>🇹🇭 Thai</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
