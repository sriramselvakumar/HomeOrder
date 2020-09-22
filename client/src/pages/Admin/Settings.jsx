import React from "react";
import Navbar from "../../components/navbar";
import { Jumbotron } from "react-bootstrap";
import AddressForm from "../../components/AddressForm";
import http from "../../axiosconfig/axios_settings";
import urls from "../../Url_List.json";
import { Container, Row, Col } from "react-bootstrap";
const Settings = () => {
  const onSubmit = async (address) => {
    window.location = "/adminprofile";
    await http.put(urls.changeAdminAddress, address);
  };
  return (
    <React.Fragment>
      <Navbar showLogout={true} isAdmin={true} />
      <Jumbotron
        fluid
        className="mb-0 p-0"
        style={{
          "background-image":
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
          minHeight: "100vh",
        }}
      >
        <Container>
          <Row>
            <Col></Col>
            <Col xs={12} sm={10} md={8} lg={6}>
              <h1 className="mt-4 text-center">Settings</h1>
              <AddressForm submit={onSubmit} />
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Jumbotron>
    </React.Fragment>
  );
};

export default Settings;
