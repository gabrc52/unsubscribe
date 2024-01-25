import { Schema, model, Document } from "mongoose";

export type LoginType = "google" | "touchstone";

const UserSchema = new Schema({
  name: String,
  loginType: String,
  userId: String,
});

export interface User extends Document {
  name: string;
  loginType: String;
  userId: string;
  _id: string;
}

const UserModel = model<User>("User", UserSchema);

export default UserModel;
