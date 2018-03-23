const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: String,
    size: String,
    time: String,
    tags:[String],
    needed:[String],
    game: [String]
});

const Post = mongoose.model('Post', postSchema); // the geen indicats the collection http://mongoosejs.com/docs/api.html#utils_exports.toCollectionName

module.exports = Post;
