/* Set a product class */
class productClass{
  constructor(
    name,
    color,
    size,
    quantity,
    price
  ) {
    this.name = name;
    this.color = color;
    this.size = size;
    this.quantity = quantity;
    this.price = price;
  }
}

/* set up default product arrays */
const apple1 = new productClass(
  'apple 1',
  'blue',
  's',
  1,
  20
);

const apple2 = new productClass(
  'apple 2',
  'blue',
  's',
  1,
  35
);

const pear1 = new productClass(
  'pear 1',
  'blue',
  's',
  1,
  29
);

const pear2 = new productClass(
  'pear 2',
  'blue',
  's',
  1,
  49
);

const orange1 = new productClass(
  'orange 1',
  'blue',
  's',
  1,
  19
);

const orange2 = new productClass(
  'orange 2',
  'blue',
  's',
  1,
  30
);

const defaultProducts = [apple1, apple2, pear1, pear2, orange1, orange2];


export {productClass, defaultProducts};