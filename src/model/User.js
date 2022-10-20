import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
const UserSchema = new Schema(
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
    password:{
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.encryptPassword = async (password) => {
     const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }

UserSchema.statics.comparePassword = async(password, receivedPassword) => {
   return await bcrypt.compare(password, receivedPassword)

}

export default model('User', UserSchema);
