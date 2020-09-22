import React, { useState, useEffect } from "react";
import { Jumbotron, Spinner, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import http from "../../axiosconfig/axios_settings";
import urls from "../../Url_List.json";

const OrderView = () => {
  const [volunteerID, setVolunteerID] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pickText, setPickText] = useState("Pick Up");
  const [renderPick, setRenderPick] = useState(null);
  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    const id = localStorage.getItem("orderID");
    //localStorage.removeItem("orderID");
    http.get(urls.getOrder + id).then((res) => {
      console.log(res.data);
      setOrder(res.data);
      if (!res.data.isAssigned) {
        setRenderPick(
          <Link to="/volunteerProfile">
            <Button
              onClick={handlePick}
              style={{ marginTop: "10px", marginRight: "2%" }}
              variant="outline-success"
            >
              {pickText}
            </Button>
          </Link>
        );
      }
      setLoading(false);
    });
  };

  const renderPickups = () => {
    const { pickups } = order;
    let renderArray = [];
    for (let a = 0; a < pickups.length; a++) {
      let { address, companyName, products, _id } = pickups[a];
      let items = [];
      for (let b = 0; b < products.length; b++) {
        let { postName, count } = products[b];
        items.push(
          <React.Fragment key={products[b]._id}>
            <h5 className="text-center">{postName}</h5>

            <li className="text-center">count: {count}</li>
          </React.Fragment>
        );
      }
      renderArray.push(
        <React.Fragment>
          <Card
            key={_id}
            className="mx-auto"
            style={{
              backgroundColor: "#faf5f2",
              width: "40%",
              marginTop: "10px",
            }}
          >
            <h3 className="text-center">{companyName}</h3>
            <ul style={{ listStyle: "none" }}>
              <li className="text-left">Address: {address}</li>
              <h4 className="text-center"> Items To Pick Up</h4>
              {items}
            </ul>
          </Card>
        </React.Fragment>
      );
    }
    return renderArray;
  };

  const alert = () => {
    return (
      <Alert className="mx-auto" style={{ width: "50%" }} variant="success">
        <Alert.Heading>Your Time Is Valuable!</Alert.Heading>
        <p>
          Homeorder tells you the most optimal route from your home through all
          the stores and to the customer by presenting them to you in the order
          you should pick them up.
        </p>
      </Alert>
    );
  };

  const handlePick = async () => {
    const id = localStorage.getItem("orderID");
    let obj = { id };
    await http.put(urls.assignVolunteer, obj);
    setPickText("Picked!");
    window.location = "/volunteerProfile";
  };

  const renderCards = () => {
    const { firstName, lastName, address } = order.customer;
    return (
      <React.Fragment>
        {renderPickups()}
        <Card
          className="mx-auto"
          style={{
            backgroundColor: "#faf5f2",
            width: "40%",
            marginTop: "10px",
          }}
        >
          <Card.Title>
            <h5 className="text-center">Customer Details</h5>
          </Card.Title>
          <Card.Body>
            <ul style={{ listStyle: "none" }}>
              <li className="text-left">
                Name: {firstName} {lastName}
              </li>
              <li className="text-left">Address: {address}</li>
            </ul>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
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
        <h1>Order Information</h1>
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
            {alert()}
            {renderCards()}
            {renderPick}
            <Link to={`/Chat?chatID=${order._id}`}>
              <Button style={{ marginTop: "10px" }} variant="outline-success">
                Open Chat
              </Button>
            </Link>
          </>
        )}
      </Jumbotron>
    </React.Fragment>
  );
};

export default OrderView;
