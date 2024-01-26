import { PlainInterface } from "./util";
import { FoodEvent } from "../server/models/FoodEvent";

export type IFoodEvent = PlainInterface<FoodEvent> & { title: string };

export default IFoodEvent;
