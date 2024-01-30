import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  // IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FoodEvent from "../../../../shared/FoodEvent";
import CommentsBlock from "./CommentsBlock";
import Comment from "../../../../shared/Comment"; // must import if using IComment
// ^^^ also change in CommentsBlock.tsx
import axios from "axios";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FoodCard = (foodEvent: FoodEvent) => {
  const [comments, setComments] = useState<Comment[]>([]); // or <IComment[]> ??
  const [uploadedPictures, setUploadedPictures] = useState<string[]>([]);
  const [markedGone, setMarkedGone] = useState(false);
  const [markedGoneBy, setMarkedGoneBy] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isAuthorizedToDelete, setIsAuthorizedToDelete] = useState(false);

  const { creator_userId: creatorUserId } = foodEvent;

  useEffect(() => {
    get("/api/comment", { parent: foodEvent._id }).then((comments) => {
      setComments(comments);
    });
  }, []);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user.name) {
        setMarkedGoneBy(user.name);
      }
      if (user.userId === creatorUserId) {
        setIsAuthorizedToDelete(true);
      }
    });
    
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  const handleMarkAsGone = () => {
    setMarkedGone(!markedGone);

    if (!markedGone) {
      get("/api/whoami").then((user) => {
        if (user.name) {
          setMarkedGoneBy(user.name);
        }
      });
    }
  };

  const handleDeleteConfirmation = () => {
    axios.delete(`/api/delete_post/${foodEvent._id}`).then((response) => {
      if (response.status === 200) {
        alert("Post deleted successfully!");
      } else if (response.status === 401) {
        alert("You are not authorized to delete this post.");
      } else {
        alert("An error occurred while deleting the post.");
      }
      setShowDeleteConfirmation(false);
    });
  };

  const handleDeletePost = () => {
    setShowDeleteConfirmation(true);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    setUploadedPictures((prevPictures) => [...prevPictures, ...selectedFiles]);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {foodEvent.creator.at(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={foodEvent.title}
        subheader={foodEvent.creator ?? "Unknown"}
      />
      {/* TODO: gallery / handle multiple photos */}
      {(foodEvent.photos.concat(uploadedPictures)).map((picture, index) => (
        <CardMedia key={index} component="img" height="200" image={picture} />
      ))}
      {/* TODO: change to suit our needs */}
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: "pre-wrap", maxHeight: 100, overflow: "scroll" }}
        >
          {foodEvent.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
         <Button variant="outlined" component="label">
          Upload Picture
          <input
            type="file"
            hidden
            onChange={handleFileInputChange} 
            multiple
          />
        </Button>
        {!markedGone && (
          <Button variant="contained" onClick={handleMarkAsGone}>
            Mark as gone?
          </Button>
        )}
        {markedGone && (
          <Typography variant="body2">
            Marked gone by {markedGoneBy}
          </Typography>
        )}
        {isAuthorizedToDelete && (
          <Button variant="contained" onClick={handleDeletePost}>
            Delete Post
          </Button>
        )}
        <Dialog
          open={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirmation} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Typography
            // makes it not be upside down
            sx={{
              transform: expanded ? "scale(-1, -1)" : undefined,
            }}
          >
            {expanded ? "Hide" : "Show"} comments
          </Typography>{" "}
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0, mt: 0 }}>
          <Typography paragraph variant="overline">
            Comments
          </Typography>
          <CommentsBlock
            comments={comments}
            foodevent={foodEvent}
            creator_userId={foodEvent.creator_userId}
            foodeventId={foodEvent._id}
            addNewComment={addNewComment}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default FoodCard;
