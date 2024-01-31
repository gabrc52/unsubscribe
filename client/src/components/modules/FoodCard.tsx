import React, { useState, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import { get } from "../../utilities";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Box, Button, Link, Tooltip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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
import OptionsButton from "./OptionsButton";
// ^^^ also change in CommentsBlock.tsx
import "./FoodCard.css";
import { socket } from "../../client-socket";

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
  const [markedGone, setMarkedGone] = useState(false);
  const [markedGoneBy, setMarkedGoneBy] = useState("");

  useEffect(() => {
    const updateComments = () => {
      get(`/api/foodevents/${foodEvent._id}/comments`)
        .then((comments) => {
          setComments(comments);
        })
        .catch(console.warn);
    };

    updateComments();

    const handleCommentsUpdate = (foodEventId) => {
      if (foodEvent._id === foodEventId) {
        updateComments();
      }
    };

    socket.on("CommentsUpdate", handleCommentsUpdate);

    return () => {
      socket.off("CommentsUpdate", handleCommentsUpdate);
    };
  }, []);

  const handleMarkAsGone = () => {
    if (!markedGone) {
      get("/api/whoami").then((user) => {
        if (user.name) {
          setMarkedGoneBy(user.name);
        }
      });
    }

    if (!markedGone) {
      const reallyMarkAsGone = confirm(
        `Are you sure you want to mark this as gone? "${foodEvent.title || foodEvent.food_type}"`
      );
      if (reallyMarkAsGone) {
        setMarkedGone(!markedGone);
        fetch(`/api/foodevents/markAsGone/${foodEvent._id}`, {
          method: "POST",
        }).catch(console.error);
      }
    }
  };

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    // TODO: what if instead of doing this we trigger a refresh
    // I really don't like mutating it here because it can cause inconsistencies
    // and lead the user to believe their comment was posted even if there is an error
    // In theory, this shouldn't even be needed once we implement sockets
    // ~rgabriel
    //
    // setComments(comments.concat([commentObj]));
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        avatar={
          // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          <Avatar className="Card-avatarGradient" aria-label="recipe">
            {foodEvent.creator.at(0)}
          </Avatar>
        }
        action={<OptionsButton {...foodEvent} />}
        // foodEvent.title ?? `${foodEvent.food_type} in ${foodEvent.location}`
        title={
          foodEvent.title ?? (
            <Typography>
              {foodEvent.food_type} in{" "}
              <Tooltip title={`Open ${foodEvent.location} in whereis.mit.edu`}>
                <Link
                  sx={{ fontWeight: "bold" }}
                  target="_blank"
                  href={`https://whereis.mit.edu/?go=${foodEvent.location}`}
                >
                  {foodEvent.location}
                </Link>
              </Tooltip>
            </Typography>
          )
        }
        subheader={
          <>
            <Typography variant="body2">{foodEvent.creator ?? "Unknown"}</Typography>
            <Box sx={{ fontSize: 12 }}>
              {foodEvent.postedDate && <ReactTimeAgo date={foodEvent.postedDate} locale="en-US" />}
            </Box>
          </>
        }
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
          sx={{ whiteSpace: "pre-wrap", maxHeight: 100, overflow: "auto" }}
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
        {!foodEvent.isGone && (
          <Button variant="contained" onClick={handleMarkAsGone}
          sx={{ bgcolor: "secondary.main", color: "primary.contrastText", fontWeight: 570 }}>
            Mark as gone?
          </Button>
        )}
        {foodEvent.isGone && (
          <Typography variant="body2">Marked gone by {foodEvent.markedGoneName}</Typography>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show/hide comments"
          sx={{
            // DO NOT CHANGE THESE!!!!!!!!
            paddingRight: 0,
            paddingBottom: expanded ? 1 : 0,
            paddingTop: expanded ? 0 : "auto",
            paddingLeft: expanded ? 1 : "auto",
            borderRadius: "16px 16px 16px 16px",
          }}
        >
          <Typography
            // makes it not be upside down
            sx={{
              transform: expanded ? "scale(-1, -1)" : undefined,
            }}
          >
            {/* {expanded ? "Hide" : "Show"} comments */}
            {expanded ? <MarkChatReadIcon /> : <ChatIcon />}
          </Typography>{" "}
          {/* <ExpandMoreIcon sx={{ marginBottom: 1 }}/> */}
          {expanded ? (
            <ExpandMoreIcon sx={{ marginTop: 1 }} />
          ) : (
            <ExpandMoreIcon sx={{ marginBottom: 1 }} />
          )}
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0, mt: 0 }}>
          <Typography variant="overline">Comments</Typography>
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
