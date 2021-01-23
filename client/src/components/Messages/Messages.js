import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";
import Game from '../../game/ticTacToe/Game';

import "./Messages.css";

const Messages = ({ messages, name, typeing, users }) => {
  return (
    
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
      <Game/>
      {typeing && typeing.text !== "" ? (
        <div class="chat-bubble">
          <span>{typeing.user} is typing</span>
          <div class="typing">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </ScrollToBottom>
  );
};

export default Messages;
