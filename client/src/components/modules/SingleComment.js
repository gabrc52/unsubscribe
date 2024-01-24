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
      <Link to={`/profile/${props.creator_googleid}`} className="u-link u-bold">
        {props.creator_name}
      </Link>
      <span>{" | " + props.content}</span>
    </div>
  );
};

export default SingleComment;
