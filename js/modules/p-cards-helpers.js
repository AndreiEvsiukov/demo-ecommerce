/* import {defaultProducts} from "./product-data/product-data.js";


// helper for finding default product in defaultProducs array 
const findDefaultProduct = (productIdentifier) => {
  let object;

  switch (true) {
    case productIdentifier === 'apple 1' :
      object = defaultProducts.find(e => e.name === productIdentifier);
      break;
    case productIdentifier === 'apple 2' :
      object = defaultProducts.find(e => e.name === productIdentifier);
      break;
    case productIdentifier === 'pear 1' :
      object = defaultProducts.find(e => e.name === productIdentifier);
      break;
    case productIdentifier === 'pear 2' :
      object = defaultProducts.find(e => e.name === productIdentifier);
      break;
    case productIdentifier === 'orange 1' :
      object = defaultProducts.find(e => e.name === productIdentifier);
      break;
    case productIdentifier === 'orange 2' :
      object = defaultProducts.find(e => e.name === productIdentifier);
      break;
    default:
      console.log('match is not found');
    }

  return object;
};


// helper to increase price according to size

const findCangeCoefficient = (buttonValue) => {
  let coefficientNumber;

  switch (true) {
    case buttonValue === 's' :
      coefficientNumber = 1;
      break;
    case buttonValue === 'm' :
      coefficientNumber = 1.5;
      break;
    case buttonValue === 'l' :
      coefficientNumber = 2;
      break;
    default :
      console.log('match is not found');
  };

  return coefficientNumber;
};



// Helpers for window.layerProducts 

const initiateLayerProducts = (product) => {
  window.layerProducts = [];;
  layerProducts.push(JSON.parse(JSON.stringify(product)));
}

const checkForLayerProduct = (productIdentifier) => {
  let result = false;

  layerProducts.forEach(i => {
    if (i.name === productIdentifier) {
      result = true;
    } 
  });

  return result;
};

const findLayerProduct = (productIdentifier) => {
  let result = false;

  layerProducts.forEach(i => {
    if (i.name === productIdentifier) {
      result = i;
    } 
  });

  return result;
};

const pushLayerProducts = (product, productIdentifier) => {
  if (checkForLayerProduct(productIdentifier)) {
    let index = layerProducts.findIndex(i => i.name === productIdentifier);
    layerProducts[index] = JSON.parse(JSON.stringify(product));
  }
  else {
    layerProducts.push(JSON.parse(JSON.stringify(product)));
  }
};



// Helper to find requierd product either in defaultProducts or layerProducts

const whatTheProduct = (productIdentifier) => {
  let object;

  if (typeof layerProducts !== 'undefined') {                   // if layerProduct exists:
    if (checkForLayerProduct(productIdentifier)) {                // if this product is present in layerProducts: 
      object = findLayerProduct(productIdentifier);               // take the product from layerProducts
    }
    else {                                                        // if this product is not present in layerProducts: 
      object = findDefaultProduct(productIdentifier);             // take the product from default
    }
  }
  else {                                                        // if layerProduct doesn't exists:
    object = findDefaultProduct(productIdentifier);               // take the product from default
  }

  return object;
};


export { findDefaultProduct, findCangeCoefficient, initiateLayerProducts, checkForLayerProduct, findLayerProduct , pushLayerProducts, whatTheProduct }; */