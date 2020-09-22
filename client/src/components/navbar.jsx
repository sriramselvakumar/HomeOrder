import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import GatorLogo from "../images/UFLogo.png";
import Nav from "react-bootstrap/Nav";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import LogoutButton from "./LogoutButton";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import http from "../axiosconfig/axios_settings";
import urls from "../Url_List.json";
import CartButton from "./CartButton";

const Navs = (props) => {
  const [userStatus, setUserStatus] = useState("");
  let { showLogin, showRegister } = props;

  useEffect(() => {
    loggedInUser();
  });

  const loggedInUser = async () => {
    const possibleToken = localStorage.getItem("token");
    if (!possibleToken) {
      setUserStatus(false);
      return;
    }
    const { data } = await http.get(urls.getUserType);
    setUserStatus(data);
  };

  const loggedIn = () => {
    if (localStorage.getItem("token") && userStatus === "customer") {
      return (
        <React.Fragment>
          <Nav.Link href="/ShopProducts">Shop Products</Nav.Link>
          <Nav.Link href="/CommunityBoard">Community Board</Nav.Link>
        </React.Fragment>
      );
    }
    if (localStorage.getItem("token") && userStatus === "volunteer") {
      return (
        <React.Fragment>
          <Nav.Link href="/CommunityBoard">Community Board</Nav.Link>
          <Nav.Link href="/VolunteerInformation">Volunteer Rewards</Nav.Link>
        </React.Fragment>
      );
    }
    if (localStorage.getItem("token") && userStatus === "admin") {
      return (
        <React.Fragment>
          <Nav.Link href="/CommunityBoard">Community Board</Nav.Link>
        </React.Fragment>
      );
    }
    return null;
  };

  const renderButtons = () => {
    if (localStorage.getItem("token")) {
      return (
        <React.Fragment>
          <LogoutButton />
        </React.Fragment>
      );
    } else if (showLogin && showRegister) {
      return (
        <React.Fragment>
          <LoginButton />
          <RegisterButton />
        </React.Fragment>
      );
    } else if (showLogin && !showRegister) {
      return <LoginButton />;
    } else if (showRegister && !showLogin) {
      return <RegisterButton />;
    } else {
      return null;
    }
  };

  const displayCart = () => {
    return <CartButton />;
  };

  const renderNavLinks = () => {
    if (userStatus === "admin") {
      return (
        <React.Fragment>
          <NavDropdown
            className="mb-3"
            title="My Account"
            id="collapsible-nav-dropdown"
          >
            <NavDropdown.Item href="/adminprofile">My Profile</NavDropdown.Item>
            <NavDropdown.Item href="/create">Create Posting</NavDropdown.Item>
            <NavDropdown.Item href="/AdminSettings">Settings</NavDropdown.Item>
          </NavDropdown>
        </React.Fragment>
      );
    } else if (userStatus === "volunteer") {
      return (
        <React.Fragment>
          <NavDropdown title="My Account" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="/volunteerProfile">
              My Profile
            </NavDropdown.Item>
            <NavDropdown.Item href="/VolunteerSettings">
              Settings
            </NavDropdown.Item>
          </NavDropdown>
        </React.Fragment>
      );
    } else if (userStatus === "customer") {
      return (
        <React.Fragment>
          {displayCart()}
          <NavDropdown title="My Account" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="/customerprofile">
              My Profile
            </NavDropdown.Item>
            <NavDropdown.Item href="/CustomerSettings">
              Settings
            </NavDropdown.Item>
          </NavDropdown>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={GatorLogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            HomeOrder
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {loggedIn()}
              <Nav.Link href="/AboutUs">About Us</Nav.Link>
              <Nav.Link href="/ContactUs">Contact Us</Nav.Link>
            </Nav>
            <Nav className="ml-0">{renderNavLinks()}</Nav>
            <Nav className="ml-2">{renderButtons()}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default Navs;
