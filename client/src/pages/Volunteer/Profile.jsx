import React, { useState, useEffect } from "react";
import {
  Button,
  Jumbotron,
  Card,
  Spinner,
  ListGroup,
  ListGroupItem,
  CardColumns,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../CSS/OrderProfile.css";
import Navbar from "../../components/navbar";
import http from "../../axiosconfig/axios_settings";
import urls from "../../Url_List.json";
const VolunteerProfile = () => {
  const [volunteer, setVolunteer] = useState("");
  const [orders, setOrders] = useState([]);
  const [pickedOrders, setPickedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await http.get(urls.getVolunteerProfile);
    setVolunteer(res.data);
    if (res.data.address === "") {
      setShowAlert(true);
      setLoading(false);
      return;
    }

    http.get(urls.getVolunteerOrders).then((orders) => {
      setPickedOrders(orders.data);
    });

    http.get(urls.getUnpickedOrders).then((orders) => {
      setOrders(orders.data);
      setLoading(false);
    });
  };

  const routeToSeeMore = (id) => {
    window.location = "/ViewOrder";
    localStorage.setItem("orderID", id);
  };

  const pickedCardComp = () => {
    let cards = [];
    for (let a = 0; a < pickedOrders.length; a++) {
      const { itemLength, APIData, _id } = pickedOrders[a];
      cards.push(
        <Card key={_id} style={{ backgroundColor: "#faf5f2", width: "18rem" }}>
          <Card.Title>Order</Card.Title>
          <ListGroup>
            <ListGroupItem>
              Items to pickup: {pickedOrders[a].items.length}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                onClick={() => routeToSeeMore(_id)}
                variant="outline-success"
              >
                See More
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      );
    }
    return cards;
  };
  const cardComp = () => {
    let cards = [];
    for (let a = 0; a < orders.length; a++) {
      const { itemLength, APIData, _id } = orders[a];
      cards.push(
        <Card key={_id} style={{ backgroundColor: "#faf5f2", width: "18rem" }}>
          <Card.Title>Order</Card.Title>
          <ListGroup>
            <ListGroupItem>Distance: {APIData.distance}</ListGroupItem>
            <ListGroupItem>Items to pickup: {itemLength}</ListGroupItem>
            <ListGroupItem>
              <Button
                onClick={() => routeToSeeMore(_id)}
                variant="outline-success"
              >
                See More
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      );
    }
    return cards;
  };

  const afterLoading = () => {
    return (
      <React.Fragment>
        <h1 className="text-center"> Hey {volunteer.firstName}!</h1>
        <h3 className="text-center"> Your Picked Orders</h3>
        <CardColumns>{pickedCardComp()}</CardColumns>
        <h3 className="text-center"> Get Started by choosing an order</h3>
        <CardColumns>{cardComp()}</CardColumns>
      </React.Fragment>
    );
  };
  const alertfunction = () => {
    if (showAlert) {
      return (
        <React.Fragment>
          <h1 className="text-center"> Hey {volunteer.firstName}!</h1>
          <h3 className="text-center"> Get Started by choosing an order</h3>
          <Alert className="mx-auto" style={{ width: "40%" }} variant="danger">
            <p>You need to enter your address</p>
            <Link to="/VolunteerSettings">
              <Button variant="outline-success">Add Address</Button>
            </Link>
          </Alert>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <Navbar showLogout={true} isVolunteer={true} />
      <Jumbotron
        fluid
        className="mb-0 p-0 text-center"
        style={{
          "background-image":
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
          minHeight: "100vh",
        }}
      >
        {loading && (
          <Spinner
            style={{ marginTop: "20%" }}
            animation="border"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {!loading && (
          <>
            {!showAlert && afterLoading()} {alertfunction()}
          </>
        )}
      </Jumbotron>
    </React.Fragment>
  );
};

export default VolunteerProfile;
