import axios from "axios";
import React, { useState } from "react";
import "./AddUser.css";
export default function AddUser({ data, setMessage, setData }) {
  const [user, setuser] = useState({
    name: "",
    family: "",
    pasportID: "",
    email: "",
  });
  const addUser = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      setMessage({ status: false, text: "" });
      const newUser = await axios.post(
        "https://ashgolan-bankapi.onrender.com/api/users",
        user
      );

      setData(newUser);
      setuser({
        name: "",
        family: "",
        pasportID: "",
        email: "",
      });
      setMessage({ status: true, text: "קליינט נוסף בהצלחה עם חשבון בנק חדש" });
      setTimeout(() => {
        setMessage({ status: false, text: "" });
      }, 1500);
    } catch (e) {
      setMessage({ status: true, text: "שגיאה בקליטת נתונים" });
      setTimeout(() => {
        setMessage({ status: false, text: "" });
      }, 1500);
    }
  };
  return (
    <div className="container">
      <form onSubmit={(e) => addUser(e)} className="addUser-container">
        <label className=" title inputUserProp" htmlFor="">
          הוספת קליינט
        </label>
        <input
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