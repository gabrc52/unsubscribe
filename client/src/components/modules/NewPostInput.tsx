import React, { useState } from "react";
import "./NewPostInput.css";
import { post } from "../../utilities";
import { Box, Button, Link, Tooltip } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const NewCommentInput = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new comment input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div className="NewPostInput-container u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      {/* <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button> */}
      {/* <Box className="NewPostInput-button u-pointer" sx={{ bgcolor: "secondary.main", color: "secondary.contrastText" }}> */}
      <Button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
        disableElevation
        variant="contained"
        endIcon={<SendIcon />}
        sx={{ borderRadius: "0 4px 4px 0", cursor: "pointer" }}
        // sx={{ bgcolor: "secondary", color: "secondary.contrastText" }}
        // variant="contained"
      >
        Submit
      </Button>
      {/* </Box> */}
    </div>
  );
};

const NewComment = (props: { foodeventId: string; addNewComment: Function }) => {
  const addComment = (value) => {
    post(`/api/foodevents/${props.foodeventId}/comments/new`, { content: value })
      .then((comment) => {
        props.addNewComment(comment);
      })
      .catch(console.error);
  };

  return <NewCommentInput defaultText="New Comment" onSubmit={addComment} />;
};

export { NewComment };
