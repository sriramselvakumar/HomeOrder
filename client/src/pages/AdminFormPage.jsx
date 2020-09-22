import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import AdminForm from "../components/AdminForm";
import http from "../axiosconfig/axios_settings";
import URLs from "../Url_List.json";

const AdminFormPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyname, setCompanyName] = useState("");

  const changeFirstName = (e) => {
    setFirstName(e);
  };

  const changeLastName = (e) => {
    setLastName(e);
  };

  const changeCompanyName = (e) => {
    setCompanyName(e);
  };

  const changeEmail = (e) => {
    setEmail(e);
  };

  const changePassword = (e) => {
    setPassword(e);
  };

  const submit = async () => {
    let adminObject = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      companyname: companyname,
    };

    const response = await http.post(URLs.registerAdmin, adminObject);
    localStorage.setItem("token", response.data);
    window.location = "/adminprofile";
  };

  return (
    <React.Fragment>
      <Navbar showLogin={true} />
      <AdminForm
        mode={"admin"}
        FirstName={changeFirstName}
        LastName={changeLastName}
        companyName={changeCompanyName}
        email={changeEmail}
        password={changePassword}
        submit={submit}
      />
    </React.Fragment>
  );
};

export default AdminFormPage;
