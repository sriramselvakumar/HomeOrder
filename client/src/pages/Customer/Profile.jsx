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
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../CSS/OrderProfile.css";
import Navbar from "../../components/navbar";
import http from "../../axiosconfig/axios_settings";
import urls from "../../Url_List.json";

import CardDeck from "react-bootstrap/CardDeck";
import VolunteerProfile from "../Volunteer/Profile";

const CustomerProfile = () => {
  const [currentForm, setCurrentForm] = useState("change-profile");
  const [customer, setCustomer] = useState({});
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState();
  const [posts, setPosts] = useState([]);

  const displayOrderArray = (itemArray) => {
    let items = "";
    for (let i = 0; i < itemArray.length; i++) {
      const appendage = itemArray[i] + ", ";
      items += appendage;
    }
    return items;
  };

  const confirm = async (id) => {
    let obj = {
      id: id,
    };
    console.log(id);
    window.location.reload();
    await http.put(urls.confirmDelivery, obj);
    console.log("hi");
  };

  const loadCustomerData = async () => {
    let postCount = 0;
    let response = await http.get(urls.getCustomerProfile);
    setCustomer(response.data);
    const res = await http.get(urls.getCustomerOrders);

    const orders = res.data;

    const postToBeSet = orders.map((order) => {
      postCount++;
      let { isAssigned, itemArray, id } = order;
      return (
        <Card
          className="my-3 ml-4"
          style={{ width: "40%", height: "100%", display: "inline-block" }}
        >
          <Card.Title className="text-center">
            <strong>Order #</strong>
            {postCount}
          </Card.Title>
          <ListGroup>
            <ListGroupItem>
              {isAssigned
                ? "A Volunteer is assigned to your Order"
                : "Waiting on Volunteer"}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Items:</strong> {displayOrderArray(itemArray)}
            </ListGroupItem>
            <Card.Body>
              <div className="text-center">
                <Link to={`/Chat?chatID=${id}`}>
                  <Button variant="outline-success mb-2">Open Chat</Button>
                </Link>
              </div>
              <div className="text-center mb-0 pb-0">
                <Button onClick={() => confirm(id)}> Confirm Delivery</Button>
              </div>
            </Card.Body>
          </ListGroup>
        </Card>
      );
    });

    setPosts(postToBeSet);
    setLoading(false);
  };
  useEffect(() => {
    loadCustomerData();
  }, []);

  return (
    <React.Fragment>
      <Navbar showLogout={true} isCustomer={true} />
      <Jumbotron
        fluid
        className="mb-0 p-0"
        style={{
          "background-image":
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
          minHeight: "100vh",
        }}
      >
        {loading && (
          <Spinner
            style={{ marginTop: "20%", marginLeft: "50%" }}
            animation="border"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {!loading && (
          <>
            <Container fluid>
              <Row>
                <Col xl={3} lg={2} md={1}></Col>
                <Col className="">
                  <h1 className="text-center">Your Profile</h1>

                  <h2 className="text-center mt-3">Your Recent Orders </h2>
                </Col>
                <Col xl={3} lg={2} md={1}></Col>
              </Row>
              <Row style={{ alignItems: "center", justifyContent: "center" }}>
                <Col
                  xs={0}
                  className=" justify-content-md-center "
                  style={{ width: "3vw" }}
                ></Col>
                <Col style={{}} className="m-0  ">
                  <CardDeck
                    className=" "
                    style={{
                      display: "inline-block",
                    }}
                  >
                    {posts}
                  </CardDeck>
                </Col>
                <Col xs={0} className=""></Col>
              </Row>
            </Container>
          </>
        )}
      </Jumbotron>
    </React.Fragment>
  );
};

export default CustomerProfile;
