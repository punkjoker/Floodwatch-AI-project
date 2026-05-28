import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function ValidatorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/validators/login",
        { email, password }
      );

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }

      localStorage.setItem("validator", JSON.stringify(res.data.user));

      alert("Login successful");
      navigate("/validator/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #eaf4ff, #f7fbff)",
      }}
    >
      {/* LEFT SIDE INFO */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          px: 8,
          background: "#e6f4ff",
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="#1e88e5">
          Validator Access Portal
        </Typography>

        <Typography sx={{ mt: 2, fontSize: 18, opacity: 0.8 }}>
          Secure access for approved flood data validators.  
          Submit reports, view routes, monitor alerts, and assist in emergency
          response coordination.
        </Typography>

        <Typography sx={{ mt: 4, fontSize: 14, opacity: 0.6 }}>
          ⚠ Access is restricted. All accounts must be approved by the system
          administrator.
        </Typography>
      </Box>

      {/* RIGHT SIDE LOGIN */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Card
          sx={{
            p: 4,
            width: 380,
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Validator Login
          </Typography>

          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Divider sx={{ my: 1 }} />

            <Typography sx={{ fontSize: 14, textAlign: "center" }}>
              Don’t have an account?
            </Typography>

            <Button
              component={Link}
              to="/validator/register"
              variant="outlined"
              fullWidth
            >
              Register as Validator
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}