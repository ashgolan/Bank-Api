import React from "react";
import "./Row.css";

function Row({ name, lastName, id, uid, isActive }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{lastName}</td>
      <td>{uid}</td>
      <td>{isActive ? "active" : "not active"}</td>
    </tr>
  );
}

export default Row;
