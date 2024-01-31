import { Schema, model, Document } from "mongoose";

export type FoodCategory = "Meal" | "Snack" | "Drink" | "Groceries";

// we prefer to store the ID of the poster, when it was posted from the app directly
// for posts imported from email, we use the available name (from the email)

const FoodEventSchema = new Schema({
  // Set when posting from the app
  creator_userId: String,
  // Set when posting from email
  emailer_address: String,
  emailer_name: String,

  food_category: String,
  food_type: String, // Cuisine or dish type (pizza, sandwiches, etc.)
  scheduled: Boolean, // true if a future scheduled event, false if available now
  location: String,
  photos: [String],
  title: String, // for email subject //mapped to food type
  content: String, // description / email body
  // date that the food event was posted
  postedDate: {
    type: Date,
    // automatically set to now so no need to do anything else :D
    default: Date.now,
  },
  // date the food event is scheduled to (if scheduled is true)
  scheduledDate: Date,
  isGone: Boolean,
  markedGoneBy: String
});

export interface FoodEvent extends Document {
  creator_userId?: string;
  emailer_address?: string;
  emailer_name?: string;
  food_category?: FoodCategory;
  food_type?: string;
  location?: String;
  scheduled: boolean;
  photos: string[];
  title?: string;
  content: string;
  _id: string;
  postedDate: Date;
  scheduledDate: Date;
  isGone: Boolean;
  markedGoneBy: String
}

const FoodEventModel = model<FoodEvent>("FoodEvent", FoodEventSchema);

export default FoodEventModel;
