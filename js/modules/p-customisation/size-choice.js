/* import {productClass, defaultProducts} from "../product-data/product-data.js";

import { findDefaultProduct, findCangeCoefficient, initiateLayerProducts, pushLayerProducts, whatTheProduct } from '../p-cards-helpers.js';



// callback to change size in a product's array
function changeSize (button) {
  
  // identify product from html
  let productIdentifier = button.closest('.card-body').firstElementChild.innerText.toLowerCase();
  console.log(productIdentifier);

  // find product either from defaultProducts (if 1st time button is clicked), or from layerProducts (not 1st time) 
  let product = whatTheProduct(productIdentifier);


  // variables to make changes 
  let buttonValue = button.innerText.toLowerCase();
  let coefficientNumber = findCangeCoefficient(buttonValue);
  let cardBody = button.closest('.card-body');
  let priceElement = cardBody.querySelector('#price-text');

  // make data changes (and one html change)
  if (product instanceof productClass) {            // if product is from defaultProducts:
    let defaultSize = product.size;
    let defaultPrice = product.price;

    if (typeof layerProducts !== 'undefined') {     // if layerProducts exists -> change value + html -> psuh to layerProducts -> change back 
      product.size = buttonValue;
      product.price *= coefficientNumber;
      priceElement.innerText = product.price.toFixed(2);
      pushLayerProducts(product, productIdentifier);
      product.size = defaultSize;
      product.price = defaultPrice;
    }
    else {                                         // if layerProducts doesn't exists -> change value + html -> initiate layer and push to it -> change back 
      product.size = buttonValue;
      product.price *= coefficientNumber;
      priceElement.innerText = product.price.toFixed(2);
      initiateLayerProducts(product);
      product.size = defaultSize;
      product.price = defaultPrice;
    }
  }
  else {                                           // if product from layerProducts -> change values + html
    product.size = buttonValue;
    let defaultPrice = findDefaultProduct(productIdentifier).price;
    product.price = defaultPrice * coefficientNumber;
    priceElement.innerText = product.price.toFixed(2);
  }

  // for debug
  console.log(layerProducts);
  console.log(defaultProducts);
}


export default changeSize; */