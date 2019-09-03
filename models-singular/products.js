'use strict';

// Where is our schema defined?
// How do we get it in here so we can run methods on it?
const mongooseProductModel = require('./products-schema.js');

class Products {

    constructor() {
    }

    get(_id) {
        // Call the appropriate mongoose method to get
        if(_id) {
            // one record, return as plain object
            return mongooseProductModel.findById(_id);
        } else {
            // if two or more records, return as an object like { count: ##, results: [{}, {}] }
            return mongooseProductModel.find({})
                .then((foundRecords) => {
                    return { count: foundRecords.length, results: foundRecords };
                });
        }
    }

    create(record) {
        // Call the appropriate mongoose method to create and save a new record
        const newRecord = new mongooseProductModel(record);
        return newRecord.save();
    }

    update(_id, record) {
        // Call the appropriate mongoose method to update a record
        return mongooseProductModel.findByIdAndUpdate(_id, record);
    }

    delete(_id) {
        // Call the appropriate mongoose method to delete a record
        return mongooseProductModel.findByIdAndDelete(_id);
    }
}

module.exports = Products;
