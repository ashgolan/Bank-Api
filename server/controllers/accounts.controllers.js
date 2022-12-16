import { creatAccount, findObj, loadFromDb } from "../utils.js";
import { account } from "../models/Account.model.js";
export const getAllAccounts = async (req, res) => {
  const data = await loadFromDb(account);
  res.status(200).send(data);
};
export const addNewAccount = async (req, res) => {
  const newAccount = await creatAccount(req.body);
  newAccount !== -1
    ? res.status(201).send(newAccount)
    : res.status(401).send("problem while creating the account");
};

export const getAccount = async (req, res) => {
  const account = await findObj(account, req.params.uid);
  account != -1
    ? res.status(201).send(account)
    : res.status(401).send("account not found");
};
