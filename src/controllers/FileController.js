const Board = require("../models/Board");
const File = require("../models/File");

class FileController {
  async store(req, res) {
    const board = await Board.findById(req.params.id);

    const file = await File.create({
      name: req.file.originalname,
      path: req.file.key
    });

    board.images.push(file);

    await board.save();

    req.io.sockets.in(board._id).emit("file", file);

    return res.json(file);
  }
}

module.exports = new FileController();
