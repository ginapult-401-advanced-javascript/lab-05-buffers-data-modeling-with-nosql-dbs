'use strict';

// Where is our schema defined?
// How do we get it in here so we can run methods on it?
const mongooseCategoriesModel = require('./categories-schema.js');

class Categories {

  constructor() {

  }

  get(_id) {
    // Call the appropriate mongoose method to get
    if(_id) {
      // one record, return as plain object
      return mongooseCategoriesModel.findById(_id);
    } else {
      // if two or more records, return as an object like { count: ##, results: [{}, {}] }
      return mongooseCategoriesModel.find({})
          .then((foundRecords) => {
            return {
              count: foundRecords.length,
              results: foundRecords };
          });
    }
  }

  create(record) {
    // Call the appropriate mongoose method to create and save a new record
    const newRecord = new mongooseCategoriesModel(record);
    return newRecord.save();
  }

  update(_id, record) {
    // Call the appropriate mongoose method to update a record
    return mongooseCategoriesModel.findByIdAndUpdate(_id, record, { new: true });
  }

  delete(_id) {
    // Call the appropriate mongoose method to delete a record
    return mongooseCategoriesModel.findByIdAndDelete(_id);
  }
}

module.exports = Categories;
