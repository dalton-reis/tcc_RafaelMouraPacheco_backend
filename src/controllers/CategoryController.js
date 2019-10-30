const Category = require('../models/Category');

class CategoryController {
  async store(req, res) {
    const category = await Category.create(req.body);
    return res.json(category);
  }

  async update(req, res) {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(category);
  }

  async getAll(req, res) {
    const categories = await Category.find({});
    return res.json(categories);
  }
}

module.exports = new CategoryController();
