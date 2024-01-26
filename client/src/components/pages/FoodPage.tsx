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
      <Typography variant="h5" align="center" sx={{ pt: 2, pb: 1 }}>
        Free Food @ MIT
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ pb: 2 }}>
        <Button variant="contained" onClick={() => navigate("/food/new")}>
          New Food
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
