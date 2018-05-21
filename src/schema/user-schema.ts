import * as mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    name: String,
    password: String,
    role: String
});

module.exports = mongoose.model('users', userSchema);