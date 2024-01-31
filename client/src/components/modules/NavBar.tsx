import { CredentialResponse, GoogleLogin, googleLogout } from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Link, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import { get } from "../../utilities";
import User from "../../../../shared/User";
import "./NavBar.css";

/**
 * The navigation bar at the bottom of all pages. Takes no props.
 */
const NavBar = (props: { handleLogout: () => void }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    get(`/api/whoami`).then((userObj) => setUser(userObj));
  }, []);

  const renderAvatar = (user: User) => {
    // Handle Google avatars
    if (user.picture) {
      return <Avatar alt="Avatar" src={user.picture} sx={{ width: 36, height: 36 }} />;
    } else {
      // Default avatar or placeholder if login type is unknown
      return (
        <Avatar sx={{ bgcolor: red[500], width: 36, height: 36 }} aria-label="recipe">
          {user.name.at(0)}
        </Avatar>
      );
    }
  };

  return (
    // TODO: for accessibility etc we might want a link instead of a button but I can't figure out how to do that
    <AppBar className="NavBar-container" position="sticky">
      <Toolbar>
        {/** TODO: logo */}
        <Typography
          className="NavBar-link"
          variant="h6"
          sx={{
            paddingRight: 3,
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          Unsubscribe
        </Typography>
        <Button sx={{ paddingRight: 1.6 }} onClick={() => navigate("/food")} color="inherit">
          Food
        </Button>
        <Button sx={{ paddingRight: 1.6 }} onClick={() => navigate("/yourposts")} color="inherit">
          Your Posts
        </Button>
        <Button onClick={() => navigate("/resources")} color="inherit">
          Resources @ MIT
        </Button>
        <Button sx={{ paddingRight: 1.6 }} onClick={() => navigate("/about")} color="inherit">
          About
        </Button>
        <Box sx={{ flexGrow: 1 }}></Box>
        {user && (
          <Button
            onClick={() => {
              googleLogout();
              props.handleLogout();
            }}
            color="inherit"
          >
            {renderAvatar(user)} &nbsp; Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
