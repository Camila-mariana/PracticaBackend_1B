/*
Campos: 
    name, 
    lastName,
    birthDate,
    email,
    password,
    isVerified,
    LoginAttempts,
    timeOut
*/
import { Schema, model } from "mongoose";
const customersSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    LoginAttempts: {
      type: Number,
    },
    timeOut: {
      type: Date,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);
export default model("customers", customersSchema);
