import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <Box sx={{ flexGrow: 1 }}>
        
        {/* NAVBAR (shared) */}
        <AppBar
          position="fixed"
          sx={{
            background: "#e6f4ff",
            boxShadow: "none",
            borderBottom: "2px solid #b3e5ff",
            zIndex: 1200,
          }}
        >
          <Toolbar>
            <Typography fontWeight="bold" color="#1e88e5">
              Flood Emergency Control Center
            </Typography>
          </Toolbar>
        </AppBar>

        {/* PAGE CONTENT */}
        <Box sx={{ mt: 8, p: 3 }}>
          <Outlet />
        </Box>

      </Box>
    </Box>
  );
}