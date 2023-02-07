import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const XmlParser = () => {
  return (
    <div>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden />
      </Button>
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton>
    </div>
  );
};

export default XmlParser;
