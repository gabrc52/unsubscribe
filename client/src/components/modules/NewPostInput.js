import React, { useState } from "react";
import "./NewPostInput.css";
import { post } from "../../utilities";

const NewPostInput = (props) => {
  const [food_type, setFoodType] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleFoodTypeChange = (event) => {
    setFoodType(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhotos([event.target.value]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit({ food_type, title, content, photos });
    setFoodType("");
    setTitle("");
    setContent("");
    setPhotos([]);
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder="Food Type"
        value={food_type}
        onChange={handleFoodTypeChange}
        className="NewPostInput-input"
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        className="NewPostInput-input"
      />
      <textarea
        placeholder={props.defaultText}
        value={content}
        onChange={handleContentChange}
        className="NewPostInput-input"
      />
      <input
        type="text"
        placeholder="Photo URL"
        value={photos[0] || ""}
        onChange={handlePhotoChange}
        className="NewPostInput-input"
      />
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const NewComment = (props) => {
  const addComment = ({ food_type, title, content, photos }) => {
    const body = { parent: props.foodeventId, food_type, title, content, photos };
    post("/api/comment", body).then((comment) => {
      props.addNewComment(comment);
    });
  };

  return <NewPostInput defaultText="New Comment" onSubmit={addComment} />;
};

const NewFoodevent = (props) => {
  const addFoodevent = ({ food_type, title, content, photos }) => {
    const body = { food_type, title, content, photos };
    post("/api/foodevent", body).then((foodevent) => {
      props.addNewFoodevent(foodevent);
    });
  };

  return <NewPostInput defaultText="New Food Event" onSubmit={addFoodevent} />;
};

export { NewComment, NewFoodevent };
