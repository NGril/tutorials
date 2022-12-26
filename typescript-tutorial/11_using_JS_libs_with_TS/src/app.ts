// import _ from 'lodash';
// console.log(_.shuffle([1, 2, 3]));

// declare var GLOBAL: any;
// console.log(GLOBAL);

import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import Product from './product.model';

// let's say we get this from the server
const products = [
    { title: 'A Carpet', price: 29.99 },
    { title: 'A Book', price: 12.99 }
];

// without class-transformer
const loadedProductsVanilla = products.map(prod => {
    return new Product(prod.title, prod.price);
})
loadedProductsVanilla.forEach(prod => console.log(prod));

// class transformer
const loadedProductsCT = plainToClass(Product, products);
loadedProductsCT.forEach(prod => console.log(prod));


// class validator
const newProd = new Product('', -5.99);
console.log(validate(newProd).then(errors => {
    errors ? console.log(errors) : console.log(newProd);
}));

