import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import io from "socket.io-client";
import {
  partnerFinder,
  partnerDisconnected,
  getAvailableChat,
} from "../../actions/match";

import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

let socket;

const Chat = ({
  match: { matchedUser },
  auth: { userInfo },
  partnerFinder,
  partnerDisconnected,
}) => {
  // const { user } = userInfo !== null ? userInfo : "";
  // const [name, setName] = useState(partnerName);
  // const [name, setName] = useState(user && user.name);
  const [userJoined, setUserJoined] = useState(
    userInfo !== null ? userInfo : ""
  );
  console.log('userInfo',userInfo)
  // const [room, setRoom] = useState('');
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [partner, setPartner] = useState("");
  const ENDPOINT = "https://tranquil-ravine-27749.herokuapp.com";
  // const ENDPOINT = "http://localhost:5000/";

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { userJoined, room: matchedUser.room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, userJoined, matchedUser.room]);

  useEffect(() => {
    socket.on("message", (message) => {
      if (
        message.user === "Admin" &&
        message.text.indexOf("has left.") !== -1
      ) {
        partnerDisconnected();
      }
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
      if (users.length === 2) {
        const partner = users.find(
          (user) => user.profile._id !== userInfo.profile._id
        );
        partnerFinder(true,partner);
      } else {
        partnerFinder(false,null);
      }
    });

    // socket.on('connect', () => {
    //   console.log(socket.disconnected); // false
    // });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return users.length === 2 ? (
    <div className="outerContainer">
      <div className="container">
        <div className="infoBar">
          <div className="leftInnerContainer">
            {/* <img className="onlineIcon" src={onlineIcon} alt="online icon" /> */}
            <h3>
              Your chating with{" "}
              {matchedUser !== null && matchedUser.user !== undefined
                ? matchedUser.user.name
                : ""}
              {matchedUser !== null &&
              matchedUser.user === undefined &&
              users[1] !== undefined
                ? users[1].name
                : ""}
            </h3>
          </div>
          <div className="rightInnerContainer">
            <a href="/">{/* <img src={closeIcon} alt="close icon" /> */}</a>
          </div>
        </div>
        <Messages messages={messages} name={userJoined.user.name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

Chat.prototypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  matchedUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  cancelMatch: PropTypes.func.isRequired,
  partnerFinder: PropTypes.func.isRequired,
  partnerDisconnected: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  findPerfectMatch: PropTypes.func.isRequired,
  cancelMatch: PropTypes.func.isRequired,
  match: state.match,
});

export default connect(mapStateToProps, {
  partnerFinder,
  partnerDisconnected,
})(Chat);
