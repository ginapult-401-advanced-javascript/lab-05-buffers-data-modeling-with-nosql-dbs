const Products = require('../../models-singular/products.js');
const products = new Products();

const supergoose = require('../supergoose.js');

describe('Products Model (Singular)', () => {

    // How will you handle both the happy path and edge cases in these tests?

    it('can create() a new product', () => {
        let testProduct = {
            name: "Mugs",
            description: "Your favorite coffee mugs.",
            price: 10,
        };
        return products.create(testProduct)
            .then(savedProduct => {
                Object.keys(testProduct).forEach(key => {
                    expect(savedProduct[key]).toEqual(testProduct[key]);
                });
            })
            .catch(error => console.log(error));
    });

    it('can get() a category', () => {
        let testProduct2 = {
            name: "Hats",
            description: "Your favorite hats.",
            price: 20,
        };
        return products.create(testProduct2)
            .then(savedProduct => {
                return products.get(savedProduct._id)
                    .then( foundProduct => {
                        Object.keys(testProduct2).forEach(key => {
                            expect(foundProduct[key]).toEqual(testProduct2[key]);
                        })
                    })
            })
            .catch(error => console.log(error));
    });

    it('can get() all products', () => {
        const testProduct3 = {
            name: "Gloves",
            description: "Your favorite gloves.",
            price: 30,
        };
        const testProduct4 = {
            name: "Scarves",
            description: "Your favorite scarves.",
            price: 40,
        };
        const testProduct5 = {
            name: "Shoes",
            description: "Your favorite shoes.",
            price: 50,
        };
        return products.create(testProduct3)
            .then( () => {
                return products.create(testProduct4);
            })
            .then( () => {
                return products.create(testProduct5);
            })
            .then(() => {
                return products.get();
            })
            .then( allCategories => {
                expect(allCategories.count).toEqual(5);
            })
            .catch(error => console.log(error));
    });

    it('can update() a category', () => {
        const testProduct6 = {
            name: "Belts",
            description: "Your favorite belts.",
            price: 60,
        };
        const testProduct7 = {
            name: "Belts",
            description: "Your favorite belts.",
            price: 70,
        };
        return products.create(testProduct6)
            .then( savedProduct => {
                return products.update(savedProduct._id, testProduct7)
                    .then( updatedProduct => {
                        expect(updatedProduct.price).toEqual(70);
                    });
            })
            .catch(error => console.log(error));
    });

    it('can delete() a category', () => {
        const testProduct8 = {
            name: "Delete me",
            description: "I can not wait to be deleted.",
            price: 70,
        };
        return products.create(testProduct8)
            .then( toDeleteProduct => {
                return products.delete(toDeleteProduct._id)
                    .then( deletedProduct => {
                        return products.get(deletedProduct._id);
                    })
                    .then( productsLeft => {
                        expect(productsLeft).toEqual(null);
                    })
                    .catch( error => console.log(error));
            });
    });

});

