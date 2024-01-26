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
    <AppBar position="sticky">
      <Toolbar>
        {/** TODO: logo */}
        <Typography variant="h6" sx={{ paddingRight: 3 }}>
          Unsubscribe
        </Typography>
        <Button onClick={() => navigate("/")} color="inherit">
          Home
        </Button>
        <Button onClick={() => navigate("/resources")} color="inherit">
          Resources
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
