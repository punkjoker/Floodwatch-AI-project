import { useState } from "react";
import { Box, TextField, Button, Typography, Card } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        fullname,
        email,
        password,
      });

      setMessage(res.data.message);
    } catch (error) {
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
          Admin Register
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          sx={{ mt: 2 }}
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

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
          onClick={handleRegister}
        >
          Register
        </Button>

        {/* RESPONSE MESSAGE */}
        {message && (
          <Typography sx={{ mt: 2, textAlign: "center", color: "green" }}>
            {message}
          </Typography>
        )}

        <Typography textAlign="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1e88e5" }}>
            Login
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}