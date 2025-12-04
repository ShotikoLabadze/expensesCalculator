console.log("__dirname:", __dirname);
const Finance = require("../models/Finance");

class FinanceService {
  async addFinance(data, userId) {
    return await Finance.create({ ...data, user: userId });
  }

  async listFinances(userId) {
    return await Finance.find({ user: userId }).sort({ date: -1 });
  }

  async updateFinance(id, data, userId) {
    return await Finance.findOneAndUpdate({ _id: id, user: userId }, data, {
      new: true,
    });
  }

  async deleteFinance(id, userId) {
    return await Finance.findOneAndDelete({ _id: id, user: userId });
  }

  async monthlySummary(month, year, userId) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const result = await Finance.aggregate([
      { $match: { user: userId, date: { $gte: start, $lt: end } } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const income = result.find((r) => r._id === "income")?.total || 0;
    const expense = result.find((r) => r._id === "expense")?.total || 0;

    return { income, expense };
  }
}

module.exports = new FinanceService();
