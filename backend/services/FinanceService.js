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

      {
        $project: {
          category: "$categoryInfo.name",
          type: "$categoryInfo.type",
          total: 1,
        },
      },
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

  async predictNextMonthExpense() {
    const ref = new Date();

    const end = new Date(ref.getFullYear(), ref.getMonth() + 1, 1);
    const start = new Date(ref.getFullYear(), ref.getMonth() - 2, 1);

    const agg = await Finance.aggregate([
      {
        $match: {
          date: { $gte: start, $lt: end },
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "cat",
        },
      },

      { $unwind: "$cat" },

      { $match: { "cat.type": "expense" } },

      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" },
        },
      },

      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    if (!agg.length) return { predictedExpense: 0 };

    const sum = agg.reduce((acc, r) => acc + r.total, 0);
    const avg = sum / agg.length;

    return {
      predictedExpense: Number(avg.toFixed(2)),
      monthsUsed: agg.length,
      raw: agg,
    };
  }
}

module.exports = new FinanceService();
