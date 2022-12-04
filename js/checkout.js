/* import displayCart from './modules/checkout/cart-extended.js';

import {clearLocalStorage} from './modules/local-storage.js';



// // // displaying cart

// display as soon as possible what is in the cart
displayCart();




// // // Bootstrap form validation functionality + thank you

// Fetch the form
const form = document.querySelector('.needs-validation');
const row = form.closest('.row');

  // prevent submission
form.addEventListener('submit', event => {

  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  } 
  else {                                // your custom code: functionality after every field was validated 
    event.preventDefault();

    clearLocalStorage();                  // clear storage

    let col = document.createElement('div');       // changing html content for 'thank you' after successful purchase
    col.classList.add('col', 'mt-5');

    let h1 = document.createElement('h1');
    h1.innerText = 'Thank you!';

    let h4 = document.createElement('h4');
    h4.innerText = 'Return to home:';

    let homeButton = document.createElement('a');
    homeButton.classList.add('btn', 'btn-primary', 'my-2');
    homeButton.setAttribute('href', './index.html');
    homeButton.innerText = 'Return';

    col.append(h1, h4, homeButton);

    
    while (row.firstChild) {
      row.removeChild(row.firstChild);
    }
    row.append(col);

    let container = col.closest('.container').classList.add('text-center');
  }

  form.classList.add('was-validated');
  }, false);

 */