import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function AddStationForm() {
  return (
    <Box>

      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Add Emergency Station
      </Typography>

      <TextField
        fullWidth
        label="Station Name"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Location"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Latitude"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Longitude"
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        fullWidth
      >
        Save Station
      </Button>

    </Box>
  );
}