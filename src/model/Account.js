import { Schema, model } from "mongoose";

const AccountSchema = Schema(
  {
    userId: [{
      ref: "User",
      type: String
   }],
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
