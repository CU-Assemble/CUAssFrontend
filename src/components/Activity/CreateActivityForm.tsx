import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

import { NewActivity } from "../../models/activityTypes";

function CreateActivityForm() {
  const [formData, setFormData] = useState<NewActivity>({});

  const nameChangeHandler = (event: any) => {
    setFormData((prevState: NewActivity) => {
      return { ...prevState, name: event.target.value };
    });
  };
  const maxParticipantChangeHandler = (event: any) => {
    setFormData((prevState: NewActivity) => {
      return { ...prevState, maxParticipant: event.target.value };
    });
  };
  const locationChangeHandler = (event: any) => {
    setFormData((prevState: NewActivity) => {
      return { ...prevState, location: event.target.value };
    });
  };
  const dateChangeHandler = (event: any) => {
    setFormData((prevState: NewActivity) => {
      return { ...prevState, date: event.target.value };
    });
  };
  const durationChangeHandler = (event: any) => {
    setFormData((prevState: NewActivity) => {
      return { ...prevState, duration: event.target.value };
    });
  };
  const descChangeHandler = (event: any) => {
    setFormData((prevState: NewActivity) => {
      return { ...prevState, desc: event.target.value };
    });
  };

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
                  value={formData.name}
                  onChange={nameChangeHandler}
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
                  value={formData.maxParticipant}
                  onChange={maxParticipantChangeHandler}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={locationChangeHandler}
                  required
                />
              </Form.Group>

              {/* <Form.Group as={Col} className="" controlId="formImgFile">
                <Form.Label>Picture</Form.Label>
                <Form.Control type="file" required />
              </Form.Group> */}
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formDateTime">
                <Form.Label>Date & Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formData.date}
                  onChange={dateChangeHandler}
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
                  value={formData.duration}
                  onChange={durationChangeHandler}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formDesc">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.desc}
                  onChange={descChangeHandler}
                />
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
