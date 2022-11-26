import { defaultProducts } from './modules/product-data/product-data.js';
import {btnsClass, btnsColor, btnsSize, btnsQuantity} from './modules/product-data/button-data.js';

import changeColor from './modules/p-customisation/color-choice.js';
import changeSize from './modules/p-customisation/size-choice.js';
import {addOne, removeOne} from './modules/p-customisation/quantity-choice.js';
import {addToCart, removeFromCart, clearCart} from './modules/add-remove-clear-cart.js';

import displayCart from './modules/cart-simple.js';



// const createColorChoiceHtml = (buttonParams, product) => {
//   return `<div class="mb-3" id="color-choice">
//     <div class="card-text">Colors:</div>
//     <input type="radio" class="btn-check" name="color-button-options-${product.id}" id="color-button-blue-${product.id}" autocomplete="off" checked>
//     <label class="btn btn-outline-primary" for="color-button-blue-${product.id}">Blue</label>
                      
//     <input type="radio" class="btn-check" name="color-button-options-${product.id}" id="color-button-green-${product.id}" autocomplete="off">
//     <label class="btn btn-outline-success" for="color-button-green-${product.id}">Green</label>

//     <input type="radio" class="btn-check" name="color-button-options-${product.id}" id="color-button-red-${product.id}" autocomplete="off">
//     <label class="btn btn-outline-danger" for="color-button-red-${product.id}">Red</label>
//   </div>`
// };


const createHtml = (product) => {

  return `<!-- product 1 - ${product.name} -->
  <div class="card shadow-sm">
    <a class="mx-auto" href="/product-pages/${product.id}.html">  
      <img src=${product.imageHref} width="200" height="200">
    </a>

    <div class="card-body">
      <h1 class="mb-4 display-6">${product.name}</h1>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

      <!-- colour choice -->
      <div class='mb-4' id='color-choice'></div>

      <!-- size choice -->
      <div class='mb-4' id='size-choice'></div>

      <!-- quantity choice -->
      <div class='mb-4' id='quantity-choice'></div>


      <!-- price -->
      <div class="mb-1" id="product-price">
        <div class="card-text">Price</div>
        <span class="card-text" id="price-text">${product.price.toFixed(2)}</span>
        <span class="card-text" id="price-currency">€</span>
      </div>

      <!-- add to cart / remove -->
      <div id="cart-actions-product">
        <button type="button" class="btn btn-primary mt-4 me-2 px-3" id="add-to-cart">Add to cart</button>
        <button type="button" class="btn btn-secondary mt-4 px-3" id="remove-from-cart">Remove</button>
      </div>
    
    </div> <!-- card body -->
  </div> <!-- card -->`;
  
};


// <!-- colour choice -->
// <div class="mb-3" id="color-choice">
//   <div class="card-text">Colors:</div>
  // <input type="radio" class="btn-check" name="color-button-options-${product.id}" id="color-button-blue-${product.id}" autocomplete="off" checked>
  // <label class="btn btn-outline-primary" for="color-button-blue-${product.id}">Blue</label>
                    
//   <input type="radio" class="btn-check" name="color-button-options-${product.id}" id="color-button-green-${product.id}" autocomplete="off">
//   <label class="btn btn-outline-success" for="color-button-green-${product.id}">Green</label>

//   <input type="radio" class="btn-check" name="color-button-options-${product.id}" id="color-button-red-${product.id}" autocomplete="off">
//   <label class="btn btn-outline-danger" for="color-button-red-${product.id}">Red</label>
// </div>


const createColorBtnsHtml = (i, color, bootColor, productId) => {
  let checked;

  if (i == 0) {
    checked = 'checked';
  }
  
  let h = `<input type="radio" class="btn-check" name="color-button-options-${productId}" id="color-button-${color}-${productId}" autocomplete="off" ${checked}>
  <label class="btn btn-outline-${bootColor}" for="color-button-${color}-${productId}">${color.charAt(0).toUpperCase() + color.slice(1)}</label>`  
    
  return h;
};


// <!-- size choice -->
// <div class="mb-3" id="size-choice">
//   <div class="card-text" >Sizes:</div>
//   <input type="radio" class="btn-check" name="size-button-options-${product.id}" id="size-button-s-${product.id}" autocomplete="off" checked>
//   <label class="btn btn-outline-secondary" for="size-button-s-${product.id}">S</label>
  
//   <input type="radio" class="btn-check" name="size-button-options-${product.id}" id="size-button-m-${product.id}" autocomplete="off">
//   <label class="btn btn-outline-secondary" for="size-button-m-${product.id}">M</label>

//   <input type="radio" class="btn-check" name="size-button-options-${product.id}" id="size-button-l-${product.id}" autocomplete="off">
//   <label class="btn btn-outline-secondary" for="size-button-l-${product.id}">L</label>
// </div>


const createSizeBtnsHtml = (i, size, bootColor, productId) => {
  let checked;

  if (i == 0) {
    checked = 'checked';
  }
  
  let h = `<input type="radio" class="btn-check" name="size-button-options-${productId}" id="size-button-${size}-${productId}" autocomplete="off" ${checked}>
  <label class="btn btn-outline-${bootColor}" for="size-button-${size}-${productId}">${size.toUpperCase()}</label>`  
    
  return h;
};


