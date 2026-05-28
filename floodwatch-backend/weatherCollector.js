const axios = require("axios");
const cron = require("node-cron");
const db = require("./db");
require("dotenv").config();

// Nairobi zones (your simulation model)
const zones = [
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
  "Pipeline"
];

// Fetch weather from API
async function fetchWeather() {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Nairobi&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    const data = response.data;

    const rainfall = data.rain ? data.rain["1h"] || 0 : Math.random() * 20;

    console.log("🌦 Weather fetched:", data.main.temp);

    // Save for each zone
    zones.forEach((zone) => {
      const adjustedRainfall = rainfall + Math.random() * 5; // variation per zone

      db.query(
        `INSERT INTO weather_data (location, rainfall_mm, temperature, humidity)
         VALUES (?, ?, ?, ?)`,
        [
          zone,
          adjustedRainfall.toFixed(2),
          data.main.temp,
          data.main.humidity,
        ]
      );
    });

    console.log("✅ Weather data saved for all Nairobi zones");
  } catch (error) {
    console.error("❌ Weather fetch error:", error.message);
  }
}

// =========================
// RUN EVERY 10 MINUTES
// =========================
cron.schedule("*/10 * * * *", () => {
  console.log("⏱ Running scheduled weather collection...");
  fetchWeather();
});

// Run immediately on start
fetchWeather();

module.exports = fetchWeather;