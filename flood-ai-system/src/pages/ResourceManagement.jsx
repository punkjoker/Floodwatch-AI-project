import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
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
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

export default function ResourceManagement() {
  const [stations, setStations] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedStationResources, setSelectedStationResources] = useState([]);

  const [stationForm, setStationForm] = useState({
    station_name: "",
    location: "",
    latitude: "",
    longitude: "",
  });

  const [resourceForm, setResourceForm] = useState({
    station_id: "",
    resource_name: "",
    quantity: "",
  });

  // ================= FETCH =================
  const fetchStations = async () => {
    const res = await axios.get("http://localhost:5000/api/stations");
    setStations(res.data);
  };

  const fetchResources = async () => {
    const res = await axios.get("http://localhost:5000/api/resources");
    setResources(res.data);
  };

  useEffect(() => {
    fetchStations();
    fetchResources();
  }, []);

  // ================= CREATE =================
  const addStation = async () => {
    await axios.post("http://localhost:5000/api/stations", stationForm);
    setStationForm({
      station_name: "",
      location: "",
      latitude: "",
      longitude: "",
    });
    fetchStations();
  };

  const addResource = async () => {
    await axios.post("http://localhost:5000/api/resources", resourceForm);
    setResourceForm({
      station_id: "",
      resource_name: "",
      quantity: "",
    });
    fetchResources();
  };

  // ================= VIEW =================
  const viewResources = (station_id) => {
    const filtered = resources.filter((r) => r.station_id === station_id);
    setSelectedStationResources(filtered);
  };

  return (
  <Box sx={{ background: "#f4f7fb", minHeight: "100vh" }}>

    {/* SIDEBAR */}
    <Navbar />

    {/* MAIN CONTENT */}
    <Box
      sx={{
        ml: "260px", // pushes page away from sidebar
        p: 4,
      }}
    >

      {/* TOP SECTION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Resource Management
          </Typography>

          <Typography sx={{ opacity: 0.7 }}>
            Manage stations and emergency resources allocation
          </Typography>
        </Box>

        {/* BACK BUTTON */}
        <Button
          variant="contained"
          href="/dashboard"
        >
          Back to Dashboard
        </Button>
      </Box>

      {/* CENTER CONTENT */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
        }}
      >

        {/* ================= FORMS ================= */}
        <Grid container spacing={3}>

          {/* STATION FORM */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
              <Typography fontWeight="bold">
                Add Station
              </Typography>

              <TextField
                fullWidth
                label="Station Name"
                sx={{ mt: 2 }}
                value={stationForm.station_name}
                onChange={(e) =>
                  setStationForm({
                    ...stationForm,
                    station_name: e.target.value,
                  })
                }
              />

              <TextField
                fullWidth
                label="Location"
                sx={{ mt: 2 }}
                value={stationForm.location}
                onChange={(e) =>
                  setStationForm({
                    ...stationForm,
                    location: e.target.value,
                  })
                }
              />

              <TextField
                fullWidth
                label="Latitude"
                sx={{ mt: 2 }}
                value={stationForm.latitude}
                onChange={(e) =>
                  setStationForm({
                    ...stationForm,
                    latitude: e.target.value,
                  })
                }
              />

              <TextField
                fullWidth
                label="Longitude"
                sx={{ mt: 2 }}
                value={stationForm.longitude}
                onChange={(e) =>
                  setStationForm({
                    ...stationForm,
                    longitude: e.target.value,
                  })
                }
              />

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={addStation}
              >
                Save Station
              </Button>
            </Card>
          </Grid>

          {/* RESOURCE FORM */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
              <Typography fontWeight="bold">
                Add Resource
              </Typography>

              <TextField
                select
                fullWidth
                label="Station"
                sx={{ mt: 2 }}
                value={resourceForm.station_id}
                onChange={(e) =>
                  setResourceForm({
                    ...resourceForm,
                    station_id: e.target.value,
                  })
                }
              >
                {stations.map((s) => (
                  <MenuItem
                    key={s.station_id}
                    value={s.station_id}
                  >
                    {s.station_name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Resource Name"
                sx={{ mt: 2 }}
                value={resourceForm.resource_name}
                onChange={(e) =>
                  setResourceForm({
                    ...resourceForm,
                    resource_name: e.target.value,
                  })
                }
              />

              <TextField
                fullWidth
                type="number"
                label="Quantity"
                sx={{ mt: 2 }}
                value={resourceForm.quantity}
                onChange={(e) =>
                  setResourceForm({
                    ...resourceForm,
                    quantity: e.target.value,
                  })
                }
              />

              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={addResource}
              >
                Add Resource
              </Button>
            </Card>
          </Grid>
        </Grid>
{/* ================= STATIONS TABLE ================= */}
        <Card sx={{ mt: 4, p: 2, boxShadow: 3, borderRadius: 3 }}>
          <Typography fontWeight="bold">Stations Overview</Typography>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Station</b></TableCell>
                  <TableCell><b>Location</b></TableCell>
                  <TableCell><b>Lat</b></TableCell>
                  <TableCell><b>Long</b></TableCell>
                  <TableCell><b>Action</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {stations.map((s) => (
                  <TableRow key={s.station_id}>
                    <TableCell>{s.station_name}</TableCell>
                    <TableCell>{s.location}</TableCell>
                    <TableCell>{s.latitude}</TableCell>
                    <TableCell>{s.longitude}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => viewResources(s.station_id)}
                      >
                        View Resources
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* ================= RESOURCE VIEW ================= */}
        {selectedStationResources.length > 0 && (
          <Card sx={{ mt: 4, p: 2, boxShadow: 3, borderRadius: 3 }}>
            <Typography fontWeight="bold">
              Station Resources
            </Typography>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Resource</b></TableCell>
                    <TableCell><b>Quantity</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {selectedStationResources.map((r) => (
                    <TableRow key={r.resource_id}>
                      <TableCell>{r.resource_name}</TableCell>
                      <TableCell>{r.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}

      </Box>
    </Box>
  </Box>
);
}