import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform form validation before submitting
    let isValid = true;

    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // If all fields are valid, proceed with login
    if (isValid) {
      // Retrieve user data from local storage
      const usersString = localStorage.getItem("users");
      const users = usersString ? JSON.parse(usersString) : {};

      // Check if the provided login credentials match any user data
      const matchedUser = Object.values(users).find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        // Login successful, increment the login count for the matched user
        matchedUser.lastLogin = new Date().toLocaleString();
        matchedUser.loginCount = (matchedUser.loginCount || 0) + 1;

        // Update the user data in the local storage
        users[matchedUser.email] = matchedUser;
        localStorage.setItem("users", JSON.stringify(users));

        // Set loggedIn state to true
        setLoggedIn(true);
        localStorage.setItem("loggedIn", "true");

        // Redirect the user to the WeatherPage after successful login
        navigate("/weather", { user: matchedUser });
      } else {
        // Login failed, show an error message or handle it as needed.
        alert("Invalid email or password. Please try again.");
      }
    }
  };

  if (loggedIn) {
    // Redirect the user to the WeatherPage if logged in
    return navigate("/weather", { user: null });
  }

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4">Login</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
