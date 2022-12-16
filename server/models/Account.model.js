import { Schema, model } from "mongoose";
import { customAlphabet } from "nanoid";
import { findUserById } from "../utils.js";
const nanoid = customAlphabet("1234567890", 6);

const accountSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
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
});

export const account = model("Account", accountSchema);
