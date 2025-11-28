const FinanceService = require("../services/FinanceService");

class FinanceController {
  async addFinance(req, res) {
    try {
      const finance = await FinanceService.addFinance(req.body);
      res.status(201).json(finance);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getFinances(req, res) {
    try {
      const finances = await FinanceService.listFinances();
      res.json(finances);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async monthlySummary(req, res) {
    try {
      const { month, year } = req.query;
      const result = await FinanceService.monthlySummary(month, year);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new FinanceController();
