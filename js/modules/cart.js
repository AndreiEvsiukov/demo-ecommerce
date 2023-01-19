import {removeLocalStorage, clearLocalStorage} from './local-storage-functions.js';



class Cart {
  constructor(items) {

    // all products from local storage
    this.items = items;
    this.itemsSimple;

    // view
    this.$containerSimples;
    this.$tableBodySimple;

    this.$containerExtended;
    this.$tableBodyExtended;
  }

  // add items 
  populateCart() {

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let storageItem = JSON.parse(localStorage.getItem(key));
      let item = {
        id: storageItem.id,
        name: storageItem.name,
        color: storageItem.color,
        size: storageItem.size,
        quantity: storageItem.quantity,
        price: storageItem.price,
        isOnSale: storageItem.isOnSale
      }
  
      this.items.push(item);
    }

    console.log(this.items);
  
  }


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
      <a href="/checkout.html" class="btn btn-primary px-3">Checkout</a>
      <button type="button" class="btn btn-secondary px-3" id="clear-cart">Clear cart</button>
    </div>`;
  }

  createTbodyHtmlSimple (itemSimple) {
    return `<td>${itemSimple.name}</td>
    <td>${itemSimple.quantity}</td>
    <td>${itemSimple.price.toFixed(2)}</td>
    <td><button class="btn-close" aria-label="Close"></button></td>`;
  }


  createHtmlExtended () {
    return `<div class="p-2 text-center bg-light">Cart:</div>
    <table class="table table-bordered">
      <thead>
        <th scope="col">Item</th>
        <th scope="col">Color</th>
        <th scope="col">Size</th>
        <th scope="col">Quantity</th>
        <th scope="col">Price</th>
        <th scope="col"></th>
      </thead>
      <tbody>
      </tbody>

    </table> <!-- table -->

    <button type="button" class="btn btn-secondary px-3" id="clear-cart">Clear cart</button>`;
  }

  createTbodyHtmlExtended (item) {
    return `<td>${item.name}</td>
    <td>${item.color}</td>
    <td>${item.size}</td>
    <td>${item.quantity}</td>
    <td ${item.isOnSale ? 'class="text-danger"' : ''}>${item.price.toFixed(2)}</td>
    <td><button class="btn-close" aria-label="Close"></button></td>`;
  }


  // render for home and product pages
  renderRowsSimple () {

    // clear cart
    while (this.$tableBodySimple.firstChild) {
      this.$tableBodySimple.removeChild(this.$tableBodySimple.firstChild);
    }

    // prepare a new array from items for displaying
    this.itemsSimple = this.items.reduce( (accumulator, currentItem) => {
      if (accumulator.length == 0) {
        return [...accumulator, {id: currentItem.id, name: currentItem.name, quantity: currentItem.quantity, price: currentItem.price}];
      } else {
        let res;
        let duplicate = accumulator.find(e => e.id == currentItem.id);
          duplicate == undefined
            ? (res = true)
            : (res = false);
        if (res) {
          return [...accumulator, {id: currentItem.id, name: currentItem.name, quantity: currentItem.quantity, price: currentItem.price}];
        } else {
          duplicate.quantity += currentItem.quantity;
          duplicate.price += currentItem.price;
          return accumulator;
        }
      }
    },[] );


    // Make rows out of itemsSimple, append

    let totalPrice = 0;
    let totalQuantity = 0;

    this.itemsSimple.forEach((itemSimple) => {
      
      // add price to total price (for total row latter)
      totalPrice += itemSimple.price;
      totalQuantity +=itemSimple.quantity;

      let rowEl = document.createElement('tr');
      rowEl.innerHTML = this.createTbodyHtmlSimple(itemSimple);
  
      let deleteBtnEl = rowEl.querySelector('button');
      deleteBtnEl.addEventListener('click', () => {

        // delete from local storage
        removeLocalStorage('simp', itemSimple.id);

        // update cart data and rows
        this.updateCart('simp');
      });

      this.$tableBodySimple.append(rowEl);
    });

    // add total row
    let rowEl = document.createElement('tr');
    rowEl.classList.add('table-light');
    
    let tdTotalText = document.createElement('th');
    tdTotalText.setAttribute('scope', 'row');
    tdTotalText.innerText = 'Total';

    let tdTotalQuantity = document.createElement('td');
    tdTotalQuantity.innerText = totalQuantity;

    let tdTotalNumber = document.createElement('td');
    tdTotalNumber.innerText = totalPrice.toFixed(2);

    rowEl.append(tdTotalText, tdTotalQuantity, tdTotalNumber);

    this.$tableBodySimple.append(rowEl);
  }


  renderSimple () {
    // make container
    this.$containerSimple = document.createElement('div');
    this.$containerSimple.classList.add('col-3');
    this.$containerSimple.setAttribute('id', 'cart');

    // populate with html
    this.$containerSimple.innerHTML = this.createHtmlSimple();
    this.$tableBodySimple = this.$containerSimple.querySelector('tbody');

    // clear cart button functionality
    let buttonEl = this.$containerSimple.querySelector('#clear-cart');
    buttonEl.addEventListener('click', () => {
      clearLocalStorage();

      this.updateCart('simp');
    })

    this.renderRowsSimple();
  }



  // render for checkout
  renderRowsExtended () {

    // clear cart
    while (this.$tableBodyExtended.firstChild) {
      this.$tableBodyExtended.removeChild(this.$tableBodyExtended.firstChild);
    }


    // Make rows out of items, append

    let totalPrice = 0;
    let totalQuantity = 0;

    this.items.forEach((item) => {

      // add price to total price (for total row latter)
      totalPrice += item.price;
      totalQuantity +=item.quantity;

      let rowEl = document.createElement('tr');
      rowEl.innerHTML = this.createTbodyHtmlExtended(item);
  
      let deleteBtnEl = rowEl.querySelector('button');
      deleteBtnEl.addEventListener('click', () => {

        // delete from local storage
        removeLocalStorage('ext', `${item.id}-${item.color}-${item.size}`);

        // update cart data and rows
        this.updateCart('ext');
      });

      this.$tableBodyExtended.append(rowEl);
    });


    // add total row
    let rowEl = document.createElement('tr');
    rowEl.classList.add('table-light');

    let tdTotalText = document.createElement('th');
    tdTotalText.setAttribute('scope', 'row');
    tdTotalText.setAttribute('colspan', 3);
    tdTotalText.innerText = 'Total';

    let tdTotalQuantity = document.createElement('td');
    tdTotalQuantity.innerText = totalQuantity;

    let tdTotalNumber = document.createElement('td');
    tdTotalNumber.innerText = totalPrice.toFixed(2);

    rowEl.append(tdTotalText, tdTotalQuantity, tdTotalNumber);

    this.$tableBodyExtended.append(rowEl);

  }


  renderExtended () {
    // make container
    this.$containerExtended = document.createElement('div');
    this.$containerExtended.classList.add('col-5');
    this.$containerExtended.setAttribute('id', 'cart');

    // populate with html
    this.$containerExtended.innerHTML = this.createHtmlExtended();
    this.$tableBodyExtended = this.$containerExtended.querySelector('tbody');

    // clear cart button functionality
    let buttonEl = this.$containerExtended.querySelector('#clear-cart');
    buttonEl.addEventListener('click', () => {
      clearLocalStorage();

      this.updateCart('ext');
    })

    this.renderRowsExtended();
  }


  updateCart (typeOfCart) {
    this.items = [];

    // update items from local storage
    this.populateCart();

    // re-render tdoby
    if (typeOfCart === 'simp') {
      this.renderRowsSimple();
    }
    else if (typeOfCart === 'ext') {
      this.renderRowsExtended();
    }

  }

}


const cart = new Cart([]);

export {cart};