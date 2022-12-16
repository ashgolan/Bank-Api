import { Schema, model } from "mongoose";
import { findUserById } from "../utils.js";
const accountSchema = new Schema({
  owner: {
    type: String,
    required: true,
    validate(value) {
      if (!findUserById(value)) throw Error("User not found!");
    },
  },
  Type: {
    type: String,
    required: true,
    validate(value) {
      if (value !== "Personal" && value !== "Business")
        throw Error("Type must be Business or Personal!");
    },
  },
  cash: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw Error("Cash must be a Possitive Number");
    },
  },
  credit: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw Error("Cash must be a Possitive Number");
    },
  },
  usedCredit: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw Error("Cash must be a Possitive Number");
    },
  },
  uid: {
    type: Number,
  },
});

export const account = model("Account", accountSchema);
