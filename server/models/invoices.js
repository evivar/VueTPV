"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let invoiceSchema = new Schema({
    tableId: mongoose.SchemaTypes.ObjectId,
    date: { type: Date, default: Date.now },
    discount: { type: Number, default: 0 },
    netPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    payment: { type: String, enum: ['Cash', 'Credit', 'Other', 'N/A'], default: 'N/A' },
    closed: { type: Boolean, default: false },
    active: { type: Boolean, default: true }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;