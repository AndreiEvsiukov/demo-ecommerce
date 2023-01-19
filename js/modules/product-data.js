import {Product, buttonsColor, buttonsQuanity, buttonsSize} from "./product.js";


// all default product data
const productData = {
  apple1: {id: 'apple1', name: 'Apple 1', isOnSale: false, saleCoef: undefined, price: 20, imgHref: '/images/apple1.jpg'},
  apple2: {id: 'apple2', name: 'Apple 2', isOnSale: true, saleCoef: 0.3, price: 35, imgHref: '/images/apple2.jpg' },
  pear1: {id: 'pear1', name: 'Pear 1', isOnSale: false, saleCoef: undefined, price: 29, imgHref: '/images/pear1.jpg' },
  pear2: {id: 'pear2', name: 'Pear 2', isOnSale: false, saleCoef: undefined, price: 49, imgHref: '/images/pear2.jpg' },
  orange1: {id: 'orange1', name: 'Orange 1', isOnSale: false, saleCoef: undefined, price: 19, imgHref: '/images/orange1.jpg' },
  orange2: {id: 'orange2', name: 'Orange 2', isOnSale: true, saleCoef: 0.5, price: 30, imgHref: '/images/orange2.jpg'}
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
  const reSpecialOffers = new RegExp('\/special-offers')

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
        productData[property].isOnSale,
        productData[property].saleCoef,
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
      productData[productId].isOnSale,
      productData[productId].saleCoef,
      productData[productId].price,
      productData[productId].imgHref,
      buttonsColor,
      buttonsSize,
      buttonsQuanity
    );

    console.log(productData[productId])
  }
  
  // if on special offers
  else if (reSpecialOffers.test(path)) {
    console.log('special offers');

    for (const property in productData) {

      if (productData[property].isOnSale) {

        productsArr[i] = new Product(
          productData[property].id,
          productData[property].name,
          color,
          size,
          quantity,
          productData[property].isOnSale,
          productData[property].saleCoef,
          productData[property].price,
          productData[property].imgHref,
          buttonsColor,
          buttonsSize,
          buttonsQuanity
        ); 
        
      }

      i++;
    }
  } 

  else {
    return;   
  }

}

setProducts();



export {productsArr};