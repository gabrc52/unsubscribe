import React, { useState } from "react";
import "./NewPostInput.css";
import { post } from "../../utilities";

const NewPostInput = (props) => {
  const [food_description, setFoodType] = useState("");
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

  // called when the user hits "Submit" for a new post (food event)
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit({ food_description, title, content, photos });
    setFoodType("");
    setTitle("");
    setContent("");
    setPhotos([]);
  };

  return (
    // mayhaps change to form
    <div className="u-flex">
      <input
        type="text"
        placeholder="Food Type"
        value={food_description}
        onChange={handleFoodTypeChange}
        className="NewPostInput-input"
        required
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

const NewCommentInput = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new comment input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div className="NewPostInput-container u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
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
  const addComment = (value) => {
    const body = { parent: props.foodeventId, content: value };
    post("/api/comment", body).then((comment) => {
      props.addNewComment(comment);
    });
  };

  return <NewCommentInput defaultText="New Comment" onSubmit={addComment} />;
};

const NewFoodevent = (props) => {
  const addFoodevent = ({ food_description, title, content, photos }) => {
    const body = { food_description, title, content, photos };
    post("/api/foodevent", body).then((foodevent) => {
      props.addNewFoodevent(foodevent);
    });
  };

  return <NewPostInput defaultText="New Food Event" onSubmit={addFoodevent} />;
};

export { NewComment, NewFoodevent };
