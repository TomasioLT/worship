import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Input from "@mui/material/Input";

export default function Tempo(props) {
  const [value, setValue] = React.useState(110);
  const [firstTime, setFirstTime] = React.useState(4);
  const [secondTime, setSecondTime] = React.useState(4);
  const [finalTime, setFinalTime] = React.useState("");

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    propData();
  };

  const handleInputChangeTime = (event) => {
    setFinalTime(`${firstTime}/${secondTime}`);
    propData();
  };
  const propData = () => {
    props.sliderValue(value);
    props.tempoTime(finalTime);
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
          <Grid item xs={12}>
            <Slider
              value={typeof value === "number" ? value : 0}
              onChange={handleSliderChange}
              valueLabelDisplay="on"
              aria-labelledby="input-slider"
              min={30}
              max={240}
              defaultValue={110}
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
              value={firstTime}
              onInput={(e) => {
                setFirstTime(e.target.value);
                handleInputChangeTime();
              }}
              defaultValue={4}></Input>
          </Grid>
          <Grid item xs={2}>
            <Input
              sx={{ width: "30px" }}
              // defaultValue={4}
              value={secondTime}
              onInput={(e) => {
                setSecondTime(e.target.value);
                handleInputChangeTime();
              }}
              inputProps={{ step: 1, min: 1, max: 4, type: "number" }}></Input>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
