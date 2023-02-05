import {
  Box,
  Paper,
  TextField,
  Typography,
  Container,
  Grid,
  Button,
  styled,
} from "@mui/material";
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const CreateSong = () => {
  return (
    <Box sx={{ display: "flex" }} fullWidth>
      <Typography variant="h2">Create song</Typography>

      <Box>
        <form>
          <Grid container spacing={2} columnSpacing={10}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Song Title"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Authors"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default CreateSong;
