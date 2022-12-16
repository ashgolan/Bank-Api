import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  family: {
    type: String,
    required: true,
  },
  pasportID: {
    type: Number,
    validate(value) {
      if (value.length < 9) throw Error("ID muse be at least 9 digits");
    },
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid");
      }
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  uid: {
    type: String,
    required: true,
  },
});

export const user = model("User", userSchema);
