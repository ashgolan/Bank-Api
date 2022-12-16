import { Schema, model } from "mongoose";
import { account } from "./Account.model.js";
const date = new Date().toLocaleDateString();
const transactionSchema = new Schema({
  date: { type: String, default: date },
  accountNumber: {
    type: String,
    required: true,
    validate(value) {
      if (!account.findById(value)) throw Error("Account not found!");
    },
  },
  recipient: {
    type: Number,
    validate(value) {
      if (!account.findById(value)) throw Error("Account not found!");
    },
  },
  type: {
    type: String,
    required: true,
    validate(value) {
      if (
        value !== "deposit" &&
        value !== "withdraw" &&
        value !== "transfer" &&
        value !== "credit"
      )
        throw Error("Type of transaction must be provided!");
    },
  },
  amount: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 0) throw Error("amount have to be bigger then zero!");
    },
  },
});

export const transaction = model("Transaction", transactionSchema);
