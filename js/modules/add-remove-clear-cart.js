import { whatTheProduct } from './p-cards-helpers.js';

import {addLocalStorage, removeLocalStorage, clearLocalStorage} from './local-storage.js';

import displayCart from './cart-simple.js';


// add to cart callBack
const addToCart = (button) => {
  // identify product from html
  let productIdentifier = button.closest('.card-body').firstElementChild.innerText.toLowerCase();

  // find product either from defaultProducts (if 1st time button is clicked), or from layerProducts (not 1st time) 
  let product = whatTheProduct(productIdentifier);

  addLocalStorage(productIdentifier, product);

  displayCart();

  console.log(localStorage);
};


// remove from cart callBack
const removeFromCart = (button) => {
  if (localStorage.length > 0) {              // run if only the storage has already been populated

    let productIdentifier = button.closest('.card-body').firstElementChild.innerText.toLowerCase();

    removeLocalStorage(productIdentifier);

    displayCart();

    console.log(localStorage);
  }
};


// clear cart callback 
const clearCart = () => {
  clearLocalStorage();

  displayCart();
};



export {addToCart, removeFromCart, clearCart};