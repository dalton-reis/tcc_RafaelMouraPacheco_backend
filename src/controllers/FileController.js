const Board = require('../models/Board');
const File = require('../models/File');
const Symbol = require('../models/Symbol');

class FileController {
  async store(req, res) {
    const board = await Board.findById(req.params.boardId);

    const file = await File.create({
      name: req.file.originalname,
      path: req.file.key
    });

    board.images.push(file);

    await board.save();

    req.io.sockets.in(board._id).emit('file', file);

    return res.json(file);
  }

  async storeSymbol(req, res) {
    const symbol = await Symbol.findById(req.params.symbolId);

    const audio = await File.create({
      name: req.files.audioFile[0].originalname,
      path: req.files.audioFile[0].key
    });

    const image = await File.create({
      name: req.files.imageFile[0].originalname,
      path: req.files.imageFile[0].key
    });

    symbol.audio.push(audio);
    symbol.image.push(image);

    await symbol.save();

    return res.json(symbol);
  }

  async show(req, res) {
    const file = await File.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });

    return res.json(file);
  }

  async showMultipleIds(req, res) {
    const file = await File.find({
      _id: { $in: req.body }
    }).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });

    return res.json(file);
  }
}

module.exports = new FileController();
