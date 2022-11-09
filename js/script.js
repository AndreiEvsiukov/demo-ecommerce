import products from "./product-data.js";

/* Set a product class */

// class product{
//   constructor(
//     name,
//     color,
//     size,
//     quantity
//   ) {
//     this.name = name;
//     this.color = color;
//     this.size = size;
//     this.quantity = quantity;
//   }
// }


/* set up default products and array */
// const apple1 = new product(
//   'apple 1',
//   'blue',
//   's',
//   1
// );

// const apple2 = new product(
//   'apple 2',
//   'blue',
//   's',
//   1
// );

// const pear1 = new product(
//   'pear 1',
//   'blue',
//   's',
//   1
// );

// const pear2 = new product(
//   'pear 2',
//   'blue',
//   's',
//   1
// );

// const orange1 = new product(
//   'orange 1',
//   'blue',
//   's',
//   1
// );

// const orange2 = new product(
//   'orange 2',
//   'blue',
//   's',
//   1
// );

// const products = [apple1, apple2, pear1, pear2, orange1, orange2]

function func () {
  let a = products;
  console.log(a);
}

func();


/* Helpers */

// Helper to find product array
const whatTheProduct = (h1) => {
  let foundArray;

   switch (true) {
    case h1 === products.find(e => e.name === 'apple 1').name :
      foundArray = products.find(e => e.name === 'apple 1');
      break;
    case h1 === products.find(e => e.name === 'apple 2').name :
      foundArray = products.find(e => e.name === 'apple 2');
      break;
    case h1 === products.find(e => e.name === 'pear 1').name :
      foundArray = products.find(e => e.name === 'pear 1');
      break;
    case h1 === products.find(e => e.name === 'pear 2').name :
      foundArray = products.find(e => e.name === 'pear 2');
      break;
    case h1 === products.find(e => e.name === 'orange 1').name :
      foundArray = products.find(e => e.name === 'orange 1');
      break;
    case h1 === products.find(e => e.name === 'orange 2').name:
      foundArray = products.find(e => e.name === 'orange 2');
      break;
    default:
      console.log('match is not found')
   };

   return foundArray;
};





/* Color choice functionality */

// callback to change color in a product's array
function changeColor (button) {
  let cardBody = button.parentElement.parentElement;

  let h1 = cardBody.querySelector('h1').innerText.toLowerCase();

  let foundProduct = whatTheProduct(h1);

  let buttonValue = button.innerText.toLowerCase();
  foundProduct.color = buttonValue;
  console.log(products);
}

// color choice event istener
const colorButtons = document.querySelectorAll('#color-choice label');

colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    changeColor(button);
  });
});




/* Size choice functionality */

// callback to change size in a product's array
function changeSize (button) {
  let cardBody = button.parentElement.parentElement;

  let h1 = cardBody.querySelector('h1').innerText.toLowerCase();

  let foundProduct = whatTheProduct(h1);

  let buttonValue = button.innerText.toLowerCase();
  foundProduct.size = buttonValue;
  console.log(products);
}

// size choice event istener
const sizeButtons = document.querySelectorAll('#size-choice label');

sizeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    changeSize(button);
  });
});




/* Changing quantity functionality */

// callbacks to change quantity in a product's array 
function addOne (button) {
  let cardBody = button.parentElement.parentElement;
  let h1 = cardBody.querySelector('h1').innerText.toLowerCase();

  let foundProduct = whatTheProduct(h1);

  ++foundProduct.quantity
  let quantityIndicator = button.parentElement.querySelector('span');
  quantityIndicator.innerText = foundProduct.quantity;

  console.log(products);
}

function removeOne (button) {
  let cardBody = button.parentElement.parentElement;
  let h1 = cardBody.querySelector('h1').innerText.toLowerCase();

  let foundProduct = whatTheProduct(h1);
  
  if (foundProduct.quantity > 0) {
    --foundProduct.quantity;

    let quantityIndicator = button.parentElement.querySelector('span');
    quantityIndicator.innerText = foundProduct.quantity;
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