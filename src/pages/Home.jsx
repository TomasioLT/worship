import { Outbound } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Home = () => {
  return (
    <Box>
      <Typography variant="h1">
        Application.
        <Outbound />
      </Typography>
    </Box>
  );
};

export default Home;
