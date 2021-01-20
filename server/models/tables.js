"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tableSchema = new Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['Free', 'Occupied', 'Reserved'], default: 'Free' },
    active: { type: Boolean, default: true }
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;