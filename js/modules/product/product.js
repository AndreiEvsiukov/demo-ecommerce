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


    // view properties (order like html)
    this.$container; 

    this.$imgLinkStr;
    this.$imgStr;

    this.$heading;

    this.$colorBtns;
    this.$sizeBtns;

    this.$quantityBtns;
    this.$quantityText;

    this.$price;
    this.$priceText;

    this.$cartActionBtns;
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

        <!-- colour choice -->
        <div class='mb-3' id='color-choice'></div>
  
        <!-- size choice -->
        <div class='mb-3' id='size-choice'></div>
  
        <!-- quantity choice -->
        <div class='mb-3' id='quantity-choice'>

        <span class="ms-2 badge bg-secondary" id="quantity-text">${this.quantity}</span>
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
      h = `<input type="button" class="btn border mt-1 me-2 mb-1" name="${id}-${data ? ('up') : ('down')}-${productId}" id="${id}-${data ? ('up') : ('down')}-${productId}" value="${text}">`
    }

    return h;
  };


  // create product card here 
  render(productId) {

/*     // high level html container
    let containerEl = document.createElement('div');
    containerEl.innerHTML = this.createHtml(); */


    // render img
    this.$imgLinkStr = `<a class="mx-auto" href="/product-pages/${this.id}.html">`;
    this.$imgStr = `<img src=${this.imageHref} width="200" height="200">`;


    // render heading
    this.$heading = document.createElement('div');
    this.$heading.classList.add('mb-4');
    this.$heading.setAttribute('id', `heading-${productId}`);
    this.$heading.innerHTML = `<h1 class="mb-3 display-6">${this.name}</h1>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>`;


    // render color buttons and add functionality
    this.$colorBtns = document.createElement('div');
    this.$colorBtns.classList.add('mb-3');
    this.$colorBtns.setAttribute('id', `color-choice-${productId}`);

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
    this.$sizeBtns = document.createElement('div');
    this.$sizeBtns.classList.add('mb-3');
    this.$sizeBtns.setAttribute('id', `size-choice-${productId}`);

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
    this.$quantityBtns = document.createElement('div');
    this.$quantityBtns.classList.add('mb-3');
    this.$quantityBtns.setAttribute('id', `quantity-choice-${productId}`);
    
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

    
    let quantityEl = document.createElement('span');
    quantityEl.classList.add('ms-1', 'badge', 'bg-secondary');
    quantityEl.setAttribute('id', `quantity-text-${productId}`);
    quantityEl.innerText = this.quantity;

    // add quantity text to view for later functiions
    this.$quantityText = quantityEl;

    this.$quantityBtns.append(quantityEl);


    // find price elem and add it to view
    this.$price = document.createElement('div');
    this.$price.classList.add('mb-4');
    this.$price.setAttribute('id', `product-price-${productId}`);

    this.$price.innerHTML = `<div class="card-text">Price</div>
    <span class="card-text price-text" id="price-text-${productId}">${this.price.toFixed(2)}</span>
    <span class="card-text price-currency" id="price-currency-${productId}">€</span>`;

    this.$priceText = this.$price.querySelector(`#price-text-${productId}`);


    // find addToCart and clearChoice buttons and add functionality
    this.$cartActionBtns = document.createElement('div');
    this.$cartActionBtns.classList.add('mb-2');
    this.$cartActionBtns.setAttribute('id', `card-actions-${productId}`);
    this.$cartActionBtns.innerHTML = `<button type="button" class="btn btn-primary me-2 px-3" id="add-to-cart-${productId}">Add to cart</button>
    <button type="button" class="btn btn-light px-3" id="clear-choice-${productId}">Clear selection</button>`;

    this.$clearChoice = this.$cartActionBtns.querySelector(`#clear-choice-${productId}`);
    this.$clearChoice.addEventListener('click', () => {
      this.clearSelection();
    })

    this.$addToCart = this.$cartActionBtns.querySelector(`#add-to-cart-${productId}`);
    this.$addToCart.addEventListener('click', () => {
      this.addToCart();
    });



/*     // add all html created above to view
    this.$container = containerEl.childNodes[0]; */


  }

  // Methods to change data 
  
  // used in methods below  
  calculatePrice () {
    this.priceToPay = this.price * this.sizeCoef[this.size] * this.quantity;
    this.$priceText.innerText = this.priceToPay.toFixed(2);

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

      this.$quantityText.innerText = this.quantity;

      console.log(this);

    } else {
      if (this.quantity > 1) {
        --this.quantity;
        this.calculatePrice();

        this.$quantityText.innerText = this.quantity;

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
    this.$quantityText.innerText = this.quantity;
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