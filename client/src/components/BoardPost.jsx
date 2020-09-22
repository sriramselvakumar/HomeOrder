import React, { useState, useEffect } from "react";
import urls from "../Url_List.json";
import { Card, Spinner, Form, Button } from "react-bootstrap";
import http from "../axiosconfig/axios_settings";

const BoardPost = (props) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeClass, setLikeClass] = useState("fa fa-heart-o");
  const [commentClass, setCommentClass] = useState("fa fa-commenting-o");
  const [renderComments, setRenderComments] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = () => {
    const { post } = props;
    const currentUser = post.id;
    setPost(post);
    if (post.post.likes.includes(currentUser)) {
      setLikeClass("fa fa-heart");
    }
    let list = [];
    for (let a = 0; a < post.comments.length; a++) {
      const { name, comment } = post.comments[a];
      list.push(
        <Card
          className="mx-auto"
          style={{
            width: "30%",
            backgroundColor: "#faf5f2",
            marginTop: "2%",
          }}
        >
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">By {name}</Card.Subtitle>
            {comment}
          </Card.Body>
        </Card>
      );
    }
    setRenderComments(list);
    setLoading(false);
  };

  const onSubmit = async () => {
    const obj = {
      id: post.post._id,
      comment,
    };
    let list = [...renderComments];
    let temp = comment;
    list.push(
      <Card
        key={list.length}
        className="mx-auto"
        style={{
          width: "30%",
          backgroundColor: "#faf5f2",
          marginTop: "2%",
        }}
      >
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">By You</Card.Subtitle>
          {temp}
        </Card.Body>
      </Card>
    );
    setComment("");
    setRenderComments(list);
    await http.put(urls.addComment, obj);
  };
  const showComment = () => {
    if (showComments) {
      return (
        <React.Fragment>
          <Card
            className="mx-auto"
            style={{
              width: "30%",
              backgroundColor: "#faf5f2",
              marginTop: "2%",
            }}
          >
            <Card.Body>
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    onChange={(event) => setComment(event.target.value)}
                    value={comment}
                    as="textarea"
                    placeholder="Post a comment"
                    rows="2"
                  />
                </Form.Group>
                <Button onClick={onSubmit} variant="success">
                  Post
                </Button>
              </Form>
            </Card.Body>
          </Card>
          {renderComments}
        </React.Fragment>
      );
    } else {
      return null;
    }
  };
  const handleLike = async () => {
    const obj = { postID: post.post._id };
    if (likeClass === "fa fa-heart-o") {
      setLikeClass("fa fa-heart");
      await http.put(urls.likeBoardPost, obj);
    } else {
      setLikeClass("fa fa-heart-o");
      await http.put(urls.hateBoardPost, obj);
    }
  };
  const handleComment = () => {
    if (commentClass === "fa fa-commenting-o") {
      setCommentClass("fa fa-commenting");
      setShowComments(true);
    } else {
      setCommentClass("fa fa-commenting-o");
      setShowComments(false);
    }
  };

  return (
    <React.Fragment>
      <Card
        className="mx-auto"
        style={{ width: "40%", backgroundColor: "#faf5f2", marginTop: "2%" }}
      >
        {loading && (
          <>
            <Card.Body>
              <Spinner
                className="mx-auto"
                style={{ marginTop: "20%" }}
                animation="border"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Card.Body>
          </>
        )}
        {!loading && (
          <>
            <Card.Img
              variant="top"
              src={urls.getImage + post.post.fileName}
              style={{ width: "100%" }}
            />
            <Card.Title>{post.post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {" "}
              By {post.name}
            </Card.Subtitle>
            <Card.Body>
              {post.post.description}
              <div>
                <i
                  onClick={handleLike}
                  style={{ marginRight: "2%" }}
                  className={likeClass}
                  aria-hidden="true"
                ></i>
                <i
                  onClick={handleComment}
                  className={commentClass}
                  aria-hidden="true"
                ></i>
              </div>
            </Card.Body>
          </>
        )}
      </Card>
      {showComment()}
    </React.Fragment>
  );
};

export default BoardPost;
