/// TODO: IMPLEMENT COMMENTS

import React from "react";
import SingleComment from "./SingleComment";
import { NewComment } from "./NewPostInput.js";
import Comment from "../../../../shared/Comment";

type Props = {
  comments: Comment[];
  foodevent: Comment;
  creator_userId: string;
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
            creator_userId={comment.creator_userId}
            content={comment.content}
          />
        ))}
        {props.creator_userId && (
          <NewComment foodeventId={props.foodeventId} addNewComment={props.addNewComment} />
        )}
      </div>
    </div>
  );
};

export default CommentsBlock;
