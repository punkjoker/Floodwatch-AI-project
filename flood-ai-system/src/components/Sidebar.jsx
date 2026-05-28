import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WarningIcon from "@mui/icons-material/Warning";
import RouteIcon from "@mui/icons-material/AltRoute";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatIcon from "@mui/icons-material/Chat";

export default function Navbar() {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Alerts", icon: <WarningIcon />, path: "/alerts" },
    { text: "Routes", icon: <RouteIcon />, path: "/routes" },
    { text: "Resources", icon: <InventoryIcon />, path: "/resources" },
    { text: "Teams", icon: <LocalShippingIcon />, path: "/teams" },
    { text: "Validators", icon: <VerifiedUserIcon />, path: "/validators" },
    { text: "Chat", icon: <ChatIcon />, path: "/chat" },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#e6f4ff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        borderBottom: "2px solid #b3e5ff",
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* LOGO */}
        <Typography fontWeight="bold" color="#1e88e5">
          Flood Emergency Control Center
        </Typography>

        {/* MENU */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {menuItems.map((item, index) => (
            <Button
              key={index}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: location.pathname === item.path ? "#0d47a1" : "#1e88e5",
                fontWeight: location.pathname === item.path ? "bold" : "normal",
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

      </Toolbar>
    </AppBar>
  );
}