const Finance = require("../models/finance");

class FinanceService {
  async addFinance(data) {
    return await Finance.create(data);
  }

  async listFinances() {
    return await Finance.find().populate("category").sort({ date: -1 });
  }

  async getFinanceById(id) {
    return await Finance.findById(id).populate("category");
  }

  async deleteFinance(id) {
    return await Finance.findByIdAndDelete(id);
  }

  async updateFinance(id, data) {
    return await Finance.findByIdAndUpdate(id, data, { new: true });
  }

  async categoryBreakdown(month, year) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const result = await Finance.aggregate([
      { $match: { date: { $gte: start, $lt: end } } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" },
      { $project: { category: "$categoryInfo.name", total: 1 } },
    ]);

    return result;
  }

  async monthlySummary(month, year) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const result = await Finance.aggregate([
      { $match: { date: { $gte: start, $lt: end } } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    return result[0] || { total: 0 };
  }

  async predictNextMonthExpense(referenceDate = new Date()) {
    const end = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth() + 1,
      1
    );
    const start = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth() - 2,
      1
    );

    const agg = await Finance.aggregate([
      { $match: { type: "expense", date: { $gte: start, $lt: end } } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    if (!agg || agg.length === 0) return { predictedExpense: 0, monthsUsed: 0 };

    const monthsUsed = agg.length;
    const sum = agg.reduce((s, r) => s + Number(r.total), 0);
    const avg = sum / monthsUsed;

    return { predictedExpense: Number(avg.toFixed(2)), monthsUsed, raw: agg };
  }
}

module.exports = new FinanceService();
