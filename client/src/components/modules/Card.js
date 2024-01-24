import React from "react";
import SingleFoodEvent from "./SingleFoodEvent.js"

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_googleid
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
        _id={props._id}
        creator_googleid={props.creator_googleid}
        content={props.content}
      />
      <CommentsBlock
        story={props}
        comments={comments}
        creator_googleid={props.creator_googleid}
        addNewComment={addNewComment}
      />
    </div>
  );
};

export default Card;
