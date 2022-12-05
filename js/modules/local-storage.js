// local storage functions 
import {cart} from './cart/cart.js';

const addLocalStorage = (productId, params) => {

  // if item doesn't exist already - just add
  if (!localStorage.getItem(productId)) {
    localStorage.setItem(productId, params);

  // if exists - make updates to the item to push - and then add
  } else {
    let storageItem = JSON.parse(localStorage.getItem(productId));
    let itemToAdd = JSON.parse(params);

    storageItem.quantity += itemToAdd.quantity;
    storageItem.price += itemToAdd.price;

    localStorage.setItem(productId, JSON.stringify(storageItem));
  }

  // update cart (data and page html)
  cart.updateCart();
};

const removeLocalStorage = (productId) => {

  // if exists
  if (localStorage.length > 0) {

    // define a pattern
    let re = new RegExp(`${productId}`);

    // loop through all items and delete all matches
    for (let i = localStorage.length; i--;) {
      let key = localStorage.key(i);

      if (re.test(key)) {
        localStorage.removeItem(key);
      }
    }
  }
};

const clearLocalStorage = () => {
  for (let i = localStorage.length; i--;) {
    let key = localStorage.key(i);
    localStorage.removeItem(key);
  }
};


export {addLocalStorage, removeLocalStorage, clearLocalStorage};