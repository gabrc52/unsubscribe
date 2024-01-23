import { Schema, model, Document } from "mongoose";

const UserSchema = new Schema({
  name: String,
  googleid: String,
});

export interface User extends Document {
  name: string;
  googleid: string;
  _id: string;
}

const UserModel = model<User>("user", UserSchema);

export default UserModel;
