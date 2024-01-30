import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FoodEvent from "../../../../shared/FoodEvent";
import { get } from "../../utilities";
import FoodCard from "../modules/FoodCard";
import { useNavigate } from "react-router";

type Props = {};

const FoodPage = (props: Props) => {
  const [foodEvents, setFoodEvents] = useState<FoodEvent[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Food Events";
    get("/api/foodevents").then((foodEventObjs: FoodEvent[]) => {
      let reversedFoodEventObjs = foodEventObjs.reverse();
      setFoodEvents(reversedFoodEventObjs);
    });
  }, []);

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
        <Button variant="contained" onClick={() => navigate("/food/new")}>
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
          Free Food @ MIT
        </Typography>
        <Button variant="contained" onClick={() => navigate("/food/scheduled")}>
          See scheduled foods
        </Button>
      </Box>
      <Grid container spacing={4}>
        {foodEvents.map((foodEvent) => (
          <Grid item key={foodEvent._id} xs={12} sm={12} md={6}>
            <FoodCard {...foodEvent} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FoodPage;
