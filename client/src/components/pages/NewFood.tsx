import React, { useState, useEffect, useRef, useMemo } from "react";
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
import FoodEvent, { FoodCategory } from "../../../../shared/FoodEvent";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  // blob URLs are temporary URLs for <img> to get a preview of images before user uploads
  const [blobUrls, setBlobUrls] = React.useState<string[]>([]);

  // For showing a preview of the pictures
  useEffect(() => {
    const revokeCurrentURLs = () => {
      for (const blob of blobUrls) {
        URL.revokeObjectURL(blob);
      }
    };

    // revoke selected files first
    revokeCurrentURLs();

    // get the blob URLs now
    setBlobUrls(selectedFiles.map((file) => URL.createObjectURL(file)));

    // revoke blob URLs when destroying the component
    return revokeCurrentURLs;
  }, [selectedFiles]);

  // type from https://www.robinwieruch.de/typescript-react-useref/
  const foodCategoryRef = useRef<HTMLInputElement>(null);
  const foodTypeRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLInputElement>(null);

  const [scheduledState, setScheduledState] = React.useState<string | null>("yes");

  const showDatePicker = scheduledState === "no";

  const handleScheduledChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newScheduledState: string | null
  ) => {
    setScheduledState(newScheduledState);
  };

  const handleFileInputChange = (newValue: File[]) => {
    setSelectedFiles(newValue);
  };

  const onSubmit = async () => {
    console.log("submitting!");
    const photos = await Promise.all(selectedFiles.map((file) => file.arrayBuffer())); //.map((buffer) => buffer.);
    console.log("photos acquired", photos);
    const foodEvent = {
      food_category: foodCategoryRef.current!.value as FoodCategory,
      food_type: foodTypeRef.current!.value,
      location: locationRef.current!.value,
      content: descriptionRef.current!.value,
      scheduled: scheduledState === "no",
      photos: photos,
      scheduledDate: datePickerRef?.current?.value,
    };
    try {
      await post("/api/foodevent", foodEvent);
      navigate("/food");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container
        component="form"
        maxWidth="sm"
        sx={{
          "& .MuiTextField-root": { width: "100%" },
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

        {/* TODO allow multiple values - see https://mui.com/material-ui/react-autocomplete/#multiple-values*/}
        <Autocomplete
          sx={{ width: "100%" }}
          // TODO: fix weird styling issue - hard to debug since the items are gone (ask in OH how to debug in the first place)
          // TODO: don't hardcode
          options={[
            { label: "Meal" },
            { label: "Snack" },
            { label: "Drink" },
            { label: "Groceries" },
          ]}
          renderInput={(params) => (
            <TextField inputRef={foodCategoryRef} {...params} label="Category" />
          )}
        />
        <TextField
          sx={{ m: 1 }}
          required
          label="Food Type"
          helperText="Cuisine or dish type (pizza, Flour sandwiches, etc.)"
          inputRef={foodTypeRef}
        />
        <TextField
          sx={{ m: 1 }}
          required
          label="Location"
          helperText="Builing + room number or name"
          inputRef={locationRef}
        />
        <TextField
          // sx={{ m: 1, width: '50ch' }}
          // TODO: both are called description: rename one at least in the front end
          sx={{ m: 1 }}
          label="Description"
          multiline
          rows={4}
          helperText="Any other details about quantity, quality, age of food event, location, etc."
          inputRef={descriptionRef}
        />
        <MuiFileInput
          multiple
          value={selectedFiles}
          onChange={handleFileInputChange}
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
          getInputText={(fileList) => (fileList ? `Thanks!` : "")}
          helperText="Click above! For multiple photos, please select and upload all at once."
        />
        {/* IMAGE PREVIEW - TODO may need styling */}
        {blobUrls.map((url) => (
          <img src={url} width="100%"></img>
        ))}
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
              <DateTimePicker inputRef={datePickerRef} />
            </DemoItem>
          </LocalizationProvider>
        )}
        <Button sx={{ m: 0 }} variant="contained" onClick={onSubmit}>
          Submit Food
        </Button>
      </Container>
    </>
  );
};

export default NewFoodPage;
