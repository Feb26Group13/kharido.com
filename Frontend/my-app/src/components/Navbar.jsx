import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.username;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <AppBar position="static">

      <Toolbar>

        {/* Logo */}

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            flexGrow: 1,
          }}
        >
          Kharido
        </Typography>

        {/* Navigation */}

        <Button
          color="inherit"
          component={Link}
          to="/"
        >
          Home
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/products"
        >
          Products
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/categories"
        >
          Categories
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/contact"
        >
          Contact
        </Button>

        <Box sx={{ ml: 3 }}>

          {userName ? (
            <>

              <Typography
                component="span"
                sx={{
                  mr: 2,
                  fontWeight: "bold",
                }}
              >
                Welcome, {userName}
              </Typography>

              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
              >
                Logout
              </Button>

            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="inherit"
                sx={{ mr: 1 }}
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="secondary"
              >
                Register
              </Button>
            </>
          )}

        </Box>

      </Toolbar>

    </AppBar>
  );
}