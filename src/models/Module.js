const mongoose = require('mongoose');

const Module = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    roles: [
      {
        type: String,
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Module', Module);
