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
  if (localStorage.length > 0) {
    localStorage.removeItem(productId);
  };
};

const clearLocalStorage = () => {
  for (let i = 0; i < localStorage.length;) {
    let key = localStorage.key(i);
    localStorage.removeItem(key);
  }
};


export {addLocalStorage, removeLocalStorage, clearLocalStorage};