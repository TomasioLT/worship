import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const KeySelect = () => {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        displayEmpty={true}
        onChange={handleChange}>
        <MenuItem value={1}>A</MenuItem>
        <MenuItem value={2}>B</MenuItem>
        <MenuItem value={3}>C</MenuItem>
        <MenuItem value={4}>D</MenuItem>
        <MenuItem value={5}>E</MenuItem>
        <MenuItem value={6}>F</MenuItem>
        <MenuItem value={7}>G</MenuItem>
      </Select>
    </FormControl>
  );
};

export default KeySelect;
