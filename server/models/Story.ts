import { Schema, model, Document } from "mongoose";

const StorySchema = new Schema({
  creator_id: String,
  creator_name: String,
  food_type: String,
  photo: String,
  content: String,
});

export interface Story extends Document {
  creator_id: string;
  creator_name: string;
  food_type: string;
  photo: string;
  content: string;
  _id: string;
}

const StoryModel = model<Story>("story", StorySchema);

export default StoryModel;
