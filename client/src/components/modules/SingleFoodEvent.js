import React from "react";
import { Link } from "@reach/router";

/**
 * story = single food event
 *
 * Proptypes
 * @param {string} _id of the food post
 * @param {string} creator_id
 * @param {string} content of the story
 * @param {string} photo of food
 * @param {string} food_type
 */
const SingleFoodEvent = (props) => {
  return (
    <div className="SingleFoodEvent">
      <p className="Card-foodtype">{props.food_type}</p>
      <p className="Card-photo">{props.photo}</p>
      <p className="Card-content">{props.content}</p>
    </div>
  );
};

export default SingleFoodEvent;
