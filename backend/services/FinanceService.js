const Finance = require("../models/Finance");

class FinanceService {
  // Add a finance, link it to userId
  async addFinance(data, userId) {
    return await Finance.create({ ...data, user: userId });
  }

  async listFinances(userId) {
    return await Finance.find({ user: userId })
      .populate("category")
      .sort({ date: -1 });
  }

  async updateFinance(id, data, userId) {
    // Only update if finance belongs to user
    return await Finance.findOneAndUpdate({ _id: id, user: userId }, data, {
      new: true,
    });
  }

  async deleteFinance(id, userId) {
    return await Finance.findOneAndDelete({ _id: id, user: userId });
  }

  async categoryBreakdown(month, year, userId) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const result = await Finance.aggregate([
      { $match: { user: userId, date: { $gte: start, $lt: end } } },
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

  async monthlySummary(month, year, userId) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const result = await Finance.aggregate([
      { $match: { user: userId, date: { $gte: start, $lt: end } } },
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
