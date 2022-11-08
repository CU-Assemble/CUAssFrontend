import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";

import {
  registerAsync,
  selectRegisterMessage,
  selectRegisterError,
  setRegisterError,
  selectRegisterLoading
} from "../../features/user/userSlice";
import { RegisterInput } from "../../models/userTypes";

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const registerMessage = useAppSelector(selectRegisterMessage);
  const errorMessage = useAppSelector(selectRegisterError);
  const registerLoading = useAppSelector(selectRegisterLoading);
  const { t } = useTranslation('translation');
  
  const [formData, setFormData] = useState<RegisterInput>({});
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [idValid, setIdValid] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);
  
  useEffect(() => {
    if (registerMessage == "success" && redirect) {
      navigate("/login");
      setRedirect(false);
    }
  }, [registerMessage]);
  
  const formSubmissionHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if(!passwordValid || !idValid){
      event.stopPropagation();
      return
    }
    dispatch(
      registerAsync({
        studentId: formData.studentId,
        name: `${formData.firstName} ${formData.lastName}`,
        nickname: formData.nickname,
        faculty: formData.faculty,
        tel: formData.tel,
        email: formData.email,
        password: formData.password,
      })
    );
    setRedirect(true);
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

  const studentIdChangeHandler = (event: any) => {
    const newId = event.target.value;
    const idIsValid = /^\d+$/.test(newId) && 5900000000 <= parseInt(newId) && parseInt(newId) < 6600000000;
    setIdValid(idIsValid);
    setFormData((prevState: RegisterInput) => {
      return { ...prevState, studentId: event.target.value };
    });
  };

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

  const passwordChangeHandler = (event: any) => {
    setPasswordValid(event.target.value == formData.cfPassword || formData.cfPassword=="");
    setFormData((prevState: RegisterInput) => {
      return { ...prevState, password: event.target.value };
    });
  };

  const cfPasswordChangeHandler = (event: any) => {
    setPasswordValid(event.target.value == formData.password || event.target.value=="");
    setFormData((prevState: RegisterInput) => {
      return { ...prevState, cfPassword: event.target.value };
    });
  };

  const RegisterError = (
    <Alert
      variant="danger"
      onClose={() => dispatch(setRegisterError(""))}
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
        {errorMessage && RegisterError}
          <h1 className="mb-3">{t("Register")}</h1>
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

              <Form.Group as={Col} className="" controlId="formStudentID">
                <Form.Label>{t("Student ID")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("Enter student ID")}
                  value={formData.studentId}
                  onChange={studentIdChangeHandler}
                  isInvalid={!idValid}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Student ID must contain only number and must be between year 59 to 65. 
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
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
            </Row>

            <Row className="mb-3">
              <Col xs={6}>
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
              </Col>
            </Row>

            {/* <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formImgFile">
                <Form.Label>Picture</Form.Label>
                <Form.Control type="file" required />
              </Form.Group>
            </Row> */}

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formPassword">
                <Form.Label>{t("Password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("Enter password")}
                  value={formData.password}
                  onChange={passwordChangeHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="formConfirmPassword">
                <Form.Label>{t("Confirm password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("Please re-enter your password")}
                  value={formData.cfPassword}
                  onChange={cfPasswordChangeHandler}
                  isInvalid={!passwordValid}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Password doesn't match.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Stack direction="horizontal" gap={3}>
              <Button variant="success" type="submit" className="ms-auto" disabled={registerLoading ? true : false}>
              {registerLoading? t('Loading...'): t('Sign Up')}
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterForm;
