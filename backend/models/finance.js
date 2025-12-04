const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Finance", FinanceSchema);
