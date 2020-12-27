import React, { useState, useEffect } from "react";
import SendIcon from "@material-ui/icons/Send";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import "./Input.css";

const Input = ({ setMessage, sendMessage, message }) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [emojis, seteEmoji] = useState("");

  const handleEmoji = () => {
    setOpenEmoji(!openEmoji);
  };
  const handleMsg = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMsg = (e) => {
    sendMessage(e)
    setOpenEmoji(false);
  }

  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => handleMsg(e)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
        onFocus={() => setOpenEmoji(false)}
      />
      <InsertEmoticonIcon
        onClick={handleEmoji}
        style={{ color: openEmoji ? "#2979ff" : "" }}
      />
      {openEmoji ? (
        <Picker
          // onClick={(emoji, event) => {seteEmoji(emoji.native)}}
          onSelect={(emoji) => setMessage(message + emoji.native)}
          showPreview={false}
          showSkinTones={false}
          style={{ position: "absolute", bottom: "75px", maxWidth:'100%', right: '0'}}
        />
      ) : (
        ""
      )}
      <SendIcon className="sendButton" onClick={ (e)=> handleSendMsg(e)} />
      {/* <button className="sendButton" onClick={e => sendMessage(e)}>Send</button> */}
    </form>
  );
};

export default Input;
