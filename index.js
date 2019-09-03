'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.use

// Require your model
const Categories = require('./models-singular/categories.js');

// Mongoose Server URI
const MONGOOSE_URI = process.env.DB_CONNECT;

// Connect to DB
mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true },
    () => console.log ('Connected to DB, Gina'));

// Connect to Server
app.listen(process.env.PORT, () => console.log('Server up and running, Gina'));


// Do some work
const categories = new Categories();

const work = async () => {
    const testCategory = {
        name: "Testing name",
        description: "Testing description",
    };

    let newTestCategory = await categories.create(testCategory)
        .then( returnCategory => console.log('Returned test category', returnCategory))
        .catch( error => console.log(error));
};

work();


// Disconnect - NA on MongoDB Atlas
// mongoose.disconnect();