import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import FoodEvent from "../../../../shared/FoodEvent";

const FoodCard = (foodEvent: FoodEvent) => {
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
        <Carousel showArrows={true}>
          {foodEvent.photos.map((photo) => (
            <CardMedia component="img" height="200" image={photo} />
          ))}
        </Carousel>
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
        <ExpandMoreIcon />
      </CardActions>
    </Card>
  );
};

export default FoodCard;
