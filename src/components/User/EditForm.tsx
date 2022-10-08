import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

import { RegisterInput } from "../../models/userTypes";
import { getProfileAsync, editProfileAsync, selectUser } from "../../features/user/userSlice";

function EditForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const spaceIdx = user.name ? user.name.indexOf(" ") : 0;

  const [formData, setFormData] = useState<RegisterInput>({studentId: user.studentId});

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

  const studentIdChangeHandler = (event: any) => {
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

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h1 className="mb-3">Edit</h1>
          <Form onSubmit={formSubmissionHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formFirstname">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={firstNameChangeHandler}
                  required
                  autoFocus
                />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="formLastname">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={lastNameChangeHandler}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={emailChangeHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="formStudentID">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter student ID"
                  value={formData.studentId}
                  onChange={studentIdChangeHandler}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="formNickName">
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter nickname"
                  value={formData.nickname}
                  onChange={nicknameChangeHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} className="" controlId="formPhoneNumber">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  value={formData.tel}
                  onChange={telChangeHandler}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
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
            </Row>

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
              <Button variant="outline-info" type="submit" className="ms-auto">
                Save Changes
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditForm;
