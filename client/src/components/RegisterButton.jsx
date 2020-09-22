import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
const RegisterButton = () => {
  return (
    <Link to="/register">
      <Button className="mr-1" variant="outline-primary">
        Register
      </Button>
    </Link>
  );
};

export default RegisterButton;
