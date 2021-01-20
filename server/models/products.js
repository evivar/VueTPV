"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    categoryId: mongoose.SchemaTypes.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true, default: '' },
    price: { type: Number, required: true },
    tax: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    active: { type: Boolean, default: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;