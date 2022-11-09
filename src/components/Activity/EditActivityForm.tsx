import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import { MultiSelect } from "react-multi-select-component";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchActivityById,
  selectActivity,
  editActivityAsync,
  selectEditMessage,
  selectEditError,
  setEditError,
  selectEditLoading,
} from "../../features/activityPost/activitySlice";
import { selectUser } from "../../features/user/userSlice";
import { NewActivity } from "../../models/activityTypes";

const options = [
  { label: "Sport", value: "sport" },
  { label: "Food", value: "food" },
  { label: "Music", value: "music" },
  { label: "Arts", value: "arts" },
  { label: "Game", value: "game" },
  { label: "Board game", value: "boardGame" },
  { label: "Travel", value: "travel" },
  { label: "Study", value: "study" },
  { label: "Others", value: "others" },
];

const mapDataToOption = (serverData: string[]) => {
  const resArray = [];
  for (const e of options) {
    if (serverData.includes(e.value)) {
      resArray.push(e);
    }
  }
  return resArray;
};

function EditActivityForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activityDetail = useAppSelector(selectActivity);
  const editMessage = useAppSelector(selectEditMessage);
  const errorMessage = useAppSelector(selectEditError);
  const editLoading = useAppSelector(selectEditLoading);
  const user = useAppSelector(selectUser);
  const { t } = useTranslation('translation');

  const [formData, setFormData] = useState<NewActivity>({ ActivityId: id });
  const [selectedType, setSelectedType] = useState<any[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchActivityById(id));
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setFormData((prevState) => {
      const newUserState = {
        Name: activityDetail.name,
        Description: activityDetail.desc,
        ImageProfile: activityDetail.url,
        ActivityType: activityDetail.activityType? activityDetail.activityType: [],
        Location: activityDetail.location,
        MaxParticipant: activityDetail.maxParticipant,
        Date: activityDetail.date,
        Duration: activityDetail.duration,
        OwnerId: user.studentId,
      };
      return { ...prevState, ...newUserState };
    });
    setSelectedType(mapDataToOption(activityDetail.activityType? activityDetail.activityType: []));
  }, [activityDetail]);

  useEffect(() => {
    setShowSuccessPopup(editMessage == "success");
  }, [editMessage]);

  const formSubmissionHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      editActivityAsync({
        ActivityId: formData.ActivityId,
        Name: formData.Name,
        Description: formData.Description,
        ActivityType: selectedType.map((x) => x.value),
        Location: formData.Location,
        MaxParticipant: formData.MaxParticipant,
        Date: "0",
        Duration: formData.Duration,
        ImageProfile: formData.ImageProfile,
        OwnerId: user.studentId,
      })
    );
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
  const imageChangeHandler = (event: any) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevState: NewActivity) => {
        return { ...prevState, ImageProfile: reader.result as string };
      });
    };
    reader.readAsDataURL(file);
  };

  const EditSuccess = (
    <Alert
      variant="success"
      onClose={() => setShowSuccessPopup(false)}
      dismissible
    >
      <Alert.Heading>Edit an activity successfully!</Alert.Heading>
    </Alert>
  );

  const EditError = (
    <Alert
      variant="danger"
      onClose={() => dispatch(setEditError(""))}
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
          {showSuccessPopup && EditSuccess}
          {errorMessage && EditError}
          <h1 className="mb-3">{t("Edit Activity")}</h1>
          <Form onSubmit={formSubmissionHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formEventName">
                <Form.Label>{t("Event Name")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("Enter event name")}
                  value={formData.Name}
                  onChange={nameChangeHandler}
                  required
                  autoFocus
                />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="formMaxParticipants">
                <Form.Label>{t("Max Participants")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("Enter max participants")}
                  value={formData.MaxParticipant}
                  onChange={maxParticipantChangeHandler}
                  min="2"
                  max="50"
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formLocation">
                <Form.Label>{t("Location")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("Enter location")}
                  value={formData.Location}
                  onChange={locationChangeHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="actType">
                <Form.Label>{t("Activity Type")}</Form.Label>
                <MultiSelect
                  options={options}
                  value={selectedType}
                  onChange={setSelectedType}
                  labelledBy="Select"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formDateTime">
                <Form.Label>{t("Date & Time")}</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formData.Date}
                  onChange={dateChangeHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="formDuration">
                <Form.Label>{t("Duration (minutes)")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("Enter duration of the activity")}
                  value={formData.Duration}
                  onChange={durationChangeHandler}
                  min="5"
                  max="2000"
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formDesc">
                <Form.Label>{t("Description")}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.Description}
                  onChange={descChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formImgFile">
                <Form.Label>{t("Picture")}</Form.Label>
                <Form.Control
                  type="file"
                  onChange={imageChangeHandler}
                />
              </Form.Group>
            </Row>
            {formData.ImageProfile && (
              <Image
                className="imgPreview mb-3"
                src={formData.ImageProfile}
                alt="preview"
              />
            )}

            <Stack direction="horizontal" gap={3}>
              <Button variant="outline-info" type="submit" className="ms-auto" disabled={editLoading ? true : false}>
                {editLoading? t('Loading...'): t('Save Changes')}
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditActivityForm;
