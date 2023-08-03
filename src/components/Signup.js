import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Perform form validation before submitting
    let isValid = true;

    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

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

    // If all fields are valid, proceed with sign-up
    if (isValid) {
      // Create the user object with the sign-up data
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        lastLogin: new Date().toLocaleString(), // Set the lastLogin property to the current date and time
        loginCount: 0, // Set the initial loginCount to 0
      };

      // Retrieve existing users data from local storage
      const usersString = localStorage.getItem("users");
      const users = usersString ? JSON.parse(usersString) : {};

      // Check if the user already exists (by email)
      if (users[email]) {
        alert(
          "User with this email already exists. Please use a different email."
        );
        return;
      }

      // Add the new user to the users object
      users[email] = newUser;

      // Update the users data in the local storage
      localStorage.setItem("users", JSON.stringify(users));

      // Show a success message or redirect to the login page, etc.
      alert("Sign up successful! You can now log in.");

      // Clear the form fields after successful sign-up
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      // Redirect the user to the Login page after successful sign-up
      navigate("/login");
    }
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      marginTop={6}
    >
      <Grid item xs={12}>
        <Typography variant="h4">Sign Up</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={!!firstNameError}
          helperText={firstNameError}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={!!lastNameError}
          helperText={lastNameError}
          required
        />
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
        <Button variant="contained" color="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
        <span>
          <p>
            Already Have Account ?<a href="/login">Login</a>
          </p>
        </span>
      </Grid>
    </Grid>
  );
};

export default Signup;
