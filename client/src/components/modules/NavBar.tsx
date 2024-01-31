import { CredentialResponse, GoogleLogin, googleLogout } from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Link, Avatar } from "@mui/material";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { palette } from "@mui/system";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { get } from "../../utilities";
import User from "../../../../shared/User";
import { MaterialUISwitch } from "./DarkToggle";
import logo from "../../public/blue_logo.png";
import "./NavBar.css";

/**
 * The navigation bar at the bottom of all pages. Takes no props.
 */
const NavBar = (props: {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  logo: "*.png";
  handleLogout: () => void;
}) => {
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
        // <Avatar sx={{ bgcolor: "secondary.main", width: 34, height: 34 }} aria-label="recipe">
        <Avatar
          className="grad"
          sx={{ color: "secondary.contrastText", bgcolor: "secondary.main", width: 34, height: 34 }}
          aria-label="recipe"
        >
          {user.name.at(0)}
        </Avatar>
      );
    }
  };
  return (
    // TODO: for accessibility etc we might want a link instead of a button but I can't figure out how to do that
    <AppBar className="NavBar-container" position="sticky" sx={{ bgcolor: "secondary" }}>
      <Toolbar>
        <Box>
          <img className="Navbar-logo" src={props.logo} alt="Unsubscribe logo" height={34.5} />
        </Box>
        &nbsp;&nbsp;
        <Typography
          className="NavBar-title"
          fontSize={34}
          variant="h6"
          color="secondary"
          // fontFamily={"Libre Barcode 128 Text"}
          sx={{
            paddingRight: 2.5,
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <Box className="NavBar-title">Unsubscribe</Box>
        </Typography>
        <Button sx={{ marginRight: 1 }} onClick={() => navigate("/food")} color="inherit">
          Food
        </Button>
        <Button sx={{ marginRight: 1 }} onClick={() => navigate("/yourposts")} color="inherit">
          Your Posts
        </Button>
        <Button sx={{ marginRight: 1 }} onClick={() => navigate("/resources")} color="inherit">
          Resources @ MIT
        </Button>
        <Button sx={{ marginRight: 1 }} onClick={() => navigate("/about")} color="inherit">
          About
        </Button>
        <Box sx={{ flexGrow: 1 }}></Box>
        <MaterialUISwitch
          className="u-pointer"
          onChange={() => props.setMode(props.mode === "light" ? "dark" : "light")}
        />
        {user && (
          <Button
            className="u-pointer"
            onClick={() => {
              googleLogout();
              props.handleLogout();
            }}
            color="secondary"
          >
            Logout &nbsp;&nbsp; {renderAvatar(user)}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
