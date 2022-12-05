import { productsArr } from './modules/product/product-data.js';
import { cart } from './modules/cart/cart.js';

const clearLocalStorage = () => {
  for (let i = 0; i < localStorage.length;) {
    let key = localStorage.key(i);
    localStorage.removeItem(key);
  }
};

// clearLocalStorage();


// find row to append cols

const rowEl = document.querySelector('main .row');

// display products

const col9El = document.createElement('div');
col9El.classList.add('col-9')

const productsRowEl = document.createElement('div');
productsRowEl.classList.add('row', 'row-cols-md-1', 'row-cols-lg-2', 'row-cols-xl-3', 'g-3');

col9El.append(productsRowEl);

// const productsRowEl = col9El.querySelector('#card-container');

productsArr.forEach((product) => {
  
  product.render(product.id);

  productsRowEl.append(product.$container);
});

rowEl.append(col9El);

// display cart

rowEl.append(cart.$containerSimple);




// // // cart functionality

// add to || remove from cart event isteners

/* const addToCartButtons = document.querySelectorAll('#cart-actions-product #add-to-cart');

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    addToCart(button);
  });
}); */

/* const removeFromCartButtons = document.querySelectorAll('#cart-actions-product #remove-from-cart');

removeFromCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    removeFromCart(button);
  });
}); */



// clear cart event listener

/* const clearCartButton = document.querySelector('#cart-buttons #clear-cart');

clearCartButton.addEventListener('click', clearCart); */



// // //  default functions that should be run 

// to update cart from page to page and display default 'total 0' 
/* displayCart(); */

