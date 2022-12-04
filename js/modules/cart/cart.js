
class Cart {
  constructor(items) {

    // all products from local storage
    this.items = items;

    this.itemsSimple;
    this.itemsExtended;

    // view
    this.$containerSimples;
    this.$tableBodySimple;

  }


  // methods for simple cart
  createHtmlSimple () {
    return `<div class="p-2 text-center bg-light">Cart:</div>
    <table class="table table-bordered">
      <thead>
        <th scope="col">Item</th>
        <th scope="col">Quantity</th>
        <th scope="col">Price</th>
        <th scope="col"></th>
      </thead>
      <tbody>
      </tbody>

    </table> <!-- table -->

    <div class="mt-3" id="cart-buttons">
      <a href="checkout.html" class="btn btn-primary px-3">Checkout</a>
      <button type="button" class="btn btn-secondary px-3" id="clear-cart">Clear cart</button>
    </div>`;
  }

  createTbodyHtmlSimple (itemSimple) {
    return `<td>${itemSimple.name}</td>
    <td>${itemSimple.quantity}</td>
    <td>${itemSimple.price.toFixed(2)}</td>
    <td><button class="btn-close" aria-label="Close"></button></td>`;
  }

  renderSimpleCart () {
    // make container
    this.$containerSimple = document.createElement('div');
    this.$containerSimple.classList.add('col-3');
    this.$containerSimple.setAttribute('id', 'cart');

    // populate with html
    this.$containerSimple.innerHTML = this.createHtmlSimple();
    
    // prepare a new array from items for displaying
    this.itemsSimple = this.items.reduce( (accumulator, currentItem) => {
      if (accumulator.length == 0) {
        return [...accumulator, {name: currentItem.name, quantity: currentItem.quantity, price: currentItem.price}];
      } else {
        let res;
        let duplicate = accumulator.find(e => e.name == currentItem.name);
          duplicate == undefined
            ? (res = true)
            : (res = false);
        if (res) {
          return [...accumulator, {name: currentItem.name, quantity: currentItem.quantity, price: currentItem.price}];
        } else {
          duplicate.quantity += currentItem.quantity;
          duplicate.price += currentItem.price;
          return accumulator;
        }
      }
    },[] );


    // find el for append, make rows, append
    this.$tableBodySimple = this.$containerSimple.querySelector('tbody');

    this.itemsSimple.forEach((itemSimple) => {
      let rowEl = document.createElement('tr');
      rowEl.innerHTML = this.createTbodyHtmlSimple(itemSimple);
  
      let deleteBtnEl = rowEl.querySelector('button');
      deleteBtnEl.addEventListener('click', () => {
        console.log('deleteBtnEl clicked');
      });

      this.$tableBodySimple.append(rowEl);
    });

    console.log(this.$tableBodySimple);
  }

}


function populateCart() {

  let productsArr = [];

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let storageItem =JSON.parse(localStorage.getItem(key));
    let item = {
      id: storageItem.id,
      name: storageItem.name,
      color: storageItem.color,
      size: storageItem.size,
      quantity: storageItem.quantity,
      price: storageItem.price
    }

    productsArr.push(item);
  }

  return productsArr;
}


export {Cart, populateCart};