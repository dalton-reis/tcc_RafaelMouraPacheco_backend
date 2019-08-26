const mongoose = require("mongoose");

const Board = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Board", Board);
