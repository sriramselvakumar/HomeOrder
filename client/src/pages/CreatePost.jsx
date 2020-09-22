import React, { useState, useEffect } from "react";
import http from "../axiosconfig/axios_settings";
import urls from "../Url_List.json";
import PostForm from "../components/PostForm";
import { Jumbotron, Spinner, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const CreatePage = () => {
  const [author, setAuthor] = useState({});
  const [authID, setAuthID] = useState("");
  const [orgName, setOrgName] = useState("");
  const [postName, setPostName] = useState("");
  const [fileName, setFileName] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [addressExists, setAddressExists] = useState(true);

  const changeAuthor = async () => {
    let response = await http.get(urls.getAdminProfile);
    setAuthor(response.data);
    setAuthID(author._id);
    setOrgName(author.companyName);
  };

  useEffect(() => {
    changeAuthor();
  });

  useEffect(() => {
    loadAdmin();
  }, []);

  const loadAdmin = () => {
    http.get(urls.getAdminProfile).then((admin) => {
      if (admin.data.address === "") {
        setAddressExists(false);
      }
      setLoading(false);
    });
  };

  const changePostName = (e) => {
    setPostName(e);
  };
  const changeFileName = (e) => {
    setFileName(e);
  };
  const changeCategory = (e) => {
    setCategory(e);
  };

  const changePrice = (e) => {
    setPrice(e);
  };
  const changeStock = (e) => {
    setStock(e);
  };

  const onSubmit = async () => {
    let formData = new FormData();
    formData.append("picture", fileName);
    formData.append("orgName", orgName);
    formData.append("postName", postName);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("author", authID);
    let response = await http.post(urls.createPost, formData);
  };

  return (
    <React.Fragment>
      <Navbar showLogout={true} isAdmin={true} />
      <Jumbotron
        fluid
        className="mb-0"
        style={{
          "background-image":
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
          minHeight: "100vh",
        }}
      >
        {loading && (
          <>
            <Spinner
              style={{ marginTop: "20%", marginLeft: "50%" }}
              animation="border"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </>
        )}
        {!loading && addressExists && (
          <>
            <PostForm
              postName={changePostName}
              fileName={changeFileName}
              category={changeCategory}
              price={changePrice}
              stock={changeStock}
              submit={onSubmit}
            />
          </>
        )}
        {!loading && !addressExists && (
          <>
            <Alert
              className="mx-auto"
              style={{ width: "40%", alignItems: "center" }}
              variant="danger"
            >
              <p className="text-center">You need to enter your address</p>
              <Link className="text-center" to="/AdminSettings">
                <div className="text-center">
                  <Button variant="outline-success">Add Address</Button>
                </div>
              </Link>
            </Alert>
          </>
        )}
      </Jumbotron>
    </React.Fragment>
  );
};

export default CreatePage;
