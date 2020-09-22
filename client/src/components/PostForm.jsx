import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import InputGroup from "react-bootstrap/InputGroup";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const PostForm = (props) => {
  const changePostName = (e) => {
    props.postName(e.target.value);
  };
  const changeImages = async (e) => {
    props.fileName(e.target.files[0]);
  };

  const changeCategory = (e) => {
    props.category(e.target.value);
  };

  const changePrice = (e) => {
    props.price(e.target.value);
  };
  const changeStock = (e) => {
    props.stock(e.target.value);
  };

  return (
    <React.Fragment>
      <Card
        className="mx-auto p-4"
        style={{
          "background-color": "#faf5f2",
          width: "85%",
        }}
        text={"dark"}
      >
        {" "}
        <div className="container">
          <h5 className="text-center">Post a Product</h5>
          <Form>
            <Form.Group>
              <Form.Label>Post Name: </Form.Label>
              <Form.Control
                type="text"
                onChange={changePostName}
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image: </Form.Label>
              <Form.Control
                type="file"
                onChange={changeImages}
                placeholder="Normal text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stock: </Form.Label>
              <Form.Control
                type="number"
                onChange={changeStock}
                placeholder="Stock"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price: </Form.Label>
              <Form.Control
                type="number"
                onChange={changePrice}
                placeholder="Price"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category: </Form.Label>
              <Form.Control as="select" onChange={changeCategory}>
                <option>Electronics</option>
                <option>Home Improvement</option>
                <option>Pets</option>
                <option>Cars</option>
                <option>Raw Materials</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <div className="text-center">
            <Link to="/adminprofile">
              <Button
                onClick={props.submit}
                variant="success"
                style={{ width: "50%" }}
              >
                Post Item
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default PostForm;
