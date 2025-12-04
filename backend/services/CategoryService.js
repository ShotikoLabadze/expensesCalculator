const Category = require("../models/Category");

class CategoryService {
  async addCategory(data) {
    return await Category.create(data);
  }

  async listCategories() {
    return await Category.find().sort({ name: 1 });
  }
}
module.exports = new CategoryService();
