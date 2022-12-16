import uniqId from "uniqid";
import { readFileSync, writeFileSync } from "fs";
import uniqueId from "unique-id-key";
import { user } from "./models/User.model.js";
import { account } from "./models/Account.model.js";

export const createUser = async (userData) => {
  const users = await loadFromDb(user);
  // we can remove the function of find below ...
  if (!users.find((user) => Number(user._id) === Number(userData._id))) {
    const newUser = await user.create({
      ...userData,
      uid: uniqueId.RandomString(6),
      isActive: true,
    });
    // console.log(newUser);
    // users.push(newUser);
    // saveToDb("users", users);
    return newUser;
    // we can remove the return -1 because now we have the try catch ..
  } else return -1;
};

export const loadFromDb = async (model) => {
  try {
    const data = await model.find({});
    return data;
    // const dataBuffer = readFileSync(`./db/${file}.json`);
    // const dataJson = dataBuffer.toString();
    // return JSON.parse(dataJson);
  } catch (e) {
    return e;
    // return [];
  }
};

// export const saveToDb = (file, data) => {
//   try {
//     const dataJson = JSON.stringify(data);
//     writeFileSync(`./db/${file}.json`, dataJson);
//   } catch (e) {
//     return e.message;
//   }
// };

//todo check if the funtion below is being used only once
export const findObj = async (model, uid) => {
  let obj;
  const data = await loadFromDb(model);
  if (model === user) {
    obj = await data.find((item) => item.uid === uid);
  } else if (model === account) {
    obj = await data.find((item) => item.uid === uid);
  }
  if (obj) return obj;
  else return -1;
};

export const findUserById = async (id) => {
  const foundUser = await user.findById(id);
  return foundUser;
};

export const creatAccount = async (bodyAccount) => {
  try {
    const newAccount = await account.create({
      ...bodyAccount,
      uid: Number(uniqueId.RandomNum(6)),
      cash: 0,
      credit: 0,
      usedCredit: 0,
    });
    console.log(newAccount);
    // const accounts = loadFromDb(account);
    // accounts.push(newAccount);
    // saveToDb("accounts", accounts);
    return newAccount;
  } catch {
    return -1;
  }
};

export const createTransaction = (transaction) => {
  switch (transaction.type) {
    case "deposit":
      return addMoney(transaction);
    case "credit":
      return addMoney(transaction);
    case "withdraw":
      return withdraw(transaction);
    case "transfer":
      return transfer(transaction);
    default:
      break;
  }
};

export const transfer = ({ accountNumber, amount, recipient }) => {
  const accounts = loadFromDb("accounts");
  const userAccount = accounts.find(
    (account) => Number(account.uid) === Number(accountNumber)
  );
  const updatedAccount = validateWithdraw(userAccount, amount);
  if (updatedAccount) {
    const recipientAccount = accounts.find(
      (account) => account.uid === Number(recipient)
    );
    recipientAccount.cash += Number(amount);
    saveToDb("accounts", accounts);
  } else {
    return -1;
  }
};

export const addMoney = (transaction) => {
  const accounts = loadFromDb("accounts");
  let account = accounts.find(
    (account) => account.uid === Number(transaction.accountNumber)
  );
  if (!account) return -1;
  if (transaction.type === "deposit") {
    account.cash += Number(transaction.amount);
  } else if (transaction.type === "credit") {
    account.credit += Number(transaction.amount);
  }
  saveToDb("accounts", accounts);
  return recordTransaction(transaction);
};

export const withdraw = (transaction) => {
  const accounts = loadFromDb("accounts");
  let account = accounts.find(
    (account) => account.uid === Number(transaction.accountNumber)
  );
  const updatedAccount = validateWithdraw(account, transaction.amount);
  if (updatedAccount) {
    recordTransaction(transaction);
    saveToDb("accounts", accounts);
    return account;
  } else return -1;
};

export const validateWithdraw = (account, amount) => {
  const creditAvailable = account.credit - account.usedCredit;
  if (account.cash + creditAvailable >= amount) {
    const restToPay = account.cash - amount;
    if (restToPay > 0) {
      account.cash = restToPay; //cash was enough
    } else {
      account.cash = 0;
      account.usedCredit -= restToPay;
    }
    return account;
  } else {
    return false;
  }
};

export const recordTransaction = (transaction) => {
  const date = new Date();
  const newTransaction = {
    ...transaction,
    owner: findObj("accounts", transaction.accountNumber).owner,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
    uid: uniqId(),
  };
  const transactions = loadFromDb("transactions");
  transactions.push(newTransaction);
  saveToDb("transactions", transactions);
  return newTransaction;
};
