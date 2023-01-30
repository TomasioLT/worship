import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { UserAuth } from "../context/AuthContext";

const Account = () => {
  const { user } = UserAuth();

  return (
    <Box>
      <Card>
        <Typography variant="h3">Welcome, {user.displayName}</Typography>
      </Card>
    </Box>
  );
};

export default Account;
