import React, { useState, useEffect } from "react";
import NewTransactionForm from "../../components/NewTransactionForm/NewTransactionForm";
import { useHttp } from "../../hooks/use-http";
import Button from "../../components/Button/Button";
import TransferForm from "../../components/TransferForm/TransferForm";

function NewTransactionPage() {
  const [newTransaction, setNewTransaction] = useState(null);
  const [transactionType, setTransactionType] = useState(null);

  const { getData } = useHttp();

  useEffect(() => {
    if (!newTransaction) return;
    getData({
      url: "/api/transactions",
      method: "POST",
      body: { ...newTransaction, type: transactionType },
      headers: {
        "Content-Type": "application/json",
      },
    });
    // eslint-disable-next-line
  }, [newTransaction]);

  let formType;
  if (
    transactionType === "deposit" ||
    transactionType === "withdraw" ||
    transactionType === "credit"
  ) {
    formType = 1;
  } else if (transactionType === "transfer") formType = 2;

  return (
    <>
      <h2>what kind of transaction would you like to perform?</h2>
      <div className="flex-row-center">
        <Button id={"deposit"} setTransactionType={setTransactionType} />
        <Button id={"withdraw"} setTransactionType={setTransactionType} />
        <Button id={"credit"} setTransactionType={setTransactionType} />
        <Button id={"transfer"} setTransactionType={setTransactionType} />
      </div>
      {formType === 1 && (
        <NewTransactionForm setNewTransaction={setNewTransaction} />
      )}
      {formType === 2 && <TransferForm setNewTransaction={setNewTransaction} />}
    </>
  );
}

export default NewTransactionPage;
