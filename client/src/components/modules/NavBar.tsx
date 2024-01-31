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
import "./NavBar.css";

/**
 * The navigation bar at the bottom of all pages. Takes no props.
 */
const NavBar = (props: {
  themeMode: string;
  setThemeMode: React.Dispatch<React.SetStateAction<string>>;
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
      return <Avatar alt="Avatar" src={user.picture} sx={{ width: 34, height: 34 }} />;
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
    <AppBar className="NavBar-container" position="sticky">
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
        <Button sx={{ marginRight: 1, fontWeight: 550 }} onClick={() => navigate("/food/latest")} color="inherit">
          Food
        </Button>
        <Button sx={{ marginRight: 1, fontWeight: 550 }} onClick={() => navigate("/food/calendar")} color="inherit">
          Calendar
        </Button>
        <Button sx={{ marginRight: 1, fontWeight: 550 }} onClick={() => navigate("/yourposts")} color="inherit">
          Your Posts
        </Button>
        <Button sx={{ marginRight: 1, fontWeight: 550 }} onClick={() => navigate("/resources")} color="inherit">
          Resources @ MIT
        </Button>
        <Button sx={{ marginRight: 1, fontWeight: 550 }} onClick={() => navigate("/about")} color="inherit">
          About
        </Button>
        <Box sx={{ flexGrow: 1 }}></Box>
        <MaterialUISwitch
          className="u-pointer"
          checked={props.themeMode === "dark"}
          onChange={() => props.setThemeMode(props.themeMode === "light" ? "dark" : "light")}
        />
        {user && (
          <Button
            className="u-pointer"
            onClick={() => {
              googleLogout();
              props.handleLogout();
            }}
            color="secondary"
            sx={{ fontWeight: 550 }}
          >
            Logout &nbsp;&nbsp; {renderAvatar(user)}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
