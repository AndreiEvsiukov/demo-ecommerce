/* Set a product class */
class productClass {
    constructor(
        name,
        color,
        size,
        quantity,
        price
    ) {

        this.properties = {
            this.name = name;
            this.color = color;
            this.size = size;
            this.quantity = quantity;
            this.price = price;
        }

        this.smallPrice = 1;
        this.mediumPrice = 2;
        this.largePrice = 5;

        this.defaultSize = "small";
        this.defaultQuantity = 1;
    }

    get price() {
        return this.properties.price;
    }

    set price(pr) {
        this.properties.price = pr;
    }

    getPropertiesJson() {
        return JSON.stringify(this.properties);
    }

    getTotalPrice() {
        if (this.size == "small") {
            return this.quantity * this.smallPrice;
        } else if (this.size == "medium") {
            return this.quantity * this.mediumPrice;
        }
    }
}

prod.price = 12;
prod.setPrice(12);

conslole.log(prood.price)

/* set up default product arrays */
const apple1 = new productClass(
    'apple 1',
    'blue',
    's',
    8,
    20
);

const apple2 = new productClass(
    'apple 2',
    'blue',
    's',
    1,
    35
);

const pear1 = new productClass(
    'pear 1',
    'blue',
    's',
    1,
    29
);

const pear2 = new productClass(
    'pear 2',
    'blue',
    's',
    1,
    49
);

const orange1 = new productClass(
    'orange 1',
    'blue',
    's',
    1,
    19
);

const orange2 = new productClass(
    'orange 2',
    'blue',
    's',
    1,
    30
);

const defaultProducts = [apple1, apple2, pear1, pear2, orange1, orange2];


const createHTML = (params) => {
    return
    `<div class="col">
      <div class="card shadow-sm">
        <a class="mx-auto" href="/product-pages/${params.href}.html">
            <img src="./images/${params.image}.jpg" width="200" height="200">
        </a>

        <div class="card-body">
            <h1 class="mb-4 display-6">params.name</h1>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

            <!-- colour choice -->
            <div class="mb-3" id="color-choice">
                <div class="card-text">Colors:</div>
                <input type="radio" class="btn-check" name="options-outlined-colors-${params.name}" id="primary-outlined-colors-blue" autocomplete="off" checked>
                    <label class="btn btn-outline-primary" for="primary-outlined-colors-${params.name}">Blue</label>

                    <input type="radio" class="btn-check" name="options-outlined-colors-${params.name}" id="success-outlined-colors-green" autocomplete="off">
                        <label class="btn btn-outline-success" for="success-outlined-colors-${params.name}">Green</label>

                        <input type="radio" class="btn-check" name="options-outlined-colors-${params.name}" id="danger-outlined-colors-red" autocomplete="off">
                            <label class="btn btn-outline-danger" for="danger-outlined-colors-${params.name}">Red</label>
            </div>

            <!-- size choice -->
            <div class="mb-3" id="size-choice">
                <div class="card-text" >Sizes:</div>
                <input type="radio" class="btn-check" name="options-outlined-sizes-${params.name}" id="secondary1-outlined-sizes-${params.name}" autocomplete="off" checked>
                    <label class="btn btn-outline-secondary" for="secondary1-outlined-sizes-${params.name}">S</label>

                    <input type="radio" class="btn-check" name="options-outlined-sizes-${params.name}" id="secondary2-outlined-sizes-${params.name}" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="secondary2-outlined-sizes-${params.name}">M</label>

                        <input type="radio" class="btn-check" name="options-outlined-sizes-${params.name}" id="secondary3-outlined-sizes-${params.name}" autocomplete="off">
                            <label class="btn btn-outline-secondary" for="secondary3-outlined-sizes-${params.name}">L</label>
            </div>

            <!-- quantity -->
            <div class="mb-3" id="quantity-choice">
                <div class="card-text" >Quantity:</div>
                <input type="button" class="btn border m-1" name="quantity-up-${params.name}" id="quantity-up" value="+">
                    <input type="button" class="btn border m-1" name="quantity-down-${params.name}" id="quantity-down" value="-">
                        <span class="ms-2 badge bg-secondary" id="quantity-indicator">1</span>
            </div>

            <!-- price -->
            <div class="mb-1" id="product-price">
                <div class="card-text">Price</div>
                <span class="card-text" id="price-text">20.00</span>
                <span class="card-text" id="price-currency">€</span>
            </div>

            <!-- add to cart / remove -->
            <div id="cart-actions-product">
                <button type="button" class="btn btn-primary mt-4 me-2 px-3" id="add-to-cart">Add to cart</button>
                <button type="button" class="btn btn-secondary mt-4 px-3" id="remove-from-cart">Remove</button>
            </div>

        </div>
      </div>
    </div>`
}


class Basket {
    constructor() {
        this.prodArr = [];
    }

    addProduct(prod) {

        for (let i = 0; this.prodArr.length; i++) {
            if (this.prodArr[i].name === prod.name) {
                this.prodArr[i] = prod;
                return;
            }
        }

        this.prodArr.push(prod);
    }

    getProductSize() {
        return this.prodArr.length;
    }

    getTotalProducts() {
        let res = 0;
        for (let i = 0; this.prodArr.length; i++) {
            res += this.prodArr[i].quantity;
        }
        return res;
    }
}

let $basketView;
let basket = new Basket();

function addToBasket(product) {

    basket.addProduct(product);

    let quantity = basket.getTotalProducts();

    $basketView.querySelector(".quanttity").innerHTML = quantity;

}


for (let i = 0; defaultProducts.length; i++) {

    let product = defaultProducts[i];

    ((prod) => {
        let htmlStr = createHTML({
            image: product.name,
            name: product.name,
            href: product.name
        });

        let $el = document.createElement("div");
        $el.innerHTML = htmlStr;
        document.querySelector(".product-list").appendChild($el);

        this.btnBlue = $el.querySelector("#danger-outlined-colors-blue");
        let btnGreen = $el.querySelector("#danger-outlined-colors-green")
        let btnRed = $el.querySelector("#danger-outlined-colors-red");

        btnBlue.addEventListener("click", () => {
            //click blue
        });

        btnGreen.addEventListener("click", () => {
            //click green
            console.log(prod.name);
            $el.classList.add("color-red");
        });

        btnRed.addEventListener("click", () => {
            //click red
        });

        btnToBasket.addEventListener("click", () => {
            addToBasket(prod);
            this.brnBlue.disabled = true;
        });
    })(product);
}
