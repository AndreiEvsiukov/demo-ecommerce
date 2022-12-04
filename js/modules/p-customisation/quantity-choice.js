/* import {productClass, defaultProducts} from "../product-data/product-data.js";


import { initiateLayerProducts, pushLayerProducts, whatTheProduct} from '../p-cards-helpers.js';




// // // Changing quantity functionality

// callbacks to change quantity in a product's array 
function addOne (button) {

  // identify product from html
  let productIdentifier = button.closest('.card-body').firstElementChild.innerText.toLowerCase();

  // find product either from defaultProducts (if 1st time button is clicked), or from layerProducts (not 1st time) 
  let product = whatTheProduct(productIdentifier);


  // variables to make changes
  let quantityIndicator = button.parentElement.querySelector('span');

  // make data + html changes
  if (product instanceof productClass) {            // if product is from defaultProducts:
    let defaultValue = product.quantity;

    if (typeof layerProducts !== 'undefined') {     // if layerProducts exists -> change value + html -> psuh to layerProducts -> change back 
      ++product.quantity;
      quantityIndicator.innerText = product.quantity;
      pushLayerProducts(product, productIdentifier);
      product.quantity = defaultValue;
    }
    else {
    ++product.quantity;                            // if doesn't -> change value + html -> initiate layer and push to it -> change back 
    quantityIndicator.innerText = product.quantity;
    initiateLayerProducts(product);
    product.quantity = defaultValue;
    }
  }
  else {                                           // if product from layerProducts -> change value + html 
    ++product.quantity;
    quantityIndicator.innerText = product.quantity;
  }

  // for debug
  console.log(layerProducts);
  console.log(defaultProducts);
}



function removeOne (button) {
  // identify product from html
  let productIdentifier = button.closest('.card-body').firstElementChild.innerText.toLowerCase();

  // find product either from defaultProducts (if 1st time button is clicked), or from layerProducts (not 1st time) 
  let product = whatTheProduct(productIdentifier);


  // variables to make changes
  let quantityIndicator = button.parentElement.querySelector('span');

  // make data + html changes
  if (product.quantity > 1) {                         // preventing from being negative
    let defaultValue = product.quantity;

    if (product instanceof productClass) {            // if product is from defaultProducts:
      if (typeof layerProducts !== 'undefined') {     // if layerProducts exists -> change value + html -> psuh to layerProducts -> change back 
        --product.quantity;
        quantityIndicator.innerText = product.quantity;
        pushLayerProducts(product, productIdentifier);
        product.quantity = defaultValue;
        console.log('1st script');
      }
      else {                                         // if layerProducts doesn't exist -> change value + html -> initiate layer and push to it -> change back 
        --product.quantity;
        quantityIndicator.innerText = product.quantity;
        initiateLayerProducts(product);
        product.quantity = defaultValue;
        console.log('2nd script');
      }
    }
    else {                                           // if product is from layerProducts -> change value    
      --product.quantity;
      quantityIndicator.innerText = product.quantity;
      console.log('3d script');
    }
  }

  // for debug
  console.log(layerProducts);
  console.log(defaultProducts);
}


export {addOne, removeOne}; */