import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Input from "@mui/material/Input";

export default function Tempo() {
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 300) {
      setValue(300);
    }
  };

  return (
    <Box>
      <Grid container xs={12} md={12} columnGap={4}>
        <Grid container xs={9} columnSpacing={3} direction="row-reverse">
          <Grid item xs={12} md={12}>
            <Typography id="input-slider" gutterBottom>
              Tempo
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Slider
              value={typeof value === "number" ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              min={30}
              max={240}
              defaultValue={110}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              value={value}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 30,
                max: 240,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
        <Grid container xs={12} md={3} rowSpacing={0} columnSpacing={5}>
          <Grid item xs={3} md={12}>
            <Typography id="input-slider" gutterBottom>
              Time
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Input
              sx={{ width: "25px" }}
              inputProps={{ step: 1, min: 1, max: 4, type: "number" }}
              defaultValue={4}></Input>
          </Grid>
          <Grid item xs={2}>
            <Input
              sx={{ width: "30px" }}
              defaultValue={4}
              inputProps={{ step: 1, min: 1, max: 4, type: "number" }}></Input>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
