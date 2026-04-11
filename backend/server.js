const express = require("express");
const cors = require("cors");
const fetchPolicies = require("./scraper");

const app = express();

// Middleware
app.use(cors());

// GET: Fetch policies
app.get("/api/policies", async (req, res) => {
  const data = await fetchPolicies();
  res.json(data);
});

// Server start
app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});