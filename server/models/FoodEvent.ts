import { Schema, model, Document } from "mongoose";

type FoodCategory = "Meal" | "Snack" | "Drink" | "Groceries";

// we prefer to store the ID of the poster, when it was posted from the app directly
// for posts imported from email, we use the available name (from the email)

const FoodEventSchema = new Schema({
  creator_userId: String,
  emailer_address: String,
  emailer_name: String,
  food_category: String,
  food_type: String, // Cuisine or dish type (pizza, sandwiches, etc.)
  scheduled: Boolean, // true if a future scheduled event, false if available now
  location: String,
  photos: [String],
  title: String, // for email subject //mapped to food type
  content: String, // description / email body
});

export interface FoodEvent extends Document {
  creator_userId: string;
  emailer_address: string;
  emailer_name: string;
  food_category: FoodCategory;
  food_type: string;
  location: String;
  scheduled: boolean;
  photos: string[];
  title: string;
  content: string;
  _id: string;
}

const FoodEventModel = model<FoodEvent>("FoodEvent", FoodEventSchema);

export default FoodEventModel;
