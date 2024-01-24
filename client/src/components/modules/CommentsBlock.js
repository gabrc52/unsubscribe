import React from "react";
import SingleComment from "./SingleComment.js";
import { NewComment } from "./NewPostInput.js";

/**
 * @typedef ContentObject
 * @property {string} _id of story/comment
 * @property {string} content of the story/comment
 */

/**
 * Component that holds all the comments for a story
 *
 * Proptypes
 * @param {ContentObject[]} comments
 * @param {ContentObject} foodevent
 */
const CommentsBlock = (props) => {
    return (
      <div className="Card-commentSection">
        <div className="story-comments">
          {props.comments.map((comment) => (
            <SingleComment
              key={`SingleComment_${comment._id}`}
              _id={comment._id}
              creator_id={comment.creator_id}
              content={comment.content}
            />
          ))}
          {props.creator_id && (
            <NewComment storyId={props.foodevent._id} addNewComment={props.addNewComment} />
          )}
        </div>
      </div>
    );
  };
  
  export default CommentsBlock;