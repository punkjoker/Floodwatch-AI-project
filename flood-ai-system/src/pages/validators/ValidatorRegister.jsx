import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import { useState } from "react";
import axios from "axios";

export default function ValidatorRegister() {
  const [form, setForm] = useState({
    username: "",
    id_number: "",
    email: "",
    password: "",
    id_proof: null,
  });

  const [preview, setPreview] = useState(null);

  // HANDLE IMAGE
  const handleFile = (e) => {
    const file = e.target.files[0];

    setForm({ ...form, id_proof: file });

    setPreview(URL.createObjectURL(file));
  };

  // SUBMIT
  const handleSubmit = async () => {
  const data = new FormData();
  data.append("username", form.username);
  data.append("id_number", form.id_number);
  data.append("email", form.email);
  data.append("password", form.password);
  data.append("id_proof", form.id_proof);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/validators/register",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    alert(res.data.message);

    // RESET FORM (clean UX)
    setForm({
      username: "",
      id_number: "",
      email: "",
      password: "",
      id_proof: null,
    });

    setPreview(null);

    // REDIRECT BACK TO LOGIN
    navigate("/validator/login");

  } catch (err) {
    console.log(err);
    alert("Registration failed");
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f7fb",
      }}
    >
      <Card sx={{ p: 4, width: 420, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Validator Registration
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <TextField
            label="ID Number"
            onChange={(e) =>
              setForm({ ...form, id_number: e.target.value })
            }
          />

          <TextField
            label="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <TextField
            label="Password"
            type="password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <Button variant="outlined" component="label">
            Upload ID Proof
            <input hidden type="file" onChange={handleFile} />
          </Button>

          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: 8,
                marginTop: 10,
              }}
            />
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 1 }}
          >
            Register
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}