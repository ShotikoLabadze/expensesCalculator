require("dotenv").config();
const cors = require("cors");
const express = require("express");
const serverless = require("serverless-http");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const financeRoutes = require("./routes/financeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/finances", financeRoutes);

connectDB()
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = serverless(app);
