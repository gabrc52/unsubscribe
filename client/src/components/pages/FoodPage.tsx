import { Box, Button, Container, Grid, Switch, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import FoodEvent from "../../../../shared/FoodEvent";
import { get } from "../../utilities";
import FoodCard from "../modules/FoodCard";
import { useNavigate } from "react-router";
import { socket } from "../../client-socket";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// TODO: replace (from https://mui.com/material-ui/react-switch/#customization)
const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

type Props =
  // lol prettier, why is there an or operator at the BEGINNING
  | {
      time: "latest";
      view: "grid";
    }
  | {
      time: "scheduled";
      view: "calendar" | "grid";
    };

const FoodPage = (props: Props) => {
  const [foodEvents, setFoodEvents] = useState<FoodEvent[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Food Events";
    const fetchFoodEvents = () =>
      get("/api/foodevents", { scheduled: props.time === "scheduled" }).then(setFoodEvents);
    fetchFoodEvents();
    socket.on("FoodEventsUpdate", fetchFoodEvents);
    return () => {
      socket.off("FoodEventsUpdate", fetchFoodEvents);
    };
  }, [props.time]);

  const oppositeTime = props.time === "latest" ? "scheduled" : "latest";

  // https://mui.com/material-ui/react-card/#complex-interaction
  return (
    <Container maxWidth="md" sx={{ alignContent: "center" }}>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          pt: 2,
          pb: 2,
          gap: 3,
          justifyContent: {
            xs: "space-evenly",
            sm: "space-between",
          },
        }}
      >
        <Button
          variant="contained"
          sx={{ color: "#fff", fontWeight: 550 }}
          onClick={() => navigate("/food/new")}
        >
          Submit a New Food
        </Button>
        <Typography
          variant="h5"
          align="center"
          sx={{
            pt: 1,
            pb: 1,
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        >
          {props.time[0].toUpperCase()}
          {props.time.substring(1)} Food
        </Typography>
        {/** WHY IS THIS MISALIGNED? WHO KNOWS we will be changing the switch anyway...
         *
         * TODO (ari): either replace switch with the one with icons or fix vertical alignment
         */}
        {props.time === "scheduled" && (
          <Box sx={{ display: "flex", my: 0 }}>
            <CalendarMonthIcon />
            <Android12Switch
              checked={props.view === "calendar"}
              onChange={() => {
                if (props.view === "grid") {
                  navigate("/food/calendar");
                } else {
                  navigate("/food/scheduled");
                }
              }}
            />
          </Box>
        )}
        <Button
          variant="contained"
          sx={{ color: "#fff", fontWeight: 550 }}
          onClick={() => navigate(`/food/${oppositeTime}`)}
        >
          See {oppositeTime} foods
        </Button>
      </Box>
      {props.view === "grid" && (
        <Grid container spacing={4}>
          {foodEvents.map((foodEvent) => (
            <Grid item key={foodEvent._id} xs={12} sm={12} md={6}>
              <FoodCard {...foodEvent} key={foodEvent._id} />
            </Grid>
          ))}
        </Grid>
      )}
      {props.view === "calendar" && <p>Pretend this is a calendar :D</p>}
    </Container>
  );
};

export default FoodPage;
