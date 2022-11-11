import products from "./data/product-data.js";
import productClass from "./data/product-class.js";


// // // Helpers


// Helper to find requierd array item or it's child
// 
// first param: identifier - attribute to find a required item (name)
// one before last param (string): a string to identify needed array item attribute 
// last param (boolean): true - array item, false - array item attribute  

const findProductsArray = (arrayIdentifier, itemOrAttribute, arrayAttribute) => {

  if (itemOrAttribute) {
    let item = products.find(e => e.name === arrayIdentifier);
    return item;
  } else {
    let attribute = products.find(e => e.name === arrayIdentifier)[arrayAttribute];
    return attribute;
  }

};


// Helper to find requierd product array

const whatTheProduct = (productIdentifier) => {
  let foundArray;

   switch (true) {
    case productIdentifier === 'apple 1' :
      foundArray = findProductsArray('apple 1', 1);
      break;
    case productIdentifier === 'apple 2' :
      foundArray = findProductsArray('apple 2', 1);
      break;
    case productIdentifier === 'pear 1' :
      foundArray = findProductsArray('pear 1', 1);
      break;
    case productIdentifier === 'pear 2' :
      foundArray = findProductsArray('pear 2', 1);
      break;
    case productIdentifier === 'orange 1' :
      foundArray = findProductsArray('orange 1', 1);
      break;
    case productIdentifier === 'orange 2' :
      foundArray = findProductsArray('orange 2', 1);
      break;
    default:
      console.log('match is not found');
   };

  return foundArray;
};


// Helper to increase price for size and quantity

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





// // // // // Event listeners - product cards functionality


// // // Color choice functionality

// callback to change color in a product's array
function changeColor (button) {

  // looking for correct product in the product array
  let cardBody = button.parentElement.parentElement;
  let productIdentifier = cardBody.querySelector('h1').innerText.toLowerCase();
  let product = whatTheProduct(productIdentifier);

  // record previous value, make change, populate storage, remove change
  let defaultColor = product.color;

  let buttonValue = button.innerText.toLowerCase();
  product.color = buttonValue;

  let productJsn = JSON.stringify(product);
  localStorage.setItem(productIdentifier, productJsn);

  product.color = defaultColor;

  console.log(localStorage);
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
  
  // looking for correct product in the product array
  let cardBody = button.parentElement.parentElement;
  let productIdentifier = cardBody.querySelector('h1').innerText.toLowerCase();
  let product = whatTheProduct(productIdentifier);

  // record default values
  let defaultSize = product.size;
  let defaultPrice = product.price;

  // make change to size
  let buttonValue = button.innerText.toLowerCase();
  product.size = buttonValue;

  // make change to price 
  let coefficientNumber = findCangeCoefficient(buttonValue);
  product.price *= coefficientNumber;

  let priceElement = cardBody.querySelector('#price-text');
  priceElement.innerText = product.price.toFixed(2);

  // write changes to storage
  let productJsn = JSON.stringify(product);
  localStorage.setItem(productIdentifier, productJsn);

  // back to default values
  product.size = defaultSize;
  product.price = defaultPrice;
  
  console.log(products);
  console.log(localStorage);
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
  let cardBody = button.parentElement.parentElement;
  let productIdentifier = cardBody.querySelector('h1').innerText.toLowerCase();

  let product = whatTheProduct(productIdentifier);

  ++product.quantity

  let quantityIndicator = button.parentElement.querySelector('span');
  quantityIndicator.innerText = product.quantity;

  console.log(products);
}

function removeOne (button) {
  let cardBody = button.parentElement.parentElement;
  let productIdentifier = cardBody.querySelector('h1').innerText.toLowerCase();

  let product = whatTheProduct(productIdentifier);
  
  if (product.quantity > 0) {
    --product.quantity;

    let quantityIndicator = button.parentElement.querySelector('span');
    quantityIndicator.innerText = product.quantity;
  };

  console.log(products);
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

