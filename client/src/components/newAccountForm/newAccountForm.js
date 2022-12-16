import React, { useRef, useContext } from "react";
import bankData from "../../context/context";

function NewAccountForm({ setNewAccount }) {
  const accountType = useRef();
  const selectUserOption = useRef();
  const myForm = useRef();

  const bankDataCtx = useContext(bankData);
  const users = bankDataCtx.users.map((user) => user.uid);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newAccountData = {
      owner: selectUserOption.current.value,
      type: accountType.current.value,
    };
    setNewAccount((prev) => newAccountData);
  };

  return (
    <form
      ref={myForm}
      onSubmit={(e) => submitHandler(e)}
      className="new-user-card"
    >
      <div>
        <label htmlFor="name">user uid number</label>
        <select ref={selectUserOption}>
          {users.map((account) => {
            return (
              <option key={account} value={account}>
                {account}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="amount">type</label>
        <select ref={accountType}>
          <option>personal</option>
          <option>business</option>
        </select>{" "}
      </div>
      <input type="submit" className="blue-btn" value="create account" />
    </form>
  );
}

export default NewAccountForm;
