import { Container, TextField } from "@mui/material";
import React from "react";

export const NewFoodPage = () => {
  // TODO close button
  return (
    <>
      <Container>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </Container>
    </>
  );
};

export default NewFoodPage;
