import React from "react";
import FoodEvent from "../../../../shared/FoodEvent";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { post, useUserId } from "../../utilities";

// https://mui.com/material-ui/react-menu/#basic-menu
// ngl if you have to do the accessibility of it yourself and this level of state management,
// this library doesn't provide enough. Using a component library shouldn't require having
// to paste code...

export default function OptionsButton(foodEvent: FoodEvent) {
  const userId = useUserId();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [unmarkedGone, setUnmarkedGone] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePostDelete = () => {
    const reallyDelete = confirm(
      `Are you sure you want to delete "${foodEvent.title || foodEvent.food_type}"`
    ); // this is synchronous? so it would block?
    if (reallyDelete) {
      fetch(`/api/foodevents/${foodEvent._id}`, {
        method: "DELETE",
      }).catch(console.error);
    }
    handleClose();
  };

  const unmarkGone = () => {
    setUnmarkedGone(!unmarkedGone)
    fetch(`/api/foodevents/unmarkAsGone/${foodEvent._id}`, {
      method: 'POST'
    }).catch(console.error);
  }

  return (
    <div>
      <IconButton
        aria-label="more options"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      {/* Button from sample: <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
      {(foodEvent.creator_userId === userId || foodEvent.isGone === true) && (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/** TODO: FIX FUCKED UP STYLING */}
        {foodEvent.creator_userId === userId && (
          <MenuItem onClick={handlePostDelete}>Delete post</MenuItem>
        )}
        {foodEvent.isGone === true && (
          <MenuItem onClick={unmarkGone}>Unmark gone</MenuItem>
        )}
      </Menu>
      )}
    </div>
  );
}
