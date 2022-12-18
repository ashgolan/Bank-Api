import React, { useState } from "react";
import { useRef } from "react";
import "./Transaction.css";
export default function Transaction({ data, setData, setMessage }) {
  const selectIdAccount = useRef();
  const [currentAccount, setcurrentAccount] = useState(null);
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
    const account = data.data.accounts.find((acc) => acc._id === id);
    const user = data.data.users.find((user) => user._id === account.owner);
    setcurrentAccount(user);
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
          <option disabled selected defaultValue="בחר חשבון">
            בחר חשבון
          </option>
          {accounts}
        </select>
        {currentAccount && (
          <label
            htmlFor=""
            style={{
              textAlign: "center",
              color: "brown",
              fontWeight: "bold",
              marginBottom: "1%",
            }}
          >
            {currentAccount.name + " " + currentAccount.family}
          </label>
        )}
        <div className="transaction-container">
          {selectedTransactionAccount && (
            <div className="trans-header transRow">
              <label>תאריך</label>
              <label>שעה</label>
              <label style={{ textAlign: "left" }}>סכום</label>
              <label>מטבע</label>
              <label>סוג פעולה</label>
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
                      textAlign: "left",
                      fontWeight: "bold",
                      marginLeft: "2%",
                    }}
                  >
                    {trans.amount}
                  </label>
                  <label htmlFor="">ש"ח</label>
                  <label htmlFor="">{trans.type}</label>
                </div>
              );
            })}
        </div>
      </form>
    </div>
  );
}
