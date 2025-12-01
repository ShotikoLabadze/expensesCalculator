const FinanceService = require("../services/FinanceService");

class FinanceController {
  async addFinance(req, res) {
    try {
      const finance = await FinanceService.addFinance(req.body, req.user._id);
      res.status(201).json(finance);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getFinances(req, res) {
    try {
      const finances = await FinanceService.listFinances(req.user._id);
      res.json(finances);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateFinance(req, res) {
    try {
      const finance = await FinanceService.updateFinance(
        req.params.id,
        req.body,
        req.user._id
      );
      if (!finance)
        return res.status(404).json({ message: "Finance not found" });
      res.json(finance);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteFinance(req, res) {
    try {
      const deleted = await FinanceService.deleteFinance(
        req.params.id,
        req.user._id
      );
      if (!deleted)
        return res.status(404).json({ message: "Finance not found" });
      res.json({ message: "Finance deleted" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async categoryBreakdown(req, res) {
    try {
      const { month, year } = req.query;
      const result = await FinanceService.categoryBreakdown(
        month,
        year,
        req.user._id
      );
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async monthlySummary(req, res) {
    try {
      const { month, year } = req.query;
      const result = await FinanceService.monthlySummary(
        month,
        year,
        req.user._id
      );
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new FinanceController();
