/// TODO: IMPLEMENT COMMENTS

import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import { NewComment } from "./NewPostInput";
import Comment from "../../../../shared/Comment"; // IComment
import FoodEvent from "../../../../shared/FoodEvent";
import { get } from "../../utilities";
import { socket } from "../../client-socket";

type Props = {
  comments: Comment[]; // IComment
  foodevent: FoodEvent;
  creator_userId: string | undefined;
  foodeventId: string;
  addNewComment: Function;
};

/**
 * Component that holds all the comments for a story
 */
const CommentsBlock = (props: Props) => {
  return (
    <div className="Card-commentSection">
      <div className="food-comments">
        {props.comments.map((comment) => (
          <SingleComment
            key={`SingleComment_${comment._id}`}
            _id={comment._id}
            creator={comment.creator} // Use the creator property from comments [this was commented out before]
            creator_userId={comment.creator_userId}
            content={comment.content}
          />
        ))}
        <NewComment foodeventId={props.foodeventId} addNewComment={props.addNewComment} />
      </div>
    </div>
  );
};

export default CommentsBlock;
