const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const financeRoutes = require("./routes/financeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/finances", financeRoutes);
