const mongoose = require("mongoose");
const category = require("./category");

const FinanceSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    descrption: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Finance", FinanceSchema);
