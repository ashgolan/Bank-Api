import { loadFromDb } from "../utils.js";
import { account } from "../models/Account.model.js";
export const getUserAccounts = (userUid) => {
  const accounts = loadFromDb(account);
  const userAccounts = accounts.filter((account) => account.owner === userUid);
  return userAccounts;
};
