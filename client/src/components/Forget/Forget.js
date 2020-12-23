import React, { useState } from "react";

const Forget = () => {
  const [email, setEmail] = useState("");

  const restPassword = (e) => {
      e.preventDefault()

  };

  const onChange = (e) => {
    setEmail(e.target.value)
  };

  return (
    <div>
      <form onSubmit={restPassword}>
        <input name="forgetPassword" onChange={onChange} />
        <button type='submit'>send</button>
      </form>
    </div>
  );
};

export default Forget;
