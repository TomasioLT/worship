import React from "react";
import { Card, Container, TextField, Typography } from "@mui/material";

const Login = () => {
  return (
    <Container maxWidth="xs" sx={{ m: 2 }}>
      <Card
        sx={{ display: "flex", flexDirection: "column", gap: "10px", p: 2 }}>
        <Typography variant="body1" color="initial" textAlign="center">
          Login Form
        </Typography>
        <TextField id="email" label="Email" required />
        <TextField id="password" label="Password" required type="password" />
      </Card>
    </Container>
  );
};

export default Login;
