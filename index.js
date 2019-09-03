'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.use

// Require your model
// Model-singular
// const Categories = require('./models-singular/categories.js');
// const Products = require('./models-singular/products');

//Model-modular
const Categories = require('./models-modular/categories/categories.js');
const Products = require('./models-modular/products/products.js');

// Mongoose Server URI
const MONGOOSE_URI = process.env.DB_CONNECT;

// Connect to DB
mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true },
    () => console.log ('Connected to DB, Gina'));

// Connect to Server
app.listen(process.env.PORT, () => console.log('Server up and running, Gina'));


// Do some work
const categories = new Categories();

const workCategories = async () => {
    const testCategory = {
        name: "Testing category name",
        description: "Testing category description",
    };

    let newTestCategory = await categories.create(testCategory)
        .then( returnCategory => console.log('Returned test category', returnCategory))
        .catch( error => console.log(error));
};

const products = new Products();

const workProducts = async () => {
    const testProduct = {
        name: "Testing product name",
        description: "Testing product description",
        price: 100,
    };

    let newTestProduct = await products.create(testProduct)
        .then( returnProduct => console.log('Returned test product', returnProduct))
        .catch( error => console.log(error));
};

workCategories();
workProducts();


// Disconnect - NA on MongoDB Atlas
// mongoose.disconnect();