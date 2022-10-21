import { Schema, model } from "mongoose";

const UserSchemaLog = new Schema(
  {
    //title: { type: String, required: true, trim: true, unique: true },
    typeId: {
      type: String,
      unique: false,
    },
    idNumber: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: false,
    },
    lastname: {
      type: String,
      unique: false,
    },
    email: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default model('UserLog', UserSchemaLog);
