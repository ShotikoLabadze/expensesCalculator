const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    category: {
      type: String,

      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Finance", FinanceSchema);
