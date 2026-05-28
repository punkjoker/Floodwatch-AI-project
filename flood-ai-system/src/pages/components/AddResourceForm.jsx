import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

export default function AddResourceForm() {
  return (
    <Box>

      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Add Resource
      </Typography>

      <TextField
        select
        fullWidth
        label="Select Station"
        sx={{ mb: 2 }}
      >
        <MenuItem value="Westlands">
          Westlands Station
        </MenuItem>

        <MenuItem value="Embakasi">
          Embakasi Station
        </MenuItem>
      </TextField>

      <TextField
        select
        fullWidth
        label="Resource Type"
        sx={{ mb: 2 }}
      >
        <MenuItem value="Ambulance">
          Ambulance
        </MenuItem>

        <MenuItem value="Rescue Boat">
          Rescue Boat
        </MenuItem>

        <MenuItem value="Medical Kits">
          Medical Kits
        </MenuItem>

        <MenuItem value="Fire Truck">
          Fire Truck
        </MenuItem>
      </TextField>

      <TextField
        fullWidth
        type="number"
        label="Quantity"
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="success"
        fullWidth
      >
        Add Resource
      </Button>

    </Box>
  );
}