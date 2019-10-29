const mongoose = require('mongoose');

const Symbol = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isPrivate: {
      type: Boolean,
      required: true
    },
    image: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    audio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Symbol', Symbol);
