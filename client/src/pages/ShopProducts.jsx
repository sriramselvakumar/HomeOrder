import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import Search from "../components/Search";
import Sort from "../components/Sort";
import http from "../axiosconfig/axios_settings";
import urls from "../Url_List.json";
import { Container, Row, Col } from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const ShopProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSort] = useState("");
  const [posts, setPosts] = useState([]);

  const changeSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const changeSort = (option) => {
    setSort(option);
  };

  const addToCart = async (id) => {
    await http.put(urls.addItemToCart, { id });
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content className="text-center">
        <strong>Added</strong>
      </Popover.Content>
    </Popover>
  );

  const Example = (_id) => (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
      <Button onClick={() => addToCart(_id)} variant="success">
        Add to Cart
      </Button>
    </OverlayTrigger>
  );

  useEffect(() => {
    getPosts();
  }, [searchQuery, sortBy]);

  const getPosts = async () => {
    const { data } = await http.get(urls.getAllPosts);
    const products = data;

    if (sortBy === "price") {
      data.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortBy === "popularity") {
      data.sort((a, b) => {
        return b.purchased - a.purchased;
      });
    }

    const postsToBeSet = products.map((product) => {
      let { fileName, postName, price, stock, _id } = product;
      fileName = urls.getImage + fileName;
      if (postName.toLowerCase().includes(searchQuery.toLowerCase())) {
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
                <h5>Price: {price}</h5>
              </Card.Title>
              <Card.Text>
                <p>In stock: {stock}</p>
              </Card.Text>
              {Example(_id)}
            </Card.Body>
          </Card>
        );
      }

      return null;
    });

    setPosts(postsToBeSet);
  };

  return (
    <React.Fragment>
      <Navbar showLogin={true} showRegister={true} />

      <Jumbotron
        fluid
        className="mb-0 p-4"
        style={{
          "background-image":
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
          minHeight: "100vh",
        }}
      >
        <Container fluid>
          <Row>
            <Col xs={0} sm={1} md={2} lg={3} className=""></Col>
            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                "align-items": "center",
                "justify-content": "center",
                height: "80px",
              }}
              className="mb-2"
            >
              <Sort changeSort={changeSort} />
              <span style={{ width: "20px" }}> </span>
              <Search onChange={changeSearchQuery} />
            </Col>
            <Col xs={0} sm={1} md={2} lg={3} className=""></Col>
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

export default ShopProducts;
