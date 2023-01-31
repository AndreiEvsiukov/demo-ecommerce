import { productsArr } from './modules/product-data.js';
import { cart } from './modules/cart.js';
import { navBar } from './modules/navigation.js';
import { clearLocalStorage } from './modules/local-storage-functions.js';
import { Consent } from './modules/consent.js';


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
    productsRowEl.setAttribute('data-gtm-view', `{"event": "view_item_list", "ecommerce": {"item_list_id": "${path}", "item_list_name": "Home", "items": [{"item_id": "apple1", "item_name": "Gala", "discount": 0, "index": 1, "item_category": "fruit", "item_list_id": "${path}", "item_list_name": "Home", "price": 20.00, "quantity":1}, {"item_id": "apple2", "item_name": "Bitten granny", "discount": 7.5, "index": 2, "item_category": "fruit", "item_list_id": "${path}", "item_list_name": "Home", "price": 35.00, "quantity":1}, {"item_id": "pear1", "item_name": "Comice", "discount": 0, "index": 3, "item_category": "fruit", "item_list_id": "${path}", "item_list_name": "Home", "price": 29.00, "quantity":1}, {"item_id": "pear2", "item_name": "Red pear", "discount": 0, "index": 4, "item_category": "fruit", "item_list_id": "${path}", "item_list_name": "Home", "price": 49.00, "quantity":1}, {"item_id": "orange1", "item_name": "Orange", "discount": 0, "index": 5, "item_category": "fruit", "item_list_id": "${path}", "item_list_name": "Home", "price": 19.00, "quantity":1}, {"item_id": "orange2", "item_name": "Orange 0.5", "discount": 15, "index": 6, "item_category": "fruit", "item_list_id": "${path}", "item_list_name": "Home", "price": 30.00, "quantity":1} ]}}`);

    col9El.append(productsRowEl);


    productsArr.forEach((product) => {
      // render attributes
      product.render();
      productsRowEl.append(product.$container);
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

    /*
      ---note---
      you should make different render() for home page and for product pages
      then you should also put div.card and div.row from below inside of those different
      render() functions 
    */     

    productsArr.forEach((product) => {

      // check the product to be the main product to diplay
      if (!Array.isArray(product)) {
        
        // render attributes
        product.render();
        col9El.append(product.$container);
      }
      
      // if additional products (small snippets)
      else {
        const rowForSnippetsEl = document.createElement('div');
        rowForSnippetsEl.classList.add('row', 'row-cols-md-1', 'row-cols-lg-2', 'row-cols-xl-3', 'g-3');

        product.forEach((e) => {
          e.renderSnippet();

          rowForSnippetsEl.append(e.$snippetContainer);
        })

        col9El.append(rowForSnippetsEl);
      }

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
    productsRowEl.setAttribute('data-gtm-view', `{"event": "view_item_list", "ecommerce": {"item_list_id": "${path}", "item_list_name": "Special offers", "items": [{"item_id": "apple2", "item_name": "Bitten granny", "discount": 7.5, "index": 2, "item_category": "fruit", "item_list_id": "${path}", "item_list_name": "Special offers", "price": 35.00, "quantity":1}, {"item_id": "orange2", "item_name": "Orange 0.5", "discount": 15, "index": 6, "item_category": "fruit", "item_list_id": "${path}", "item_list_name": "Special offers", "price": 30.00, "quantity":1} ]}}`);


    col9El.append(productsRowEl);


    productsArr.forEach((product) => {
      // render attributes
      product.render();
      productsRowEl.append(product.$container);
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