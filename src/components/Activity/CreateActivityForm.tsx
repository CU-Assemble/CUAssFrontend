import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

function CreateActivityForm() {
  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h1 className="mb-3">New Activity</h1>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formEventName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event name"
                  required
                  autoFocus
                />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="formMaxParticipants">
                <Form.Label>Max Participants</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter max participants"
                  min="2"
                  max="50"
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter location" required />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="formImgFile">
                <Form.Label>Picture</Form.Label>
                <Form.Control type="file" required />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formDateTime">
                <Form.Label>Date & Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="formDuration">
                <Form.Label>Duration (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter duration of the activity"
                  min="5"
                  max="2000"
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formDesc">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Row>

            <Stack direction="horizontal" gap={3}>
              <Button variant="success" type="submit" className="ms-auto">
                Create
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateActivityForm;
