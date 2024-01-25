import React, { useState, useEffect } from "react";
import SingleFoodEvent from "./SingleFoodEvent";
import CommentsBlock from "./CommentsBlock";
import { get } from "../../utilities";

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_userId
 * @param {string} content of the story
 */
const Card = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    get("/api/comment", { parent: props._id }).then((comments) => {
      setComments(comments);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  return (
    <div className="Card-container">
      <SingleFoodEvent
        creator_userId={props.creator_userId}
        _id={props._id}
        title={props.title}
        photos={props.photos}
        food_type={props.food_type}
        content={props.content}
      />
      <CommentsBlock
        story={props}
        comments={comments}
        creator_userId={props.creator_userId}
        addNewComment={addNewComment}
      />
    </div>
  );
};

export default Card;
