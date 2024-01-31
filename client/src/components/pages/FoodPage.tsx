import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FoodEvent from "../../../../shared/FoodEvent";
import { get } from "../../utilities";
import FoodCard from "../modules/FoodCard";
import { useNavigate } from "react-router";
import { socket } from "../../client-socket";
import { MaterialUISwitch } from "../modules/CalendarToggle";
import FoodCalendar from "./FoodCalendar";

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
            pl: 3,
            justifySelf: "center",
            alignSelf: "center",
            justifyItems: "center",
            alignItems: "center",
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
         <Box sx={{ display: "flex", my: 0 }}>
        {props.time === "scheduled" && (
          // <Box sx={{ display: "flex", my: 0 }}>
            <MaterialUISwitch
              checked={props.view === "calendar"}
              onChange={() => {
                if (props.view === "grid") {
                  navigate("/food/calendar");
                } else {
                  navigate("/food/scheduled");
                }
              }}
              sx={{ mr: 1 }}
            />
          // </Box>
        )}
        <Button
          variant="contained"
          sx={{ color: "#fff", fontWeight: 550 }}
          onClick={() => navigate(`/food/${oppositeTime}`)}
        >
          See {oppositeTime} foods
        </Button>
        </Box>
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
      {props.view === "calendar" && <FoodCalendar foodEvents={foodEvents} />}
    </Container>
  );
};

export default FoodPage;
