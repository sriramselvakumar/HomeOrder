// code based on this:
// https://github.com/adrianhajdin/project_chat_application/blob/master/client/src/components/Messages/Message/Message.js

import React from "react";

const ChatMessage = ({ message: { userName, text }, thisUserName }) => {
  let messageFromThisUser = false;

  if (userName === thisUserName) {
    messageFromThisUser = true;
  }

  return messageFromThisUser ? (
    <div className="messageContainer">
      <p className="sentUserName">
        {userName} : {text}
      </p>
      <div className="messageBox"></div>
    </div>
  ) : (
    <div className="messageContainer">
      <p className="sentUserName">
        {userName}: {text}
      </p>
    </div>
  );
};

export default ChatMessage;
