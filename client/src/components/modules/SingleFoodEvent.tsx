import React from "react";
import FoodEvent from "../../../../shared/FoodEvent";

const SingleFoodEvent = (props: FoodEvent) => {
  return (
    <div className="SingleFoodEvent">
      <p className="Card-foodtype">{props.food_type}</p>
      <p className="Card-photo">{props.photos}</p>
      <p className="Card-content">{props.content}</p>
    </div>
  );
};

export default SingleFoodEvent;
