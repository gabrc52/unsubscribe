import React from "react";
import Switch, { SwitchProps } from "@mui/material/Switch";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GridViewIcon from '@mui/icons-material/GridView';
import { styled } from "@mui/material/styles";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 22 22" height="22px" viewBox="0 0 22 22" width="22px" fill="${encodeURIComponent("#283857")}"><g><rect fill="none" height="22" width="22"/></g><g><path d="M19,4h-1V2h-2v2H8V2H6v2H5C3.89,4,3.01,4.9,3.01,6L3,20c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,4,19,4z M19,20 H5V10h14V20z M9,14H7v-2h2V14z M13,14h-2v-2h2V14z M17,14h-2v-2h2V14z M9,18H7v-2h2V18z M13,18h-2v-2h2V18z M17,18h-2v-2h2V18z"/></g></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#eb9a18" : "#2c3e50a6",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#ffc338" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="${encodeURIComponent("#283857")}"><g fill-rule="evenodd"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/></g></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#eb9a18" : "#2c3e50a6",
    borderRadius: 20 / 2,
  },
}));

export { MaterialUISwitch };

// ,
//     "&::before": {
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
//         theme.palette.getContrastText(theme.palette.primary.main)
//       )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
//       left: 12,
//     },
//     "&::after": {
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
//         theme.palette.getContrastText(theme.palette.primary.main)
//       )}" d="M19,13H5V11H19V13Z" /></svg>')`,
//       right: 12,
//     },