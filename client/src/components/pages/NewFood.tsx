import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  TextField,
  Box,
  Autocomplete,
  CssBaseline,
  Button,
  Typography,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { MuiFileInput } from "mui-file-input";
import { post } from "../../utilities";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function Label({ componentName }: { componentName: string }) {
  const content = (
    <span>
      <strong>{componentName}</strong> for future food event
    </span>
  );

  return content;
}

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

  const [scheduledState, setScheduledState] = React.useState<string | null>("yes");

  const showDatePicker = scheduledState === "no";

  const handleScheduledChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newScheduledState: string | null
  ) => {
    setScheduledState(newScheduledState);
  };

  // const handleScheduledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setScheduledState((event.target as HTMLInputElement).scheduledState);
  // };

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
            renderInput={(params) => <TextField {...params} label="Category" />}
            ref={foodTypeRef}
          />
        </Box>
        <TextField
          sx={{ m: 1 }}
          required
          label="Food Type"
          helperText="Cuisine or dish type (pizza, Flour sandwiches, etc.)"
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
          getInputText={(value) => (value ? `Thanks!` : "")}
          helperText="Click above! For multiple photos, please select and upload all at once."
          // TODO: photo preview
        />
        <FormControl
          required
          sx={{ m: 2, display: "flex", alignItems: "center" }}
          // variant="standard"
        >
          {/* TODO: change accent color - this is red when selected because of the accent */}
          <FormLabel component="legend">Is this food available right now?</FormLabel>
          <RadioGroup row value={scheduledState} onChange={handleScheduledChange}>
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label="Yes, right meow"
              sx={{ mr: 5 }}
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label="No, schedule an event instead"
            />
          </RadioGroup>
        </FormControl>
        {showDatePicker && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label={<Label componentName="Schedule date/time" />}>
              <DateTimePicker />
            </DemoItem>
          </LocalizationProvider>
        )}
        <Button sx={{ m: 0 }} variant="contained" onClick={onSubmit}>
          Submit Food
        </Button>
      </Box>
    </>
  );
};

export default NewFoodPage;
