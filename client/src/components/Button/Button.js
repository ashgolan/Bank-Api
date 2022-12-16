import React from "react";
import "./Button.css";

function Button({ setTransactionType, id }) {
  return (
    <button className="btn-transfer" onClick={() => setTransactionType(id)}>
      {id}
    </button>
  );
}

export default Button;
