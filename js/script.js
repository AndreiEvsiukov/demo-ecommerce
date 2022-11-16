import defaultProducts from "./data/product-data.js";
import productClass from "./data/product-class.js";



/* Helper to find requierd array item or it's child

first param: identifier - attribute to find a required item (name)
one before last param (string): a string to identify needed array item attribute 
last param (boolean): true - array item, false - array item attribute   */

const findDefaultProductsArray = (arrayIdentifier, itemOrAttribute, arrayAttribute) => {

  if (itemOrAttribute) {
    let item = defaultProducts.find(e => e.name === arrayIdentifier);
    return item;
  } else {
    let attribute = defaultProducts.find(e => e.name === arrayIdentifier)[arrayAttribute];
    return attribute;
  }

};

// helper for finding default product in defaultProducs array 
const findDefaultProduct = (productIdentifier) => {
  let object;

  switch (true) {
    case productIdentifier === 'apple 1' :
      object = findDefaultProductsArray(productIdentifier, 1); // try to change apple 1 - string to productIdentifier
      break;
    case productIdentifier === 'apple 2' :
      object = findDefaultProductsArray(productIdentifier, 1);
      break;
    case productIdentifier === 'pear 1' :
      object = findDefaultProductsArray(productIdentifier, 1);
      break;
    case productIdentifier === 'pear 2' :
      object = findDefaultProductsArray(productIdentifier, 1);
      break;
    case productIdentifier === 'orange 1' :
      object = findDefaultProductsArray(productIdentifier, 1);
      break;
    case productIdentifier === 'orange 2' :
      object = findDefaultProductsArray(productIdentifier, 1);
      break;
    default:
      console.log('match is not found');
    }

  return object;
}


// helper to increase price according to size

const findCangeCoefficient = (buttonValue) => {
  let coefficientNumber;

  switch (true) {
    case buttonValue === 's' :
      coefficientNumber = 1;
      break;
    case buttonValue === 'm' :
      coefficientNumber = 1.5;
      break;
    case buttonValue === 'l' :
      coefficientNumber = 2;
      break;
    default :
      console.log('match is not found');
  };

  return coefficientNumber;
};



// Helpers for window.layerProducts 

const initiateLayerProducts = (product) => {
  window.layerProducts = [];;
  layerProducts.push(JSON.parse(JSON.stringify(product)));
}

const checkForLayerProduct = (productIdentifier) => {
  let result = false;

  layerProducts.forEach(i => {
    if (i.name === productIdentifier) {
      result = true;
    } 
  });

  return result;
};

const findLayerProduct = (productIdentifier) => {
  let result = false;

  layerProducts.forEach(i => {
    if (i.name === productIdentifier) {
      result = i;
    } 
  });

  return result;
};

const pushLayerProducts = (product, productIdentifier) => {
  if (checkForLayerProduct(productIdentifier)) {
    let index = layerProducts.findIndex(i => i.name === productIdentifier);
    layerProducts[index] = JSON.parse(JSON.stringify(product));
  }
  else {
    layerProducts.push(JSON.parse(JSON.stringify(product)));
  }
};



// Helper to find requierd product either in defaultProducts or layerProducts

const whatTheProduct = (productIdentifier) => {
  let object;

  if (typeof layerProducts !== 'undefined') {                   // if layerProduct exists:
    if (checkForLayerProduct(productIdentifier)) {                // if this product is present in layerProducts: 
      object = findLayerProduct(productIdentifier);               // take the product from layerProducts
    }
    else {                                                        // if this product is not present in layerProducts: 
      object = findDefaultProduct(productIdentifier);             // take the product from default
    }
  }
  else {                                                        // if layerProduct doesn't exists:
    object = findDefaultProduct(productIdentifier);               // take the product from default
  }

  return object;
};



// callback for displaying cart

const displayCart = () => {

  let tbody = document.querySelector('#cart tbody');

  while (tbody.firstChild) {                             // clear cart
    tbody.removeChild(tbody.firstChild);
  }

  const totalPriceArr = [];                              // for calculating total price

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let item = JSON.parse(localStorage.getItem(key));

    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdQuantity = document.createElement('td');
    let tdPrice = document.createElement('td');

    tdName.innerText = item.name;
    tdQuantity.innerText = item.quantity;
    tdPrice.innerText = `${(item.quantity * item.price).toFixed(2)} €`;

    tr.append(tdName, tdQuantity, tdPrice);
    tbody.append(tr);                                    // finished displaying one product type 

    totalPriceArr.push(item.price * item.quantity);      // for calculating total price 
  }

  
  let totalPrice;                                        // calculating total price 
  if (totalPriceArr.length > 0) {
    totalPrice = totalPriceArr.reduce(
      (sum, previousValue) => sum += previousValue
    );
  } else {
    totalPrice = 0;
  }

  let trTotal = document.createElement('tr');            // displaying total
  let thTotal = document.createElement('th');
  let tdTotal = document.createElement('td');

  trTotal.append(thTotal, tdTotal);

  trTotal.setAttribute('id', 'table-total');
  tdTotal.setAttribute('colspan', 2);
  tdTotal.classList.add('table-active');

  thTotal.innerText = 'Total';
  tdTotal.innerText = `${totalPrice.toFixed(2)} €`;

  tbody.append(trTotal);
};


// local storage functions 

const addLocalStorage = (productIdentifier, product) => {
  localStorage.setItem(productIdentifier, JSON.stringify(product));
};

const removeLocalStorage = (productIdentifier) => {
  if (localStorage.length > 0) {
    localStorage.removeItem(productIdentifier);
  };
};

const clearLocalStorage = () => {
  for (let i = 0; i < localStorage.length;) {
    let key = localStorage.key(i);
    localStorage.removeItem(key);
  }
};





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

// color choice event istener
const colorButtons = document.querySelectorAll('#color-choice label');

colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    changeColor(button);
  });
});




// // // Size choice functionality

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

// size choice event istener
const sizeButtons = document.querySelectorAll('#size-choice label');

sizeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    changeSize(button);
  });
});




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



// clear cart callback 
const clearCart = () => {
  clearLocalStorage();

  displayCart();
};

// clear cart event listener

const clearCartButton = document.querySelector('#cart-buttons #clear-cart');

clearCartButton.addEventListener('click', clearCart);




// // //  default functions that should be run 

// to update cart from page to page and display default 'total 0' 
displayCart();