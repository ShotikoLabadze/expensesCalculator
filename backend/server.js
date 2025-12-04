require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const connect = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const financeRoutes = require("./routes/financeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connect()
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/finances", financeRoutes);

app.get("/", (req, res) => res.send("Backend is running!"));

module.exports = serverless(app);
