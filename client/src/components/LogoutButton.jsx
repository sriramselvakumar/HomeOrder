import React from "react";
import Button from "react-bootstrap/Button";
const LogoutButton = () => {
  const onLogOut = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <Button onClick={onLogOut} variant="outline-danger">
      Log Out
    </Button>
  );
};

export default LogoutButton;
