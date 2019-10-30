const Symbol = require('../models/Symbol');

class SymbolController {
  async store(req, res) {
    const symbol = await Symbol.create(req.body);
    return res.json(symbol);
  }

  async update(req, res) {
    const symbol = await Symbol.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(symbol);
  }

  async show(req, res) {
    const symbol = await Symbol.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });

    return res.json(symbol);
  }

  async getAll(req, res) {
    const symbols = await Symbol.find({}).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });

    return res.json(symbols);
  }

  async showMultipleIds(req, res) {
    const symbol = await Symbol.find({
      _id: { $in: req.body }
    }).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });

    return res.json(symbol);
  }
}

module.exports = new SymbolController();
