import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import VolunteerForm from "../components/VolunteerForm";
import http from "../axiosconfig/axios_settings";
import URLs from "../Url_List.json";

const VolunteerFormPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeFirstName = (e) => {
    setFirstName(e);
  };

  const changeLastName = (e) => {
    setLastName(e);
  };

  const changeEmail = (e) => {
    setEmail(e);
  };

  const changePassword = (e) => {
    setPassword(e);
  };

  const submit = async () => {
    let volunteerObject = {
      firstname,
      lastname,
      email,
      password,
    };

    const response = await http.post(URLs.registerVolunteer, volunteerObject);
    localStorage.setItem("token", response.data);
    window.location = "/volunteerProfile";
  };

  return (
    <React.Fragment>
      <Navbar showLogin={true} />
      <VolunteerForm
        mode={"volunteer"}
        FirstName={changeFirstName}
        LastName={changeLastName}
        email={changeEmail}
        password={changePassword}
        submit={submit}
      />
    </React.Fragment>
  );
};

export default VolunteerFormPage;
