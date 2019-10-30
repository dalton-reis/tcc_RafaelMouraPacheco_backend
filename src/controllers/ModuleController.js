const Module = require('../models/Module');

class ModuleController {
  async store(req, res) {
    const module = await Module.create(req.body);
    return res.json(module);
  }

  async update(req, res) {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(module);
  }

  async getAll(req, res) {
    const modules = await Module.find({});

    return res.json(modules);
  }
}

module.exports = new ModuleController();
