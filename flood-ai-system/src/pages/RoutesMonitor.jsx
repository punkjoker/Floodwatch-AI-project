import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";

import WarningIcon from "@mui/icons-material/Warning";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ValidatorNavbar from "./validators/components/ValidatorNavbar";
import { validatorMenu } from "./validators/config/validatorMenu";

export default function RoutesMonitor() {

  // ================= STATES =================
  const [routes, setRoutes] = useState([]);
const menu = validatorMenu;
  // ================= FETCH ROUTES =================
  const fetchRoutes = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/routes"
      );

      setRoutes(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoutes();

    // AUTO REFRESH EVERY 30 SECONDS
    const interval = setInterval(fetchRoutes, 30000);

    return () => clearInterval(interval);

  }, []);

  // ================= COUNT STATS =================
  const flooded = routes.filter(
    (r) => r.flood_status === "Flooded"
  ).length;

  const moderate = routes.filter(
    (r) => r.flood_status === "Moderate"
  ).length;

  const safe = routes.filter(
    (r) => r.flood_status === "Safe"
  ).length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f4f7fb",
        p: 4,
      }}
    >

      {/* ================= HEADER ================= */}
      <Box sx={{ mb: 4 }}>

        <Typography
          variant="h3"
          fontWeight="bold"
        >
          Nairobi Route Monitoring
        </Typography>

        <Typography sx={{ opacity: 0.7 }}>
          Live emergency route accessibility and flood
          risk monitoring system
        </Typography>

      </Box>

      {/* ================= STATUS CARDS ================= */}
      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <WarningIcon color="error" />

            <Typography fontWeight="bold">
              Flooded Routes
            </Typography>

            <Typography
              variant="h4"
              color="error"
            >
              {flooded}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <AltRouteIcon color="warning" />

            <Typography fontWeight="bold">
              Moderate Risk
            </Typography>

            <Typography
              variant="h4"
              color="warning.main"
            >
              {moderate}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <AccessTimeIcon color="success" />

            <Typography fontWeight="bold">
              Safe Routes
            </Typography>

            <Typography
              variant="h4"
              color="success.main"
            >
              {safe}
            </Typography>
          </Card>
        </Grid>

      </Grid>

      {/* ================= ROUTES TABLE ================= */}
      <Card
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >

        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
        >
          Live Route Monitoring Table
        </Typography>

        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>

                <TableCell>
                  <b>Area</b>
                </TableCell>

                <TableCell>
                  <b>Primary Route</b>
                </TableCell>

                <TableCell>
                  <b>Alternative Route</b>
                </TableCell>

                <TableCell>
                  <b>Status</b>
                </TableCell>

                <TableCell>
                  <b>Risk</b>
                </TableCell>

                <TableCell>
                  <b>ETA</b>
                </TableCell>

              </TableRow>
            </TableHead>

            <TableBody>

              {routes.map((route) => (

                <TableRow
                  key={route.route_id}
                  hover
                >

                  <TableCell>
                    {route.area_name}
                  </TableCell>

                  <TableCell>
                    {route.primary_route}
                  </TableCell>

                  <TableCell>
                    {route.alternative_route}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={route.flood_status}
                      color={
                        route.flood_status === "Flooded"
                          ? "error"
                          : route.flood_status === "Moderate"
                          ? "warning"
                          : "success"
                      }
                    />

                  </TableCell>

                  <TableCell>

                    <Chip
                      label={route.risk_level}
                      color={
                        route.risk_level === "High"
                          ? "error"
                          : route.risk_level === "Medium"
                          ? "warning"
                          : "success"
                      }
                      variant="outlined"
                    />

                  </TableCell>

                  <TableCell>
                    {route.estimated_time} mins
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>
        </TableContainer>

      </Card>

    </Box>
  );
}