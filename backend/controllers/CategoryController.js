const CategoryService = require("../services/CategoryService");

class CategoryController {
  async addCategory(req, res) {
    try {
      const category = await CategoryService.addCategory(req.body);
      res.json(category);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await CategoryService.listCategories();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new CategoryController();
