import {productClass, defaultProducts} from "../product-data/product-data.js";


import {initiateLayerProducts, pushLayerProducts, whatTheProduct} from '../p-cards-helpers.js';


// // // Color choice functionality

// callback to change color in window.layerProducts 
function changeColor (button) {

  // identify product from html
  let productIdentifier = button.closest('.card-body').firstElementChild.innerText.toLowerCase();


  // find product either from defaultProducts (if 1st time button is clicked), or from layerProducts (not 1st time) 
  let product = whatTheProduct(productIdentifier);

  
  // variables to make changes
  let buttonValue = button.innerText.toLowerCase();

  // make data changes
  if (product instanceof productClass) {            // if product is from defaultProducts:
    let defaultValue = product.color;

    if (typeof layerProducts !== 'undefined') {     // if layerProducts exists -> change value -> psuh to layerProducts -> change back 
      product.color = buttonValue;
      pushLayerProducts(product, productIdentifier);
      product.color = defaultValue;
    }
    else {
    product.color = buttonValue;                   // if doesn't -> change value -> initiate layer and push to it -> change back 
    initiateLayerProducts(product);
    product.color = defaultValue;
    }
  }
  else {                                           // if product from layerProducts: 
    product.color = buttonValue;                   // just change value 
  }


  // for debug
  console.log(layerProducts);
  console.log(defaultProducts);
}



export default changeColor;