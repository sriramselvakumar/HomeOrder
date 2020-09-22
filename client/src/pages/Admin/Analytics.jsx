import React from "react";
import Navbar from "../../components/navbar";
import Jumbotron from "react-bootstrap/Jumbotron";
const Analytics = () => {
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
        <h1>Your Analytics</h1>
      </Jumbotron>
    </React.Fragment>
  );
};

export default Analytics;
