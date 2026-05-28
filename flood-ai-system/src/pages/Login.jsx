import { useState } from "react";
import { Box, TextField, Button, Typography, Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (res.data.message === "Login successful") {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5fbff",
      }}
    >
      <Card sx={{ padding: 4, width: 350, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Admin Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          sx={{ mt: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mt: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, background: "#1e88e5" }}
          onClick={handleLogin}
        >
          Login
        </Button>

        {message && (
          <Typography sx={{ mt: 2, textAlign: "center", color: "red" }}>
            {message}
          </Typography>
        )}

        <Typography textAlign="center" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#1e88e5" }}>
            Register
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}