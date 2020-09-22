import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import silver from "../images/silver.png";
import gold from "../images/gold.png";
import diamond from "../images/diamond.png";
import CardDeck from "react-bootstrap/CardDeck";
import http from "../axiosconfig/axios_settings";
import urls from "../Url_List.json";

const VolunteerInformation = () => {
  const [numDeliveries, setNumDeliveries] = useState(0);
  const [balance, setBalance] = useState(0);
  const [tier, setTier] = useState("Silver");
  const [bar1, setBar1] = useState(0);
  const [bar2, setBar2] = useState(0);
  const [bar3, setBar3] = useState(0);

  const loadInfo = async () => {
    const res = await http.get(urls.getVolunteerProfile);
    const { rewardPoints, ordersCompleted } = res.data;
    console.log(res.data);
    setBalance(rewardPoints);
    setNumDeliveries(ordersCompleted);

    if (ordersCompleted < 15) {
      let percentage = (ordersCompleted / 15) * 100;
      setBar1(percentage);
      setBar2(0);
      setBar3(0);
      setTier("Silver");
    } else if (ordersCompleted < 50) {
      let percentage = ((ordersCompleted - 15) / 35) * 100;
      setBar1(100);
      setBar2(percentage);
      setBar3(0);
      setTier("Gold");
    } else {
      setBar1(100);
      setBar2(100);
      setBar3(100);
      setTier("Diamond");
    }

    return null;
  };

  useEffect(() => {
    loadInfo();
  }, []);

  const calculateProgress = () => {
    let percentage = 0;

    if (numDeliveries < 15) {
      percentage = (numDeliveries / 15) * 100;
      console.log(percentage);
    }
  };

  const progressInstance = (
    <ProgressBar now={bar1} label={`${bar1.toFixed(0)}%`} />
  );
  const progressInstance2 = (
    <ProgressBar now={bar2} label={`${bar2.toFixed(0)}%`} />
  );
  const progressInstance3 = (
    <ProgressBar now={bar3} label={"Diamond Achieved"} />
  );

  return (
    <React.Fragment>
      <Navbar showLogin={true} showRegister={true} />
      <Jumbotron
        fluid
        className="mb-0 p-0 text-center"
        style={{
          "background-image":
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Container fluid className="mx-0">
          <Row>
            <Col xl={3} lg={2} md={1}></Col>
            <Col className="">
              <h2 className="text-center mt-3">Volunteer Rewards!</h2>
              <p className="mb-0">
                <strong>
                  Thank you so much for volunteering your valuable time.
                </strong>
              </p>
              <p>
                Volunteer Points are essentially HomeOrder tokens that can be
                used as money to purchase items from the website. Each point is
                worth one dollar. Points can be earned by completing deliveries.
                Volunteers earn a certain amount of points per delivery based on
                the tier that their account is in (see below).
              </p>
              <p className="mb-0 mt-3">
                <strong>Deliveries Completed: </strong> {numDeliveries}
              </p>
              <p className="my-0">
                <strong>Volunteer Point Balance: </strong> {balance}
              </p>
              <p className="mt-0 mb-3">
                <strong>Current Account Tier: </strong> {tier}
              </p>
            </Col>
            <Col xl={3} lg={2} md={1}></Col>
          </Row>
          <Row>
            <Col className="">
              <CardDeck className="mx-0 mb-4">
                <Card
                  className=""
                  style={{
                    display: "inline-block",

                    height: "100%",
                    "background-color": "#faf5f2",
                  }}
                >
                  <Card.Img
                    className="mx-auto mt-4"
                    style={{ width: "50%", height: "50%" }}
                    variant="top"
                    src={silver}
                  />

                  <Card.Body>
                    <Card.Title>Silver Tier (0)</Card.Title>
                    <Card.Text>
                      Silver Tier Volunteers are the base level
                      volunteers,earning <strong>1</strong> point per delivery.
                      Complete 15 deliveries to advance!
                    </Card.Text>
                    {progressInstance}
                  </Card.Body>
                </Card>
                <Card
                  className=""
                  style={{
                    "background-color": "#faf5f2",
                    display: "inline-block",

                    height: "100%",
                  }}
                >
                  <Card.Img
                    className="mx-auto mt-4"
                    style={{ width: "50%", height: "50%" }}
                    variant="top"
                    src={gold}
                  />

                  <Card.Body>
                    <Card.Title>Gold Tier (15)</Card.Title>
                    <Card.Text>
                      {" "}
                      Gold Tier Volunteers earn <strong>2</strong> points per
                      delivery. Complete an additional 35 deliveries to advance
                      to Diamond!
                    </Card.Text>
                    {progressInstance2}
                  </Card.Body>
                </Card>
                <Card
                  className=""
                  style={{
                    "background-color": "#faf5f2",
                    display: "inline-block",

                    height: "100%",
                  }}
                >
                  <Card.Img
                    className="mx-auto mt-4"
                    style={{ width: "50%", height: "50%" }}
                    variant="top"
                    src={diamond}
                  />

                  <Card.Body>
                    <Card.Title>Diamond Tier (50)</Card.Title>
                    <Card.Text>
                      Diamond Tier Volunteers have completed 50 deliveries and
                      have the ability to earn a whopping <strong>3</strong>{" "}
                      points per delivery!
                    </Card.Text>
                    {progressInstance3}
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

export default VolunteerInformation;
