"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let lineSchema = new Schema({
    invoiceId: mongoose.SchemaTypes.ObjectId,
    productId: mongoose.SchemaTypes.ObjectId,
    quantity: { type: Number, default: 1 },
    comment: { type: String, default: '' },
    active: { type: Boolean, default: true }
});

const Line = mongoose.model('Line', lineSchema);

module.exports = Line;