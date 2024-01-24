import React from "react";
import { Link } from "react-router-dom";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * param {string} creator_name RETRIEVED FROM CURRENT USER STATE IN DATABASE
 * @param {string} creator_googleid
 * @param {string} content of the comment
 */
const SingleComment = (props) => {
  return (
    <div className="Card-commentBody">
      <p>{props.creator_googleid}</p>
      <span>{" | " + props.content}</span>
    </div>
  );
};

export default SingleComment;
