import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import urls from "../Url_List.json";
import http from "../axiosconfig/axios_settings";
const ItemCard = (props) => {
  const [item, setItem] = useState({});

  useEffect(() => {
    getItemDetails();
  }, []);

  const getItemDetails = async () => {
    const { data } = await http.put(urls.getItem, { id: props.id });
    props.addToTotal(data.price);
    setItem(data);
  };

  return (
    <Card
      key={item._id}
      className="my-3 ml-4"
      style={{ width: "30vh", height: "100%", display: "inline-block" }}
    >
      <Card.Img
        className=""
        style={{ width: "30vh", height: "30vh" }}
        variant="top"
        src={urls.getImage + item.fileName}
      />
      <Card.Body className="text-center">
        <Card.Title>
          <h6>
            <a href="#">{item.postName}</a>
          </h6>
          <h5>Price: {item.price}</h5>
        </Card.Title>
        <Card.Text>
          <p>Price: {item.stock}</p>
        </Card.Text>
        {/* <Button onClick={() => addToCart(_id)} variant="success">
                Add to Cart
  </Button>*/}
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
