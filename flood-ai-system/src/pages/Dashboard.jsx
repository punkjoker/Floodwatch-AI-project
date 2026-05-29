import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
} from "@mui/material";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import WarningIcon from "@mui/icons-material/Warning";
import WaterIcon from "@mui/icons-material/Water";
import PeopleIcon from "@mui/icons-material/People";
import MapIcon from "@mui/icons-material/Map";
import InventoryIcon from "@mui/icons-material/Inventory";
import RouteIcon from "@mui/icons-material/AltRoute";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatIcon from "@mui/icons-material/Chat";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemButton from "@mui/material/ListItemButton";

const drawerWidth = 240;

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Alerts", icon: <WarningIcon /> },
    { text: "Routes", icon: <RouteIcon /> , path: "/routes" },
    { text: "Resources", icon: <InventoryIcon />, path: "/resources" },
    
    { text: "Dispatch Teams", icon: <LocalShippingIcon /> },
    { text: "Validators", icon: <VerifiedUserIcon />, path: "/validators"},
    { text: "Chat", icon: <ChatIcon /> },
  ];

  const cardStyle = {
    borderRadius: 4,
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f5fbff" }}>

      {/* ================= SIDEBAR ================= */}
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
        <Box sx={{ p: 2 }}>
          <Typography fontWeight="bold" color="#1e88e5">
            FloodWatch
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Emergency Command
          </Typography>
        </Box>

        <List>
  {menuItems.map((item, index) => (
    <ListItem key={index} disablePadding>
      <ListItemButton
        component={Link}
        to={item.path}
        selected={location.pathname === item.path}
        sx={{
          borderRadius: 2,
          mx: 1,
          my: 0.5,
          "&.Mui-selected": {
            backgroundColor: "#d9efff",
            "&:hover": {
              backgroundColor: "#cbe8ff",
            },
          },
        }}
      >
        <ListItemIcon sx={{ color: "#1e88e5" }}>
          {item.icon}
        </ListItemIcon>

        <ListItemText primary={item.text} />
      </ListItemButton>
    </ListItem>
  ))}
</List>
      </Drawer>

      {/* ================= MAIN AREA ================= */}
      <Box sx={{ flexGrow: 1 }}>

        {/* TOP BAR */}
        <AppBar
          position="static"
          sx={{
            background: "#ffffff",
            boxShadow: "none",
            borderBottom: "2px solid #e6f4ff",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            
            <Typography fontWeight="bold" color="#1e88e5">
              Flood Emergency Control Center
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2">
                {user?.fullname || "Admin"}
              </Typography>

              <Avatar
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ bgcolor: "#1e88e5", cursor: "pointer" }}
              >
                {user?.fullname?.charAt(0) || "A"}
              </Avatar>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* CONTENT */}
        <Box sx={{ p: 3 }}>

          {/* HEADER */}
          <Typography variant="h4" fontWeight="bold">
            Dashboard Overview
          </Typography>

          <Typography sx={{ opacity: 0.7, mb: 3 }}>
            Real-time flood monitoring and emergency coordination system
          </Typography>

          {/* STATS */}
          <Grid container spacing={3}>
            {[
              { title: "Active Alerts", value: 12, icon: <WarningIcon /> },
              { title: "Flood Zones", value: 5, icon: <WaterIcon /> },
              { title: "Response Teams", value: 8, icon: <PeopleIcon /> },
              { title: "Monitoring Sites", value: 24, icon: <MapIcon /> },
            ].map((item, i) => (
              <Grid item xs={12} md={3} key={i}>
                <Card sx={cardStyle}>
                  <CardContent>
                    {item.icon}
                    <Typography>{item.title}</Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* OPERATION CARDS */}
          <Grid container spacing={3} sx={{ mt: 3 }}>

            <Grid item xs={12} md={4}>
              <Card sx={cardStyle}>
                <CardContent>
                  <VerifiedUserIcon color="primary" />
                  <Typography fontWeight="bold">Validators</Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Manage
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={cardStyle}>
                <CardContent>
                  <WarningIcon color="error" />
                  <Typography fontWeight="bold">Alerts</Typography>
                  <Button variant="contained" color="error" sx={{ mt: 2 }}>
                    View
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={cardStyle}>
                <CardContent>
                  <InventoryIcon color="success" />
                  <Typography fontWeight="bold">Resources</Typography>
                  <Button component={Link} to="/resources" variant="contained" color="success" sx={{ mt: 2 }}>
                    Update
                  </Button>
                </CardContent>
              </Card>
            </Grid>

          </Grid>

        </Box>
      </Box>
    </Box>
  );
}