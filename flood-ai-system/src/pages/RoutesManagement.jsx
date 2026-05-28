import {
  Box,
  Typography,
  Grid,
  Card,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";

export default function RoutesManagement() {

  // ================= STATES =================
  const [routes, setRoutes] = useState([]);
  const [stations, setStations] = useState([]);

  const [routeForm, setRouteForm] = useState({
    area_name: "",
    primary_route: "",
    alternative_route: "",
    flood_status: "Safe",
    risk_level: "Low",
    estimated_time: "",
    connected_station: "",
  });

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

  // ================= FETCH STATIONS =================
  const fetchStations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/stations"
      );

      setStations(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoutes();
    fetchStations();
  }, []);

  // ================= ADD ROUTE =================
  const addRoute = async () => {
    try {

      await axios.post(
        "http://localhost:5000/api/routes",
        routeForm
      );

      setRouteForm({
        area_name: "",
        primary_route: "",
        alternative_route: "",
        flood_status: "Safe",
        risk_level: "Low",
        estimated_time: "",
        connected_station: "",
      });

      fetchRoutes();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= UI =================
  return (
    <Box sx={{ background: "#f4f7fb", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          ml: "260px",
          p: 4,
        }}
      >

        {/* PAGE HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Routes Management
            </Typography>

            <Typography sx={{ opacity: 0.7 }}>
              Manage emergency routes and flood
              response navigation
            </Typography>
          </Box>

          <Button
            variant="contained"
            href="/dashboard"
          >
            Back to Dashboard
          </Button>
        </Box>

        {/* ================= FORM ================= */}
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
              }}
            >

              <Typography
                fontWeight="bold"
                mb={2}
              >
                Add Emergency Route
              </Typography>

              <Grid container spacing={2}>

                {/* AREA */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Area Name"
                    value={routeForm.area_name}
                    onChange={(e) =>
                      setRouteForm({
                        ...routeForm,
                        area_name: e.target.value,
                      })
                    }
                  />
                </Grid>

                {/* PRIMARY ROUTE */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Primary Route"
                    value={routeForm.primary_route}
                    onChange={(e) =>
                      setRouteForm({
                        ...routeForm,
                        primary_route: e.target.value,
                      })
                    }
                  />
                </Grid>

                {/* ALTERNATIVE ROUTE */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Alternative Route"
                    value={routeForm.alternative_route}
                    onChange={(e) =>
                      setRouteForm({
                        ...routeForm,
                        alternative_route: e.target.value,
                      })
                    }
                  />
                </Grid>

                {/* FLOOD STATUS */}
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Flood Status"
                    value={routeForm.flood_status}
                    onChange={(e) =>
                      setRouteForm({
                        ...routeForm,
                        flood_status: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Safe">
                      Safe
                    </MenuItem>

                    <MenuItem value="Moderate">
                      Moderate
                    </MenuItem>

                    <MenuItem value="Flooded">
                      Flooded
                    </MenuItem>
                  </TextField>
                </Grid>

                {/* RISK LEVEL */}
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Risk Level"
                    value={routeForm.risk_level}
                    onChange={(e) =>
                      setRouteForm({
                        ...routeForm,
                        risk_level: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Low">
                      Low
                    </MenuItem>

                    <MenuItem value="Medium">
                      Medium
                    </MenuItem>

                    <MenuItem value="High">
                      High
                    </MenuItem>
                  </TextField>
                </Grid>

                {/* ESTIMATED TIME */}
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Estimated Time (mins)"
                    value={routeForm.estimated_time}
                    onChange={(e) =>
                      setRouteForm({
                        ...routeForm,
                        estimated_time: e.target.value,
                      })
                    }
                  />
                </Grid>

                {/* STATION */}
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Connected Station"
                    value={routeForm.connected_station}
                    onChange={(e) =>
                      setRouteForm({
                        ...routeForm,
                        connected_station: e.target.value,
                      })
                    }
                  >
                    {stations.map((station) => (
                      <MenuItem
                        key={station.station_id}
                        value={station.station_id}
                      >
                        {station.station_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

              </Grid>

              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={addRoute}
              >
                Save Route
              </Button>

            </Card>
          </Grid>

        </Grid>

        {/* ================= TABLE ================= */}
        <Card
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >

          <Typography
            fontWeight="bold"
            mb={2}
          >
            Route Monitoring Table
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

                  <TableCell>
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {routes.map((route) => (

                  <TableRow key={route.route_id} hover>

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
                      {route.risk_level}
                    </TableCell>

                    <TableCell>
                      {route.estimated_time} mins
                    </TableCell>

                    <TableCell>

                      <Button
                        size="small"
                        variant="outlined"
                      >
                        View
                      </Button>

                    </TableCell>

                  </TableRow>

                ))}

              </TableBody>

            </Table>
          </TableContainer>

        </Card>

      </Box>
    </Box>
  );
}