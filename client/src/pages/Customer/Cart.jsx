import React, { Component } from "react";
import Navbar from "../../components/navbar";
import http from "../../axiosconfig/axios_settings";
import urls from "../../Url_List.json";
import ItemCard from "../../components/ItemCard";
import {
  Jumbotron,
  Card,
  CardDeck,
  Container,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";

class Cart extends Component {
  state = { items: [], price: 0, loading: true, hasAddress: true };

  componentDidMount() {
    this.getItems();
  }

  getItems = async () => {
    const { data } = await http.get(urls.getCustomerProfile);
    console.log(data.address);
    if (data.address === "") {
      this.setState({
        hasAddress: false,
      });
    }
    this.setState({
      items: data.cart.map((item) => {
        return <ItemCard addToTotal={this.addToTotal} key={item} id={item} />;
      }),
      loading: false,
    });
  };

  addToTotal = (priceItem) => {
    this.setState({ price: this.state.price + priceItem });
  };

  purchaseAll = async () => {
    const price = this.state.price;
    const { data } = await http.get(urls.getRewardPoints);
    const availablePoints = data.rewardPoints;
    console.log(`AVAILABLE POINTS: ${availablePoints}`);

    if (availablePoints >= price) {
      await http.put(urls.spendRewardPoints, { points: price });
      await http.post(urls.postOrder, { price });
    } else {
      // TODO: print error (maybe alert?)
    }
  };

  emptyCart = async () => {
    await http.put(urls.removeOrder);
  };

  render() {
    return (
      <React.Fragment>
        <Navbar showLogout={true} isAdmin={true} />
        <Jumbotron
          fluid
          className="mb-0 p-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
            minHeight: "100vh",
          }}
        >
          {this.state.loading && (
            <Spinner
              style={{ marginTop: "20%", marginLeft: "50%" }}
              animation="border"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          {!this.state.loading && this.state.hasAddress && (
            <Container fluid>
              <Row className="">
                <Col className="">
                  <h1 className="text-center mt-5">Your Cart</h1>
                </Col>
              </Row>
              <Row
                style={{
                  "align-items": "center",
                  "justify-content": "center",
                }}
              >
                <Col
                  className=" justify-content-md-center"
                  xs={0}
                  style={{
                    width: "3vw",
                  }}
                ></Col>
                <Col
                  style={{
                    display: "inline-block",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="m-0  justify-content-center"
                >
                  <CardDeck
                    className=" "
                    style={{
                      "align-items": "center",
                      "justify-content": "center",
                      display: "inline-block",
                    }}
                  >
                    {this.state.items}
                  </CardDeck>
                </Col>
                <Col xs={0} className=""></Col>
              </Row>
              <Row style={{ minHeight: "30vh" }}>
                <Col lg={{ span: 6, offset: 3 }} className="">
                  <Card
                    className="mx-auto mb-3"
                    style={{
                      "background-color": "#faf5f2",
                      width: "75%",
                    }}
                    text={"dark"}
                  >
                    <Card.Body style={{ "text-align": "center" }}>
                      <h1> Total Amount: {this.state.price} </h1>
                    </Card.Body>
                    <Link
                      to="/customerprofile"
                      className="mx-auto mb-3"
                      style={{ width: "80%" }}
                    >
                      <Button
                        onClick={this.purchaseAll}
                        style={{ width: "100%" }}
                        className="mx-auto mb-3"
                        variant={"success"}
                      >
                        Purchase All Items In Cart With Points
                      </Button>
                    </Link>

                    <Link
                      style={{ width: "80%" }}
                      className="mx-auto mb-3"
                      to="/ShopProducts"
                    >
                      <Button
                        onClick={this.emptyCart}
                        style={{ width: "100%" }}
                        className="mx-auto mb-3"
                        variant={"danger"}
                      >
                        Remove All Items From Cart
                      </Button>
                    </Link>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}
          {!this.state.loading && !this.state.hasAddress && (
            <Container fluid>
              <Alert
                className="mx-auto"
                style={{ width: "40%", alignItems: "center" }}
                variant="danger"
              >
                <p className="text-center">You need to enter your address</p>
                <Link className="text-center" to="/CustomerSettings">
                  <div className="text-center">
                    <Button variant="outline-success">Add Address</Button>
                  </div>
                </Link>
              </Alert>
            </Container>
          )}
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Cart;
