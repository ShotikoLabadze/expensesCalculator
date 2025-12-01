require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");

const financeRoutes = require("./routes/financeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoutes);

connectDB();
app.use("/api/finances", financeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
