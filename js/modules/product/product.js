import {addLocalStorage, removeLocalStorage, clearLocalStorage} from '../local-storage.js';

/* Btns for Product*/

const buttonsColor = {
  id: 'color',
  data: ['blue', 'green', 'red'],
  text: ['Skyish', 'Eco-friendly', 'Nasty'],
  bootColors: ['primary', 'success', 'danger']
};

const buttonsSize = {
  id: 'size',
  data: ['s', 'm', 'l'],
  text: ['S', 'M', 'L'],
  bootColor: 'secondary'
};

const buttonsQuanity = {
  id: 'quantity',
  data: [0, 1],
  text: ['-', '+'],
  bootColor: 'secondary'
};




/* Product class and data */
class Product{

  constructor(
    id,
    name,
    color,
    size,
    quantity,
    price,
    imageHref,
    colorBtns,
    sizeBtns,
    quantityBtns
  ) {

    // product data properties
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
    
    // price
    this.price = price;
    this.priceToPay;

    this.imageHref = imageHref;

    this.btns = {
      color: colorBtns,
      size: sizeBtns,
      quantity: quantityBtns
    }


    // view properties
    this.$container; 

    this.$quantity;
    this.$price;

    this.$colorBtns;
    this.sizeBtns;
    this.$quantityBtns;

    this.$addToCart;
    this.$clearChoice;
  }


  createHtml () {

    return `<div class='col'>
    <div class="card shadow-sm">
      <a class="mx-auto" href="/product-pages/${this.id}.html">  
        <img src=${this.imageHref} width="200" height="200">
      </a>
  
      <div class="card-body">
        <h1 class="mb-4 display-6">${this.name}</h1>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

        <!-- buttons -->
        <div id='buttons-contianer'></div>
  
        <!-- colour choice -->
        <div class='mb-3' id='color-choice'></div>
  
        <!-- size choice -->
        <div class='mb-3' id='size-choice'></div>
  
        <!-- quantity choice -->
        <div class='mb-3' id='quantity-choice'>

        <span class="ms-2 badge bg-secondary" id="quantity-text">${this.quantity}</span>
        </div>
  
  
        <!-- price -->
        <div class="mb-1" id="product-price">
          <div class="card-text">Price</div>
          <span class="card-text" id="price-text">${this.price.toFixed(2)}</span>
          <span class="card-text" id="price-currency">€</span>
        </div>
  
        <!-- add to card / clear -->
        <div id="card-actions">
          <button type="button" class="btn btn-primary mt-4 me-2 px-3" id="add-to-cart">Add to cart</button>
          <button type="button" class="btn btn-light mt-4 px-3" id="clear-choice">Clear selection</button>
        </div>
      
      </div> <!-- card body -->
    </div> <!-- card -->
    </div>`;
    
  }

  createBtnHtml (i, data, id, text, bootColor, productId) {
    let h;
    
    // for color and size
    if (isNaN(data)) {
      let checked = '';
  
      if (i == 0) {
        checked = 'checked';
      }
      
      h = `<input type="radio" class="btn-check" name="${id}-button-options-${productId}" id="${id}-button-${data}-${productId}" ${checked}>
      <label class="btn btn-outline-${bootColor}" for="${id}-button-${data}-${productId}">${text}</label>`;
    } 
    
    // for quantity
    else {
      h = `<input type="button" class="btn border m-1" name="${id}-${data ? ('up') : ('down')}-${productId}" id="${id}-${data ? ('up') : ('down')}" value="${text}">`
    }

    return h;
  };


