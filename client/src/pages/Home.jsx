import React, { useState } from "react";
import Navbar from "../components/navbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardDeck from "react-bootstrap/CardDeck";
import customerImage from "../images/customer.png";
import volunteerImage from "../images/volunteer.png";
import businessImage from "../images/business.png";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import communityImage from "../images/community.png";
import volunteerRewardsImage from "../images/volunteerRewards.png";

const Home = () => {
  const loggedIn = (accountType) => {
    if (!localStorage.getItem("token")) {
      if (accountType === "volunteer") {
        return (
          <div className="text-center">
            <Link to="/register">
              <Button variant="success">Register as a Volunteer</Button>
            </Link>
          </div>
        );
      }
      if (accountType === "customer") {
        return (
          <div className="text-center">
            <Link to="/register">
              <Button variant="success">Register as a Customer</Button>
            </Link>
          </div>
        );
      }
      if (accountType === "admin") {
        return (
          <div className="text-center">
            <Link to="/register">
              <Button variant="success">Register as a Business</Button>
            </Link>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <React.Fragment>
      <Navbar showLogin={true} showRegister={true} />
      <Jumbotron
        fluid
        className="py-3 mb-0"
        style={{
          "background-image":
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
        }}
      >
        <Container>
          <Container className="align-items-center">
            <h1 className="display-4 text-dark mt-5 mb-2">HomeOrder</h1>
            <p className="lead mb-5 text-dark-50">
              <strong>
                HomeOrder is a volunteer-driven hardware delivery service
                dedicated to serving the Gainesville community during the
                COVID-19 pandemic.
              </strong>
            </p>
          </Container>
        </Container>
      </Jumbotron>

      {
        //#00529b
      }
      <Jumbotron
        fluid
        className="mb-0 p-0 text-center"
        style={{
          "background-color": "#00529b",
          minHeight: "100vh",
        }}
      >
        <Container>
          <Row className="">
            <Col className="">
              <CardDeck className="ml-5 mr-5">
                <Card
                  className="mt-4 mx-3"
                  style={{
                    width: "25vh",
                    height: "100%",
                    "background-color": "#faf5f2",
                    display: "inline-block",
                  }}
                >
                  <Card.Img
                    className="mx-auto"
                    style={{ width: "100%", height: "100%" }}
                    variant="top"
                    src={volunteerImage}
                  />
                  <Card.Body className="text-center">
                    <Card.Text>
                      Become a volunteer to earn rewards points towards products
                      by delivering items
                    </Card.Text>
                    {loggedIn("volunteer")}
                  </Card.Body>
                </Card>

                <Card
                  className="mt-4 mx-3"
                  style={{
                    width: "25vh",
                    height: "100%",
                    "background-color": "#faf5f2",
                    display: "inline-block",
                  }}
                >
                  <Card.Img
                    className="mx-auto"
                    style={{ width: "100%", height: "75%" }}
                    variant="top"
                    src={customerImage}
                  />
                  <Card.Body className="text-center" style={{ width: "100%" }}>
                    <Card.Text>
                      Join as a customer to enjoy same delivery of products for
                      all of your home improvement needs
                    </Card.Text>
                    {loggedIn("customer")}
                  </Card.Body>
                </Card>

                <Card
                  className="mt-4 mx-3"
                  style={{
                    width: "25vh",
                    height: "100%",
                    "background-color": "#faf5f2",
                    display: "inline-block",
                  }}
                >
                  <Card.Img
                    className="mx-auto"
                    style={{ width: "100%", height: "75%" }}
                    variant="top"
                    src={businessImage}
                  />
                  <Card.Body className="text-center">
                    <Card.Text>
                      Register your business and provide a secure shopping
                      experience for your customers
                    </Card.Text>
                    {loggedIn("admin")}
                  </Card.Body>
                </Card>
              </CardDeck>
            </Col>
          </Row>
          <Row>
            <Col className="">
              <CardDeck className=" mx-auto">
                <Card
                  className="my-4 mx-3"
                  style={{
                    width: "25vh",
                    "background-color": "#faf5f2",
                    height: "100%",
                    display: "inline-block",
                  }}
                >
                  <Card.Img
                    className="mx-auto"
                    style={{ width: "100%", height: "75%" }}
                    variant="top"
                    src={communityImage}
                  />
                  <Card.Body className="text-center">
                    <div className="text-center">
                      <Card.Text>
                        Participate in the HomeOrder Community Board and discuss
                        any questions, advice, and tips that you have related to
                        your home improvement projects. Share pictures too!
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>

                <Card
                  className="my-4 mx-3"
                  style={{
                    width: "25vh",
                    "background-color": "#faf5f2",
                    display: "inline-block",
                    height: "100%",
                  }}
                >
                  <Card.Img
                    className="mx-auto"
                    style={{ width: "100%", height: "75%" }}
                    variant="top"
                    src={volunteerRewardsImage}
                  />
                  <Card.Body className="text-center">
                    <div className="text-center">
                      <Card.Text>
                        Rewards Points can be redeemed for store credit! Earn 1
                        point for every completed delivery and use these points
                        as currency to buy products from our site.
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </CardDeck>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </React.Fragment>
  );
};

export default Home;
