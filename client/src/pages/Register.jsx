import React, { useState } from "react";
import Navbar from "../components/navbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import http from "../axiosconfig/axios_settings";
import urls from "../Url_List.json";
import Button from "react-bootstrap/Button";
import CustomerForm from "../components/CustomerForm";
import AdminForm from "../components/AdminForm";
import VolunteerForm from "../components/VolunteerForm";
import "../CSS/Register.css";
import Card from "react-bootstrap/Card";
import { Row, Col, Container } from "react-bootstrap";

const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountlevel, setAccountLevel] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [isError, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const changeFirstName = (e) => {
    setFirstName(e);
  };

  const changeError = (value) => {
    setError(value);
  };

  const changeLastName = (e) => {
    setLastName(e);
  };
  const changePassword = (e) => {
    setPassword(e);
  };
  const changeEmail = (e) => {
    setEmail(e);
  };
  const changeCompanyName = (e) => {
    setCompanyName(e);
  };
  const toggleForm = (mode) => {
    setAccountLevel(mode);
  };

  const onSubmit = async () => {
    let response;
    let location = "";
    if (accountlevel === "customer") {
      let customer = {
        firstname,
        lastname,
        email,
        password,
        companyname: "",
        mode: accountlevel,
      };

      const backendResponse = await http.post(
        urls.registrationValidation,
        customer
      );
      if (backendResponse.data !== true) {
        setError(true);
        setErrorMessages(backendResponse.data);
        return;
      }

      response = await http.post(urls.registerCustomer, customer);
      location = "/customerprofile";
    } else if (accountlevel === "admin") {
      let admin = {
        firstname,
        lastname,
        email,
        password,
        companyname,
        mode: accountlevel,
      };

      const backendResponse = await http.post(
        urls.registrationValidation,
        admin
      );
      if (backendResponse.data !== true) {
        setError(true);
        setErrorMessages(backendResponse.data);
        return;
      }

      response = await http.post(urls.registerAdmin, admin);
      location = "/adminprofile";
    } else if (accountlevel === "volunteer") {
      let volunteer = {
        firstname,
        lastname,
        email,
        password,
        companyname: "",
        mode: accountlevel,
      };

      const backendResponse = await http.post(
        urls.registrationValidation,
        volunteer
      );
      if (backendResponse.data !== true) {
        setError(true);
        setErrorMessages(backendResponse.data);
        return;
      }

      response = await http.post(urls.registerVolunteer, volunteer);
      location = "/volunteerProfile";
    }

    localStorage.setItem("token", response.data);
    window.location = location;
  };

  const RegisterMode = () => {
    if (accountlevel === "") {
      return (
        <React.Fragment>
          <Jumbotron
            fluid
            className="mb-0"
            style={{
              "background-image":
                "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
              height: "100vh",
            }}
          >
            <Container fluid>
              <Row>
                <Col></Col>
                <Col sm={{ span: 8 }} md={{ span: 6 }} lg={{ span: 5 }}>
                  <h5 className="text-center">HomeOrder Registration</h5>
                  <Card
                    className="mx-auto p-4"
                    style={{
                      "background-color": "#faf5f2",
                      width: "100%",
                    }}
                    text={"dark"}
                  >
                    <div className="orientation">
                      <h5> Who do you want to register as?</h5>
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
                      <div
                        className="text-center mt-2 mb-0"
                        style={{ "font-size": "10px" }}
                      >
                        <a style={{ color: "black" }} href="/login">
                          Already have an account? Login Here!
                        </a>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </Jumbotron>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <Navbar showLogin={true} />
      <RegisterMode />
      <CustomerForm
        mode={accountlevel}
        FirstName={changeFirstName}
        LastName={changeLastName}
        email={changeEmail}
        password={changePassword}
        submit={onSubmit}
        isError={isError}
        errorMessages={errorMessages}
        changeError={changeError}
      />
      <AdminForm
        mode={accountlevel}
        FirstName={changeFirstName}
        LastName={changeLastName}
        email={changeEmail}
        password={changePassword}
        companyName={changeCompanyName}
        submit={onSubmit}
        isError={isError}
        errorMessages={errorMessages}
        changeError={changeError}
      />
      <VolunteerForm
        mode={accountlevel}
        FirstName={changeFirstName}
        LastName={changeLastName}
        email={changeEmail}
        password={changePassword}
        submit={onSubmit}
        isError={isError}
        errorMessages={errorMessages}
        changeError={changeError}
      />
    </React.Fragment>
  );
};

export default RegisterPage;