  // create product card here 
  render(productId) {

    // high level html container
    let containerEl = document.createElement('div');
    containerEl.innerHTML = this.createHtml();


    // find price elem and add it to view
    this.$price = containerEl.querySelector('#price-text');
    
    // find quantity element and add to view
    this.$quantity = containerEl.querySelector('#quantity-text');

    // find addToCart and clearChoice buttons and add functionality
    this.$clearChoice = containerEl.querySelector('#clear-choice');
    this.$clearChoice.addEventListener('click', () => {
      this.clearSelection();
    })


    this.$addToCart = containerEl.querySelector('#add-to-cart');
    this.$addToCart.addEventListener('click', () => {
      this.addToCart();
    });



    // render color buttons and add functionality
    this.$colorBtns = containerEl.querySelector('#color-choice');

    this.btns.color.data.forEach((data, i) => {

      let btnEl = document.createElement('span');
      btnEl.innerHTML = this.createBtnHtml(
        i,
        data,
        this.btns.color.id,
        this.btns.color.text[i],
        this.btns.color.bootColors[i],
        productId
      );

      let labelEl = btnEl.querySelector('label');
      labelEl.addEventListener('click', () => {
        this.changeColor(data);
      })

      this.$colorBtns.append(btnEl);
    });



    // render size buttons and add functionality
    this.$sizeBtns = containerEl.querySelector('#size-choice');

    this.btns.size.data.forEach((data, i) => {

      let btnEl = document.createElement('span');
      btnEl.innerHTML = this.createBtnHtml(
        i,
        data,
        this.btns.size.id,
        this.btns.size.text[i],
        this.btns.size.bootColor,
        productId
      );

      let labelEl = btnEl.querySelector('label');
      labelEl.addEventListener('click', () => {
        this.changeSize(data);
      })

      this.$sizeBtns.append(btnEl);
    });


    // render quantity buttons and add functionality
    this.$quantityBtns = containerEl.querySelector('#quantity-choice');

    this.btns.quantity.data.forEach((data, i) => {

      let btnEl = document.createElement('span');
      btnEl.innerHTML = this.createBtnHtml(
        undefined,
        data,
        this.btns.quantity.id,
        this.btns.quantity.text[i],
        this.btns.quantity.bootColor,
        productId
      );

      let labelEl = btnEl.querySelector('input');
      labelEl.addEventListener('click', () => {
        this.changeQuantity(data);
      })

      this.$quantityBtns.prepend(btnEl);
    });


    // add all html created above to view
    this.$container = containerEl.childNodes[0];

  }

  // Methods to change data 
  
  // used in methods below  
  calculatePrice () {
    this.priceToPay = this.price * this.sizeCoef[this.size] * this.quantity;
    this.$price.innerText = this.priceToPay.toFixed(2);

  }


  // product choice events
  changeColor(newColor) {
    if (this.color !== newColor) {
      this.color = newColor;
      
      console.log(this);
    }
  }

  changeSize(newSize) {
    if (this.size !== newSize) {
      this.size = newSize;
      this.calculatePrice();

      console.log(this);
    }
  }

  changeQuantity(change) {
    if (change) {
      ++this.quantity;
      this.calculatePrice();

      this.$quantity.innerText = this.quantity;

      console.log(this);

    } else {
      if (this.quantity > 1) {
        --this.quantity;
        this.calculatePrice();

        this.$quantity.innerText = this.quantity;

        console.log(this);
      }
    }

  }

  // clear selection 
  clearSelection () {
    
    // buttons to default
    this.$colorBtns.querySelectorAll('input').forEach((element, i) => {
      i == 0
        ? (element.checked = true)
        : (element.checked = false);
    });

    this.$sizeBtns.querySelectorAll('input').forEach((element, i) => {
      i == 0
        ? (element.checked = true)
        : (element.checked = false);
    });

    // change data to default
    this.color = 'blue',
    this.size = 's',
    this.quantity = 1,

    // show default quantity, default price
    this.$quantity.innerText = this.quantity;
    this.calculatePrice();

  }


  // add to cart
  addToCart () {

    let productId = `${this.id}-${this.color}-${this.size}`;
    let params = JSON.stringify({
      id: this.id,
      name: this.name,
      color: this.color,
      size: this.size,
      quantity: this.quantity,
      price: this.priceToPay ? (this.priceToPay) : (this.price),
    });

    addLocalStorage(productId, params);

    this.clearSelection();

    console.log(window.localStorage);

  };


} /* end of Product */


export {Product, buttonsColor, buttonsQuanity, buttonsSize};