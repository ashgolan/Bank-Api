import axios from "axios";
import React, { useState } from "react";
import "./DepositMoney.css";
export default function WithdrawMoney({ setLoading, setMessage, setData }) {
  const [withdrawDetails, setWithdrawDetails] = useState({
    accountNumber: "",
    amount: "",
    type: "withdraw",
  });
  const withdraw = async () => {
    try {
      setMessage({ status: false, text: "" });
      setLoading(true);
      await axios.post(
        "https://bank-api-xeyd.onrender.com/api/transactions",
        withdrawDetails
      );

      setData((prev) => {
        return {
          ...prev,
          transactions: [...prev.data.transactions, withdrawDetails],
        };
      });
      setMessage({ status: true, text: "כסף נמשך בהצלחה" });
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
      <div className="depositMoney-container">
        <label className=" title inputUserProp" htmlFor="">
          משיכת כסף
        </label>
        <input
          className="deposit-input"
          value={withdrawDetails.accountNumber}
          onChange={(e) =>
            setWithdrawDetails((prev) => {
              return { ...prev, accountNumber: e.target.value };
            })
          }
          type="text"
          placeholder="מס החשבון"
        />
        <input
          className="deposit-input"
          value={withdrawDetails.amount}
          onChange={(e) =>
            setWithdrawDetails((prev) => {
              return { ...prev, amount: e.target.value };
            })
          }
          type="text"
          placeholder="סכום המשיכה"
        />
        <button className="deposit-input" onClick={withdraw}>
          אישור
        </button>
      </div>
    </div>
  );
}
