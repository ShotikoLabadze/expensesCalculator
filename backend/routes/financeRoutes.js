const router = require("express").Router();
const FinanceController = require("../controllers/FinanceController");

router.post("/", FinanceController.addFinance);
router.get("/", FinanceController.getFinances);
router.get("/summary", FinanceController.monthlySummary);

module.exports = router;
