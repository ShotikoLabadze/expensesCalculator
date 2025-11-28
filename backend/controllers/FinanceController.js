const FinanceService = require("../services/FinanceService");

class FinanceController {
  async addFinance(req, res) {
    try {
      const finance = await FinanceService.addFinance(req.body);
      return res.status(201).json(finance);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getFinances(req, res) {
    try {
      const finances = await FinanceService.listFinances();
      return res.json(finances);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateFinance(req, res) {
    try {
      const { id } = req.params;
      const finance = await FinanceService.updateFinance(id, req.body);
      if (!finance) {
        return res.status(404).json({ message: "Finance record not found" });
      }
      return res.json(finance);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async deleteFinance(req, res) {
    try {
      const { id } = req.params;
      const deleted = await FinanceService.deleteFinance(id);
      if (!deleted) {
        return res.status(404).json({ message: "Finance record not found" });
      }
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  async categoryBreakdown(req, res) {
    try {
      const { month, year } = req.query;
      const result = await FinanceService.categoryBreakdown(month, year);
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async monthlySummary(req, res) {
    try {
      const { month, year } = req.query;

      const result = await FinanceService.monthlySummary(month, year);
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new FinanceController();
