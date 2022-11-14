import defaultProducts from "./data/product-data.js";
import productClass from "./data/product-class.js";




// // // Helpers


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



// Product layer
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



// Helper to find requierd product array

const whatTheProduct = (productIdentifier) => {
  let foundArray;

  // check if the product is already in the layerProducts
  if (typeof layerProducts !== 'undefined') {
    if (checkForLayerProduct(productIdentifier)) {
      foundArray = findLayerProduct(productIdentifier);
    }
    else {
      foundArray = findDefaultProduct(productIdentifier);
    }
  }
  else {
    foundArray = findDefaultProduct(productIdentifier);
  }

  return foundArray;
};





// // // // // Event listeners - product cards functionality


// // // Color choice functionality

// callback to change color in a product's array
function changeColor (button) {

  // looking for correct product form defaultProducts or layerProducts
  let cardBody = button.parentElement.parentElement;
  let productIdentifier = cardBody.querySelector('h1').innerText.toLowerCase();

  // find product either from defaultProducts (if 1st time button is clicked), or from layerProducts (not 1st time) 
  let product = whatTheProduct(productIdentifier);

  // make the change based on conditions
  let buttonValue = button.innerText.toLowerCase();

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
  
  console.log(defaultProducts);
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

  console.log(defaultProducts);
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

