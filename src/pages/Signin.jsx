import { Google } from "@mui/icons-material";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { auth, provider } from "../firebase";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn, googleSignIn, user } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      // console.error();
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/account");
    }
  });
  return (
    <Container maxWidth="xs" sx={{ m: 2 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="body1" color="initial" textAlign="center">
          Login Form
        </Typography>
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
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" fullWidth>
            Sign In
          </Button>
        </form>
        <Typography variant="subtitle" textAlign="center">
          Dont have account? <Link to="/signup">Sign up</Link>
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Button
          variant="outlined"
          onClick={handleGoogleSignIn}
          startIcon={<Google />}
          fullWidth>
          Continue with Google
        </Button>
      </Card>
    </Container>
  );
};

export default Signin;
