import { loadFromDb } from "../utils.js";
import { getUserAccounts } from "../utils/bank.utils.js";
import { user } from "../models/User.model.js";
import { account } from "../models/Account.model.js";
import { transaction } from "../models/Transaction.model.js";
export const getAlldata = async (req, res) => {
  res.status(200).send({
    users: await loadFromDb(user),
    accounts: await loadFromDb(account),
    transactions: await loadFromDb(transaction),
  });
};

export const getAccounts = (req, res) => {
  const userAccounts = getUserAccounts(req.query.user);
  if (!userAccounts) return res.status(404).send("user doesnt have accounts");
  if (req.query.amount) {
    const amount = Number(req.query.amount);
    const filteredAccounts = userAccounts.filter(
      (account) => account.cash >= amount
    );
    return res.status(200).send(filteredAccounts);
  }
  return res.status(200).send(userAccounts);
};
