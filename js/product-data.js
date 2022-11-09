
/* Set a product class */
class product{
  constructor(
    name,
    color,
    size,
    quantity
  ) {
    this.name = name;
    this.color = color;
    this.size = size;
    this.quantity = quantity;
  }
}


/* set up default product arrays */
const apple1 = new product(
  'apple 1',
  'blue',
  's',
  1
);

const apple2 = new product(
  'apple 2',
  'blue',
  's',
  1
);

const pear1 = new product(
  'pear 1',
  'blue',
  's',
  1
);

const pear2 = new product(
  'pear 2',
  'blue',
  's',
  1
);

const orange1 = new product(
  'orange 1',
  'blue',
  's',
  1
);

const orange2 = new product(
  'orange 2',
  'blue',
  's',
  1
);

const products = [apple1, apple2, pear1, pear2, orange1, orange2];

export default products;