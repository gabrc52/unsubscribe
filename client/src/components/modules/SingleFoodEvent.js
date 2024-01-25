import React from "react";
import { Link } from "react-router-dom";

/**
 * story = single food event
 *
 * Proptypes
 * @param {string} _id of the food post
 * @param {string} creator_googleid
 * @param {string} content of the story
 * @param {string} photos of food
 * @param {string} food_type
 */
const SingleFoodEvent = (props) => {
  return (
    <div className="SingleFoodEvent">
      <p className="Card-title">{props.title}</p>
      <p className="Card-foodtype">{props.food_type}</p>
      <p className="Card-photo">{props.photos}</p>
      <p className="Card-content">{props.content}</p>
    </div>
  );
};

export default SingleFoodEvent;
