import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import aboutus1 from "../images/a2.png";
import aboutus2 from "../images/a3.png";

import aboutus3 from "../images/a4.png";

const AboutUs = () => {
  return (
    <React.Fragment>
      <Navbar showLogin={true} showRegister={true} />
      <Jumbotron
        fluid
        className="mb-0 p-0"
        style={{
          "background-image":
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
          minHeight: "100vh",
        }}
      >
        <Container fluid>
          <Row className="pt-2 ">
            <Col xl={3} lg={2} md={1}></Col>
            <Col
              style={{
                display: "flex",
                "flex-direction": "row",
                "align-items": "center",
                "justify-content": "center",
              }}
              className=""
            >
              <Card.Img
                className="ml-auto"
                style={{ width: "21vh", height: "21vh" }}
                variant="top"
                src={aboutus3}
              />
              <Card.Img
                className="mr-auto"
                style={{ width: "21vh", height: "21vh" }}
                variant="top"
                src={aboutus2}
              />
            </Col>
            <Col xl={3} lg={2} md={1}></Col>
          </Row>
          <Row className=" mx-auto mt-0 pt-0">
            <Col xl={3} lg={2} md={1} className=" "></Col>
            <Col
              style={{
                display: "flex",
                "flex-direction": "column",
                "align-items": "left",
                "justify-content": "center",
              }}
              className="mt-0 "
            >
              <h2 className="text-center">About HomeOrder</h2>
              <p className="text-center">
                <strong>HomeOrder</strong> is a delivery service for home
                improvement related supplies and items designed to help the
                Gainesville community during the current pandemic. You can
                expect the products you purchase to be delivered in the same day
                by volunteer drivers. We are all about encouraging home
                improvement, so we added a community discussion board where you
                can seek advice and tips on your project from other users! We
                are all about encouraging home improvement, so we added a
                community discussion board where you can seek advice and tips on
                your project from other users!
              </p>
              <h2 className="text-center">What should I sign up as?</h2>
              <p className="text-center">
                There are three different options for signing up:
              </p>

              <p className="text-center">
                <strong>Customers</strong> are able to shop for various products
                and participate in the community board!
              </p>
              <p className="text-center">
                <strong>Volunteers</strong> can accept orders to depver and earn
                reward points from completing them!
              </p>
              <p className="text-center">
                <strong>Admins</strong> can register their business, post
                inventory to sell, and check their analytics
              </p>
            </Col>
            <Col xl={3} lg={2} md={1} className=""></Col>
          </Row>
          <Row className="">
            <Col xl={3} lg={2} md={1}></Col>
            <Col
              style={{
                display: "flex",
                "flex-direction": "row",
                "align-items": "center",
                "justify-content": "center",
              }}
              className=""
            >
              <Card.Img
                className="ml-auto"
                style={{ width: "21vh", height: "21vh" }}
                variant="top"
                src={aboutus2}
              />
              <Card.Img
                className="mr-auto"
                style={{ width: "21vh", height: "21vh" }}
                variant="top"
                src={aboutus3}
              />
            </Col>
            <Col xl={3} lg={2} md={1}></Col>
          </Row>
        </Container>
      </Jumbotron>
    </React.Fragment>
  );
};

export default AboutUs;
