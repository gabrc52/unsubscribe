import { CredentialResponse, GoogleLogin, googleLogout } from "@react-oauth/google";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Link } from "@mui/material";

/**
 * The navigation bar at the bottom of all pages. Takes no props.
 */
const NavBar = (props: { userId: string; handleLogout: () => void }) => {
  const navigate = useNavigate();

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
        <Button
          onClick={() => {
            googleLogout();
            props.handleLogout();
          }}
          color="inherit"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
