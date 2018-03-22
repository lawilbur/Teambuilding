const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema); // the geen indicats the collection http://mongoosejs.com/docs/api.html#utils_exports.toCollectionName

module.exports = User;
