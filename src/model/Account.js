import { Schema, model } from "mongoose";

const AccountSchema = Schema(
  {
    //title: { type: String, required: true, trim: true, unique: true },
    accountType: {
      type: String,
      trim: true,
    },
    accountNumber: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Account", AccountSchema);
