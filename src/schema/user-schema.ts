import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('User', userSchema);