import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useTranslation } from 'react-i18next';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";

import { RegisterInput } from "../../models/userTypes";
import { getProfileAsync, editProfileAsync, selectUser, selectEditMessage, selectEditLoading } from "../../features/user/userSlice";

function EditForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const editMessage = useAppSelector(selectEditMessage);
  const editLoading = useAppSelector(selectEditLoading);
  const { t } = useTranslation('translation');

  const spaceIdx = user.name ? user.name.indexOf(" ") : 0;

  const [formData, setFormData] = useState<RegisterInput>({studentId: user.studentId});
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  useEffect(() => {
    const studentId = user["studentId"] ? user["studentId"] : "";
    dispatch(getProfileAsync(studentId));
  }, []);

  useEffect(() => {
    setFormData((prevState) => {
      const newUserState = {
        firstName: user.name?.substring(0, spaceIdx),
        lastName: user.name?.substring(spaceIdx + 1),
        email: user.email,
        nickname: user.nickname,
        tel: user.tel,
        faculty: user.faculty,
      };
      return { ...prevState, ...newUserState };
    });
  }, [user]);

  useEffect(() => {
    setShowSuccessPopup(editMessage == "success");
  }, [editMessage])

  const formSubmissionHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      editProfileAsync({
        studentId: formData.studentId,
        name: `${formData.firstName} ${formData.lastName}`,
        nickname: formData.nickname,
        faculty: formData.faculty,
        tel: formData.tel,
        email: formData.email,
        password: formData.password,
      })
    );
  };

  const firstNameChangeHandler = (event: any) => {
    setFormData((prevState: RegisterInput) => {
      return { ...prevState, firstName: event.target.value };
    });
  };

  const lastNameChangeHandler = (event: any) => {
    setFormData((prevState: RegisterInput) => {
      return { ...prevState, lastName: event.target.value };
    });
  };

  const emailChangeHandler = (event: any) => {
    setFormData((prevState: RegisterInput) => {
      return { ...prevState, email: event.target.value };
    });
  };

  // const studentIdChangeHandler = (event: any) => {
  //   setFormData((prevState: RegisterInput) => {
  //     return { ...prevState, studentId: event.target.value };
  //   });
  // };

  const nicknameChangeHandler = (event: any) => {
    setFormData((prevState: RegisterInput) => {
      return { ...prevState, nickname: event.target.value };
    });
  };

  const telChangeHandler = (event: any) => {
    setFormData((prevState: RegisterInput) => {
      return { ...prevState, tel: event.target.value };
    });
  };

  const facultyChangeHandler = (event: any) => {
    setFormData((prevState: RegisterInput) => {
      return { ...prevState, faculty: event.target.value };
    });
  };

  const EditSuccess = (
    <Alert
      variant="success"
      onClose={() => setShowSuccessPopup(false)}
      dismissible
    >
      <Alert.Heading>Edit profile successfully!</Alert.Heading>
    </Alert>
  );

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          {showSuccessPopup && EditSuccess}
          <h1 className="mb-3">{t("Edit Profile")}</h1>
          <Form onSubmit={formSubmissionHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formFirstname">
                <Form.Label>{t("First name")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("Enter first name")}
                  value={formData.firstName}
                  onChange={firstNameChangeHandler}
                  required
                  autoFocus
                />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="formLastname">
                <Form.Label>{t("Last name")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("Enter last name")}
                  value={formData.lastName}
                  onChange={lastNameChangeHandler}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formEmail">
                <Form.Label>{t("Email")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t("Enter email")}
                  value={formData.email}
                  onChange={emailChangeHandler}
                  required
                />
              </Form.Group>

              {/* <Form.Group as={Col} className="" controlId="formStudentID">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter student ID"
                  value={formData.studentId}
                  onChange={studentIdChangeHandler}
                  required
                />
              </Form.Group> */}

              <Form.Group as={Col} className="" controlId="formNickName">
                <Form.Label>{t("Nickname")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("Enter nickname")}
                  value={formData.nickname}
                  onChange={nicknameChangeHandler}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              

              <Form.Group as={Col} className="" controlId="formPhoneNumber">
                <Form.Label>{t("Phone number")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("Enter phone number")}
                  value={formData.tel}
                  onChange={telChangeHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formFaculty">
                  <Form.Label>{t("Faculty")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("Select faculty")}
                    value={formData.faculty}
                    onChange={facultyChangeHandler}
                    required
                  />
                </Form.Group>
            </Row>

            {/* <Row className="mb-3">
              <Col xs={6}>
                <Form.Group as={Col} controlId="formFaculty">
                  <Form.Label>Faculty</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Select faculty"
                    value={formData.faculty}
                    onChange={facultyChangeHandler}
                    required
                  />
                </Form.Group>
              </Col>
            </Row> */}

            {/* <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formImgFile">
                <Form.Label>Picture</Form.Label>
                <Form.Control type="file" required />
              </Form.Group>
            </Row> */}

            {/* <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={passwordChangeHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="formConfirmPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Please re-enter your password"
                  value={formData.cfPassword}
                  onChange={cfPasswordChangeHandler}
                  required
                />
              </Form.Group>
            </Row> */}

            <Stack direction="horizontal" gap={3}>
              <Button variant="info" type="submit" className="ms-auto" disabled={editLoading ? true : false}>
              {editLoading? t('Loading...'): t('Save Changes')}
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditForm;
