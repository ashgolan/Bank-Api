import React, { useContext } from "react";
import bankData from "../../context/context";
import TitlesRow from "../TitlesRow/TitlesRow";
import Row from "../Row/Row";
import "./Table.css";
import AccountRow from "../AccountRow/AccountRow";

function Table({ category }) {
  const bankCTX = useContext(bankData);
  const dataToDisplay = bankCTX[category];
  const titles = Object.keys(dataToDisplay[0]);
  console.log(titles);
  return (
    <table>
      {/* <thead> */}
      {/* </thead> */}
      <tbody>
        <TitlesRow titles={titles} />
        {dataToDisplay.map((row) => {
          if (category === "users") {
            return <Row {...row} key={row.uid} />;
          } else {
            return <AccountRow {...row} key={row.uid} />;
          }
        })}
      </tbody>
    </table>
  );
}

export default Table;
