import axios from "axios";
import React, { useState } from "react";

export default function AddAccount({ setLoading, data, setMessage, setData }) {
  const [accountData, setAccountData] = useState({
    owner: "",
    Type: "",
  });
  const addAccountHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage({ status: false, text: "" });
      await axios.post(
        "https://bank-api-xeyd.onrender.com/api/accounts",
        accountData
      );

      setAccountData({
        owner: "",
        Type: "",
      });
      setData((prev) => {
        console.log(prev);
        return { ...prev, users: [...prev.data.accounts, accountData] };
      });
      setMessage({ status: true, text: "חשבון נוסף בהצלחה" });
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

  const ides = data.data.users.map((client, index) => {
    return (
      <option
        className="inputUserProp"
        key={`${index}IDclient`}
        value={client.pasportID}
      >
        {client.pasportID}
      </option>
    );
  });
  const accounHandler = (e) => {
    e.preventDefault();
    const id = e.target.selectedOptions[0].value;
    console.log(data.data.users);
    const account = data.data.users.find((acc) => acc.pasportID === +id);
    console.log(account);

    setAccountData({
      ...accountData,
      owner: account._id,
    });
  };
  return (
    <div className="container">
      <form
        className="addUser-container"
        onSubmit={(e) => addAccountHandler(e)}
      >
        <label className=" title inputUserProp" htmlFor="">
          פתיחת חשבון{" "}
        </label>
        <select
          className="inputUserProp"
          onChange={(e) => accounHandler(e)}
          name=""
          id=""
        >
          <option defaultValue="בחר לפי ת.ז">בחר לפי ת.ז</option>
          {ides}
        </select>

        <select
          className="inputUserProp"
          defaultValue="Personal"
          name=""
          onChange={(e) => {
            e.preventDefault();
            console.log(e.target.selectedOptions[0].text);
            setAccountData((prev) => {
              return { ...prev, Type: e.target.selectedOptions[0].text };
            });
          }}
          placeholder="סוג חשבון"
        >
          <option value="">Personal</option>
          <option value="">Business</option>
        </select>

        <button className="inputUserProp">אישור</button>
      </form>
    </div>
  );
}
