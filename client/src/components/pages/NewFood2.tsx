import React, { useState, useEffect, useRef } from "react";
import { Container, TextField, Box, Autocomplete, CssBaseline, Button } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { MuiFileInput } from "mui-file-input";
import { post } from "../../utilities";
import FoodEvent from "../../../../shared/FoodEvent";

export const NewFoodPage = () => {
  // TODO close button
  // TODO SAVE IMAGES TO DATABASE(?)

  const [fileInputValue, setFileInputValue] = React.useState<File[]>([]);
  // type from https://www.robinwieruch.de/typescript-react-useref/
  const foodTypeRef = useRef<HTMLInputElement>(null);
  const foodDescriptionRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleChange = (newValue: File[]) => {
    setFileInputValue(newValue);
  };

  const addNewFoodevent = (foodevent) => {
    post("/api/foodevent", foodevent).then(() => {});
  };

  const onSubmit = () => {
    /*
    const newFoodEvent = {
      title: foodTypeRef.current?.value,
      content: locationRef.current?.value,
      food_type: foodDescriptionRef.current?.value,
      photos: fileInputValue,
      scheduled: false,
    };
    addNewFoodevent(newFoodEvent);
    */
    // You can't use MongoDB from the frontend...
    // const event = new FoodEvent({
    //   title: foodTypeRef.current?.value,
    //   content: locationRef.current?.value,
    //   scheduled: false, // except for farm stand, community dinner (TODO: handle)
    //   photos: fileInputValue,
    //   food_type: foodDescriptionRef.current?.value,
    // });
    // event.save();
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "100%",
          paddingTop: "30px",
        }}
        noValidate
        autoComplete="off"
      >
        <h2>Submit a New Food Event</h2>
        <CssBaseline />

        {/* using a box (glorified div) just in case the style isn't passed through the text field (i don't think it is anyway)*/}
        <Box sx={{ m: 1 }}>
          {/* TODO allow multiple values - see https://mui.com/material-ui/react-autocomplete/#multiple-values*/}
          <Autocomplete
            // TODO: fix weird styling issue - hard to debug since the items are gone (ask in OH how to debug in the first place)
            // TODO: don't hardcode
            options={[
              { label: "Meal" },
              { label: "Snack" },
              { label: "Drink" },
              { label: "Groceries" },
            ]}
            renderInput={(params) => <TextField {...params} label="Food Type" />}
            ref={foodTypeRef}
          />
        </Box>
        <TextField
          sx={{ m: 1 }}
          required
          label="Food Description"
          helperText="Cuisine or dish type (pizza, sandwiches, etc.)"
          ref={foodDescriptionRef}
        />
        <TextField
          sx={{ m: 1 }}
          required
          label="Location"
          helperText="Builing + room number or name"
          ref={locationRef}
        />
        <TextField
          // sx={{ m: 1, width: '50ch' }}
          // TODO: both are called description: rename one at least in the front end
          sx={{ m: 1 }}
          label="Description"
          multiline
          rows={4}
          helperText="Any other details about quantity, quality, age of food event, location, etc."
          ref={descriptionRef}
        />
        <MuiFileInput
          multiple
          value={fileInputValue}
          onChange={handleChange}
          InputProps={{
            inputProps: {
              accept: "image/*, video/*",
            },
            startAdornment: <AttachFileIcon />,
          }}
          clearIconButtonProps={{
            title: "Remove",
            children: <CloseIcon fontSize="small" />,
          }}
          placeholder="Insert photo(s)"
          getInputText={(value) => (value ? "Thanks!" : "")}
          helperText="Click above! For multiple photos, please select and upload all at once."
        />
        <Button variant="contained" onClick={onSubmit}>
          Submit Food
        </Button>
      </Box>
    </>
  );
};

export default NewFoodPage;