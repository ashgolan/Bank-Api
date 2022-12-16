import React from "react";

function AccountRow({ cash, credit, Type, owner, _id, usedCredit }) {
  return (
    <tr>
      <td>{_id}</td>
      <td>{owner}</td>
      <td>{Type}</td>
      <td>{cash}</td>
      <td>{credit}</td>
      <td>{usedCredit}</td>
    </tr>
  );
}

export default AccountRow;
