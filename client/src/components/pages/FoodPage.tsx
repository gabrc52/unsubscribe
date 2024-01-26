import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FoodEvent from "../../../../shared/FoodEvent";
import { get } from "../../utilities";
import FoodCard from "../modules/FoodCard";

type Props = {};

const FoodPage = (props: Props) => {
  const [foodEvents, setFoodEvents] = useState<FoodEvent[]>([]);

  useEffect(() => {
    document.title = "Food Events";
    get("/api/foodevents").then((foodEventObjs: FoodEvent[]) => {
      let reversedFoodEventObjs = foodEventObjs.reverse();
      setFoodEvents(reversedFoodEventObjs);
    });
  }, []);

  // https://mui.com/material-ui/react-card/#complex-interaction
  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" sx={{ py: 2 }}>
        Free Food @ MIT
      </Typography>
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
