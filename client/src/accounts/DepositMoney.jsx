import axios from "axios";
import React, { useState } from "react";
import "./DepositMoney.css";
export default function DepositMoney({ setLoading, setMessage, setData }) {
  const [dipositDetails, setDipositDetails] = useState({
    accountNumber: "",
    amount: "",
    type: "deposit",
  });
  const deposit = async () => {
    try {
      setMessage({ status: false, text: "" });
      setLoading(true);
      await axios.post(
        "https://bank-api-xeyd.onrender.com/api/transactions",
        dipositDetails
      );

      setData((prev) => {
        return {
          ...prev,
          transactions: [...prev.data.transactions, dipositDetails],
        };
      });
      setMessage({ status: true, text: "כסף הופקד בהצלחה" });
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
          הפקדת כסף
        </label>
        <input
          className="deposit-input"
          value={dipositDetails.accountNumber}
          onChange={(e) =>
            setDipositDetails((prev) => {
              return { ...prev, accountNumber: e.target.value };
            })
          }
          type="text"
          placeholder="מס החשבון"
        />
        <input
          className="deposit-input"
          value={dipositDetails.amount}
          onChange={(e) =>
            setDipositDetails((prev) => {
              return { ...prev, amount: e.target.value };
            })
          }
          type="number"
          placeholder="סכום ההפקדה"
        />
        <button
          disabled={
            dipositDetails.accountNumber === "" || dipositDetails.amount <= 0
          }
          className="deposit-input"
          onClick={deposit}
        >
          אישור
        </button>
      </div>
    </div>
  );
}
