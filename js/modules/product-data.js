import {Product, buttonsColor, buttonsQuanity, buttonsSize} from "./product.js";


// all default product data
const productData = {
  apple1: {id: 'apple1', name: 'Gala', isOnSale: false, saleCoef: undefined, price: 20, imgHref: '/images/apple1.jpg'},
  apple2: {id: 'apple2', name: 'Bitten granny', isOnSale: true, saleCoef: 0.3, price: 35, imgHref: '/images/apple2.jpg' },
  pear1: {id: 'pear1', name: 'Comice', isOnSale: false, saleCoef: undefined, price: 29, imgHref: '/images/pear1.jpg' },
  pear2: {id: 'pear2', name: 'Red pear', isOnSale: false, saleCoef: undefined, price: 49, imgHref: '/images/pear2.jpg' },
  orange1: {id: 'orange1', name: 'Orange', isOnSale: false, saleCoef: undefined, price: 19, imgHref: '/images/orange1.jpg' },
  orange2: {id: 'orange2', name: 'Orange 0.5', isOnSale: true, saleCoef: 0.5, price: 30, imgHref: '/images/orange2.jpg'}
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
  } 
  
  // if on product pages
  else if (reProductPages.test(path)) {
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

    // choose three random products to display 
    const properties = Object.keys(productData);
    let pickedProperties = [];
    let pickedProducts = [];

    while (pickedProducts.length < 3) {
      const randomIndex = Math.floor(Math.random() * properties.length);
      const randomProperty = properties[randomIndex];
      if (!pickedProperties.includes(randomProperty)) {
        pickedProperties.push(randomProperty);
        pickedProducts.push(new Product(
          productData[randomProperty].id,
          productData[randomProperty].name,
          color,
          size,
          quantity,
          productData[randomProperty].isOnSale,
          productData[randomProperty].saleCoef,
          productData[randomProperty].price,
          productData[randomProperty].imgHref,
          buttonsColor,
          buttonsSize,
          buttonsQuanity
        ));
      }
    }

    productsArr.push(pickedProducts);
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

}

setProducts();



export {productsArr};