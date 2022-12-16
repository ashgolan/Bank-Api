import React from "react";
import "./TitlesRow.css";

function TitlesRow({ titles }) {
  console.log(titles);
  return (
    <tr>
      {titles.map((title) => {
        return <td>{title}</td>;
      })}
      {/* <td>name</td>
      <td>last Name</td>
      <td>id</td>
      <td>isActive</td> */}
    </tr>
  );
}

export default TitlesRow;
