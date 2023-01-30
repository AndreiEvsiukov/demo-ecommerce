import {addLocalStorage} from './local-storage-functions.js';

/* Btns for Product*/

const buttonsColor = {
  id: 'color',
  data: ['blue', 'green', 'red'],
  text: ['Skyish', 'Eco', 'Nasty'],
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
    isOnSale,
    saleCoef,
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
    
    // price and sale
    this.isOnSale = isOnSale;
    this.saleCoef = saleCoef;
    this.price = this.isOnSale ? (price * (1 - this.saleCoef)) : (price);
    this.priceToPay;

    this.imageHref = imageHref;

    this.btns = {
      color: colorBtns,
      size: sizeBtns,
      quantity: quantityBtns
    }
  


    // view properties (order like html)
    this.$container;
    this.$snippetContainer;
    
    this.$imgContainer;

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


  createSnippetHTML () {
    return `<div class="card shadow-sm">
      <div class="mx-auto mt-4" id="header-${this.id}">  
        <a href="/product-pages/${this.id}.html">  
          <img src=${this.imageHref} width="200" height="200">
        </a>
      </div>
  
      <div class="card-body">
        <h1 class="mb-4 display-6">${this.name}</h1>
        <p class="mb-4 card-text">Veniam consectetur ex labore ipsum occaecat pariatur elit non ex dolore esse eu ad.</p>
  
        <!-- go to page button -->
        <div id="card-actions">
          <a class="btn btn-outline-primary px-3" href="/product-pages/${this.id}.html" role="button" id="go-to-${this.id}">Show ${this.name}
          </a>
        </div>
      
      </div> <!-- card body -->
    </div> <!-- card -->`;
  }

  createBtnHtml (i, data, id, text, bootColor) {
    let h;
    
    // for color and size
    if (isNaN(data)) {
      let checked = '';
  
      if (i == 0) {
        checked = 'checked';
      }
      
      h = `<input type="radio" class="btn-check" name="${id}-button-options-${this.id}" id="${id}-button-${data}-${this.id}" ${checked}>
      <label class="btn btn-outline-${bootColor}" for="${id}-button-${data}-${this.id}">${text}</label>`;
    } 
    
    // for quantity
    else {
      h = `<input type="button" class="btn border mt-1 me-2 mb-1" name="${id}-${data ? ('up') : ('down')}-${this.id}" id="${id}-${data ? ('up') : ('down')}-${this.id}" value="${text}">`
    }

    return h;
  };


  // create product card here 
  render() {
    // tests to create view dinamically 
    const path = window.location.pathname;

    const reIndexOrSpecialOffers = new RegExp('\/index|\/special-offers');
    const reIndexOrSpecialOffersTest = reIndexOrSpecialOffers.test(path);

    // const reSpecialOffers = new RegExp('\/special-offers')
    // const reSpecialOffersTest = reSpecialOffers.test(path);

    const reProductPages = new RegExp('\/product-pages\/');
    const reProductPagesTest = reProductPages.test(path);


    this.$container = document.createElement('div');
    // will serve as a middle-agent to append everything to the conatiner
    let cardEl;

    // basic changes to container and dinamic images 
    if (reIndexOrSpecialOffersTest) {

      this.$container.classList.add('col');

      cardEl = document.createElement('div');
      cardEl.classList.add('card', 'shadow-sm');
      // for gtm
      cardEl.setAttribute('data-gtm-view', `{
        "event": "view_item_list",
        "ecommerce": {
          "item_list_id": "${path}",
          "item_list_name": "The only lyst i have",
          "items": [
           {
            "item_id": "${this.id}",
            "item_name": "${this.name}",
            "affiliation": "",
            "coupon": "",
            "discount": "${this.isOnSale ? this.saleCoef : ''}",
            "index": 0,
            item_category: "fruit",
            item_list_id: "fruits",
            item_list_name: "Fruits",
            item_variant: "",
            location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
            price: 9.99,
            quantity: 1
          }
          ]
        }
      }`)

      this.$container.append(cardEl);
    }

    else if (reProductPagesTest) {

      this.$container.classList.add('card', 'mx-auto', 'shadow-sm', 'mb-5');

      cardEl = document.createElement('div');
      cardEl.classList.add('row', 'g-3', 'p-1');

      this.$container.append(cardEl);
    }

    

    // render img

    this.$imgContainer = document.createElement('div');

    const imgEl = document.createElement('img');
    imgEl.classList.add('mx-auto', reProductPagesTest ? 'd-block' : undefined);
    imgEl.setAttribute('src', `${this.imageHref}`);
    imgEl.setAttribute('width', reIndexOrSpecialOffersTest ? 200 : 300);
    imgEl.setAttribute('height', reIndexOrSpecialOffersTest ? 200 : 300);


    if (reIndexOrSpecialOffersTest) {
      this.$imgContainer.classList.add('mx-auto', 'mt-4');

      const imgLinkEl = document.createElement('a');
      imgLinkEl.classList.add('mx-auto');
      imgLinkEl.setAttribute('href', `/product-pages/${this.id}.html`);

      imgLinkEl.append(imgEl);
      
      this.$imgContainer.append(imgLinkEl);

      if (this.isOnSale) {
        const badgeEl = document.createElement('span');
        badgeEl.classList.add('position-absolute', 'translate-middle', 'badge', 'rounded-pill', 'bg-danger');
        // id for styles in css
        badgeEl.setAttribute('id', 'saleBadge');
        badgeEl.innerText = 'SALE';
        this.$imgContainer.append(badgeEl);
      }

    }

    else if (reProductPagesTest) {
      this.$imgContainer.classList.add('col-md-5', 'p-3', 'align-self-center');

      this.$imgContainer.append(imgEl);
    }

    cardEl.append(this.$imgContainer);


    
    // render heading
    this.$heading = document.createElement('div');
    this.$heading.classList.add('mb-4');
    this.$heading.setAttribute('id', `heading-${this.id}`);
    this.$heading.innerHTML = `<h1 class="mb-3 display-6">${this.name}</h1>
    <p class="card-text">Aute cillum fugiat Lorem nisi proident exercitation ex. Aliquip laborum eu consectetur sint mollit proident cillum aute quis minim. Eu ex aliquip enim duis voluptate magna quis laborum ut.</p>`;


    // render color buttons and add functionality
    this.$colorBtns = document.createElement('div');
    this.$colorBtns.classList.add('mb-3', reProductPagesTest ? 'col-5' : undefined);
    this.$colorBtns.setAttribute('id', `color-choice-${this.id}`);

    this.btns.color.data.forEach((data, i) => {

      let btnEl = document.createElement('span');
      btnEl.innerHTML = this.createBtnHtml(
        i,
        data,
        this.btns.color.id,
        this.btns.color.text[i],
        this.btns.color.bootColors[i]
      );

      let labelEl = btnEl.querySelector('label');
      labelEl.addEventListener('click', () => {
        this.changeColor(data);
      })

      this.$colorBtns.append(btnEl);
    });

    // color heading
    const colorHeading = document.createElement('div');
    colorHeading.classList.add(`Card-text-${this.id}`);
    colorHeading.innerText = 'Colors:';
    this.$colorBtns.prepend(colorHeading);




    // render size buttons and add functionality
    this.$sizeBtns = document.createElement('div');
    this.$sizeBtns.classList.add('mb-3', reProductPagesTest ? 'col-5' : undefined);
    this.$sizeBtns.setAttribute('id', `size-choice-${this.id}`);

    this.btns.size.data.forEach((data, i) => {

      let btnEl = document.createElement('span');
      btnEl.innerHTML = this.createBtnHtml(
        i,
        data,
        this.btns.size.id,
        this.btns.size.text[i],
        this.btns.size.bootColor
      );

      let labelEl = btnEl.querySelector('label');
      labelEl.addEventListener('click', () => {
        this.changeSize(data);
      })

      this.$sizeBtns.append(btnEl);
    });

    // size heading
    const sizeHeading = document.createElement('div');
    sizeHeading.classList.add(`Card-text-${this.id}`);
    sizeHeading.innerText = 'Sizes:';
    this.$sizeBtns.prepend(sizeHeading);



    // render quantity buttons and add functionality
    this.$quantityBtns = document.createElement('div');
    this.$quantityBtns.classList.add('mb-3');
    this.$quantityBtns.setAttribute('id', `quantity-choice-${this.id}`);
    
    this.btns.quantity.data.forEach((data, i) => {

      let btnEl = document.createElement('span');
      btnEl.innerHTML = this.createBtnHtml(
        undefined,
        data,
        this.btns.quantity.id,
        this.btns.quantity.text[i],
        this.btns.quantity.bootColor
      );

      let labelEl = btnEl.querySelector('input');
      labelEl.addEventListener('click', () => {
        this.changeQuantity(data);
      })

      this.$quantityBtns.prepend(btnEl);
    });

    
    let quantityEl = document.createElement('span');
    quantityEl.classList.add('ms-1', 'badge', 'bg-secondary');
    quantityEl.setAttribute('id', `quantity-text-${this.id}`);
    quantityEl.innerText = this.quantity;

    // add quantity text to view for later functiions
    this.$quantityText = quantityEl;

    this.$quantityBtns.append(quantityEl);

    // quantity heading 
    const quantityHeading = document.createElement('div');
    quantityHeading.classList.add(`Card-text-${this.id}`);
    quantityHeading.innerText = 'Quantity:';
    this.$quantityBtns.prepend(quantityHeading);




    // find price elem and add it to view
    this.$price = document.createElement('div');
    this.$price.classList.add('mb-4');
    this.$price.setAttribute('id', `product-price-${this.id}`);

    if (this.isOnSale) {
      this.$price.innerHTML = `<div class="card-text">Price:</div>
      <span class="card-text price-text text-muted" id="old-price-text-${this.id}"><s>${this.price / (1 - this.saleCoef) .toFixed(2)}</s></span>
      <span class="card-text price-currency text-muted" id="price-currency-${this.id}"><s> €</s></span>
      <span class="card-text price-text text-danger" id="price-text-${this.id}">${this.price.toFixed(2)}</span>
      <span class="card-text price-currency text-danger" id="price-currency-${this.id}"> €</span>`;
    }
    else {
      this.$price.innerHTML = `<div class="card-text">Price:</div>
      <span class="card-text price-text" id="price-text-${this.id}">${this.price.toFixed(2)}</span>
      <span class="card-text price-currency" id="price-currency-${this.id}">€</span>`;
    }

    this.$priceText = this.$price.querySelector(`#price-text-${this.id}`);


    // find addToCart and clearChoice buttons and add functionality
    this.$cartActionBtns = document.createElement('div');
    this.$cartActionBtns.classList.add('mb-2');
    this.$cartActionBtns.setAttribute('id', `card-actions-${this.id}`);
    this.$cartActionBtns.innerHTML = `<button type="button" class="btn btn-primary me-2 px-3" id="add-to-cart-${this.id}">Add to cart</button>
    <button type="button" class="btn btn-light px-3" id="clear-choice-${this.id}">Clear selection</button>`;

    this.$clearChoice = this.$cartActionBtns.querySelector(`#clear-choice-${this.id}`);
    this.$clearChoice.addEventListener('click', () => {
      this.clearSelection();
    })

    this.$addToCart = this.$cartActionBtns.querySelector(`#add-to-cart-${this.id}`);
    this.$addToCart.addEventListener('click', () => {
      this.addToCart();
    });


    // create a card body for all the parts above, append everything to it, then append to the container 

    const cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body');

    if (reIndexOrSpecialOffersTest) {
      cardBodyEl.append(this.$heading, this.$colorBtns, this.$sizeBtns, this.$quantityBtns, this.$price, this.$cartActionBtns);
  
      cardEl.append(cardBodyEl);
    }

    else if (reProductPagesTest) {
      const cardBodyContainer = document.createElement('div');
      cardBodyContainer.classList.add('col-md-7');
  
      const cardBodyRowEl = document.createElement('div');
      cardBodyRowEl.classList.add('row');
  
      cardBodyRowEl.append(this.$colorBtns, this.$sizeBtns);
  
      cardBodyEl.append(this.$heading, cardBodyRowEl, this.$quantityBtns, this.$price, this.$cartActionBtns);
  
      cardBodyContainer.append(cardBodyEl);

      cardEl.append(cardBodyContainer);
    }


  }


  renderSnippet() {
    this.$snippetContainer = document.createElement('div');
    this.$snippetContainer.classList.add('col');
    this.$snippetContainer.innerHTML = this.createSnippetHTML();

    if (this.isOnSale) {
      const linkInHeaderEl = this.$snippetContainer.querySelector(`#header-${this.id} a`);
      const badgeEl = document.createElement('span');
      badgeEl.classList.add('position-absolute', 'translate-middle', 'badge', 'rounded-pill', 'bg-danger');
      // id for styles in css
      badgeEl.setAttribute('id', 'saleBadge');
      badgeEl.innerText = 'SALE';
      linkInHeaderEl.append(badgeEl);
    }
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
    }
  }

  changeSize(newSize) {
    if (this.size !== newSize) {
      this.size = newSize;
      this.calculatePrice();
    }
  }

  changeQuantity(change) {
    if (change) {
      ++this.quantity;
      this.calculatePrice();

      this.$quantityText.innerText = this.quantity;

    } else {
      if (this.quantity > 1) {
        --this.quantity;
        this.calculatePrice();

        this.$quantityText.innerText = this.quantity;
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
      isOnSale: this.isOnSale
    });

    addLocalStorage(productId, params);

    this.clearSelection();

    console.log(window.localStorage);

  };


} /* end of Product */


export {Product, buttonsColor, buttonsQuanity, buttonsSize};