import { productsArr } from './modules/product-data.js';
import { cart } from './modules/cart.js';
import { navBar } from './modules/navigation.js';
import { clearLocalStorage } from './modules/local-storage-functions.js';
import { Consent } from './modules/consent.js';

console.log(productsArr);

function renderContent() {
  const path = window.location.pathname;
  const reIndex = new RegExp('\/index');
  const reProductPages = new RegExp('\/product-pages\/');
  const reSpecialOffers = new RegExp('\/special-offers')
  const reCheckout = new RegExp('\/checkout');

  
  // find header, render content
  const headerEl = document.querySelector('header');
  navBar.render();
  headerEl.append(navBar.$container);


  // main row
  const rowEl = document.querySelector('main .row');

  
  // render for home page
  if (reIndex.test(path)) {

    const col9El = document.createElement('div');
    col9El.classList.add('col-9')

    const productsRowEl = document.createElement('div');
    productsRowEl.classList.add('row', 'row-cols-md-1', 'row-cols-lg-2', 'row-cols-xl-3', 'g-3');

    col9El.append(productsRowEl);


    productsArr.forEach((product) => {

      // render attributes
      product.render(product.id);

      const colEl = document.createElement('div');
      colEl.classList.add('col');

      const cardEl = document.createElement('div');
      cardEl.classList.add('card', 'shadow-sm');

      colEl.append(cardEl);

      // product img
      const imgContainerEl = document.createElement('div');
      imgContainerEl.classList.add('mx-auto', 'mt-3');

      const imgEl = product.$imgContainer.querySelector('img');
      const imgLinkEl = product.$imgContainer.querySelector('a');
      imgLinkEl.append(imgEl);

      imgContainerEl.append(imgLinkEl);

      cardEl.append(imgContainerEl);

      // card body
      const cardBodyEl = document.createElement('div');
      cardBodyEl.classList.add('card-body');

      cardBodyEl.append(product.$heading, product.$colorBtns, product.$sizeBtns, product.$quantityBtns, product.$price, product.$cartActionBtns);

      cardEl.append(cardBodyEl);


      productsRowEl.append(colEl);
    });

    rowEl.append(col9El);


    // display cart
    cart.populateCart();
    cart.renderSimple();
    rowEl.append(cart.$containerSimple);
  }

  // render for product pages
  else if (reProductPages.test(path)) {

    const col9El = document.createElement('div');
    col9El.classList.add('col-9');

    const cardEl = document.createElement('div');
    cardEl.classList.add('card', 'mx-auto', 'shadow-sm',);

    col9El.append(cardEl);

    const cardRowEl = document.createElement('div');
    cardRowEl.classList.add('row', 'g-3', 'p-1');

    cardEl.append(cardRowEl);

    // const productsRowEl = col9El.querySelector('#card-container');

    productsArr.forEach((product) => {

      // render attributes
      product.render(product.id);


      // product img
      const imgContainerEl = document.createElement('div');
      imgContainerEl.classList.add('col-md-5', 'p-3', 'align-self-center');
      
      const imgEl = product.$imgContainer.querySelector('img');
      imgEl.classList.add('mx-auto', 'd-block')
      imgEl.setAttribute('width', 300);
      imgEl.removeAttribute('height');
      imgContainerEl.append(imgEl);

      cardEl.append(imgContainerEl);


      // // card body
      const cardBodyContainer = document.createElement('div');
      cardBodyContainer.classList.add('col-md-7');

      const cardBodyEl = document.createElement('div');
      cardBodyEl.classList.add('card-body');


      const cardBodyRowEl = document.createElement('div');
      cardBodyRowEl.classList.add('row');

      product.$colorBtns.classList.add('col-5');
      product.$sizeBtns.classList.add('col-5');

      cardBodyRowEl.append(product.$colorBtns, product.$sizeBtns);


      cardBodyEl.append(product.$heading, cardBodyRowEl, product.$quantityBtns, product.$price, product.$cartActionBtns);

      cardBodyContainer.append(cardBodyEl);


      // render img and card body

      cardRowEl.append(imgContainerEl, cardBodyContainer);
    });

    rowEl.append(col9El);


    // display cart
    cart.populateCart();
    cart.renderSimple();
    rowEl.append(cart.$containerSimple);
  }

  else if (reSpecialOffers.test(path)) {

    const col9El = document.createElement('div');
    col9El.classList.add('col-9')

    const productsRowEl = document.createElement('div');
    productsRowEl.classList.add('row', 'row-cols-md-1', 'row-cols-lg-2', 'row-cols-xl-3', 'g-3');

    col9El.append(productsRowEl);


    productsArr.forEach((product) => {

      // render attributes
      product.render(product.id);

      const colEl = document.createElement('div');
      colEl.classList.add('col');

      const cardEl = document.createElement('div');
      cardEl.classList.add('card', 'shadow-sm');

      colEl.append(cardEl);

      // product img
      const imgContainerEl = document.createElement('div');
      imgContainerEl.classList.add('mx-auto', 'mt-3');

      const imgEl = product.$imgContainer.querySelector('img');
      const imgLinkEl = product.$imgContainer.querySelector('a');
      imgLinkEl.append(imgEl);

      imgContainerEl.append(imgLinkEl);

      cardEl.append(imgContainerEl);

      // card body
      const cardBodyEl = document.createElement('div');
      cardBodyEl.classList.add('card-body');

      cardBodyEl.append(product.$heading, product.$colorBtns, product.$sizeBtns, product.$quantityBtns, product.$price, product.$cartActionBtns);

      cardEl.append(cardBodyEl);


      productsRowEl.append(colEl);
    });

    rowEl.append(col9El);


    // display cart
    cart.populateCart();
    cart.renderSimple();
    rowEl.append(cart.$containerSimple);
  }

  // render for checkout
  else if (reCheckout.test(path)) {

    // // Bootstrap form validation functionality + thank you

    // Fetch the form
    const form = document.querySelector('.needs-validation');
    const row = form.closest('.row');

    // prevent submission
    form.addEventListener('submit', event => {

    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    } 

    // your custom code: functionality after every field was validate
    else { 
      event.preventDefault();

      // clear products from storage
      clearLocalStorage();

      // changing html content for 'thank you' after successful purchase
      let col = document.createElement('div');
      col.classList.add('col', 'mt-5');

      let h1 = document.createElement('h1');
      h1.innerText = 'Thank you!';

      let h4 = document.createElement('h4');
      h4.innerText = 'Return to home:';

      let homeButton = document.createElement('a');
      homeButton.classList.add('btn', 'btn-primary', 'my-2');
      homeButton.setAttribute('href', '/index.html');
      homeButton.innerText = 'Return';

      col.append(h1, h4, homeButton);


      // update html
      while (row.firstChild) {
        row.removeChild(row.firstChild);
      }
      row.append(col);

      col.closest('.container').classList.add('text-center');
    }

    form.classList.add('was-validated');

    }, false);


    // display cart
    cart.populateCart();
    cart.renderExtended();
    rowEl.append(cart.$containerExtended);

  }


  // display consent
  
  function requireConsent() {
  
    // if cookie 'consent' doesn't exist -> require consent
    if (!document.cookie.split(';').some((item) => item.trim().startsWith('consent='))) {
  
      let consent = new Consent({});
      consent.integrateGTM();
      consent.render();
      
      const consentEl = document.createElement('div');
      consentEl.prepend(consent.$container);
    
      rowEl.append(consentEl);
    
      const myModal = new bootstrap.Modal(document.getElementById('consentModal'), {
        backdrop: 'static',
        keyboard: false
      });
      
      myModal.show();
    }
    
  }

  requireConsent();


}

renderContent();