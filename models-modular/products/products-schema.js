'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
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

module.exports = mongoose.model('products', products);
