import { PlainInterface } from "./util";
import { FoodEvent, FoodCategory as WhyIsJavascriptLikeThis } from "../server/models/FoodEvent";

export type FoodCategory = WhyIsJavascriptLikeThis;

/// NOTE: The backend returns `creator` but it is not explicitly in the database
/// It gets the emailer name or user name conditionally

// And we are explicity adding `title` because the substraction in PlainInterface
// appeared to remove it
export type IFoodEvent = PlainInterface<FoodEvent> & {
  title: string;
  creator: string;
  markedGoneName: string;
};

export default IFoodEvent;
