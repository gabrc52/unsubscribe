import { PlainInterface } from "./util";
import { Comment } from "../server/models/Comment";

export type IComment = PlainInterface<Comment> & { creator: string };

export default IComment;
