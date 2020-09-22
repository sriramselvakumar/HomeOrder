import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
const LoginButton = () => {
  return (
    <Link to="/login">
      <Button className="mr-1" variant="outline-primary">
        Login
      </Button>
    </Link>
  );
};

export default LoginButton;
