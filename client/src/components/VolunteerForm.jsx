import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

const VolunteerForm = (props) => {
  const changeFirstName = (e) => {
    props.FirstName(e.target.value);
  };
  const changeLastName = (e) => {
    props.LastName(e.target.value);
  };
  const changeEmail = (e) => {
    props.email(e.target.value);
  };
  const changePassword = (e) => {
    props.password(e.target.value);
  };

  let { mode } = props;
  if (mode === "volunteer") {
    const throwAlert = () => {
      if (props.isError) {
        const messagesT = props.errorMessages.map((message) => {
          return <li>{message}</li>;
        });
        return (
          <Alert
            variant="danger"
            onClose={() => props.changeError(false)}
            dismissible
          >
            <Alert.Heading>Error!</Alert.Heading>

            <ul>{messagesT}</ul>
          </Alert>
        );
      }
      return null;
    };
    return (
      <React.Fragment>
        <Jumbotron
          fluid
          className="mb-0"
          style={{
            "background-image":
              "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
            minHeight: "100vh",
          }}
        >
          <Card
            className="mx-auto p-4"
            style={{
              "background-color": "#faf5f2",
              width: "85%",
            }}
            text={"dark"}
          >
            {throwAlert()}
            <div className="container">
              <h5 className="text-center">Volunteer Registration</h5>
              <Form>
                <Form.Group>
                  <Form.Label>First Name: </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={changeFirstName}
                    placeholder="Enter your first name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name: </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={changeLastName}
                    placeholder="Enter your last name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    type="email"
                    onChange={changeEmail}
                    placeholder="Enter your email address"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type="password"
                    onChange={changePassword}
                    placeholder="Enter your password"
                  />
                </Form.Group>
              </Form>
              <div className="text-center">
                <Button
                  onClick={props.submit}
                  variant="success"
                  style={{ width: "100%" }}
                >
                  Register as a Volunteer
                </Button>
              </div>
              <div
                className="text-center mt-2 mb-0"
                style={{ "font-size": "10px" }}
              >
                <a style={{ color: "black" }} href="/register">
                  I want to register as a different type of account
                </a>
              </div>
            </div>
          </Card>
        </Jumbotron>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default VolunteerForm;
