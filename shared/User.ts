import { User } from "../server/models/User";
import { PlainInterface } from "./util";

export type IUser = PlainInterface<User>;

export default IUser;
