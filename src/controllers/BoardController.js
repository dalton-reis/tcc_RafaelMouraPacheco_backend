const Board = require("../models/Board");

class BoardController {
  async store(req, res) {
    const board = await Board.create(req.body);
    return res.json(board);
  }

  async show(req, res) {
    const board = await Board.findById(req.params.id).populate({
      path: "files",
      options: { sort: { createdAt: -1 } }
    });

    return res.json(board);
  }

  async show(req, res) {
    const board = await Board.findById(req.params.id).populate({
      path: "files",
      options: { sort: { createdAt: -1 } }
    });

    return res.json(board);
  }

  async getAll(req, res) {
    const boards = await Board.find({}).populate({
      path: "files",
      options: { sort: { createdAt: -1 } }
    });

    return res.json(boards);
  }
}

module.exports = new BoardController();
