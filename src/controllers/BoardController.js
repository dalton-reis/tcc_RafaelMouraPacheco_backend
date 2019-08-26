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
}

module.exports = new BoardController();
