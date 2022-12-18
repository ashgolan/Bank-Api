import axios from "axios";
import React, { useState } from "react";
import "./UpdateAccount.css";

export default function UpdateAccount({
  setLoading,
  data,
  setData,
  setMessage,
}) {
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountCredit, setAccountCredit] = useState({
    accountNumber: "",
    type: "credit",
    amount: 10000,
  });
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

  const accounHandler = (e) => {
    e.preventDefault();
    const id = e.target.selectedOptions[0].value;
    const account = data.data.accounts.find((acc) => acc._id === id);
    const user = data.data.users.find((user) => user._id === account.owner);
    setCurrentAccount(user);
    setAccountCredit({
      ...accountCredit,
      accountNumber: account._id,
      credit: account.credit,
    });
  };
  const updateCredit = async (e) => {
    e.preventDefault();
    try {
      setMessage({ status: false, text: "" });
      setLoading(true);
      await axios.post(
        "https://bank-api-xeyd.onrender.com/api/transactions",
        accountCredit
      );

      setData((prev) => {
        return {
          ...prev,
          transactions: [...prev.data.transactions, accountCredit],
        };
      });
      setMessage({ status: true, text: "חשבון עודכן בהצלחה" });
      setTimeout(() => {
        setMessage({ status: false, text: "" });
      }, 1500);
      setLoading(false);
    } catch (e) {
      setMessage({ status: true, text: "שגיאה בקליטת נתונים" });
      setTimeout(() => {
        setMessage({ status: false, text: "" });
      }, 1500);
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <form
        onSubmit={(e) => updateCredit(e)}
        action=""
        className="addUser-container"
      >
        <label className=" title inputUserProp" htmlFor="">
          עדכון מסגרת האשראי
        </label>
        <select
          onChange={(e) => accounHandler(e)}
          name=""
          id=""
          className="inputUserProp"
        >
          <option selected disabled defaultValue="בחר חשבון">
            בחר חשבון
          </option>
          {accounts}
        </select>
        <input
          className="inputUserProp"
          type="text"
          disabled
          placeholder="בעל חשבון"
          value={
            currentAccount && currentAccount.name + " " + currentAccount.family
          }
          onChange={(e) =>
            setAccountCredit((prev) => {
              return { ...prev, accountNumber: e.target.value };
            })
          }
        />
        <input
          className="inputUserProp"
          type="number"
          placeholder="אשראי"
          value={accountCredit.amount}
          onChange={(e) => {
            setAccountCredit((prev) => {
              return { ...prev, amount: e.target.value };
            });
          }}
        />
        <button className="inputUserProp">אישור</button>
      </form>
    </div>
  );
}
