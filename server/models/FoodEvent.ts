import { Schema, model, Document } from "mongoose";

const FoodEventSchema = new Schema({
  creator_googleid: String,
  food_type: String,
  photo: String,
  content: String,
});

export interface FoodEvent extends Document {
  creator_googleid: string;
  food_type: string;
  photo: string;
  content: string;
  _id: string;
}

const FoodEventModel = model<FoodEvent>("FoodEvent", FoodEventSchema);

export default FoodEventModel;
