/// TODO: IMPLEMENT COMMENTS

import React from "react";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator RETRIEVED FROM USER STATE IN DATABASE
 * @param {string} creator_userId
 * @param {string} content of the comment
 */
// TODO: add type but is this dead code?
const SingleComment = (props) => {
  return (
    <div className="Card-commentBody">
      <p>{props.creator || "Unknown"}:</p>
      <span>{" " + props.content}</span>
    </div>
  );
};

export default SingleComment;
