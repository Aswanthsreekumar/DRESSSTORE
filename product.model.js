// product.model.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    published: Boolean,
    category: String
});

module.exports = mongoose.model('Product', ProductSchema);
