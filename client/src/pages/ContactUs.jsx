import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ContactUs = () => {
  return (
    <React.Fragment>
      <Navbar showLogin={true} showRegister={true} />
      <Jumbotron
        fluid
        className="mb-0 p-0 text-center"
        style={{
          "background-image":
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <Container fluid>
          <Row>
            <Col xl={3} lg={2} md={1}></Col>
            <Col className="">
              <h1 className="text-center mt-3">Contact Us</h1>
              <p className="mb-0">
                <strong>Email:</strong> homeorder@gmail.com{" "}
              </p>
              <p className="mt-0">
                <strong>Phone:</strong> (800)-352-3532{" "}
              </p>
            </Col>
            <Col xl={3} lg={2} md={1}></Col>
          </Row>
        </Container>
      </Jumbotron>
    </React.Fragment>
  );
};

export default ContactUs;
