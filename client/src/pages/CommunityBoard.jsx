import React, { useState, useEffect } from "react";
import { Card, Jumbotron, Form, Button, Spinner } from "react-bootstrap";
import Navbar from "../components/navbar";
import http from "../axiosconfig/axios_settings";
import urls from "../Url_List.json";
import Post from "../components/BoardPost";

const CommunityBoard = () => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [boardPosts, setBoardPosts] = useState(null);

  const onSubmit = async () => {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("picture", file);
    await http.post(urls.postBoardPost, formData);
    setLoading(true);
  };

  useEffect(() => {
    loadPosts();
  }, [loading]);

  const loadPosts = async () => {
    http.get(urls.getBoardPosts).then((posts) => {
      const { data } = posts;
      let postArr = [];
      for (let a = 0; a < data.length; a++) {
        postArr.push(<Post post={data[a]} />);
      }
      setBoardPosts(postArr);
      setLoading(false);
    });
  };
  return (
    <React.Fragment>
      <Navbar showLogin={true} showRegister={true} />
      <Jumbotron
        fluid
        className="mb-0 p-0 text-center"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
          minHeight: "100vh",
        }}
      >
        <h1>Community Board</h1>
        {loading && (
          <>
            <Spinner
              style={{ marginTop: "20%" }}
              animation="border"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </>
        )}
        {!loading && (
          <>
            <Card
              className="mx-auto"
              style={{ width: "40%", backgroundColor: "#faf5f2" }}
            >
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Title of your post"
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="Write more about your post"
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.File
                      id="exampleFormControlFile1"
                      onChange={(event) => setFile(event.target.files[0])}
                    />
                  </Form.Group>
                </Form>
                <Button
                  onClick={onSubmit}
                  className="mx-auto"
                  variant="outline-success"
                >
                  Post
                </Button>
              </Card.Body>
            </Card>
            {boardPosts}
          </>
        )}
      </Jumbotron>
    </React.Fragment>
  );
};

export default CommunityBoard;
