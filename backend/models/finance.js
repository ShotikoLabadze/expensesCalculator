const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Finance", FinanceSchema);
