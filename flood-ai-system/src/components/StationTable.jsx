import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

export default function StationTable() {

  const stations = [
    {
      id: 1,
      station: "Westlands Station",
      location: "Nairobi",
      resources: 5,
    },
    {
      id: 2,
      station: "Embakasi Rescue Unit",
      location: "Embakasi",
      resources: 3,
    },
  ];

  return (
    <>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Emergency Stations
      </Typography>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Station Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Resources</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {stations.map((station) => (
            <TableRow key={station.id}>

              <TableCell>
                {station.station}
              </TableCell>

              <TableCell>
                {station.location}
              </TableCell>

              <TableCell>
                {station.resources}
              </TableCell>

              <TableCell>
                <Button variant="contained">
                  View
                </Button>
              </TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>
    </>
  );
}