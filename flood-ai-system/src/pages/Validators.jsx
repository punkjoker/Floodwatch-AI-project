import {
  Box,
  Typography,
  Card,
  Button,
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

export default function Validators() {
  const [validators, setValidators] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedValidator, setSelectedValidator] = useState(null);

  // ================= FETCH VALIDATORS =================
  const fetchValidators = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/validators"
      );

      console.log("Validators:", res.data);

      setValidators(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FETCH SESSIONS =================
  const fetchSessions = async (validatorId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/validators/sessions/${validatorId}`
      );

      setSessions(res.data);
      setSelectedValidator(validatorId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchValidators();
  }, []);

  // ================= APPROVE =================
  const approveValidator = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/validators/approve/${id}`
      );

      fetchValidators();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= REJECT =================
  const rejectValidator = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/validators/reject/${id}`
      );

      fetchValidators();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ display: "flex", background: "#f4f7fb" }}>

      {/* ================= SIDEBAR ================= */}
      <Navbar />

      {/* ================= MAIN CONTENT ================= */}
      <Box
        sx={{
          flexGrow: 1,
          ml: "240px",
          p: 4,
          minHeight: "100vh",
        }}
      >

        <Typography variant="h4" fontWeight="bold">
          Validators Management
        </Typography>

        <Typography sx={{ mb: 3, opacity: 0.7 }}>
          Approve and monitor flood data validators
        </Typography>

        {/* ================= VALIDATORS TABLE ================= */}
        <Card
          sx={{
            p: 2,
            boxShadow: 3,
            borderRadius: 3,
          }}
        >

          <TableContainer component={Paper}>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell><b>Username</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>ID Number</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {validators.length > 0 ? (
                  validators.map((v) => (
                    <TableRow key={v.id} hover>

                      <TableCell>{v.username}</TableCell>

                      <TableCell>{v.email}</TableCell>

                      <TableCell>{v.id_number}</TableCell>

                      <TableCell>
                        <Chip
                          label={v.status}
                          color={
                            v.status === "active"
                              ? "success"
                              : v.status === "rejected"
                              ? "error"
                              : "warning"
                          }
                        />
                      </TableCell>

                      <TableCell>

                        {v.status !== "active" && (
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() =>
                              approveValidator(v.id)
                            }
                          >
                            Approve
                          </Button>
                        )}

                        {v.status !== "rejected" && (
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() =>
                              rejectValidator(v.id)
                            }
                          >
                            Reject
                          </Button>
                        )}

                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            fetchSessions(v.id)
                          }
                        >
                          Sessions
                        </Button>

                      </TableCell>

                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      No validators found
                    </TableCell>
                  </TableRow>
                )}

              </TableBody>

            </Table>
          </TableContainer>
        </Card>

        {/* ================= SESSIONS ================= */}
        {selectedValidator && (
          <Card
            sx={{
              mt: 4,
              p: 2,
              boxShadow: 3,
              borderRadius: 3,
            }}
          >

            <Typography fontWeight="bold">
              Validator Sessions
            </Typography>

            <TableContainer
              component={Paper}
              sx={{ mt: 2 }}
            >
              <Table>

                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Session ID</b>
                    </TableCell>

                    <TableCell>
                      <b>Status</b>
                    </TableCell>

                    <TableCell>
                      <b>Last Login</b>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>

                  {sessions.length > 0 ? (
                    sessions.map((s) => (
                      <TableRow key={s.session_id}>

                        <TableCell>
                          {s.session_id}
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={
                              s.is_active
                                ? "Active"
                                : "Inactive"
                            }
                            color={
                              s.is_active
                                ? "success"
                                : "default"
                            }
                          />
                        </TableCell>

                        <TableCell>
                          {s.last_login}
                        </TableCell>

                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>
                        No sessions found
                      </TableCell>
                    </TableRow>
                  )}

                </TableBody>

              </Table>
            </TableContainer>

          </Card>
        )}

      </Box>
    </Box>
  );
}