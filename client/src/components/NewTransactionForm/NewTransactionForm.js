import React, { useRef, useContext } from "react";
import bankData from "../../context/context";

function NewTransactionForm({ setNewTransaction }) {
  const amount = useRef();
  const selectOption = useRef();
  const myForm = useRef();

  const bankDataCtx = useContext(bankData);
  console.log(bankDataCtx.accounts);
  const accounts = bankDataCtx.accounts.map((account) => account.uid);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newTransationData = {
      amount: amount.current.value,
      accountNumber: selectOption.current.value,
    };
    console.log(newTransationData);
    setNewTransaction((prev) => newTransationData);
  };

  return (
    <form
      ref={myForm}
      onSubmit={(e) => submitHandler(e)}
      className="new-user-card"
    >
      <div>
        <label htmlFor="name">account number</label>
        <select ref={selectOption}>
          {accounts.map((account) => {
            return (
              <option key={account} value={account}>
                {account}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="amount">amount</label>
        <input ref={amount} type="text" name="amount" />
      </div>

      <input type="submit" className="blue-btn" value="save" />
    </form>
  );
}

export default NewTransactionForm;
