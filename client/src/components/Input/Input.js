import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import "./Input.css";

const Input = ({ setMessage, sendMessage, message }) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [emoji, seteEmoji] = useState('');

  const handleEmoji = () => {
    setOpenEmoji(!emoji);
  };
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value + emoji)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <InsertEmoticonIcon onClick={handleEmoji} />
      {openEmoji ? (
        <Picker
          onClick={(emoji, event) => {seteEmoji(emoji.native)}}
          // onSelect={(emoji) => {console.log(emoji)}}
          onChange={(emoji) => {console.log(emoji)}}
          showPreview={false}
          showSkinTones={false}
          style={{ position: "absolute", bottom: "75px", right: "20px" }}
        />
      ) : (
        ""
      )}
      <SendIcon className="sendButton" onClick={(e) => sendMessage(e)} />
      {/* <button className="sendButton" onClick={e => sendMessage(e)}>Send</button> */}
    </form>
  );
};

export default Input;
