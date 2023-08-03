// WeatherPage.js

import React from "react";
import { Typography, Box, Paper, Grid } from "@mui/material";

const WeatherPage = () => {
  // Retrieve user data from local storage
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  return (
    <>
      <Typography variant="h4">Weather Page</Typography>

      <Grid container spacing={1} alignItems="flex-start">
        <Grid item xs={8} sm={4}>
          {user && (
            <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6">General User Stats:</Typography>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body1">
                  Full Name: {user.firstName} {user.lastName}
                </Typography>
                {/* Assuming lastLogin and loginCount are properties in the user data */}
                <Typography variant="body1">
                  Last Login: {user.lastLogin}
                </Typography>
                <Typography variant="body1">
                  Login Count: {user.loginCount}
                </Typography>
              </Box>
            </Paper>
          )}
        </Grid>
        {/* Add your weather data and display components here */}
        <Grid item xs={12} sm={8}>
          {/* Add weather data components here */}
          {/* For example: */}
          <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">Weather Data:</Typography>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body1">Temperature: 25°C</Typography>
              <Typography variant="body1">Humidity: 70%</Typography>
              {/* Add more weather data here */}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default WeatherPage;
