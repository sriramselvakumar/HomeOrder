// code based on this:
// https://github.com/adrianhajdin/project_chat_application/blob/master/client/src/components/Messages/Messages.js

import React from "react";
// TODO: do we need this or some other component type?
import ScrollToBottom from "react-scroll-to-bottom";
import ChatMessage from "./ChatMessage";

const ChatMessagesBox = ({ messages, userName }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, index) => (
      <div key={index}>
        <ChatMessage message={message} thisUserName={userName} />
      </div>
    ))}
  </ScrollToBottom>
);

export default ChatMessagesBox;
