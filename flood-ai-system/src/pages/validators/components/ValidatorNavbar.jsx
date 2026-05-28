import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import WarningIcon from "@mui/icons-material/Warning";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ReportIcon from "@mui/icons-material/Report";
import MapIcon from "@mui/icons-material/Map";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

export default function ValidatorNavbar({ active, setActive }) {
  const navigate = useNavigate();

  const validator = JSON.parse(localStorage.getItem("validator"));

  const menu = [
    { text: "Overview", icon: <DashboardIcon />, key: "overview" },
    { text: "Chat", icon: <ChatIcon />, key: "chat" },
    { text: "Alerts", icon: <WarningIcon />, key: "alerts" },
    { text: "Routes Monitor", icon: <AltRouteIcon />, key: "routes", path: "/routes-monitor" },
    { text: "Incidents", icon: <ReportIcon />, key: "incidents" },
    { text: "Heatmap", icon: <MapIcon />, key: "heatmap" },
    { text: "Stations", icon: <LocalHospitalIcon />, key: "stations" },
  ];

  const handleClick = (item) => {
    setActive(item.key);

    if (item.path) {
      navigate(item.path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("validator");
    navigate("/validator/login");
  };

  return (
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
      {/* PROFILE */}
      <Box>
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
              onClick={() => handleClick(item)}
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
  );
}