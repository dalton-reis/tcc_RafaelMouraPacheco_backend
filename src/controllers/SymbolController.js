const Symbol = require('../models/Symbol');
const File = require('../models/File');

class SymbolController {
  async store(req, res) {
    const symbol = await Symbol.create(req.body);
    return res.json(symbol);
  }

  async update(req, res) {
    const symbol = await Symbol.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(symbol);
  }

  async showByCategory(req, res) {
    const symbol = await Symbol.find({ categoryId: req.params.categoryId }).populate({
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

    for (let index = 0; index < symbol.length; index++) {
      const element = symbol[index];

      const audio = await File.find({
        _id: { $in: element.audio }
      }).populate({
        path: 'files',
        options: { sort: { createdAt: -1 } }
      });

      element.audio = audio;

      const image = await File.find({
        _id: { $in: element.image }
      }).populate({
        path: 'files',
        options: { sort: { createdAt: -1 } }
      });

      element.image = image;
    }

    return res.json(symbol);
  }
}

module.exports = new SymbolController();
