import { Schema, model, Document } from "mongoose";

// we prefer to store the ID of the poster, when it was posted from the app directly
// for posts imported from email, we use the available name (from the email)

const FoodEventSchema = new Schema({
  creator_userId: String,
  emailer_address: String,
  emailer_name: String,
  food_description: String, // Cuisine or dish type (pizza, sandwiches, etc.)
  scheduled: Boolean, // true if a future scheduled event, false if available now
  photos: [String],
  title: String, // for email subject //mapped to food type
  content: String, //mapped to location
});

export interface FoodEvent extends Document {
  creator_userId: string;
  emailer_address: string;
  emailer_name: string;
  food_description: string;
  scheduled: boolean;
  photos: string[];
  title: string;
  content: string;
  _id: string;
}

const FoodEventModel = model<FoodEvent>("FoodEvent", FoodEventSchema);

export default FoodEventModel;
