import {
  Box,
  Typography,
  Card,
  Grid,
  CircularProgress,
} from "@mui/material";

import Navbar from "./components/Navbar";

import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function LiveWeatherDisplay() {

  // ================= STATES =================
  const [latest, setLatest] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);
const locations = [
  "CBD",
  "Westlands",
  "Upper Hill",
  "Kilimani",
  "Kibera",
  "Langata",
  "Karen",
  "Dagoretti",
  "Kasarani",
  "Roysambu",
  "Githurai",
  "Embakasi",
  "Donholm",
  "Eastleigh",
  "Industrial Area",
  "Ruai",
  "Umoja",
  "Pipeline",
];

const [selectedLocation, setSelectedLocation] =
  useState("CBD");
  // ================= FETCH WEATHER =================
 const fetchWeather = async () => {
  try {
    const latestRes = await axios.get(
      `http://localhost:5000/api/weather/latest/${selectedLocation}`
    );

    const hourlyRes = await axios.get(
      `http://localhost:5000/api/weather/hourly`
    );

    setLatest(latestRes.data);
    setHourlyData(hourlyRes.data);

  } catch (error) {
    console.log("Weather fetch error:", error);
  } finally {
    setLoading(false); // 🔥 ALWAYS RUNS
  }
};

  // ================= AUTO REFRESH =================
  useEffect(() => {
  fetchWeather();

  const interval = setInterval(fetchWeather, 600000);

  return () => clearInterval(interval);
}, [selectedLocation]);

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <Navbar />

        <Box
          sx={{
            ml: "240px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", background: "#f4f7fb" }}>

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          ml: "240px",
          p: 4,
          width: "100%",
          minHeight: "100vh",
        }}
      >

        {/* PAGE TITLE */}
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Live Weather Monitoring
        </Typography>

        <Typography sx={{ opacity: 0.7, mb: 4 }}>
          Real-time environmental monitoring
          and flood weather analytics
        </Typography>
<Box sx={{ mb: 4, width: 300 }}>

  <FormControl fullWidth>

    <InputLabel>
      Select Location
    </InputLabel>

    <Select
      value={selectedLocation}
      label="Select Location"
      onChange={(e) =>
        setSelectedLocation(e.target.value)
      }
    >

      {locations.map((location) => (
        <MenuItem
          key={location}
          value={location}
        >
          {location}
        </MenuItem>
      ))}

    </Select>

  </FormControl>

</Box>
        {/* ================= CURRENT WEATHER ================= */}
        <Grid container spacing={3}>

          {/* RAINFALL */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <WaterDropIcon
                color="primary"
                sx={{ fontSize: 40 }}
              />

              <Typography fontWeight="bold">
                Rainfall
              </Typography>

              <Typography
                variant="h4"
                color="primary"
              >
                {latest?.rainfall_mm} mm
              </Typography>
            </Card>
          </Grid>

          {/* TEMPERATURE */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <ThermostatIcon
                color="error"
                sx={{ fontSize: 40 }}
              />

              <Typography fontWeight="bold">
                Temperature
              </Typography>

              <Typography
                variant="h4"
                color="error"
              >
                {latest?.temperature} °C
              </Typography>
            </Card>
          </Grid>

          {/* HUMIDITY */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <AirIcon
                color="success"
                sx={{ fontSize: 40 }}
              />

              <Typography fontWeight="bold">
                Humidity
              </Typography>

              <Typography
                variant="h4"
                color="success.main"
              >
                {latest?.humidity}%
              </Typography>
            </Card>
          </Grid>

        </Grid>

        {/* ================= CHART ================= */}
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
            mb={3}
          >
            Weather Statistics Per Hour
          </Typography>

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <LineChart data={hourlyData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="rainfall_mm"
                stroke="#1976d2"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#d32f2f"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#2e7d32"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </Card>

      </Box>
    </Box>
  );
}