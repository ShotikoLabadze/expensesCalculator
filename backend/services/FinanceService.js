const Finance = require("../models/finance");

class FinanceService {
  async addFinance(data) {
    return await Finance.create(data);
  }

  async listFinances() {
    return await Finance.find().populate("category").sort({ date: -1 });
  }

  async monthlySummary(month, year) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const result = await Finance.aggregate([
      {
        $match: {
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    return result[0] || { total: 0 };
  }
}

module.exports = new FinanceService();
