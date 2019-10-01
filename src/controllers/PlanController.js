const Plan = require("../models/Plan");

class PlanController {
  async store(req, res) {
    const board = await Plan.create(req.body);
    return res.json(board);
  }

  async getAll(req, res) {
    const boards = await Plan.find({}).populate({
      path: "files",
      options: { sort: { createdAt: -1 } }
    });

    return res.json(boards);
  }
}

module.exports = new PlanController();
