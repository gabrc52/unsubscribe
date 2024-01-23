import React, { useState } from "react";

import "./FoodEventForm.css";
import { post } from "../../utilities";

/**
 * create new food event
 * TODO: handle API
 * Proptypes
 * @param {({foodType, content, photo}) => void} onSubmit
 */
const FoodEventForm = (props) => {
  const [foodType, setFoodType] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  const handleFoodTypeChange = (event) => {
    setFoodType(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit({ foodType, content, photo });
    setFoodType("");
    setContent("");
    setPhoto("");
  };

  return (
    <div className="FoodEventForm">
      <input>
        Food Type:
        <input
          type="text"
          value={foodType}
          onChange={handleFoodTypeChange}
          className="FoodEventForm-input"
        />
      </input>

      <input>
        Content:
        <textarea
          value={content}
          onChange={handleContentChange}
          className="FoodEventForm-input"
        />
      </input>

      <input>
        Photo URL:
        <input
          type="text"
          value={photo}
          onChange={handlePhotoChange}
          className="FoodEventForm-input"
        />
      </input>

      <button
        type="submit"
        className="FoodEventForm-button u-pointer"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default FoodEventForm;
