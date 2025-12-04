const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const authRoutes = require("../routes/authRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const financeRoutes = require("../routes/financeRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/finances", financeRoutes);

connectDB();

module.exports = app;
