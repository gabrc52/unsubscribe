import { CredentialResponse, GoogleLogin, googleLogout } from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Link,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { get } from "../../utilities";
import User from "../../../../shared/User";
import { MaterialUISwitch } from "./DarkToggle";
import "./NavBar.css";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import EventIcon from "@mui/icons-material/Event";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SupportIcon from "@mui/icons-material/Support";
import InfoIcon from "@mui/icons-material/Info";

const navigationOptions = [
  { title: "Food", destination: "/food/latest", icon: <DinnerDiningIcon /> },
  { title: "Calendar", destination: "/food/calendar", icon: <EventIcon /> },
  { title: "Your Posts", destination: "/yourposts", icon: <AccountBoxIcon /> },
  { title: "Resources @ MIT", destination: "/resources", icon: <SupportIcon /> },
  { title: "About", destination: "/about", icon: <InfoIcon /> },
];

/**
 * The navigation links (home, calendar, etc)
 */
const AppBarLinksDesktop = () => {
  const navigate = useNavigate();

  return navigationOptions.map((option) => (
    <Button
      sx={{
        marginRight: {
          xs: 0,
          sm: 1,
        },
        fontWeight: 550,
      }}
      onClick={() => navigate(option.destination)}
      color="inherit"
    >
      {option.icon} {option.title}
    </Button>
  ));
};

/**
 * The navigation bar at the bottom of all pages. Takes no props.
 */
const NavBar = (props: {
  themeMode: string;
  setThemeMode: React.Dispatch<React.SetStateAction<string>>;
  logo: "*.png";
  handleLogout: () => void;
}) => {
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

  // TODO: for accessibility etc we might want a link instead of a button but I can't figure out
  // how to do that
  return (
    <>
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
              textOverflow: "clip",
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            <Box className="NavBar-title">Unsubscribe</Box>
          </Typography>
          <Box
            sx={{
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            <AppBarLinksDesktop />
          </Box>
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
    </>
  );
};

export default NavBar;
