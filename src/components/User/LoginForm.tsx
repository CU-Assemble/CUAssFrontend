import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loginAsync, getProfileAsync, selectUser, selectLoginLoading, selectLoginMessage, selectLoginError, setLoginError } from "../../features/user/userSlice";

function LoginForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loginMessage = useAppSelector(selectLoginMessage);
  const errorMessage = useAppSelector(selectLoginError);
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if(loginMessage == 'success'){
      navigate("/");
    }
  }, [loginMessage])

  const formSubmissionHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(loginAsync({ studentId, password }));
  };

  const studentIdChangeHandler = (event: any): void => {
    setStudentId(event.target.value)
  };

  const passwordChangeHandler = (event: any): void => {
    setPassword(event.target.value)
  };

  const LoginError = (
    <Alert variant="danger" onClose={() => dispatch(setLoginError(""))} dismissible>
    <Alert.Heading>You got an error!</Alert.Heading>
    <p>
      {errorMessage}
    </p>
  </Alert>
  )

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {errorMessage && LoginError}
          <h1 className="mb-3">Login</h1>
          <Form onSubmit={formSubmissionHandler}>
            <Form.Group className="mb-3" controlId="formStudentIDEmail">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                value={studentId}
                placeholder="Enter student ID"
                onChange={studentIdChangeHandler}
                required
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={passwordChangeHandler}
                required
              />
            </Form.Group>

            <Stack direction="horizontal" gap={3}>
              <Button
                variant="outline-info"
                as={Link as any}
                to="/createprofile"
                className="ms-auto"
              >
                Register
              </Button>
              <Button variant="success" type="submit" className="">
                Submit
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