// <!-- quantity choice -->
// <div class="mb-3" id="quantity-choice">
//   <div class="card-text" >Quantity:</div>
//   <input type="button" class="btn border m-1" name="quantity-up-${product.id}" id="quantity-up" value="+">
//   <input type="button" class="btn border m-1" name="quantity-down-${product.id}" id="quantity-down" value="-">
//   <span class="ms-2 badge bg-secondary" id="quantity-indicator">1</span>
// </div>


// const createQuantityBtnsHtml = (i, change, bootColor, productId, productQ) => {
  
//   let checked;
//   if (i == 0) {
//     checked = 'checked';
//   }

//   let h = `<div class="card-text">Quantity:</div>
//         <input type="button" class="btn border m-1" name="quantity-up-${product.id}" id="quantity-up" value="+">
//         <input type="button" class="btn border m-1" name="quantity-down-${product.id}" id="quantity-down" value="-">
//         <span class="ms-2 badge bg-${bootColor}" id="quantity-indicator">1</span>`
    
//   return h;
// };




const productArrHtml = defaultProducts.map((product) => {

  return ((prod) => {

    // top level product card Html
    const productCardHtml = document.createElement('div');
    productCardHtml.classList.add('col');


    let Htmlstring = createHtml({
      name: prod.name,
      id: prod.id,
      imageHref: prod.imageHref,
      price: prod.price
    });

    productCardHtml.innerHTML = Htmlstring;


    // // // color buttons

    const colorBtnsContainer = productCardHtml.querySelector('#color-choice');

    // ((prd, btns) => {
      for (let i = 0; i < btnsColor.properties.data.length; i++) {
        
        // creating button
        let color = btnsColor.properties.data[i];
        let bootColor = btnsColor.properties.bootColors[i];
        
        let btnHtml = document.createElement('span');
        btnHtml.innerHTML = createColorBtnsHtml(i, color, bootColor, prod.id);
        
        
        // adding functionaliry
        
        let labelHtml = btnHtml.querySelector('label');

        labelHtml.addEventListener('click', (color) => {
          prod.changeColor(color);
          
          // debug
          console.log(defaultProducts);
        })
        

        // return result to upper level
        colorBtnsContainer.append(btnHtml);
      }
    // })(prod, btnsColor);



    // // // size buttons

    const sizeBtnsContainer = productCardHtml.querySelector('#size-choice');

    for (let i = 0; i < btnsSize.properties.data.length; i++) {
        
      // creating button
      let size = btnsSize.properties.data[i];
      let bootColor = btnsSize.properties.bootColors[0];
      
      let btnHtml = document.createElement('span');
      btnHtml.innerHTML = createSizeBtnsHtml(i, size, bootColor, prod.id);
      
      
      // adding functionaliry
      
      let labelHtml = btnHtml.querySelector('label');
      let priceHtml = productCardHtml.querySelector('#price-text');

      labelHtml.addEventListener('click', (size, priceHtml) => {
        prod.changeSize(size, priceHtml);

        // debug
        console.log(defaultProducts);
      })
      

      // return result to upper level
      sizeBtnsContainer.append(btnHtml);
    }


/*     // // // quantity buttons

    const quantityBtnsContainer = productCardHtml.querySelector('#quantity-choice');

    for (let i = 0; i < btnsQuantity.properties.data.length; i++) {
        
      // creating button
      let change = btnsQuantity.properties.data[i];
      let bootColor = btnsQuantity.properties.bootColors[0];
      
      let btnHtml = document.createElement('span');
      btnHtml.innerHTML = createSizeBtnsHtml(i, size, bootColor, prod.id);
      
      
      // adding functionaliry
      
      let labelHtml = btnHtml.querySelector('label');

      labelHtml.addEventListener('click', () => {
        prod.changeSize(size);
        console.log(defaultProducts);
      })
      

      // return result to upper level
      sizeBtnsContainer.append(btnHtml);
    } */
    
    
  
    return productCardHtml;
  })(product);

});

let contentContainer = document.querySelector('#card-container');

productArrHtml.forEach((productHtml) => {
  contentContainer.append(productHtml)
});








// // // Color choice functionality

// color choice event istener
/* const colorButtons = document.querySelectorAll('#color-choice label');

colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    changeColor(button);
  });
}); */



// // // Size choice functionality

// size choice event istener
/* const sizeButtons = document.querySelectorAll('#size-choice label');

sizeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    changeSize(button);
  });
}); */




// // // Changing quantity functionality

// change quantity event isteners
/* const addOneButtons = document.querySelectorAll('#quantity-choice #quantity-up');

addOneButtons.forEach((button) => {
  button.addEventListener('click', () => {
    addOne(button);
  });
}); */


/* const removeOneButtons = document.querySelectorAll('#quantity-choice #quantity-down');

removeOneButtons.forEach((button) => {
  button.addEventListener('click', () => {
    removeOne(button);
  });
});
 */



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

