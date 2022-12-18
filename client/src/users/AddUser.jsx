import axios from "axios";
import React, { useState } from "react";
import "./AddUser.css";
export default function AddUser({ setLoading, data, setMessage, setData }) {
  const [user, setuser] = useState({
    name: "",
    family: "",
    pasportID: "",
    email: "",
  });
  const addUser = async (e) => {
    e.preventDefault();
    try {
      setMessage({ status: false, text: "" });
      setLoading(true);
      const newUser = await axios.post(
        "https://bank-api-xeyd.onrender.com/api/users",
        user
      );
      setData((prev) => {
        return { ...prev, users: [...prev.data.users, newUser] };
      });
      setuser({
        name: "",
        family: "",
        pasportID: "",
        email: "",
      });
      setMessage({ status: true, text: "קליינט נוסף בהצלחה" });
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
      <form onSubmit={(e) => addUser(e)} className="addUser-container">
        <label className=" title inputUserProp" htmlFor="">
          הוספת קליינט
        </label>
        <input
          required
          className="inputUserProp"
          htmlFor=""
          placeholder="שם"
          value={user.name}
          onChange={(e) =>
            setuser((prev) => {
              return { ...prev, name: e.target.value };
            })
          }
        ></input>
        <input
          required
          className="inputUserProp"
          htmlFor=""
          placeholder="משפחה"
          value={user.family}
          onChange={(e) =>
            setuser((prev) => {
              return { ...prev, family: e.target.value };
            })
          }
        ></input>
        <input
          required
          className="inputUserProp"
          htmlFor=""
          placeholder="ת.ז"
          value={user.pasportID}
          onChange={(e) =>
            setuser((prev) => {
              return { ...prev, pasportID: e.target.value };
            })
          }
        ></input>
        <input
          required
          className="inputUserProp"
          htmlFor=""
          placeholder="מייל"
          value={user.email}
          onChange={(e) =>
            setuser((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        ></input>
        <button className="submit">אישור</button>
      </form>
    </div>
  );
}
