/* Set a product class */
class productClass{
  constructor(
    id,
    name,
    color,
    size,
    quantity,
    price,
    imageHref
  ) {
    this.id = id;
    this.name = name;
    this.color = color;

    this.size = size;
    this.sizeCoef = {
      s: 1,
      m: 1.5,
      l: 2
    };

    this.quantity = quantity;
    this.price = price;
    this.imageHref = imageHref;
  }

  changeColor(newColor) {
    this.color = newColor;
  }

  changeSize(newSize, priceHtml) {
    this.size = newSize;
    this.price *= this.sizeCoef[newSize];

    console.log(priceHtml);/* .innerText = this.price.toFixed(2); */
  }
}


/* set up default product arrays */
const apple1 = new productClass(
  'apple1',
  'Apple 1',
  'blue',
  's',
  1,
  20,
  '/images/apple1.jpg'
);

const apple2 = new productClass(
  'apple2',
  'Apple 2',
  'red',
  's',
  1,
  35,
  '/images/apple2.jpg'
);

const pear1 = new productClass(
  'pear1',
  'Pear 1',
  'blue',
  's',
  1,
  29,
  'images/pear1.jpg'
);

const pear2 = new productClass(
  'pear2',
  'Pear 2',
  'blue',
  's',
  1,
  49,
  'images/pear2.jpg'
);

const orange1 = new productClass(
  'orange1',
  'Orange 1',
  'blue',
  's',
  1,
  19,
  'images/orange1.jpg'
);

const orange2 = new productClass(
  'orange2',
  'Orange 2',
  'blue',
  's',
  1,
  30,
  'images/orange2.jpg'
);

const defaultProducts = [apple1, apple2, pear1, pear2, orange1, orange2];


export {productClass, defaultProducts};