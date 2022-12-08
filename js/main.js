import { productsArr } from './modules/product/product-data.js';
import { cart } from './modules/cart/cart.js';
import { navBar } from './modules/navigation.js';


function renderContent() {
  const path = window.location.pathname;
  const reIndex = new RegExp('\/index');
  const reProductPages = new RegExp('\/product-pages\/');

  
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

  }


  // display cart
  rowEl.append(cart.$containerSimple);

}

renderContent();