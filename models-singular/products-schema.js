'use strict';

const mongoose = require('mongoose');

// What fields and constraints do we want?
const mongooseProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    }
});

// Do we need to run any lifecycle hooks/middleware?

module.exports = mongoose.model('products', mongooseProductSchema);
