import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import CustomerForm from "../components/CustomerForm";
import http from "../axiosconfig/axios_settings";
import URLs from "../Url_List.json";

const CustomerFormPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeFirstName = (e) => {
    setFirstName(e);
    console.log(firstname);
  };

  const changeLastName = (e) => {
    setLastName(e);
    console.log(lastname);
  };

  const changeEmail = (e) => {
    setEmail(e);
    console.log(email);
  };

  const changePassword = (e) => {
    setPassword(e);
    console.log(password);
  };

  const submit = async () => {
    let customerObject = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    const response = await http.post(URLs.registerCustomer, customerObject);
    localStorage.setItem("token", response.data);
    window.location = "/customerprofile";
  };

  return (
    <React.Fragment>
      <Navbar showLogin={true} />
      <CustomerForm
        mode={"customer"}
        FirstName={changeFirstName}
        LastName={changeLastName}
        email={changeEmail}
        password={changePassword}
        submit={submit}
      />
    </React.Fragment>
  );
};

export default CustomerFormPage;
