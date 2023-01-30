import { Google } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };
  return (
    <Container maxWidth="xs" sx={{ m: 2 }}>
      <Card>
        <CardContent>
          <Typography>Register Form</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  label="email"
                  placeholder="Enter email"
                  variant="outlined"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="password"
                  placeholder="Enter password"
                  type="password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography variant="subtitle" textAlign="center">
            Already have account? <Link to="/signin">Sign in</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
