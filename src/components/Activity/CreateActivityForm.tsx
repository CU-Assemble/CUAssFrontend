import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";

import { createActivityAsync, selectCreateMessage, selectCreateError, setCreateError } from "../../features/activityPost/activitySlice";
import { NewActivity } from "../../models/activityTypes";
import { MultiSelect } from "react-multi-select-component";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const options = [
  { label: "Sport", value: "sport" },
  { label: "Food", value: "food"},
  { label: "Music", value: "music"},
  { label: "Arts", value: "arts"},
  { label: "Game", value: "game"},
  { label: "Board game", value: "boardGame" },
  { label: "Travel", value: "travel" },
  { label: "Study", value: "study" },
  { label: "Others", value: "others" },
];

function CreateActivityForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createMessage = useAppSelector(selectCreateMessage)
  const errorMessage = useAppSelector(selectCreateError);

  const [formData, setFormData] = useState<NewActivity>({});
  const [selectedType, setSelectedType] = useState<any[]>([]);
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (createMessage == "success" && redirect) {
      navigate("/dashboard");
      setRedirect(false);
    }
  }, [createMessage]);

  const formSubmissionHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      createActivityAsync({
        Name: formData.Name,
        Description: formData.Description,
        Type: selectedType.map(x => x.value),
        Location: formData.Location,
        MaxParticipant: formData.MaxParticipant,
        Date: formData.Date,
        Duration: formData.Duration,
      })
    );
    setRedirect(true);
  };

  const nameChangeHandler = (event: any) => {
    setFormData((prevState: NewActivity) => {
      return { ...prevState, Name: event.target.value };
    });
  };
  const maxParticipantChangeHandler = (event: any) => {
    setFormData((prevState: NewActivity) => {
      return { ...prevState, MaxParticipant: event.target.value };
    });
  };
  const locationChangeHandler = (event: any) => {
    setFormData((prevState: NewActivity) => {
      return { ...prevState, Location: event.target.value };
    });
  };
  const dateChangeHandler = (event: any) => {
    setFormData((prevState: NewActivity) => {
      return { ...prevState, Date: event.target.value };
    });
  };
  const durationChangeHandler = (event: any) => {
    setFormData((prevState: NewActivity) => {
      return { ...prevState, Duration: event.target.value };
    });
  };
  const descChangeHandler = (event: any) => {
    setFormData((prevState: NewActivity) => {
      return { ...prevState, Description: event.target.value };
    });
  };

  const CreateError = (
    <Alert
      variant="danger"
      onClose={() => dispatch(setCreateError(""))}
      dismissible
    >
      <Alert.Heading>You got an error!</Alert.Heading>
      <p>{errorMessage}</p>
    </Alert>
  );

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
        {errorMessage && CreateError}
          <h1 className="mb-3">New Activity</h1>
          <Form onSubmit={formSubmissionHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formEventName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event name"
                  value={formData.Name}
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
                  value={formData.MaxParticipant}
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
                  value={formData.Location}
                  onChange={locationChangeHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="actType">
                <Form.Label>Activity Type</Form.Label>
                <MultiSelect
                  options={options}
                  value={selectedType}
                  onChange={setSelectedType}
                  labelledBy="Select"
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
                  value={formData.Date}
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
                  value={formData.Duration}
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
                  value={formData.Description}
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
