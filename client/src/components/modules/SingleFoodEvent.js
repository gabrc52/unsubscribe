import React, { useState } from "react";

import "./SingleFoodEvent.css";
import { post } from "../../../utilities";

/**
 * create new food event
 *
 * Proptypes
 * @param {({foodType, content, photo}) => void} onSubmit
 */
const SingleFoodEvent = (props) => {
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
    post("/api/foodEvent", body).then((foodEvent) => {
      // display this story on the screen
      props.addSingleFoodEvent(foodEvent);
    });
    setFoodType("");
    setContent("");
    setPhoto("");
  };

  return (
    <div className="SingleFoodEvent">
      <input>
        Food Type:
        <input
          type="text"
          value={foodType}
          onChange={handleFoodTypeChange}
          className="SingleFoodEvent-input"
        />
      </input>

      <input>
        Content:
        <textarea
          value={content}
          onChange={handleContentChange}
          className="SingleFoodEvent-input"
        />
      </input>

      <input>
        Photo URL:
        <input
          type="text"
          value={photo}
          onChange={handlePhotoChange}
          className="SingleFoodEvent-input"
        />
      </input>

      <button
        type="submit"
        className="SingleFoodEvent-button u-pointer"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} eventId to add comment to
 */
const NewComment = (props) => {
  const addComment = (value) => {
    const body = { parent: props.eventId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      props.addNewComment(comment);
    });
  };

  return <FoodEvent defaultText="New Comment" onSubmit={addComment} />;
};

export default SingleFoodEvent;
