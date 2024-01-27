import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import { styled } from "@mui/material/styles";
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
// import IComment from "../../../../shared/Comment"; // must import if using IComment
// ^^^ also change in CommentsBlock.tsx

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

  useEffect(() => {
    get("/api/comment", { parent: foodEvent.creator_userId }).then((comments) => {
      setComments(comments);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {foodEvent.emailer_name?.at(0) ?? "F"}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={foodEvent.title}
        subheader={foodEvent.emailer_name ?? "TODO: Get sender in backend"}
      />
      {/* TODO: gallery / handle multiple photos */}
      {foodEvent.photos.length > 0 && (
        <CardMedia component="img" height="200" image={foodEvent.photos[0]} />
      )}
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments</Typography>
          {/* <CommentsBlock
            comments={comments}
            foodevent={foodEvent}
            creator_userId={foodEvent.creator_userId}
            foodeventId={foodEvent._id}
            addNewComment={addNewComment}
          /> */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default FoodCard;
