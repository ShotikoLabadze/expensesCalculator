const express = require("express");
const router = express.Router();
const FinanceController = require("../controllers/FinanceController");

router.post("/", (req, res) => FinanceController.addFinance(req, res));

router.get("/", (req, res) => FinanceController.getFinances(req, res));

router.get("/summary", (req, res) =>
  FinanceController.monthlySummary(req, res)
);

router.put("/:id", (req, res) => FinanceController.updateFinance(req, res));

router.delete("/:id", (req, res) => FinanceController.deleteFinance(req, res));

router.get("/category-breakdown", (req, res) =>
  FinanceController.categoryBreakdown(req, res)
);

router.get("/predict", (req, res) =>
  FinanceController.predictExpense(req, res)
);

module.exports = router;
