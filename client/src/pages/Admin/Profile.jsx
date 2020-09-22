import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import http from "../../axiosconfig/axios_settings";
import urls from "../../Url_List.json";
const AdminProfile = () => {
  const [posts, setPosts] = useState([]);
  const [admin, setAdmin] = useState({});

  const loadAdminData = async () => {
    let response = await http.get(urls.getAdminProfile);
    if (response != "undefined") {
      setAdmin(response.data);
    }
  };
  useEffect(() => {
    getPosts();
    loadAdminData();
  });

  const getPosts = async () => {
    const { data } = await http.get(urls.getAdminPosts);
    const products = data;
    data.sort((a, b) => {
      return b.purchased - a.purchased;
    });

    const postsToBeSet = products.map((product) => {
      let { fileName, postName, price, stock, purchased, _id } = product;
      fileName = urls.getImage + fileName;
      return (
        <Card
          key={_id}
          className="my-3 ml-4"
          style={{ width: "30vh", height: "100%", display: "inline-block" }}
        >
          <Card.Img
            className=""
            variant="top"
            src={fileName}
            style={{ width: "30vh", height: "30vh" }}
          />
          <Card.Body className="text-center">
            <Card.Title>
              <h6>
                <a href="#">{postName}</a>
              </h6>
              <h5>Amount Purchased: {purchased}</h5>
            </Card.Title>
            <Card.Text>
              <p>In stock: {stock}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    });

    setPosts(postsToBeSet);
  };

  return (
    <React.Fragment>
      <Navbar showLogout={true} isAdmin={true} />
      <Jumbotron
        fluid
        className="mb-0 p-0 text-center"
        style={{
          "background-image":
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
          minHeight: "100vh",
        }}
      >
        <Container fluid>
          <Row>
            <Col xs={3} className=""></Col>
            <Col>
              {" "}
              <h1 className="text-center">{admin.companyName}</h1>
              <Button variant="success" href="/create">
                Create A New Product Posting
              </Button>
              <span style={{ width: "5%" }}> </span>
              <Button variant="success" href="/AdminSettings">
                Change Your Business Address
              </Button>
              <h2 className="text-center mt-3">Your Analytics </h2>
            </Col>
            <Col xs={3} className=""></Col>
          </Row>
          <Row style={{ alignItems: "center", justifyContent: "center" }}>
            <Col
              xs={0}
              className=" justify-content-md-center "
              style={{ width: "3vw" }}
            ></Col>
            <Col
              style={{
                display: "inline-block",
              }}
              className="m-0  "
            >
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
      </Jumbotron>
    </React.Fragment>
  );
};

export default AdminProfile;
