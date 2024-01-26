import React, { useEffect, useState } from "react";
import { NewFoodevent } from "../modules/NewPostInput";
import FoodEvent from "../../../../shared/FoodEvent";
import { get } from "../../utilities";

const [foodEvents, setFoodEvents] = useState<FoodEvent[]>([]);
const FoodForm = (props) => {
  
  useEffect(() => {
    document.title = "Food Events";
    get("/api/foodevents").then((foodEventObjs: FoodEvent[]) => {
      let reversedFoodEventObjs = foodEventObjs.reverse();
      setFoodEvents(reversedFoodEventObjs);
    });
  }, []);

  const handleFoodEventSubmission = (foodEventObj) => {
    setFoodEvents([foodEventObj].concat(foodEvents));
  };

  return <NewFoodevent onSubmit={handleFoodEventSubmission} />;
};

export { FoodForm, foodEvents };
