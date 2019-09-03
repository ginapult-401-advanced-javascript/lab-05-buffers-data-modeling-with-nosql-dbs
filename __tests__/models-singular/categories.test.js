const Categories = require('../../models-singular/categories.js');
const categories = new Categories();

const supergoose = require('../supergoose.js');

describe('Categories Model (Singular)', () => {

  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new category', () => {
    let testCategory = {
        name: "Mugs",
        description: "Your favorite coffee mugs."
    };
    return categories.create(testCategory)
      .then(savedCategory => {
        Object.keys(testCategory).forEach(key => {
          expect(savedCategory[key]).toEqual(testCategory[key]);
        });
      })
        .catch(error => console.log(error));
  });

  it('can get() a category', () => {
    let testCategory2 = {
        name: "Hats",
        description: "Your favorite hats."
    };
    return categories.create(testCategory2)
        .then(savedCategory => {
            return categories.get(savedCategory._id)
                .then( foundCategory => {
                    Object.keys(testCategory2).forEach(key => {
                        expect(foundCategory[key]).toEqual(testCategory2[key]);
                    })
                })
        })
        .catch(error => console.log(error));
  });

  it('can get() all categories', () => {
      const testCategory3 = {
          name: "Gloves",
          description: "Your favorite gloves."
      };
      const testCategory4 = {
          name: "Scarves",
          description: "Your favorite scarves."
      };
      const testCategory5 = {
          name: "Shoes",
          description: "Your favorite shoes."
      };
      return categories.create(testCategory3)
        .then( () => {
            return categories.create(testCategory4);
        })
          .then( () => {
              return categories.create(testCategory5);
          })
          .then(() => {
              return categories.get();
          })
          .then( allCategories => {
              expect(allCategories.count).toEqual(5);
          })
          .catch(error => console.log(error));
  });

  it('can update() a category', () => {
    const testCategory6 = {
        name: "Belts",
        description: "Your favorite belts."
    };
    const testCategory7 = {
        name: "Belts again",
        description: "Your favorite belts again."
    };
    return categories.create(testCategory6)
        .then( savedCategory => {
            return categories.update(savedCategory._id, testCategory7)
                .then( updatedCategory => {
                    expect(updatedCategory.name).toEqual("Belts again");
                    });
        })
        .catch(error => console.log(error));
  });

  it('can delete() a category', () => {
      const testCategory8 = {
          name: "Delete me",
          description: "I can not wait to be deleted."
      };
      return categories.create(testCategory8)
          .then( toDeleteCategory => {
              return categories.delete(toDeleteCategory._id)
                  .then( deletedCategory => {
                      return categories.get(deletedCategory._id);
                  })
                  .then( categoriesLeft => {
                      expect(categoriesLeft).toEqual(null);
                  })
          .catch( error => console.log(error));
          });
  });

  });

