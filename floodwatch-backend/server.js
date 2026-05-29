const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* ===================================================
   MYSQL CONNECTION
=================================================== */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "floodwatch",
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Error:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
/* ===================================================
   REGISTER API
=================================================== */
app.post("/api/register", (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql =
    "INSERT INTO admin_users (fullname, email, password) VALUES (?, ?, ?)";

  db.query(sql, [fullname, email, hashedPassword], (err, result) => {
    if (err) {
      console.log(err);

      return res.json({
        success: false,
        message: "Registration failed",
      });
    }

    res.json({
      success: true,
      message: "User registered successfully",
    });
  });
});

/* ===================================================
   LOGIN API
=================================================== */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password required",
    });
  }

  const sql = "SELECT * FROM admin_users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Server error",
      });
    }

    if (result.length === 0) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const user = result[0];

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  });
});

/* ===================================================
   LIVE WEATHER API
=================================================== */
app.get("/api/weather", async (req, res) => {
  try {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=Nairobi&appid=aaac7339597c9443fcb4a92f442fd17b";

    const response = await axios.get(url);

    const data = response.data;

    res.json({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      condition: data.weather[0].main,
      wind: data.wind.speed,
      updated: new Date(),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Weather fetch failed",
    });
  }
});

/* ===================================================
   STATIONS APIs
=================================================== */

// GET ALL STATIONS
app.get("/api/stations", (req, res) => {
  const sql = "SELECT * FROM stations ORDER BY station_id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to fetch stations",
      });
    }

    res.json(result);
  });
});

// ADD STATION
app.post("/api/stations", (req, res) => {
  const { station_name, location, latitude, longitude } = req.body;

  const sql =
    "INSERT INTO stations (station_name, location, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [station_name, location, latitude, longitude],
    (err, result) => {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to add station",
        });
      }

      res.json({
        success: true,
        message: "Station added successfully",
      });
    }
  );
});

/* ===================================================
   RESOURCES APIs
=================================================== */

// GET ALL RESOURCES
app.get("/api/resources", (req, res) => {
  const sql = `
    SELECT 
      resources.*,
      stations.station_name
    FROM resources
    JOIN stations
    ON resources.station_id = stations.station_id
    ORDER BY resources.resource_id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to fetch resources",
      });
    }

    res.json(result);
  });
});

// ADD RESOURCE
app.post("/api/resources", (req, res) => {
  const { station_id, resource_name, quantity } = req.body;

  const sql =
    "INSERT INTO resources (station_id, resource_name, quantity) VALUES (?, ?, ?)";

  db.query(
    sql,
    [station_id, resource_name, quantity],
    (err, result) => {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to add resource",
        });
      }

      res.json({
        success: true,
        message: "Resource added successfully",
      });
    }
  );
});

/* ===================================================
   ROUTES APIs
=================================================== */

// GET ROUTES
app.get("/api/routes", (req, res) => {
  const sql = "SELECT * FROM routes ORDER BY route_id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to fetch routes",
      });
    }

    res.json(result);
  });
});

// ADD ROUTE
app.post("/api/routes", (req, res) => {
  const {
    route_name,
    start_location,
    destination,
    alternative_route,
    flood_risk,
    status,
  } = req.body;

  const sql = `
    INSERT INTO routes
    (
      route_name,
      start_location,
      destination,
      alternative_route,
      flood_risk,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      route_name,
      start_location,
      destination,
      alternative_route,
      flood_risk,
      status,
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.json({
          success: false,
          message: "Failed to add route",
        });
      }

      res.json({
        success: true,
        message: "Route added successfully",
      });
    }
  );
});

/* ===================================================
   OPTIONAL:
   UPDATE ROUTE STATUS
=================================================== */

app.put("/api/routes/:id", (req, res) => {
  const { id } = req.params;
  const { status, flood_risk } = req.body;

  const sql =
    "UPDATE routes SET status=?, flood_risk=? WHERE route_id=?";

  db.query(sql, [status, flood_risk, id], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to update route",
      });
    }

    res.json({
      success: true,
      message: "Route updated successfully",
    });
  });
});

