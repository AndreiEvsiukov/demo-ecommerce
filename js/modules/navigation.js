class Navigation {
  constructor(pages) {
    // model
    this.pages = pages;

    // view
    this.$container;
  } 
  createHtml () {
    return `<div class="row">
      <div class="col-12 py-2">
        <h1 class="fw-light">Demo store</h1>
        <div id="rowButtons" class="row row-cols-auto">
        </div>
      </div> <!-- col 12 -->
    </div> <!-- row -->
  </div> <!-- container -->`;
  }

  render () {
    const path = window.location.pathname;

    // render container
    this.$container = document.createElement('div');
    this.$container.classList.add('container');
    this.$container.innerHTML = this.createHtml();

    const rowEl = this.$container.querySelector('#rowButtons');

    // render nav items
    for (const elem in this.pages) {

      // if checkout
      if (elem === 'checkout') {
        const colEl = document.createElement('div');
        colEl.classList.add('col', 'px-1', 'ms-auto');
        
        const linkEl = document.createElement('a');
        
        let color;
        path === this.pages[elem].href
          ? (color = 'primary')
          : (color = 'outline-secondary')
        ;

        linkEl.classList.add('btn', 'my-2', `btn-${color}`);
        linkEl.setAttribute('href', `${this.pages[elem].href}`);
        linkEl.innerText = this.pages[elem].text;

        if (this.pages[elem].disabled) {
          linkEl.classList.add('disabled');
        }

        colEl.append(linkEl)
        rowEl.append(colEl);
      }
      
      // if product pages
      else if (elem === 'products') {
        const colEl = document.createElement('div');
        colEl.classList.add('col', 'px-1');

        const btnGroupEl = document.createElement('div');
        btnGroupEl.classList.add('btn-group', 'd-inline');

        const re = new RegExp('\/product-pages\/');
        let color;
        re.test(path)
          ? (color = 'primary')
          : (color = 'secondary')
        ;

        btnGroupEl.innerHTML = `<button type="button" class="me-1 my-2 btn btn-${color} dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Products</button>
        <ul class="dropdown-menu"></ul>`;

        const ulEl = btnGroupEl.querySelector('ul');

        for (const el in this.pages[elem].productPages) {

          let colorLink;
          path === this.pages[elem].productPages[el]
            ? (colorLink = ' link-primary')
            : (colorLink = '')
          ;

          const textLink = `${this.pages[elem].productPages[el].charAt(15).toUpperCase()}${this.pages[elem].productPages[el].slice(16, -6)} ${this.pages[elem].productPages[el].slice(-6, -5)}`

          const liEl = document.createElement('li');
          liEl.innerHTML = `<a class="dropdown-item${colorLink}" href="${this.pages[elem].productPages[el]}">${textLink}</a>`

          ulEl.append(liEl);
        }

        colEl.append(btnGroupEl);
        rowEl.append(colEl);
      }

      // all other pages
      else {
        const colEl = document.createElement('div');
        colEl.classList.add('col', 'px-1');
        
        const linkEl = document.createElement('a');
        
        let color;
        path === this.pages[elem].href
          ? (color = 'primary')
          : (color = 'secondary')
        ;

        linkEl.classList.add('me-1', 'btn', 'my-2', `btn-${color}`);
        linkEl.setAttribute('href', `${this.pages[elem].href}`);
        linkEl.innerText = this.pages[elem].text;

        if (this.pages[elem].disabled) {
          linkEl.classList.add('disabled');
        }

        colEl.append(linkEl)
        rowEl.append(colEl);
      }

    }

  }
  
}

const navBar = new Navigation({
  home: {
    href: '/index.html',
    text: 'Home',
    disabled: false
  }, 
  products: {
    productPages: [
    '/product-pages/apple1.html',
    '/product-pages/apple2.html',
    '/product-pages/pear1.html',
    '/product-pages/pear2.html',
    '/product-pages/orange1.html',
    '/product-pages/orange2.html'
    ],
    disabled: false
  },
  specialOffers: {
    href: '/special-offers.html',
    text: 'Special offers',
    disabled: false
  },
  blog: {
    href: '/blog.html',
    text: 'Blog',
    disabled: true
  },
  feedback: {
    href: '/feedback.html',
    text: 'Feedback',
    disabled: true
  },
  checkout: {
    href: '/checkout.html',
    text: 'Checkout',
    disabled: false
  }
});


export {navBar};