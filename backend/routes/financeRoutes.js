const express = require("express");
const router = express.Router();
const FinanceController = require("../controllers/FinanceController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", FinanceController.addFinance);
router.get("/", FinanceController.getFinances);
router.put("/:id", FinanceController.updateFinance);
router.delete("/:id", FinanceController.deleteFinance);
router.get("/category-breakdown", FinanceController.categoryBreakdown);
router.get("/summary", FinanceController.monthlySummary);

module.exports = router;
