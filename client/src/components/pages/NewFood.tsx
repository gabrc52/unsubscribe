import React, { useState, useEffect } from "react";
import { Container, TextField, Box } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { MuiFileInput } from "mui-file-input";
import { post } from "../../utilities";

export const NewFoodPage = () => {
  // TODO close button
  // TODO SAVE IMAGES TO DATABASE(?)

  const [value, setValue] = React.useState<File[]>([]);

  const handleChange = (newValue: File[]) => {
    setValue(newValue);
  };

  const addNewFoodevent = (foodevent) => {
    post("/api/foodevent", foodevent).then(() => {});
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
        <TextField
          sx={{ m: 1 }}
          required
          id="outlined-required"
          label="Food Type"
          helperText="Cuisine or dish type (pizza, sandwiches, etc.)"
        />
        <TextField
          sx={{ m: 1 }}
          required
          id="outlined-helperText"
          label="Location"
          helperText="Builing + room number or name"
        />
        <TextField
          // sx={{ m: 1, width: '50ch' }}
          sx={{ m: 1 }}
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          helperText="Any other details about quantity, quality, age of food event, location, etc."
        />
        <MuiFileInput
          multiple
          value={value}
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
      </Box>
    </>
  );
};

export default NewFoodPage;
