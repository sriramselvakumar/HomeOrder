// some code based on this:
// https://github.com/adrianhajdin/project_chat_application/blob/master/client/src/components/Chat/Chat.js

import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Navbar from "../components/navbar";
import { Jumbotron, Button } from "react-bootstrap";
import ChatMessagesBox from "../components/chat/ChatMessagesBox";
import ChatInput from "../components/chat/ChatInput";
import http from "../axiosconfig/axios_settings";
import urls from "../Url_List.json";
import { Container, Col, Row } from "react-bootstrap";

let socket;

const Chat = ({ location }) => {
  const [chatID, setChatID] = useState("");
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [authStatus, setAuthStatus] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const attemptAuth = async () => {
    http.get(urls.getUser).then((response) => {
      setUserID(response.data);
    });

    let userType = await http.get(urls.getUserType);
    userType = userType.data;
    let response;

    if (userType === "volunteer") {
      response = await http.get(urls.getVolunteerProfile);
    } else if (userType === "customer") {
      response = await http.get(urls.getCustomerProfile);
    } else {
      return false;
    }

    if (response.status != 400) {
      setUserName(`${response.data.firstName} ${response.data.lastName}`);
      return true;
    } else {
      return false;
    }
  };

  const loadPreviousMessages = async () => {
    const messageHistory = await http.get(urls.getMessages + chatID);
    setMessages(messageHistory.data);
  };

  useEffect(() => {
    socket = io();

    const { chatID } = queryString.parse(location.search);
    setChatID(chatID);

    attemptAuth().then((authStatus) => {
      setAuthStatus(authStatus);
    });
  }, [location.search]);

  useEffect(() => {
    if (chatID) {
      loadPreviousMessages();
    }
  }, [chatID]);

  useEffect(() => {
    if (authStatus == true) {
      socket.emit("joinChatRoom", { chatID, userID, userName }, (error) => {
        if (error) {
          alert(error);
        }
        //console.log(`${userName} (${userID}) requested to join room ${chatID}`);
        socket.emit(
          "sendMessage",
          { chatID, userID, text: "I joined the room!" },
          () => {}
        );
      });
    }
  }, [authStatus]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
      http.post(urls.registerMessage, {
        chatID: message.chatID,
        userName: message.userName,
        text: message.text,
      });
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (currentMessage) {
      socket.emit("sendMessage", { chatID, userID, text: currentMessage }, () =>
        setCurrentMessage("")
      );
    }
  };

  return (
    <React.Fragment>
      <Navbar showLogout={true} />
      <Jumbotron
        fluid
        className="mb-0 p-0 text-center"
        style={{
          "background-image":
            "radial-gradient(circle, rgba(0,0,140,0), rgba(255,135,0,.5), rgba(255,135,0,1))",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Container fluid>
          <Row>
            <Col className="" xl={3} lg={2} md={1}></Col>
            <Col className="">
              <ChatMessagesBox messages={messages} userName={userName} />
              <ChatInput
                messageText={currentMessage}
                setCurrentMessage={setCurrentMessage}
                sendMessage={sendMessage}
              />
            </Col>
            <Col className="" xl={3} lg={2} md={1}></Col>
          </Row>
        </Container>
      </Jumbotron>
    </React.Fragment>
  );
};

export default Chat;
