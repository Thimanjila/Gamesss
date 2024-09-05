require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const {
  authenticateToken,
} = require("./service/controllers/middleware/auth-controller.js");

app.use(express.json());
app.use(cors());




const shortestPathRoute = require("./api/routes/shortest-path.routes.js");


app.use("/api/shortestPath", shortestPathRoute);

module.exports = app;
