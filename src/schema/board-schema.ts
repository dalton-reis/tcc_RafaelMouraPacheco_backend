import * as mongoose from 'mongoose';

let boardSchema = new mongoose.Schema({
    name: String,
    images: [String]
});

module.exports = mongoose.model('board', boardSchema);