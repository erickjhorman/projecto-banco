import { Schema, model } from "mongoose";

const rolesSchema = new Schema(
  {
    //title: { type: String, required: true, trim: true, unique: true },
    name: String 
    }, 
    {
        versionKey: false
    }

);

export default model("Role", rolesSchema);
