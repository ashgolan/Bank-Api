import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  accountNumber: {
    type: Number,
    required: true,
    validate(value) {
      if (!findAccountById(value)) throw Error("Account not found!");
    },
  },
  recipient: {
    type: Number,
    validate(value) {
      if (!findAccountById(value)) throw Error("Account not found!");
    },
  },
  Type: {
    type: String,
    required: true,
    validate(value) {
      if (
        value !== "Deposit" ||
        value !== "withdraw" ||
        value !== "transfer" ||
        value !== "credit"
      )
        throw Error("Type of transaction must be provided!");
    },
  },
});

export const transaction = model("Transaction", transactionSchema);
