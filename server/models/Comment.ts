import { Schema, model, Document } from "mongoose";

const CommentSchema = new Schema({
  creator_googleid: String,
  content: String,
});

export interface Comment extends Document {
  creator_googleid: string;
  content: string;
  _id: string;
}

const CommentModel = model<Comment>("Comment", CommentSchema);

export default CommentModel;
