"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    parentId: mongoose.SchemaTypes.ObjectId,
    name: { type: String, required: true },
    status: { type: Boolean, default: true },
    active: { type: Boolean, default: true }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;