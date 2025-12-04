const mongoose = require("mongoose");
require("dotenv").config();

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected!");
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
