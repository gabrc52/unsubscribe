import React from "react";
import SingleComment from "./SingleComment";
import { NewComment } from "./NewPostInput.js";
import Comment from "../../../../shared/Comment";

type Props = {
  comments: Comment[];
  foodevent: Comment;
  creator_googleid: string;
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
            creator_googleid={comment.creator_googleid}
            content={comment.content}
          />
        ))}
        {props.creator_googleid && (
          <NewComment foodeventId={props.foodeventId} addNewComment={props.addNewComment} />
        )}
      </div>
    </div>
  );
};

export default CommentsBlock;
