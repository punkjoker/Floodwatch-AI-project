import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WarningIcon from "@mui/icons-material/Warning";
import RouteIcon from "@mui/icons-material/AltRoute";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatIcon from "@mui/icons-material/Chat";
import CloudIcon from "@mui/icons-material/Cloud";

const drawerWidth = 240;

export default function Navbar() {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Alerts", icon: <WarningIcon />, path: "/alerts" },
    { text: "Liveweather", icon: <CloudIcon />, path: "/live-weather" },
    { text: "Routes", icon: <RouteIcon />, path: "/routes" },
    { text: "Resources", icon: <InventoryIcon />, path: "/resources" },
    { text: "Dispatch Teams", icon: <LocalShippingIcon />, path: "/teams" },
    { text: "Validators", icon: <VerifiedUserIcon />, path: "/validators" },
    { text: "Chat", icon: <ChatIcon />, path: "/chat" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#e6f4ff",
          borderRight: "2px solid #b3e5ff",
        },
      }}
    >
      {/* LOGO */}
      <Box sx={{ p: 3 }}>
        <Typography
          fontWeight="bold"
          color="#1e88e5"
          fontSize={20}
        >
          Flood Emergency
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Control Center
        </Typography>
      </Box>

      {/* MENU */}
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                mx: 1,
                borderRadius: 2,

                "&.Mui-selected": {
                  background: "#bbdefb",
                },

                "&:hover": {
                  background: "#dbefff",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? "#0d47a1"
                      : "#1e88e5",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight:
                    location.pathname === item.path
                      ? "bold"
                      : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}