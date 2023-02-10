import { Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import InputSlider from "../components/Children";
import SnackBar from "../components/SnackBar";

const Favorites = () => {
  const [value, setSlider] = useState("");
  const passData = (data) => {
    setSlider(data);
  };
  return (
    <div>
      <Typography variant="h3">Favorites</Typography>
      <InputSlider passData={passData} />
      <Typography
        variant="h6"
        component={Paper}
        sx={{ p: 2, m: 2 }}
        elevation={4}>
        {value}
      </Typography>
      <SnackBar severity={"warning"} />
    </div>
  );
};

export default Favorites;
