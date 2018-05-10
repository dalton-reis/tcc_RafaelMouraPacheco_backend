import * as mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    name: String,
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('users', userSchema);