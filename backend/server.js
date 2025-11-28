require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const financeRoutes = require("./routes/financeRoutes");

const app = express();

app.use(express.json());

connectDB();
app.use("/api/finances", financeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
