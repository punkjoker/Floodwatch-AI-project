import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  Grid,
  Avatar,
  Button,
  Divider,
} from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import WarningIcon from "@mui/icons-material/Warning";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ReportIcon from "@mui/icons-material/Report";
import MapIcon from "@mui/icons-material/Map";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ValidatorDashboard() {
  const [active, setActive] = useState("overview");
  const navigate = useNavigate();

  const validator = JSON.parse(localStorage.getItem("validator"));

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("validator");
    navigate("/validator/login");
  };

  // ================= MENU =================
  const menu = [
    { text: "Overview", icon: <DashboardIcon />, key: "overview" },
    { text: "Chat", icon: <ChatIcon />, key: "chat" },
    { text: "Alerts", icon: <WarningIcon />, key: "alerts" },
    { text: "Routes Monitor", icon: <AltRouteIcon />, key: "routes" },
    { text: "Incidents", icon: <ReportIcon />, key: "incidents" },
    { text: "Heatmap", icon: <MapIcon />, key: "heatmap" },
    { text: "Stations", icon: <LocalHospitalIcon />, key: "stations" },
  ];

  // ================= ROUTE NAVIGATION =================
  const handleMenuClick = (item) => {
    setActive(item.key);

    // ONLY Routes goes to a real page
    if (item.key === "routes") {
      navigate("/routes-monitor");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f4f7fb" }}>

      {/* ================= SIDEBAR ================= */}
      <Box
        sx={{
          width: 260,
          background: "#e6f4ff",
          borderRight: "1px solid #cce6ff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >

        {/* TOP SECTION */}
        <Box>

          {/* PROFILE */}
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
                bgcolor: "#1e88e5",
                fontSize: 28,
                mb: 1,
              }}
            >
              {validator?.username?.charAt(0)?.toUpperCase() || "V"}
            </Avatar>

            <Typography fontWeight="bold">
              {validator?.username || "Validator"}
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {validator?.email}
            </Typography>
          </Box>

          <Divider />

          {/* MENU */}
          <List sx={{ mt: 1 }}>
            {menu.map((item) => (
              <ListItemButton
                key={item.key}
                selected={active === item.key}
                onClick={() => handleMenuClick(item)}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 2,
                  "&.Mui-selected": {
                    background: "#d9efff",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1e88e5" }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>

        </Box>

        {/* LOGOUT */}
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderRadius: 2 }}
          >
            Logout
          </Button>
        </Box>

      </Box>

      {/* ================= MAIN CONTENT ================= */}
      <Box sx={{ flex: 1, p: 3 }}>

        {/* OVERVIEW */}
        {active === "overview" && (
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Validator Overview
            </Typography>

            <Typography sx={{ opacity: 0.7, mb: 3 }}>
              Flood monitoring validator workspace
            </Typography>

            <Grid container spacing={3}>

              <Grid item xs={12} md={3}>
                <Card sx={{ p: 3, borderRadius: 3 }}>
                  <Typography fontWeight="bold">Active Alerts</Typography>
                  <Typography variant="h4" color="error">12</Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card sx={{ p: 3, borderRadius: 3 }}>
                  <Typography fontWeight="bold">Routes Status</Typography>
                  <Typography variant="h4" color="primary">18</Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card sx={{ p: 3, borderRadius: 3 }}>
                  <Typography fontWeight="bold">Incidents</Typography>
                  <Typography variant="h4" color="warning.main">5</Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card sx={{ p: 3, borderRadius: 3 }}>
                  <Typography fontWeight="bold">Stations</Typography>
                  <Typography variant="h4" color="success.main">9</Typography>
                </Card>
              </Grid>

            </Grid>
          </Box>
        )}

        {/* PLACEHOLDERS */}
        {active === "chat" && <Typography>Validator Chat</Typography>}
        {active === "alerts" && <Typography>Validator Alerts</Typography>}
        {active === "routes" && <Typography>Redirecting to Routes Monitor...</Typography>}
        {active === "incidents" && <Typography>Validator Incidents</Typography>}
        {active === "heatmap" && <Typography>AI Heatmap</Typography>}
        {active === "stations" && <Typography>Emergency Stations</Typography>}

      </Box>
    </Box>
  );
}