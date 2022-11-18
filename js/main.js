import changeColor from './modules/p-customisation/color-choice.js';
import changeSize from './modules/p-customisation/size-choice.js';
import {addOne, removeOne} from './modules/p-customisation/quantity-choice.js';
import {addToCart, removeFromCart, clearCart} from './modules/add-remove-clear-cart.js';

import displayCart from './modules/cart-simple.js';



// // // Color choice functionality

// color choice event istener
const colorButtons = document.querySelectorAll('#color-choice label');

colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    changeColor(button);
  });
});



// // // Size choice functionality

// size choice event istener
const sizeButtons = document.querySelectorAll('#size-choice label');

sizeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    changeSize(button);
  });
});




// // // Changing quantity functionality

// change quantity event isteners
const addOneButtons = document.querySelectorAll('#quantity-choice #quantity-up');

addOneButtons.forEach((button) => {
  button.addEventListener('click', () => {
    addOne(button);
  });
});


const removeOneButtons = document.querySelectorAll('#quantity-choice #quantity-down');

removeOneButtons.forEach((button) => {
  button.addEventListener('click', () => {
    removeOne(button);
  });
});




// // // cart functionality

// add to || remove from cart event isteners

const addToCartButtons = document.querySelectorAll('#cart-actions-product #add-to-cart');

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    addToCart(button);
  });
});

const removeFromCartButtons = document.querySelectorAll('#cart-actions-product #remove-from-cart');

removeFromCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    removeFromCart(button);
  });
});



// clear cart event listener

const clearCartButton = document.querySelector('#cart-buttons #clear-cart');

clearCartButton.addEventListener('click', clearCart);



// // //  default functions that should be run 

// to update cart from page to page and display default 'total 0' 
displayCart();

