import React, { useState } from "react";
import CloseBtn from "./CloseBtn.jsx";

export default function OwnerLoginModal({ onClose, onLogin }) {
  const [pass, setPass] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!onLogin(pass)) alert("Incorrect demo code");
  }

  return (
    <>
      <div className="modalhead">
        <h2>Owner dashboard</h2>
        <CloseBtn onClose={onClose} />
      </div>
      <p className="sub">
        Prototype demo passcode: <b>owner123</b>. This is not secure authentication. Do not publish with this passcode; use server-side accounts and authorization.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Owner access code</label>
          <input type="password" required value={pass} onChange={(e) => setPass(e.target.value)} />
        </div>
        <button className="btn">Open dashboard</button>
      </form>
    </>
  );
}
