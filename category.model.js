// category.model.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Category', CategorySchema);
