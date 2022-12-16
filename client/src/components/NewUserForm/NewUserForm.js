import React, { useRef } from "react";
import "./NewUserForm.css";

function NewUserForm({ setNewUser }) {
  const myForm = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUserData = Object.fromEntries(new FormData(myForm.current));
    console.log(newUserData);
    setNewUser((prev) => newUserData);
  };

  return (
    <form
      ref={myForm}
      onSubmit={(e) => submitHandler(e)}
      className="new-user-card"
    >
      <div>
        <label htmlFor="name">enter user name</label>
        <input type="text" name="name" />
      </div>
      <div>
        <label htmlFor="name">enter user last name</label>
        <input type="text" name="lastName" />
      </div>
      <div>
        <label htmlFor="name">enter user passport ID</label>
        <input type="text" name="id" />
      </div>

      <input type="submit" className="blue-btn" value="save" />
    </form>
  );
}

export default NewUserForm;
