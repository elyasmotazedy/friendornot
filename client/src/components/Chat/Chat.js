import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import io from "socket.io-client";

import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

let socket;

const Chat = ({
  match: { room, matchedUser },
  auth: { user },
  partnerName,
}) => {
  console.log('sdfd', user)
  // const [name, setName] = useState(partnerName);
  const [name, setName] = useState(user && user.name);
  // const [room, setRoom] = useState('');
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [partner, setPartner] = useState("");
  const ENDPOINT = "https://tranquil-ravine-27749.herokuapp.com";
  // const ENDPOINT = 'http://localhost:5000/';

  useEffect(() => {
    socket = io(ENDPOINT);

    // setRoom(room);
    setName(partnerName);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      console.log('users',users)
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };


  return (
    <div className="outerContainer">
      <div className="container">
        <div className="infoBar">
          <div className="leftInnerContainer">
            {/* <img className="onlineIcon" src={onlineIcon} alt="online icon" /> */}
            <h3>
              Your chating with
              {matchedUser !== null && matchedUser.user !== undefined
                ? matchedUser.user.name
                : ""}
              {matchedUser !== null &&
              matchedUser.user === undefined &&
              user[0] !== undefined
                ? user[0].name
                : ""}
            </h3>
          </div>
          <div className="rightInnerContainer">
            <a href="/">{/* <img src={closeIcon} alt="close icon" /> */}</a>
          </div>
        </div>
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

Chat.prototypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  matchedUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  cancelMatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  findPerfectMatch: PropTypes.func.isRequired,
  cancelMatch: PropTypes.func.isRequired,
  match: state.match,
});

export default connect(mapStateToProps)(Chat);
