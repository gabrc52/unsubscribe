import React, { useState, useEffect, useRef } from "react";
import { Container, TextField, Box, Autocomplete, CssBaseline, Button } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { MuiFileInput } from "mui-file-input";
import { post } from "../../utilities";

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

  const [scheduledState, setScheduledState] = React.useState({
    yes: true,
    no: false,
  });

  const handleScheduledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScheduledState({
      ...scheduledState,
      [event.target.name]: event.target.checked,
    });
  };

  const { yes, no } = scheduledState;
  const error = [yes, no].filter((v) => v).length !== 1;

  const addNewFoodevent = (foodevent) => {
    post("/api/foodevent", foodevent).then(() => {});
  };

  const onSubmit = () => {
    console.log(foodDescriptionRef);
    // TODO: these are undefined, fix
    // i thought it was working with getElementById so at least we could do that even if it isn't very react-y
    console.log("Type", foodTypeRef.current?.value);
    console.log("Food Description", foodDescriptionRef.current?.value);
    console.log("Location", locationRef.current?.value);
    console.log("Description", descriptionRef.current?.value);
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
        <FormControl
          required
          error={error}
          component="fieldset"
          sx={{ m: 1, display: "flex", alignItems: "left" }}
          variant="standard"
        >
          <FormLabel component="legend">Is this food available right now?</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={yes} onChange={handleScheduledChange} name="yes" />}
              label="Yes"
            />
            <FormControlLabel
              control={<Checkbox checked={no} onChange={handleScheduledChange} name="no" />}
              label="No"
            />
          </FormGroup>
          <FormHelperText>Please select one.</FormHelperText>
        </FormControl>
        <Button variant="contained" onClick={onSubmit}>
          Submit Food
        </Button>
      </Box>
    </>
  );
};

export default NewFoodPage;
