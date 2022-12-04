import {Product, buttonsColor, buttonsQuanity, buttonsSize} from "./product.js";

/* set up default product arrays */
const apple1 = new Product(
  'apple1',
  'Apple 1',
  'blue',
  's',
  1,
  20,
  '/images/apple1.jpg',
  buttonsColor,
  buttonsSize,
  buttonsQuanity
);

const apple2 = new Product(
  'apple2',
  'Apple 2',
  'red',
  's',
  1,
  35,
  '/images/apple2.jpg',
  buttonsColor,
  buttonsSize,
  buttonsQuanity
);

const pear1 = new Product(
  'pear1',
  'Pear 1',
  'blue',
  's',
  1,
  29,
  'images/pear1.jpg',
  buttonsColor,
  buttonsSize,
  buttonsQuanity
);

const pear2 = new Product(
  'pear2',
  'Pear 2',
  'blue',
  's',
  1,
  49,
  'images/pear2.jpg',
  buttonsColor,
  buttonsSize,
  buttonsQuanity
);

const orange1 = new Product(
  'orange1',
  'Orange 1',
  'blue',
  's',
  1,
  19,
  'images/orange1.jpg',
  buttonsColor,
  buttonsSize,
  buttonsQuanity
);

const orange2 = new Product(
  'orange2',
  'Orange 2',
  'blue',
  's',
  1,
  30,
  'images/orange2.jpg',
  buttonsColor,
  buttonsSize,
  buttonsQuanity
);

const productsArr = [apple1, apple2, pear1, pear2, orange1, orange2];


export {productsArr};