/* ===================================================
   VALIDATOR LOGIN & REGISTRATION
=================================================== */
app.post(
  "/api/validators/register",
  upload.single("id_proof"),
  (req, res) => {
    const { username, id_number, email, password } = req.body;

    const id_proof = req.file ? req.file.filename : null;

    const hashed = bcrypt.hashSync(password, 10);

    const sql = `
      INSERT INTO validators
      (username, id_number, email, password, id_proof)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [username, id_number, email, hashed, id_proof],
      (err) => {
        if (err) {
          return res.json({ success: false });
        }

        res.json({
          success: true,
          message: "Registered successfully. Await approval.",
        });
      }
    );
  }
);
// LOGIN
app.post("/api/validators/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password required",
    });
  }

  const sql = `
    SELECT * 
    FROM validators
    WHERE email = ?
  `;

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: err,
      });
    }

    // USER NOT FOUND
    if (result.length === 0) {
      return res.json({
        success: false,
        message: "Validator not found",
      });
    }

    const validator = result[0];

    // CHECK PASSWORD
    const isMatch = bcrypt.compareSync(
      password,
      validator.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    // CHECK STATUS
    if (validator.status !== "active") {
      return res.json({
        success: false,
        message:
          "Account pending approval from administrator",
      });
    }

    // CREATE SESSION
    const sessionSql = `
      INSERT INTO validator_sessions
      (validator_id, is_active)
      VALUES (?, ?)
    `;

    db.query(
      sessionSql,
      [validator.id, 1],
      (sessionErr) => {
        if (sessionErr) {
          console.log(sessionErr);
        }

        res.json({
          success: true,
          message: "Login successful",

          user: {
            id: validator.id,
            username: validator.username,
            email: validator.email,
            status: validator.status,
          },
        });
      }
    );
  });
});
/* ===================================================
   VALIDATOR DASHBOARD APIs
   (e.g. alerts, routes, chat messages, etc.)
=================================================== */
app.get("/api/validators", (req, res) => {
  const sql = "SELECT * FROM validators ORDER BY created_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching validators",
        error: err,
      });
    }

    res.json(result);
  });
});

app.put("/api/validators/approve/:id", (req, res) => {
  const validatorId = req.params.id;

  const sql = `
    UPDATE validators 
    SET status = 'active'
    WHERE id = ?
  `;

  db.query(sql, [validatorId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Approval failed",
        error: err,
      });
    }

    res.json({
      success: true,
      message: "Validator approved successfully",
    });
  });
});

app.put("/api/validators/reject/:id", (req, res) => {
  const sql = `
    UPDATE validators 
    SET status = 'rejected'
    WHERE id = ?
  `;

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Rejection failed",
      });
    }

    res.json({
      success: true,
      message: "Validator rejected",
    });
  });
});

app.get("/api/validators/sessions/:id", (req, res) => {
  const validatorId = req.params.id;

  const sql = `
    SELECT * 
    FROM validator_sessions 
    WHERE validator_id = ?
    ORDER BY last_login DESC
  `;

  db.query(sql, [validatorId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching sessions",
        error: err,
      });
    }

    res.json(result);
  });
});

/* ===================================================
   Get latest weather
=================================================== */ 
/* ===================================================
   WEATHER APIs
=================================================== */

// LATEST WEATHER
app.get("/api/weather/latest/:location", (req, res) => {

  const { location } = req.params;

  const sql = `
    SELECT *
    FROM weather_data
    WHERE location = ?
    ORDER BY recorded_at DESC
    LIMIT 1
  `;

  db.query(sql, [location], (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
      });
    }

    res.json(result[0]);

  });

});

// HOURLY WEATHER (LAST 12 HOURS)
app.get("/api/weather/hourly", (req, res) => {

  const sql = `
    SELECT
      DATE_FORMAT(recorded_at, '%H:00') AS time,
      AVG(rainfall_mm) AS rainfall_mm,
      AVG(temperature) AS temperature,
      AVG(humidity) AS humidity
    FROM weather_data
    WHERE recorded_at >= NOW() - INTERVAL 12 HOUR
    GROUP BY HOUR(recorded_at)
    ORDER BY recorded_at ASC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch hourly weather",
      });
    }

    res.json(result);

  });

});
/* ===================================================
   WEATHER COLLECTOR
=================================================== */
require("./weatherCollector");

/* ===================================================
   SERVER
=================================================== */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});