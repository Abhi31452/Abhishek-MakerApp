import mongoose, { Schema } from "mongoose";

export interface Iuser extends Document {
  _id: String;
  username: String,
  email: String,
  phoneno: Number,
  password: String,
  refrenceToken: String
}

const UserSchema = new Schema<Iuser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phoneno: { type: Number },
  password: { type: String, required: true },
  refrenceToken: { type: String }
},
  { timestamps: true })

const user = mongoose.model<Iuser>("user", UserSchema);
export default user;