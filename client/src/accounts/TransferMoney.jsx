import axios from "axios";
import React, { useState } from "react";

export default function TransferMoney({ setLoading, setMessage, setData }) {
  const [transferingDetails, setTransferingDetails] = useState({
    accountNumber: "",
    recipient: "",
    type: "transfer",
    amount: "",
  });
  const transfer = async (e) => {
    e.preventDefault();
    try {
      setMessage({ status: false, text: "" });
      setLoading(true);

      await axios.post(
        "http://localhost:5001/api/transactions",
        transferingDetails
      );

      setData((prev) => {
        return {
          ...prev,
          transactions: [...prev.data.transactions, transferingDetails],
        };
      });
      setMessage({ status: true, text: "כסף הועבר בהצלחה" });
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
        onSubmit={(e) => transfer(e)}
        className="addUser-container"
        action=""
      >
        <label className=" title inputUserProp" htmlFor="">
          העברת כספים
        </label>
        <input
          value={transferingDetails.accountNumber}
          className="inputUserProp"
          type="text"
          placeholder="מס חשבון המעביר"
          onChange={(e) =>
            setTransferingDetails((prev) => {
              return { ...prev, accountNumber: e.target.value };
            })
          }
        />
        <input
          value={transferingDetails.recipient}
          className="inputUserProp"
          type="text"
          placeholder="מס חשבון המקבל"
          onChange={(e) =>
            setTransferingDetails((prev) => {
              return { ...prev, recipient: e.target.value };
            })
          }
        />
        <input
          value={transferingDetails.amount}
          className="inputUserProp"
          type="text"
          placeholder="סכום ההעברה"
          onChange={(e) =>
            setTransferingDetails((prev) => {
              return { ...prev, amount: e.target.value };
            })
          }
        />
        <button className="inputUserProp">בצע העברה</button>
      </form>
    </div>
  );
}
