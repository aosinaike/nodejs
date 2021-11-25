const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Article = new Schema({
    content: {
        type: String
    },
    author: {
        type: String
    }
});
module.exports = mongoose.model('Article', Article);