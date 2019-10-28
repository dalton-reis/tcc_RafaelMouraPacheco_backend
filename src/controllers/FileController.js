const Board = require('../models/Board');
const File = require('../models/File');

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

  async show(req, res) {
    const file = await File.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });

    return res.json(file);
  }

  async showMultipleIds(req, res) {
    const file = await File.find({ _id: { $in: req.params.ids } }).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });

    return res.json(file);
  }
}

module.exports = new FileController();
