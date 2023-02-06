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
import KeySelect from "../components/KeySelect";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const CreateSong = () => {
  return (
    <Box>
      <Typography variant="h2">Create song</Typography>

      <Box>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Song Title"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Authors"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}>
              <KeySelect />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
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
