import React from "react";
import "./TitlesRow.css";

function TitlesRow({ titles, category }) {
  console.log(titles);
  return (
    <tr>
      {titles.map((title) => {
        if (
          (title !== "_id" && title !== "__v") ||
          (title === "_id" && title !== "__v" && category !== "users")
        )
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
