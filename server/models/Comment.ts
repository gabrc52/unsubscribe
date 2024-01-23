import { Schema, model, Document } from "mongoose";

const CommentSchema = new Schema({
  creator_id: String,
  content: String,
});

export interface Comment extends Document {
  creator_id: string;
  content: string;
  _id: string;
}

const CommentModel = model<Comment>("Comment", CommentSchema);

export default CommentModel;
