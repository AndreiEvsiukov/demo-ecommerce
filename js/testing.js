import defaultProducts from "./data/product-data.js";
import productClass from "./data/product-class.js";



let tbody = document.querySelector('#cart tbody');

// while (!tbody.firstElementChild.hasAttribute('id')) {
//   console.log(tbody.firstChild);
// }

// TESTING DEEP CLONING 
// import productsDefault from "./data/product-data.js";

// const cloneProduct = (product) => {
//   let clone = JSON.parse(JSON.stringify(product));
//   return clone;
// }

// let productLayer = [JSON.parse(JSON.stringify(productsDefault[0]))];
// productLayer.push(cloneProduct(productsDefault[1]));

// productsDefault[0].name = 'apple x';

// console.log(productLayer);
// console.log(productsDefault);



// TESTING OBJECT EXISTENCE 
// const obj = [1, 'string'];

// const objCheck = () => {
//   if (typeof obj !== "undefined") {
//     console.log('obj exists');
//   } else {
//     console.log ('there is no object');
//   }
// };

// objCheck();


// TESTING RETURNING ARRAY 

// const apple1 = {
//   name: 'apple 1',
//   color: 'blue',
//   size: 's',
//   quantity: 1,
//   price: 20
// };

// const apple2 = {
//   name: 'apple 2',
//   color: 'blue',
//   size: 's',
//   quantity: 1,
//   price: 35
// };

// var layerProducts = [apple1, apple2];


// const productIdentifier = 'pear 1';


// let product = defaultProducts[3];


// console.log(defaultProducts);
// console.log(layerProducts);





// const whatTheProduct = (productIdentifier) => {
  // let object;

  // check if the product is already in the layerProducts
//   if (typeof layerProducts !== 'undefined') {
//     let object = findInLayerProducts();
    
//     let item = layerProducts.map(i => {
//       if (i.name === productIdentifier) {
//         return i;
//       } else return
//     });
//     console.log(item);
//     } 
//     else {
//       console.log('layerProducts is not defined');
//     };
  
//   console.log(object);
// };

// whatTheProduct(productIdentifier);
