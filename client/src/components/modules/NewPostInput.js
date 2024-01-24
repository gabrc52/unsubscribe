import React, { useState } from "react";

import "./NewPostInput.css";
// import { post } from "../../../utilities";

/**
 * create new food event
 * TODO: handle API
 * Proptypes
 * @param {({foodType, content, photo}) => void} onSubmit
 */
const NewPostInput = (props) => {
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
    <div className="NewPostInput">
      <input>
        Food Type:
        <input
          type="text"
          value={foodType}
          onChange={handleFoodTypeChange}
          className="NewPostInput-input"
        />
      </input>

      <input>
        Content:
        <textarea value={content} onChange={handleContentChange} className="NewPostInput-input" />
      </input>

      <input>
        Photo URL:
        <input
          type="text"
          value={photo}
          onChange={handlePhotoChange}
          className="NewPostInput-input"
        />
      </input>

      <button type="submit" className="NewPostInput-button u-pointer" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default NewPostInput;
