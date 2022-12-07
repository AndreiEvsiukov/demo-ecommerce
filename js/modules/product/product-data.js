import {Product, buttonsColor, buttonsQuanity, buttonsSize} from "./product.js";


// all default product data
const productData = {
  apple1: {id: 'apple1', name: 'Apple 1', price: 20, imgHref: '/images/apple1.jpg'},
  apple2: {id: 'apple2', name: 'Apple 2', price: 35, imgHref: '/images/apple2.jpg' },
  pear1: {id: 'pear1', name: 'Pear 1', price: 29, imgHref: '/images/pear1.jpg' },
  pear2: {id: 'pear2', name: 'Pear 2', price: 49, imgHref: '/images/pear2.jpg' },
  orange1: {id: 'orange1', name: 'Orange 1', price: 19, imgHref: '/images/orange1.jpg' },
  orange2: {id: 'orange2', name: 'Orange 2', price: 30, imgHref: '/images/orange2.jpg'}
};
const color = 'blue';
const size = 's';
const quantity = 1;

// product data array to import
const productsArr = [];


function setProducts() {
  const path = window.location.pathname;

  const reIndex = new RegExp('\/index');
  const reProductPages = new RegExp('\/product-pages\/');

  // if on home
  let i = 0;

  if (reIndex.test(path)) {
    for (const property in productData) {
      productsArr[i] = new Product(
        productData[property].id,
        productData[property].name,
        color,
        size,
        quantity,
        productData[property].price,
        productData[property].imgHref,
        buttonsColor,
        buttonsSize,
        buttonsQuanity
      );

      i++;
    }

  // if on product pages
  } else if (reProductPages.test(path)) {
    const productId = path.slice(15, -5);

    productsArr[0] = new Product(
      productData[productId].id,
      productData[productId].name,
      color,
      size,
      quantity,
      productData[productId].price,
      productData[productId].imgHref,
      buttonsColor,
      buttonsSize,
      buttonsQuanity
    );

    console.log(productData[productId])
  }
}

setProducts();

// const apple1 = new Product(
//   'apple1',
//   'Apple 1',
//   'blue',
//   's',
//   1,
//   20,
//   '/images/apple1.jpg',
//   buttonsColor,
//   buttonsSize,
//   buttonsQuanity
// );

// const apple2 = new Product(
//   'apple2',
//   'Apple 2',
//   'blue',
//   's',
//   1,
//   35,
//   '/images/apple2.jpg',
//   buttonsColor,
//   buttonsSize,
//   buttonsQuanity
// );

// const pear1 = new Product(
//   'pear1',
//   'Pear 1',
//   'blue',
//   's',
//   1,
//   29,
//   'images/pear1.jpg',
//   buttonsColor,
//   buttonsSize,
//   buttonsQuanity
// );

// const pear2 = new Product(
//   'pear2',
//   'Pear 2',
//   'blue',
//   's',
//   1,
//   49,
//   'images/pear2.jpg',
//   buttonsColor,
//   buttonsSize,
//   buttonsQuanity
// );

// const orange1 = new Product(
//   'orange1',
//   'Orange 1',
//   'blue',
//   's',
//   1,
//   19,
//   'images/orange1.jpg',
//   buttonsColor,
//   buttonsSize,
//   buttonsQuanity
// );

// const orange2 = new Product(
//   'orange2',
//   'Orange 2',
//   'blue',
//   's',
//   1,
//   30,
//   'images/orange2.jpg',
//   buttonsColor,
//   buttonsSize,
//   buttonsQuanity
// );

// const productsArr = [apple1, apple2, pear1, pear2, orange1, orange2];


export {productsArr};