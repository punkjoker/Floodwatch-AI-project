import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import LoginIcon from "@mui/icons-material/Login";
import FloodIcon from "@mui/icons-material/Waves";
import CloudIcon from "@mui/icons-material/Cloud";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/weather");
        setWeather(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);
const getWeatherIcon = (condition) => {
  if (!condition) return <CloudIcon sx={{ fontSize: 40, color: "#90caf9" }} />;

  const c = condition.toLowerCase();

  if (c.includes("rain") || c.includes("drizzle")) {
    return <WaterDropIcon sx={{ fontSize: 40, color: "#42a5f5" }} />;
  }

  if (c.includes("cloud")) {
    return <CloudIcon sx={{ fontSize: 40, color: "#90caf9" }} />;
  }

  if (c.includes("sun") || c.includes("clear")) {
    return <FloodIcon sx={{ fontSize: 40, color: "#ffd54f" }} />; // replace later with SunIcon if you want
  }

  return <CloudIcon sx={{ fontSize: 40, color: "#90caf9" }} />;
};
  return (
    
    <Box sx={{ minHeight: "100vh", background: "#f5fbff", color: "#0f172a" }}>
      
      {/* NAVBAR */}
      <AppBar
        position="static"
        sx={{
          background: "#e6f4ff",
          boxShadow: "none",
          borderBottom: "2px solid #b3e5ff",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#1e88e5" }}>
            Nairobi Flood System
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button startIcon={<HomeIcon />} sx={{ color: "#1e88e5" }}>
              Home
            </Button>

            <Button startIcon={<SupportAgentIcon />} sx={{ color: "#1e88e5" }}>
              Services
            </Button>
<Button component={Link} to="/routes-monitor" startIcon={<WarningIcon />} sx={{ color: "#1e88e5" }}>
  Routes Monitor
</Button>
            <Button startIcon={<WarningIcon />} sx={{ color: "#1e88e5" }}>
              Alerts
            </Button>

            <Button startIcon={<ReportIcon />} sx={{ color: "#1e88e5" }}>
              Report
            </Button>

<Button component={Link} to="/validator/login">
  Validator Login
</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* HERO SECTION */}
      {/* HERO SECTION */}
<Box
  sx={{
    position: "relative",
    textAlign: "center",
    py: 7,
minHeight: "55vh",
display: "flex",
alignItems: "center",
justifyContent: "center",
    backgroundImage: "url('/images/floodhome.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  }}
>
  
  {/* DARK OVERLAY */}
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.45)",
      zIndex: 1,
    }}
  />

  {/* CONTENT */}
  <Box sx={{ position: "relative", zIndex: 2 }}>
    
    {/* ICONS */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 3,
        mb: 2,
      }}
    >
      <FloodIcon sx={{ fontSize: 45, color: "#90caf9" }} />
      <CloudIcon sx={{ fontSize: 45, color: "#bbdefb" }} />
      <WaterDropIcon sx={{ fontSize: 45, color: "#64b5f6" }} />
    </Box>

    <Typography
      variant="h3"
      fontWeight="bold"
      sx={{
        color: "white",
        textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
      }}
    >
      Flood Risk Intelligence
    </Typography>

    <Typography
      sx={{
        mt: 2,
        color: "#f1f5f9",
        fontSize: "1.1rem",
        maxWidth: 700,
        mx: "auto",
      }}
    >
      Monitoring rainfall, river levels, high-risk zones, and emergency
      response coordination across Nairobi in real time.
    </Typography>

    <Button
      variant="contained"
      sx={{
        mt: 4,
        backgroundColor: "#1e88e5",
        paddingX: 5,
        paddingY: 1.5,
        borderRadius: 3,
        fontWeight: "bold",
        fontSize: "1rem",
        boxShadow: "0 8px 20px rgba(30,136,229,0.4)",
      }}
    >
      Open Live Dashboard
    </Button>
  </Box>
</Box>
{weather && (
  <Box sx={{ px: 4, mt: 3 }}>
    <Card
      sx={{
        background: "#e3f2fd",
        border: "1px solid #90caf9",
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          Live Weather – {weather.city}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6} md={3}>
            <Typography>Temperature</Typography>
            <Typography fontWeight="bold">
              {weather.temperature}°C
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography>Humidity</Typography>
            <Typography fontWeight="bold">
              {weather.humidity}%
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography>Condition</Typography>
            <Typography fontWeight="bold">
              {weather.condition}
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography>Wind</Typography>
            <Typography fontWeight="bold">
              {weather.wind} m/s
            </Typography>
          </Grid>
        </Grid>

        <Typography sx={{ mt: 2, opacity: 0.6, fontSize: 12 }}>
          Last updated: {new Date(weather.updated).toLocaleTimeString()}
        </Typography>
      </CardContent>
    </Card>
  </Box>
)}
      {/* STATS CARDS */}
      <Grid container spacing={3} sx={{ px: 4 }}>
        {[
          { title: "Active Flood Alerts", value: "12" },
          { title: "High Risk Zones", value: "5 Regions" },
          { title: "Response Units", value: "8 Deployed" },
          { title: "Weather Stations", value: "24 Online" },
        ].map((item, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card
              sx={{
                background: "#ffffff",
                border: "1px solid #e6f4ff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  {item.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: "#1e88e5", mt: 1 }}
                >
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* INFORMATION PANEL */}
      <Box sx={{ px: 4, mt: 5 }}>
        <Card
          sx={{
            background: "#e6f4ff",
            border: "1px solid #b3e5ff",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              System Overview
            </Typography>

            <Typography sx={{ mt: 1, opacity: 0.8 }}>
              This system uses environmental sensor data, rainfall patterns, and
              river level monitoring to detect potential flood events early.
              It helps government agencies respond before disasters escalate.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          mt: 6,
          background: "#e6f4ff",
          borderTop: "2px solid #b3e5ff",
          py: 4,
          px: 4,
        }}
      >
        <Grid container spacing={3}>
          
          <Grid item xs={12} md={4}>
            <Typography fontWeight="bold">Nairobi Flood System</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Real-time flood monitoring and emergency coordination platform.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight="bold">Quick Links</Typography>
            <Typography variant="body2">Home</Typography>
            <Typography variant="body2">Services</Typography>
            <Typography variant="body2">Alerts</Typography>
            <Typography variant="body2">Report</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight="bold">Emergency Contact</Typography>
            <Typography variant="body2">Disaster Hotline: 999</Typography>
            <Typography variant="body2">Weather Center Kenya</Typography>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © 2026 Nairobi Flood Monitoring System • Built for Emergency Response
          </Typography>
           <Button
  component={Link}
  to="/login"
  startIcon={<LoginIcon />}
  sx={{ color: "#1e88e5" }}
>
  Command Center Login
</Button>
        </Box>
      </Box>
    </Box>
  );
}