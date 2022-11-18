
// callback for displaying cart

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
    let tdQuantity = document.createElement('td');
    let tdPrice = document.createElement('td');

    tdName.innerText = item.name;
    tdQuantity.innerText = item.quantity;
    tdPrice.innerText = `${(item.quantity * item.price).toFixed(2)} €`;

    tr.append(tdName, tdQuantity, tdPrice);
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
  tdTotal.setAttribute('colspan', 2);
  tdTotal.classList.add('table-active');

  thTotal.innerText = 'Total';
  tdTotal.innerText = `${totalPrice.toFixed(2)} €`;

  tbody.append(trTotal);
};


export default displayCart;