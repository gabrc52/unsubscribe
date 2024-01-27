/// TODO: IMPLEMENT COMMENTS

import React from "react";
import SingleComment from "./SingleComment";
import { NewComment } from "./NewPostInput.js";
import IComment from "../../../../shared/Comment"; // IComment

type Props = {
  comments: IComment[]; // IComment
  foodevent: IComment; // IComment
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
            // get comment.creator_userId and use to query for creator name? ie, the name of the user whose id is creator_userId
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
