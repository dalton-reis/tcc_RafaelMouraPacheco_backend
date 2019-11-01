const Board = require('../models/Board');
const File = require('../models/File');
const Symbol = require('../models/Symbol');

class FileController {
  async store(req, res) {
    const board = await Board.findById(req.params.boardId);

    const file = await File.create({
      name: req.file.originalname,
      path: req.file.key,
      url: ""
    });

    board.images.push(file);

    await board.save();

    req.io.sockets.in(board._id).emit('file', file);

    return res.json(file);
  }

  async storeSymbol(req, res) {
    const symbol = await Symbol.findById(req.params.symbolId);

    const audioFile = req.files.audioFile[0];
    const imageFile = req.files.audioFile[0];

    const audio = await File.create({
      name: audioFile.originalname,
      path: audioFile.key,
      url: audioFile.location,
    });

    const image = await File.create({
      name: imageFile.originalname,
      path: imageFile.key,
      url: imageFile.location
    });

    symbol.audio.push(audio);
    symbol.image.push(image);

    await symbol.save();

    req.io.sockets.in(symbol._id).emit('file', audio);
    req.io.sockets.in(symbol._id).emit('file', image);

    return res.json(symbol);
  }

  async show(req, res) {
    const file = await File.findById(req.params.id);

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
