import React, { useState } from "react";
import { useRef } from "react";
import "./Transaction.css";
export default function Transaction({ data, setData, setMessage }) {
  console.log(data);
  const selectIdAccount = useRef();
  const [selectedTransactionAccount, setSelectedTransactionAccount] =
    useState();
  const accounts = data.data.accounts.map((clientAccount, index) => {
    return (
      <option
        className="inputUserProp"
        key={`${index}IDclient`}
        value={clientAccount._id}
      >
        {clientAccount._id}
      </option>
    );
  });

  const selectHandler = (e) => {
    e.preventDefault();
    const id = e.target.selectedOptions[0].value;

    const filteredTransactions = data.data.transactions.filter(
      (acc) => acc.accountNumber === id || acc.recipient === id
    );
    setSelectedTransactionAccount(filteredTransactions);
  };
  return (
    <div className="transaction-container">
      <form className="transaction-form-container" action="">
        <select
          onChange={(e) => selectHandler(e)}
          className="selectTransaction"
          name=""
          id=""
          ref={selectIdAccount}
        >
          <option selected defaultValue="בחר חשבון">
            בחר חשבון
          </option>
          {accounts}
        </select>
        <div className="transaction-container">
          {selectedTransactionAccount && (
            <div className="transRow">
              <label>:תאריך</label>
              <label>:שעה</label>
              <label style={{ width: "50%" }}>:פעולה</label>
            </div>
          )}
          {selectedTransactionAccount &&
            selectedTransactionAccount.map((trans, index) => {
              return (
                <div className="transRow" key={`transaction${index}`}>
                  <label>{trans.date}</label>
                  <label>{trans.time}</label>
                  <label
                    style={{
                      color:
                        trans.type === "deposit" ||
                        trans.recipient === selectIdAccount.current.value ||
                        trans.type === "credit"
                          ? "green"
                          : "red",
                      width: "50%",
                      textAlign: "center",
                    }}
                  >
                    {trans.amount}
                  </label>
                </div>
              );
            })}
        </div>
      </form>
    </div>
  );
}
