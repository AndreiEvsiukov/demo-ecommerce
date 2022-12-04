
// // // displaying cart

const displayCart = () => {

  let tbody = document.querySelector('#cart tbody');

  while (tbody.firstChild) {                             // clear cart
    tbody.removeChild(tbody.firstChild);
  }

  const totalPriceArr = [];                              // for calculating total price

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let item = JSON.parse(localStorage.getItem(key));

    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdColor = document.createElement('td');
    let tdSize = document.createElement('td');
    let tdQuantity = document.createElement('td');
    let tdPrice = document.createElement('td');
    
    let tdDelete = document.createElement('td');

    tdName.innerText = item.name;
    tdColor.innerText = item.color;
    tdSize.innerText = item.size;
    tdQuantity.innerText = item.quantity;
    tdPrice.innerText = `${(item.quantity * item.price).toFixed(2)} €`;


    let deleteButton = document.createElement('button');     // creating delete button html 
    deleteButton.setAttribute('type', 'button');
    deleteButton.classList.add('btn-close');
    deleteButton.setAttribute('aria-label', 'Close');

    deleteButton.addEventListener('click', () => {          // adding delete button functionality
      removeFromCheckout(deleteButton);
    });


    tdDelete.append(deleteButton);

    tr.append(tdName, tdColor, tdSize, tdQuantity, tdPrice, tdDelete);
    tbody.append(tr);                                    // finished displaying one product type 

    totalPriceArr.push(item.price * item.quantity);      // for calculating total price 
  }

  
  let totalPrice;                                        // calculating total price 
  if (totalPriceArr.length > 0) {
    totalPrice = totalPriceArr.reduce(
      (sum, previousValue) => sum += previousValue
    );
  } else {
    totalPrice = 0;
  }

  let trTotal = document.createElement('tr');            // displaying total
  let thTotal = document.createElement('th');
  let tdTotal = document.createElement('td');

  trTotal.append(thTotal, tdTotal);

  trTotal.setAttribute('id', 'table-total');
  tdTotal.setAttribute('colspan', 5);
  tdTotal.classList.add('table-active');

  thTotal.innerText = 'Total';
  tdTotal.innerText = `${totalPrice.toFixed(2)} €`;

  tbody.append(trTotal);
};


// Remove product from checkout callback for diplayCart

function removeFromCheckout(button) {

  // find product
  let tr = button.closest('tr');
  let productIdentifier = tr.firstElementChild.innerText.toLowerCase();

  removeLocalStorage(productIdentifier);

  displayCart();
}

