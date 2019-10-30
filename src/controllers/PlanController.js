const Plan = require('../models/Plan');

class PlanController {
  async store(req, res) {
    const board = await Plan.create(req.body);
    return res.json(board);
  }

  async getAll(req, res) {
    const boards = await Plan.find({});

    return res.json(boards);
  }

  async showByPlanByOwner(req, res) {
    const plan = await Plan.find({ owner: req.params.owner });
    return res.json(plan);
  }
}

module.exports = new PlanController();
