
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

const apple1 = {
  name: 'apple 1',
  color: 'blue',
  size: 's',
  quantity: 1,
  price: 20
};

const apple2 = {
  name: 'apple 2',
  color: 'blue',
  size: 's',
  quantity: 1,
  price: 35
};

var layerProducts = [apple1, apple2];


const productIdentifier = 'apple 2';


const finddefaultProductsArray = (arrayIdentifier, itemOrAttribute, arrayAttribute) => {

  if (itemOrAttribute) {
    let item = layerProducts.find(e => e.name === arrayIdentifier);
    return item;
  } else {
    let attribute = layerProducts.find(e => e.name === arrayIdentifier)[arrayAttribute];
    return attribute;
  }

};

const findDefaultProduct = (productIdentifier) => {
  let object;

  switch (true) {
    case productIdentifier === 'apple 1' :
      object = finddefaultProductsArray('apple 1', 1); // try to change apple 1 - string to productIdentifier
      break;
    case productIdentifier === 'apple 2' :
      object = finddefaultProductsArray('apple 2', 1);
      break;
    case productIdentifier === 'pear 1' :
      object = finddefaultProductsArray('pear 1', 1);
      break;
    case productIdentifier === 'pear 2' :
      object = finddefaultProductsArray('pear 2', 1);
      break;
    case productIdentifier === 'orange 1' :
      object = finddefaultProductsArray('orange 1', 1);
      break;
    case productIdentifier === 'orange 2' :
      object = finddefaultProductsArray('orange 2', 1);
      break;
    default:
      console.log('match is not found');
    }

  return object;
}


console.log(findDefaultProduct(productIdentifier));





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
