const mongoose = require('mongoose');

const Board = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    symbols: [
      { symbolId: { type: String, required: true } },
      { boardIndex: { type: Number, required: true } }
    ],
    planId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Board', Board);
