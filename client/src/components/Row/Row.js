import React from "react";
import "./Row.css";

function Row({ name, family, email, pasportID, isActive }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{family}</td>
      <td>{pasportID}</td>
      <td>{email}</td>
      <td>{isActive ? "active" : "not active"}</td>
    </tr>
  );
}

export default Row;
