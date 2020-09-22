import React, { useState } from "react";
import Navbar from "../components/navbar";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import http from "../axiosconfig/axios_settings";
import urls from "../Url_List.json";
import Alert from "react-bootstrap/Alert";
import "../CSS/Login.css";
import Card from "react-bootstrap/Card";
import { Row, Col, Container } from "react-bootstrap";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountlevel, setAccountLevel] = useState("");
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const toggleForm = (mode) => {
    setAccountLevel(mode);
  };

  const throwAlert = () => {
    if (isError) {
      return (
        <Alert
          style={{ width: "100%" }}
          className="mx-auto"
          variant="danger"
          onClose={() => setError(false)}
          dismissible
        >
          <Alert.Heading>Error!</Alert.Heading>
          <ul>
            <li>{errorMessage}</li>
          </ul>
        </Alert>
      );
    }
    return null;
  };

  const onSubmit = async () => {
    let user = {
      email,
      password,
      account: accountlevel,
    };
    const backendResponse = await http.post(urls.loginValidation, user);
    if (backendResponse.data !== true) {
      console.log("something went wrong");
      setErrorMessage(backendResponse.data);
      setError(true);
      return;
    }
    console.log("happens");
    let response = null;
    let location = "";
    if (accountlevel === "customer") {
      response = await http.post(urls.loginCustomer, user);
      location = "/customerprofile";
    } else if (accountlevel === "admin") {
      response = await http.post(urls.loginAdmin, user);
      location = "/adminprofile";
    } else if (accountlevel === "volunteer") {
      response = await http.post(urls.loginVolunteer, user);
      location = "/volunteerProfile";
    }
    localStorage.setItem("token", response.data);
    window.location = location;
  };

  {
    /* orange color 
    "background-image":
  "radial-gradient(circle, rgba(0,0,140,0), rgba(255, 102, 0, .5), rgba(255,135,0,1))"*/
  }
  return (
    <React.Fragment>
      <Navbar showRegister={true} />
      <Jumbotron
        fluid
        className="mb-0"
        style={{
          "background-image":
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255, 102, 0, .5), rgba(255,135,0,1))",
          height: "100vh",
        }}
      >
        <Container fluid>
          <Row>
            <Col></Col>
            <Col sm={{ span: 7 }} md={{ span: 5 }} lg={{ span: 4 }}>
              <h5 className="text-center">HomeOrder Login</h5>
              {throwAlert()}
              <Card
                className="mx-0"
                style={{
                  "background-color": "#faf5f2",
                  width: "100%",
                }}
                text={"dark"}
              >
                <div className="LoginForm mx-auto">
                  <Form>
                    <Form.Group>
                      <Form.Label>Email: </Form.Label>
                      <Form.Control
                        onChange={changeEmail}
                        type="text"
                        placeholder="Enter your email address"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password: </Form.Label>
                      <Form.Control
                        onChange={changePassword}
                        type="password"
                        placeholder="Enter your password"
                      />
                    </Form.Group>
                    <div className="modeButtons">
                      <Button
                        onClick={() => toggleForm("customer")}
                        variant="outline-warning"
                      >
                        Customer
                      </Button>
                      <Button
                        onClick={() => toggleForm("admin")}
                        variant="outline-dark"
                        className="ml-2"
                      >
                        Admin
                      </Button>
                      <Button
                        onClick={() => toggleForm("volunteer")}
                        variant="outline-primary"
                        className="ml-2"
                      >
                        Volunteer
                      </Button>
                    </div>

                    <div className="text-center">
                      <Button
                        style={{ width: "100%" }}
                        className="mt-3"
                        onClick={onSubmit}
                        variant="success"
                      >
                        Login
                      </Button>
                    </div>
                    <div
                      className="text-center my-2"
                      style={{ "font-size": "10px" }}
                    >
                      <a style={{ color: "black" }} href="/register">
                        Not an existing user? Register Here!
                      </a>
                    </div>
                  </Form>
                </div>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Jumbotron>
    </React.Fragment>
  );
};

export default LoginPage;
