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
    <div className="add-container">
      <form
        ref={myForm}
        onSubmit={(e) => submitHandler(e)}
        className="new-user-card"
      >
        <div className="input-container-add-user">
          <label className="title-add-user" htmlFor="name">
            enter user name
          </label>
          <input type="text" name="name" />
        </div>
        <div className="input-container-add-user">
          <label className="title-add-user" htmlFor="name">
            enter user family
          </label>
          <input type="text" name="family" />
        </div>
        <div className="input-container-add-user">
          <label className="title-add-user" htmlFor="name">
            enter user passport ID
          </label>
          <input type="text" name="pasportID" />
        </div>

        <input type="submit" className="blue-btn" value="save" />
      </form>
    </div>
  );
}

export default NewUserForm;
