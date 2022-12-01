/* // local storage functions 

const addLocalStorage = (productIdentifier, product) => {
  localStorage.setItem(productIdentifier, JSON.stringify(product));
};

const removeLocalStorage = (productIdentifier) => {
  if (localStorage.length > 0) {
    localStorage.removeItem(productIdentifier);
  };
};

const clearLocalStorage = () => {
  for (let i = 0; i < localStorage.length;) {
    let key = localStorage.key(i);
    localStorage.removeItem(key);
  }
};


export {addLocalStorage, removeLocalStorage, clearLocalStorage}; */