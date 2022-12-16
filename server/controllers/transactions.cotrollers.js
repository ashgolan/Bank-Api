import { createTransaction } from "../utils.js";

export const addNewTransaction = (req, res) => {
  const newTransaction = createTransaction(req.body);
  newTransaction !== -1
    ? res.status(201).send(newTransaction)
    : res.status(401).send("couldn't complete the transaction");
};
