import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginComp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const response = await fetch(
        "http://localhost:8081/api/auth/login",
        {
          method: "POST",
          credentials: "include", // Cookie sent & received
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Spring Boot Response:", data);

      // Login Failed
      if (data.message !== "Login successful") {
        setMsg(data.message || "Invalid username or password");
        return;
      }

      const userData = {
        username: data.username,
        role: data.role,
      };

      dispatch(
        login({
          user: userData,
        })
      );

      // Save only user info (JWT is in HttpOnly Cookie)
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: userData,
        })
      );

      if (data.role === "DELIVERY_PARTNER" && data.partnerId) {
        localStorage.setItem("partnerId", String(data.partnerId));
        localStorage.setItem("partnerCity", data.partnerCity || "");
        localStorage.setItem("partnerCompany", data.partnerCompany || "");
        console.log("✅ Partner ID saved:", data.partnerId);
      }

      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      switch (data.role) {
        case "ADMIN":
          navigate("/admin");
          break;

        case "SELLER":
          navigate("/seller");
          break;

        case "CUSTOMER":
          navigate("/user");
          break;

        case "DELIVERY_PARTNER":
          navigate("/delivery");
          break;

        default:
          setMsg("Invalid user role: " + data.role);
          break;
      }
    } catch (error) {
      console.error("Login Error:", error);

      setMsg(
        "Unable to connect to Spring Boot Backend. Make sure Spring Boot is running on port 8081."
      );
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          p: 5,
          borderRadius: 4,
        }}
      >
        <Box textAlign="center" mb={3}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 60,
              height: 60,
              mx: "auto",
              mb: 2,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h4" fontWeight="bold">
            Welcome Back
          </Typography>

          <Typography color="text.secondary" mt={1}>
            Login to your Kharido account
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <FormControlLabel
              control={<Checkbox />}
              label="Remember Me"
            />

            <Link
              to="#"
              style={{
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            LOGIN
          </Button>

          {msg && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {msg}
            </Alert>
          )}

          <Typography textAlign="center" mt={3}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}