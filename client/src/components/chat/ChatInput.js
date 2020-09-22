// code based on this:
// https://github.com/adrianhajdin/project_chat_application/blob/master/client/src/components/Input/Input.js

import React from "react";
import { Form, Button } from "react-bootstrap";
import "../../CSS/Chat.css";

const ChatInput = ({ messageText, setCurrentMessage, sendMessage }) => (
  <div style={{ width: "50%" }} className="mx-auto flexible">
    <Form className="form">
      <Form.Control
        className="chatInput"
        type="text"
        placeholder="..."
        value={messageText}
        onChange={({ target: { value } }) => setCurrentMessage(value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
    </Form>
    <Button className="sendMessageButton" onClick={(e) => sendMessage(e)}>
      Send
    </Button>
  </div>
);

export default ChatInput;
