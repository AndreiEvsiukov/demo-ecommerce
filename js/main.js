import { productsArr } from './modules/product/product-data.js';
import { cart } from './modules/cart/cart.js';


function renderContent() {
  const path = window.location.pathname;
  const reIndex = new RegExp('\/index');
  const reProductPages = new RegExp('\/product-pages\/');

  // row from html documents
  const rowEl = document.querySelector('main .row');

  if (reIndex.test(path)) {

    // display products

    const col9El = document.createElement('div');
    col9El.classList.add('col-9')

    const productsRowEl = document.createElement('div');
    productsRowEl.classList.add('row', 'row-cols-md-1', 'row-cols-lg-2', 'row-cols-xl-3', 'g-3');

    col9El.append(productsRowEl);

    // const productsRowEl = col9El.querySelector('#card-container');

    productsArr.forEach((product) => {
      product.render(product.id);

      const colEl = document.createElement('div');
      colEl.classList.add('col');

      const cardEl = document.createElement('div');
      cardEl.classList.add('card', 'shadow-sm');

      colEl.append(cardEl);

      // product img
      const imgContainerEl = document.createElement('div');
      imgContainerEl.classList.add('mx-auto', 'mt-3');
      imgContainerEl.innerHTML = `<a class="mx-auto" href="/product-pages/${product.id}.html">${product.$imgStr}</a>`

      cardEl.append(imgContainerEl);

      // card body
      const cardBodyEl = document.createElement('div');
      cardBodyEl.classList.add('card-body');

      cardBodyEl.append(product.$heading, product.$colorBtns, product.$sizeBtns, product.$quantityBtns, product.$price, product.$cartActionBtns);

      cardEl.append(cardBodyEl);


      productsRowEl.append(colEl);
    });

    rowEl.append(col9El);

    // display cart

    rowEl.append(cart.$containerSimple);

  }
  else if (reProductPages.test(path)) {


    let $imgLink = document.createElement('a');
    $imgLink.innerHTML = `<a class="mx-auto" href="/product-pages/.html">`;

    console.log($imgLink);
  }

}

renderContent();


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

