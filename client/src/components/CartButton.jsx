import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import cartImage from "../images/MyCart.png";
const CartButton = () => {
  return (
    <React.Fragment>
      <Nav.Link href="/Cart" className=" mr-2">
        <img alt="" src={cartImage} width="30" height="30" />
      </Nav.Link>
    </React.Fragment>
  );
};

export default CartButton;
