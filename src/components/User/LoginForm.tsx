import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

function LoginForm() {
  return (
    <Container className="my-5">
      <Row>
        <Col md={{span:6, offset:3}}>
          <h1 className="mb-3">Login</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formStudentIDEmail">
              <Form.Label>Student ID</Form.Label>
              <Form.Control type="text" placeholder="Enter student ID" required autoFocus/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" required/>
            </Form.Group>

            <Stack direction="horizontal" gap={3}>
                <Button variant="outline-info" as="a" href="/sdfsf" className="ms-auto">
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
