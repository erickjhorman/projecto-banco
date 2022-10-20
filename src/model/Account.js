import { Schema, model } from "mongoose";

const AccountSchema = Schema(
  {
    userId: [{
      ref: "User",
      type: Schema.Types.ObjectId
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
